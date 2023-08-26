import { Router } from 'express'
import { RoleController } from '../controllers/role.controller'
import { validatePermission } from '@/core/middleware/validatePermission.middleware'
import { authRequired } from '@/core/middleware/validateToken.middleware'
import { validatorShema } from '@/core/middleware/validateSchema.middleware'
import { RoleSchema } from '../schemas/role.schema'
import Permission from '../interfaces/permissions'

const router = Router()

// * CRUD

router.get(
  '/',
  authRequired,
  validatePermission(Permission.READ_ROLE),
  RoleController.getRoles
)
router.get(
  '/:id',
  authRequired,
  validatePermission(Permission.READ_ROLE),
  RoleController.getRole
)
router.delete(
  '/:id',
  authRequired,
  validatePermission(Permission.DELETE_ROLE),
  RoleController.deleteRole
)
router.post(
  '/',
  authRequired,
  validatePermission(Permission.CREATE_ROLE),
  validatorShema(RoleSchema.Create),
  RoleController.createRole
)

router.patch(
  '/:id',
  authRequired,
  validatePermission(Permission.UPDATE_ROLE),
  validatorShema(RoleSchema.Update),
  RoleController.updateRole
) // -> menos los permisos

// ** RELATIONSHIPS

router.patch(
  '/:id/permissions',
  authRequired,
  validatePermission(Permission.UPDATE_ROLE),
  validatorShema(RoleSchema.UpdatePermissions),
  RoleController.updatePermissions
)

export default router
