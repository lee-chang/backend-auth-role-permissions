import { Router } from 'express'
import { PermissionController } from '../controllers/permission.controller'
import { authRequired } from '@/core/middleware/validateToken.middleware'
import { validatePermission } from '@/core/middleware/validatePermission.middleware'
import Permission from '../interfaces/permissions'

const router = Router()

router.get(
  '/',
  authRequired,
  validatePermission(Permission.READ_PERMISSION),
  PermissionController.getPermissions
)

export default router
