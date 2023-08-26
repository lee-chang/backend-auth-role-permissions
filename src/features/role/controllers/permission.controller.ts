import { Request, Response, NextFunction } from 'express'
import { HttpStatus } from '@/core/interfaces/httpStatus.interface'

import { PermissionService } from '../services/permission.service'


export class PermissionController {

  static async getPermissions(req: Request, res: Response, next: NextFunction) {
    try {
      const permissions = PermissionService.listKeysPermissions()
      return res.status(HttpStatus.OK).json(permissions)
    } catch (err) {
      console.log(err)
      next(err)
    }
  }
}
