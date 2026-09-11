"use server"

import { prisma } from "@/lib/prisma"
import { createSkillSchema, updateSkillSchema } from "@/validations/skill"
import { revalidatePath } from "next/cache"

type ActionState = { ok: boolean; errors?: Record<string, string[]> } | null

export async function createSkillAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = createSkillSchema.safeParse({
    name: formData.get("name"),
    icon: formData.get("icon"),
    category: formData.get("category"),
    displayOrder: Number(formData.get("displayOrder")) || 0,
  })

  if (!parsed.success) {
    return { ok: false, errors: parsed.error.flatten().fieldErrors }
  }

  await prisma.skill.create({ data: parsed.data })
  revalidatePath("/admin/skills")
  return { ok: true }
}

export async function updateSkillAction(formData: FormData) {
  const parsed = updateSkillSchema.safeParse({
    id: formData.get("id"),
    name: formData.get("name"),
    icon: formData.get("icon"),
    category: formData.get("category"),
    displayOrder: Number(formData.get("displayOrder")) || 0,
  })

  if (!parsed.success) {
    return { ok: false, errors: parsed.error.flatten().fieldErrors }
  }

  const { id, ...data } = parsed.data
  await prisma.skill.update({ where: { id }, data })
  revalidatePath("/admin/skills")
  return { ok: true }
}

export async function deleteSkillAction(id: string) {
  await prisma.skill.delete({ where: { id } })
  revalidatePath("/admin/skills")
}
