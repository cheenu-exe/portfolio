import { z } from "zod"

export const createEducationSchema = z.object({
  institution: z.string().min(1, "Institution is required").max(200),
  degree: z.string().min(1, "Degree is required").max(200),
  field: z.string().min(1, "Field is required").max(200),
  description: z.string().optional().nullable(),
  startDate: z.string().datetime("Valid start date is required"),
  endDate: z.string().datetime().optional().nullable(),
  current: z.boolean().default(false),
  gpa: z.string().optional().nullable(),
  achievements: z.array(z.string()).default([]),
  displayOrder: z.number().int().default(0),
})

export const updateEducationSchema = createEducationSchema.partial().extend({
  id: z.string(),
})

export type CreateEducationInput = z.infer<typeof createEducationSchema>
export type UpdateEducationInput = z.infer<typeof updateEducationSchema>
