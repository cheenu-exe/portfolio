"use server"

import { prisma } from "@/lib/prisma"
import {
  createJourneySchema,
  updateJourneySchema,
} from "@/validations/journey"
import { revalidatePath } from "next/cache"

type ActionState = { ok: boolean; errors?: Record<string, string[]> } | null

export async function createJourneyAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = createJourneySchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    date: formData.get("date"),
    category: formData.get("category"),
    url: formData.get("url"),
    tags: formData.getAll("tags"),
    displayOrder: Number(formData.get("displayOrder")) || 0,
  })

  if (!parsed.success) {
    return { ok: false, errors: parsed.error.flatten().fieldErrors }
  }

  await prisma.journey.create({ data: parsed.data })
  revalidatePath("/admin/journey")
  return { ok: true }
}

export async function updateJourneyAction(formData: FormData) {
  const parsed = updateJourneySchema.safeParse({
    id: formData.get("id"),
    title: formData.get("title"),
    description: formData.get("description"),
    date: formData.get("date"),
    category: formData.get("category"),
    url: formData.get("url"),
    tags: formData.getAll("tags"),
    displayOrder: Number(formData.get("displayOrder")) || 0,
  })

  if (!parsed.success) {
    return { ok: false, errors: parsed.error.flatten().fieldErrors }
  }

  const { id, ...data } = parsed.data
  await prisma.journey.update({ where: { id }, data })
  revalidatePath("/admin/journey")
  return { ok: true }
}

export async function deleteJourneyAction(id: string) {
  await prisma.journey.delete({ where: { id } })
  revalidatePath("/admin/journey")
}
