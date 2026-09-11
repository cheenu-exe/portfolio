"use server"

import { prisma } from "@/lib/prisma"
import { createResumeSchema } from "@/validations/resume"
import { revalidatePath } from "next/cache"

type ActionState = { ok: boolean; errors?: Record<string, string[]> } | null

export async function uploadResumeAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = createResumeSchema.safeParse({
    title: formData.get("title"),
    fileUrl: formData.get("fileUrl"),
    fileSize: Number(formData.get("fileSize")) || null,
  })

  if (!parsed.success) {
    return { ok: false, errors: parsed.error.flatten().fieldErrors }
  }

  await prisma.resume.updateMany({ data: { isCurrent: false } })

  const maxVersion = await prisma.resume.aggregate({ _max: { version: true } })
  const version = (maxVersion._max.version ?? 0) + 1

  await prisma.resume.create({
    data: { ...parsed.data, version, isCurrent: true },
  })

  revalidatePath("/admin/resume")
  revalidatePath("/resume")
  return { ok: true }
}

export async function deleteResumeAction(id: string) {
  await prisma.resume.delete({ where: { id } })
  revalidatePath("/admin/resume")
}
