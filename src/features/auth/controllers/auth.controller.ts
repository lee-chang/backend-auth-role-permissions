import { NextFunction, Request, Response } from 'express'
import { IUser } from '@/features/user/interfaces/user.interface'
import { IAuth } from '../interfaces/auth.interface'
import { ENV_CONFIG } from '@/config/env.config'
import { HttpStatus } from '@/core/interfaces/httpStatus.interface'

import { AuthService } from '../services/auth.service'
import { Payload } from '../interfaces/jwt.payload.interface'

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    const user: IUser = req.body
    try {
      const data = await AuthService.registerService(user)
      res
        .status(HttpStatus.OK)
        .cookie(ENV_CONFIG.NAME_STORAGE_TOKEN_JWT, data.token)
        .json(data)
    } catch (err) {
      next(err)
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    const user: IAuth = req.body
    try {
      const data = await AuthService.loginService(user)
      res
        .status(HttpStatus.OK)
        .cookie(ENV_CONFIG.NAME_STORAGE_TOKEN_JWT, data.token)
        .json(data)
    } catch (err) {
      next(err)
    }
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(HttpStatus.OK).clearCookie(ENV_CONFIG.NAME_STORAGE_TOKEN_JWT)
    } catch (err) {
      next(err)
    }
  }

  static async me(req: Request, res: Response, next: NextFunction) {
    const user: Payload = req.user
    try {
      const data = await AuthService.meService(user)
      res.status(HttpStatus.OK).json(data)
    } catch (err) {
      next(err)
    }
  }
}
