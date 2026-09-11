import { z } from "zod"

export const createProjectSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  slug: z.string().min(1).max(200).optional(),
  description: z.string().min(1, "Description is required").max(500),
  content: z.string().optional(),
  coverImage: z.string().url().optional().nullable(),
  githubUrl: z.string().url().optional().nullable(),
  liveUrl: z.string().url().optional().nullable(),
  technologies: z.array(z.string()).default([]),
  status: z.enum(["draft", "in_progress", "completed"]).default("completed"),
  featured: z.boolean().default(false),
  pinned: z.boolean().default(false),
  displayOrder: z.number().int().default(0),
})

export const updateProjectSchema = createProjectSchema.partial().extend({
  id: z.string(),
})

export type CreateProjectInput = z.infer<typeof createProjectSchema>
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>
