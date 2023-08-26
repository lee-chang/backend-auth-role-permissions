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
    const { authority }: { authority: [string] } = req.body // -> authority: [idRole1, idRole2, ...]

    try {
      const userUpdated = await UserRoleService.updateUserRolesById(
        id,
        authority
      )
      return res.status(HttpStatus.OK).send(userUpdated)
    } catch (err) {
      console.log(err)
      next(err)
    }
  }
}
