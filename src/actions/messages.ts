"use server"

import { prisma } from "@/lib/prisma"
import { createMessageSchema } from "@/validations/message"
import { revalidatePath } from "next/cache"

type MessageState = {
  ok: boolean
  errors?: {
    name?: string[]
    email?: string[]
    subject?: string[]
    message?: string[]
  }
} | null

export async function createMessageAction(_prevState: MessageState, formData: FormData): Promise<MessageState> {
  const parsed = createMessageSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  })

  if (!parsed.success) {
    return { ok: false, errors: parsed.error.flatten().fieldErrors }
  }

  await prisma.contactMessage.create({
    data: parsed.data,
  })

  return { ok: true }
}

export async function markMessageReadAction(id: string) {
  await prisma.contactMessage.update({
    where: { id },
    data: { read: true },
  })
  revalidatePath("/admin/messages")
}

export async function deleteMessageAction(id: string) {
  await prisma.contactMessage.delete({
    where: { id },
  })
  revalidatePath("/admin/messages")
}
