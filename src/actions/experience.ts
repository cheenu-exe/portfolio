"use server"

import { prisma } from "@/lib/prisma"
import {
  createExperienceSchema,
  updateExperienceSchema,
} from "@/validations/experience"
import { revalidatePath } from "next/cache"

type ActionState = { ok: boolean; errors?: Record<string, string[]> } | null

export async function createExperienceAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = createExperienceSchema.safeParse({
    company: formData.get("company"),
    role: formData.get("role"),
    description: formData.get("description"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    current: formData.get("current") === "true",
    location: formData.get("location"),
    companyUrl: formData.get("companyUrl"),
    technologies: formData.getAll("technologies"),
    displayOrder: Number(formData.get("displayOrder")) || 0,
  })

  if (!parsed.success) {
    return { ok: false, errors: parsed.error.flatten().fieldErrors }
  }

  await prisma.experience.create({ data: parsed.data })
  revalidatePath("/admin/experience")
  return { ok: true }
}

export async function updateExperienceAction(formData: FormData) {
  const parsed = updateExperienceSchema.safeParse({
    id: formData.get("id"),
    company: formData.get("company"),
    role: formData.get("role"),
    description: formData.get("description"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    current: formData.get("current") === "true",
    location: formData.get("location"),
    companyUrl: formData.get("companyUrl"),
    technologies: formData.getAll("technologies"),
    displayOrder: Number(formData.get("displayOrder")) || 0,
  })

  if (!parsed.success) {
    return { ok: false, errors: parsed.error.flatten().fieldErrors }
  }

  const { id, ...data } = parsed.data
  await prisma.experience.update({ where: { id }, data })
  revalidatePath("/admin/experience")
  return { ok: true }
}

export async function deleteExperienceAction(id: string) {
  await prisma.experience.delete({ where: { id } })
  revalidatePath("/admin/experience")
}
