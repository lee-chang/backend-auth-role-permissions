import z from 'zod'
import { IRole } from '../interfaces/role.interface'
import { keysPermissions } from '../interfaces/permissions'

// Hacer uso de la interfaz IUser
const roleSchema = z.object({
  name: z.string().min(3).max(255),
  permissions: z.array(
    z.string().refine((value) => keysPermissions.includes(value), {
      message: 'PERMISSION NOT VALID',
    })
  ).optional(),
})

export const RoleSchema = {
  Create: roleSchema,
  Update: roleSchema.pick({ name: true }),
  UpdatePermissions: roleSchema.pick({ permissions: true }),
}
