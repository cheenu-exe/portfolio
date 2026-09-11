import { z } from "zod"

export const updateSettingSchema = z.object({
  key: z.string().min(1),
  value: z.any(),
})

export type UpdateSettingInput = z.infer<typeof updateSettingSchema>
