import { z } from "zod"

export const createSkillSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  icon: z.string().optional().nullable(),
  category: z.enum([
    "programming",
    "frontend",
    "backend",
    "cybersecurity",
    "cloud",
    "devops",
    "tools",
  ]),
  displayOrder: z.number().int().default(0),
})

export const updateSkillSchema = createSkillSchema.partial().extend({
  id: z.string(),
})

export type CreateSkillInput = z.infer<typeof createSkillSchema>
export type UpdateSkillInput = z.infer<typeof updateSkillSchema>
