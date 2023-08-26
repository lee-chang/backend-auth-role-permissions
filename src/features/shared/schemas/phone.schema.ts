import z from 'zod'

export const phoneSchema = z.object({
  code: z.number().min(1).max(255),
  number: z.number().min(3).max(255),
})
