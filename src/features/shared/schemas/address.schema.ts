import z from 'zod'

export const addressSchema = z.object({
  country: z.string().min(3).max(255),
  state: z.string().min(3).max(255),
  city: z.string().min(3).max(255),
  street: z.string().min(3).max(255),
  number: z.string().min(3).max(255),
  reference: z.string().min(3).max(255),
  zipCode: z.string().min(3).max(255),
})
