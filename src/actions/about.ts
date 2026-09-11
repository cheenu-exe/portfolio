"use server"

import { prisma } from "@/lib/prisma"
import { updateAboutSchema } from "@/validations/about"
import { revalidatePath } from "next/cache"

type AboutState = {
  ok: boolean
  errors?: Record<string, string[]>
} | null

export async function updateAboutAction(_prevState: AboutState, formData: FormData): Promise<AboutState> {
  const socialLinksStr = formData.get("socialLinks") as string | null

  const parsed = updateAboutSchema.safeParse({
    bio: formData.get("bio"),
    avatarUrl: formData.get("avatarUrl"),
    headline: formData.get("headline"),
    location: formData.get("location"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    socialLinks: socialLinksStr ? JSON.parse(socialLinksStr) : null,
    skills: formData.getAll("skills"),
  })

  if (!parsed.success) {
    return { ok: false, errors: parsed.error.flatten().fieldErrors }
  }

  const existing = await prisma.about.findFirst()

  if (existing) {
    await prisma.about.update({ where: { id: existing.id }, data: parsed.data as any })
  } else {
    await prisma.about.create({ data: parsed.data as any })
  }

  revalidatePath("/admin/about")
  return { ok: true }
}
