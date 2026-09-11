"use server"

import { prisma } from "@/lib/prisma"
import { createProjectSchema, updateProjectSchema } from "@/validations/project"
import { slugify } from "@/lib/utils"
import { revalidatePath } from "next/cache"

type ActionState = { ok: boolean; errors?: Record<string, string[]> } | null

export async function createProjectAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = createProjectSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    content: formData.get("content"),
    coverImage: formData.get("coverImage"),
    githubUrl: formData.get("githubUrl"),
    liveUrl: formData.get("liveUrl"),
    technologies: formData.getAll("technologies"),
    status: formData.get("status") || "completed",
    featured: formData.get("featured") === "true",
    pinned: formData.get("pinned") === "true",
    displayOrder: Number(formData.get("displayOrder")) || 0,
  })

  if (!parsed.success) {
    return { ok: false, errors: parsed.error.flatten().fieldErrors }
  }

  const slug = parsed.data.slug || slugify(parsed.data.title)

  await prisma.project.create({
    data: { ...parsed.data, slug },
  })

  revalidatePath("/admin/projects")
  revalidatePath("/projects")
  return { ok: true }
}

export async function updateProjectAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = updateProjectSchema.safeParse({
    id: formData.get("id"),
    title: formData.get("title"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    content: formData.get("content"),
    coverImage: formData.get("coverImage"),
    githubUrl: formData.get("githubUrl"),
    liveUrl: formData.get("liveUrl"),
    technologies: formData.getAll("technologies"),
    status: formData.get("status") || "completed",
    featured: formData.get("featured") === "true",
    pinned: formData.get("pinned") === "true",
    displayOrder: Number(formData.get("displayOrder")) || 0,
  })

  if (!parsed.success) {
    return { ok: false, errors: parsed.error.flatten().fieldErrors }
  }

  const { id, ...updateData } = parsed.data

  await prisma.project.update({
    where: { id },
    data: updateData,
  })

  revalidatePath("/admin/projects")
  revalidatePath("/projects")
  return { ok: true }
}

export async function deleteProjectAction(id: string) {
  await prisma.project.delete({ where: { id } })
  revalidatePath("/admin/projects")
  revalidatePath("/projects")
}
