import { z } from "zod"

export const createMessageSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Valid email is required"),
  subject: z.string().max(200).optional().nullable(),
  message: z.string().min(1, "Message is required").max(5000),
})

export type CreateMessageInput = z.infer<typeof createMessageSchema>
