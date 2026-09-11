import { z } from "zod"

export const createResumeSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  fileUrl: z.string().url("Valid file URL is required"),
  fileSize: z.number().int().optional().nullable(),
})

export type CreateResumeInput = z.infer<typeof createResumeSchema>
