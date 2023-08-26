import { Router } from 'express'
import { AuthController } from '@/features/auth/controllers/auth.controller'

import { authRequired } from '@/core/middleware/validateToken.middleware'
import { validatorShema } from '@/core/middleware/validateSchema.middleware'
import { AuthSchema } from '../schemas/auth.schema'

const router = Router()

/*
 ** http://localhost:PORT/api/{apiVersion}/auth/[...]
 */

router.post(
  '/register',
  validatorShema(AuthSchema.register),
  AuthController.register
)
router.post('/login', validatorShema(AuthSchema.login), AuthController.login)
router.post('/logout', authRequired, AuthController.logout)
router.get('/me', authRequired, AuthController.me)

export default router
