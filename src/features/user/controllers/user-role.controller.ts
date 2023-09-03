import { HttpStatus } from '@/core/interfaces/httpStatus.interface'
import { Response, Request, NextFunction } from 'express'
import { UserRoleService } from '../services/user-role.service'

export class UserRoleController {
  static async updateUserRoles(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params
    const { role }: { role: [string] } = req.body // -> role: [idRole1, idRole2, ...]

    try {
      const userUpdated = await UserRoleService.updateUserRolesById(
        id,
        role
      )
      return res.status(HttpStatus.OK).send(userUpdated)
    } catch (err) {
      console.log(err)
      next(err)
    }
  }
}
