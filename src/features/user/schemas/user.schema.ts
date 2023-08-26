import z, { Schema } from 'zod'
import { IUser } from '../interfaces/user.interface'

import { addressSchema } from '@/features/shared/schemas/address.schema'
import { phoneSchema } from '@/features/shared/schemas/phone.schema'

// Hacer uso de la interfaz IUser

const authoritySchema = z.array((z.string()))
const passwordSchema = z.string().min(3).max(255)


const userSchema = z.object({
  userName: z.string().min(3).max(255),
  email: z.string().email().min(3).max(255),
  password: passwordSchema,
  verified: z.boolean().optional(),
  fullName: z.string().min(3).max(255).optional(),
  login_code: z.string().min(3).max(255).optional(),
  phone: z.array(phoneSchema).optional(),
  address: z.array(addressSchema).optional(),
  authority: authoritySchema.optional(), 
})


export const UserSchema = {
  Create: userSchema,
  Update: userSchema.omit({ password: true, authority: true }).partial(),
  UpdateAuthority: userSchema.pick({ authority: true }),
  UpdatePassword: userSchema.pick({ password: true }),
}
