import { z } from "zod"

export const createJourneySchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().optional().nullable(),
  date: z.string().datetime("Valid date is required"),
  category: z.enum([
    "course",
    "book",
    "conference",
    "project",
    "certification",
    "other",
  ]),
  url: z.string().url().optional().nullable(),
  tags: z.array(z.string()).default([]),
  displayOrder: z.number().int().default(0),
})

export const updateJourneySchema = createJourneySchema.partial().extend({
  id: z.string(),
})

export type CreateJourneyInput = z.infer<typeof createJourneySchema>
export type UpdateJourneyInput = z.infer<typeof updateJourneySchema>
