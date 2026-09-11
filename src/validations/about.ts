import { z } from "zod"

export const updateAboutSchema = z.object({
  bio: z.string().min(1, "Bio is required").max(5000).optional(),
  avatarUrl: z.string().url().optional().nullable(),
  headline: z.string().max(200).optional().nullable(),
  location: z.string().max(200).optional().nullable(),
  email: z.string().email().optional().nullable(),
  phone: z.string().optional().nullable(),
  socialLinks: z
    .object({
      github: z.string().url().optional(),
      linkedin: z.string().url().optional(),
      twitter: z.string().url().optional(),
      website: z.string().url().optional(),
    })
    .optional()
    .nullable(),
  skills: z.array(z.string()).optional(),
})

export type UpdateAboutInput = z.infer<typeof updateAboutSchema>
