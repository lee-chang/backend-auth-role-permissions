import { ErrorExt } from '../utils/http.response.util'
import { Request, Response, NextFunction } from 'express'

import Permission from '@/features/role/interfaces/permissions'
import { HttpStatus } from '../interfaces/httpStatus.interface'

import { RolePermissionService } from '@/features/role/services/role-permission.service'

/**
 *
 * @param role Array de roles que pueden acceder a la ruta
 * @returns
 */

const validatePermission = (permission: Permission) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      
      // ** 1. Obtener el rol del usuario

      // req.user ->  Payload { id: string, role: string[] }  path: @\interfaces\jwt.payload

      if (!req.user?.role || req.user?.role.length === 0) throw new ErrorExt('ROL_NOT_EXIT', HttpStatus.UNAUTHORIZED)
      
      const arrRoleId: string[] = req.user?.role

      // console.log('ROL BY USER', arrRoleId)

      const promises = arrRoleId.map(async (id) => {
        const isPermissionValid = await RolePermissionService.isValidatePermissionByRol(
          id,
          permission
        )
        return isPermissionValid
      })

      const results = await Promise.all(promises)
      const hasPermission = results.some((result) => result === true)

      // console.log('hasPermission', hasPermission)
      
      if (hasPermission) {
        next()
      } else {
        throw new ErrorExt('PERMISSION_NOT_VALID', HttpStatus.UNAUTHORIZED)
      }
    } catch (err) {
      next(err)
    }
  }
}
export { validatePermission }
