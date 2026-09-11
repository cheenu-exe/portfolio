import { z } from "zod"

export const createCertificateSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  issuer: z.string().min(1, "Issuer is required").max(200),
  imageUrl: z.string().url().optional().nullable(),
  pdfUrl: z.string().url().optional().nullable(),
  verificationUrl: z.string().url().optional().nullable(),
  issueDate: z.string().datetime().optional().nullable(),
  expiryDate: z.string().datetime().optional().nullable(),
  description: z.string().optional().nullable(),
  displayOrder: z.number().int().default(0),
})

export const updateCertificateSchema = createCertificateSchema.partial().extend({
  id: z.string(),
})

export type CreateCertificateInput = z.infer<typeof createCertificateSchema>
export type UpdateCertificateInput = z.infer<typeof updateCertificateSchema>
