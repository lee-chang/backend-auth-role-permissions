import { Router } from 'express'
import { RouterPath } from './core/service/loggerRouter.service'

import UserRouter from './features/user/routes/user.route'
import AuthRouter from './features/auth/routes/auth.route'
import RoleRouter from './features/role/routes/role.route'
import PermissionRouter from './features/role/routes/permission.route'

const route = new RouterPath()

const router = Router()

router.use(route.getApiPath('user'), UserRouter)
router.use(route.getApiPath('auth'), AuthRouter)
router.use(route.getApiPath('role'), RoleRouter)
router.use(route.getApiPath('permission'), PermissionRouter)

export default router
