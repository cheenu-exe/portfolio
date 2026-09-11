import { z } from "zod"

export const createExperienceSchema = z.object({
  company: z.string().min(1, "Company is required").max(200),
  role: z.string().min(1, "Role is required").max(200),
  description: z.string().optional().nullable(),
  startDate: z.string().datetime("Valid start date is required"),
  endDate: z.string().datetime().optional().nullable(),
  current: z.boolean().default(false),
  location: z.string().max(200).optional().nullable(),
  companyUrl: z.string().url().optional().nullable(),
  technologies: z.array(z.string()).default([]),
  displayOrder: z.number().int().default(0),
})

export const updateExperienceSchema = createExperienceSchema.partial().extend({
  id: z.string(),
})

export type CreateExperienceInput = z.infer<typeof createExperienceSchema>
export type UpdateExperienceInput = z.infer<typeof updateExperienceSchema>
