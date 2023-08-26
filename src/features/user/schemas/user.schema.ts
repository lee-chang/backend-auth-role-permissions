import z, { Schema } from 'zod'
import { IUser } from '../interfaces/user.interface'

import { addressSchema } from '@/features/shared/schemas/address.schema'
import { phoneSchema } from '@/features/shared/schemas/phone.schema'

// Hacer uso de la interfaz IUser

const authoritySchema = z.object({ authority: z.array((z.string())) })

const userSchema = z.object({
  userName: z.string().min(3).max(255),
  fullName: z.string().min(3).max(255).optional(),
  email: z.string().email().min(3).max(255),
  password: z.string().min(3).max(255),
  verified: z.boolean().optional(),
  login_code: z.string().min(3).max(255).optional(),
  phone: z.object(phoneSchema.shape).optional(),
  address: z.object(addressSchema.shape).optional(),
  authority: z.object(authoritySchema.shape).optional(),
})


export const UserSchema = {
  Create: userSchema,
  UpdateAuthority: authoritySchema,
  Update: userSchema.omit({ password: true, authority: true }).partial(),
}
