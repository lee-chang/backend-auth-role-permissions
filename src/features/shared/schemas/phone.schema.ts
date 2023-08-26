import z from 'zod'

export const phoneSchema = z.object({
  // Numeros de telefono
  code: z.number(),
  number: z.number()

})
