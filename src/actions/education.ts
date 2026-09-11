"use server"

import { prisma } from "@/lib/prisma"
import {
  createEducationSchema,
  updateEducationSchema,
} from "@/validations/education"
import { revalidatePath } from "next/cache"

type ActionState = { ok: boolean; errors?: Record<string, string[]> } | null

export async function createEducationAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = createEducationSchema.safeParse({
    institution: formData.get("institution"),
    degree: formData.get("degree"),
    field: formData.get("field"),
    description: formData.get("description"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    current: formData.get("current") === "true",
    gpa: formData.get("gpa"),
    achievements: formData.getAll("achievements"),
    displayOrder: Number(formData.get("displayOrder")) || 0,
  })

  if (!parsed.success) {
    return { ok: false, errors: parsed.error.flatten().fieldErrors }
  }

  await prisma.education.create({ data: parsed.data })
  revalidatePath("/admin/education")
  return { ok: true }
}

export async function updateEducationAction(formData: FormData) {
  const parsed = updateEducationSchema.safeParse({
    id: formData.get("id"),
    institution: formData.get("institution"),
    degree: formData.get("degree"),
    field: formData.get("field"),
    description: formData.get("description"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    current: formData.get("current") === "true",
    gpa: formData.get("gpa"),
    achievements: formData.getAll("achievements"),
    displayOrder: Number(formData.get("displayOrder")) || 0,
  })

  if (!parsed.success) {
    return { ok: false, errors: parsed.error.flatten().fieldErrors }
  }

  const { id, ...data } = parsed.data
  await prisma.education.update({ where: { id }, data })
  revalidatePath("/admin/education")
  return { ok: true }
}

export async function deleteEducationAction(id: string) {
  await prisma.education.delete({ where: { id } })
  revalidatePath("/admin/education")
}
