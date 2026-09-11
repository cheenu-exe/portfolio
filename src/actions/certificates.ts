"use server"

import { prisma } from "@/lib/prisma"
import {
  createCertificateSchema,
  updateCertificateSchema,
} from "@/validations/certificate"
import { revalidatePath } from "next/cache"

type ActionState = { ok: boolean; errors?: Record<string, string[]> } | null

export async function createCertificateAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = createCertificateSchema.safeParse({
    title: formData.get("title"),
    issuer: formData.get("issuer"),
    imageUrl: formData.get("imageUrl"),
    pdfUrl: formData.get("pdfUrl"),
    verificationUrl: formData.get("verificationUrl"),
    issueDate: formData.get("issueDate"),
    expiryDate: formData.get("expiryDate"),
    description: formData.get("description"),
    displayOrder: Number(formData.get("displayOrder")) || 0,
  })

  if (!parsed.success) {
    return { ok: false, errors: parsed.error.flatten().fieldErrors }
  }

  await prisma.certificate.create({ data: parsed.data })
  revalidatePath("/admin/certificates")
  return { ok: true }
}

export async function updateCertificateAction(formData: FormData) {
  const parsed = updateCertificateSchema.safeParse({
    id: formData.get("id"),
    title: formData.get("title"),
    issuer: formData.get("issuer"),
    imageUrl: formData.get("imageUrl"),
    pdfUrl: formData.get("pdfUrl"),
    verificationUrl: formData.get("verificationUrl"),
    issueDate: formData.get("issueDate"),
    expiryDate: formData.get("expiryDate"),
    description: formData.get("description"),
    displayOrder: Number(formData.get("displayOrder")) || 0,
  })

  if (!parsed.success) {
    return { ok: false, errors: parsed.error.flatten().fieldErrors }
  }

  const { id, ...data } = parsed.data
  await prisma.certificate.update({ where: { id }, data })
  revalidatePath("/admin/certificates")
  return { ok: true }
}

export async function deleteCertificateAction(id: string) {
  await prisma.certificate.delete({ where: { id } })
  revalidatePath("/admin/certificates")
}
