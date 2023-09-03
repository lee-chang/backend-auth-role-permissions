import { UserControlller } from '../controllers/user.controller'
// import { validatePermission } from '@/middlewares/validatePermission'
import { Router } from 'express'
import { UserRoleController } from '../controllers/user-role.controller'

import { authRequired } from '@/core/middleware/validateToken.middleware'
import { validatorShema } from '@/core/middleware/validateSchema.middleware'
import { UserSchema } from '../schemas/user.schema'

const router = Router()

// ** CRUD
router.get('/', authRequired, UserControlller.getUsers)
router.get('/:id', authRequired, UserControlller.getUser)
// router.post('/', UserControlller.createRole)
router.delete('/:id', authRequired, UserControlller.deleteUser)
router.patch(
  '/:id',
  authRequired,
  validatorShema(UserSchema.Update),
  UserControlller.updateUser
)
router.patch(
  '/:id/password',
  validatorShema(UserSchema.UpdatePassword),
  UserControlller.updateUserPassword
)

// ** RELATIONSHIPS
router.patch(
  '/:id/roles',
  authRequired,
  validatorShema(UserSchema.Updaterole),
  UserRoleController.updateUserRoles
)

export default router
