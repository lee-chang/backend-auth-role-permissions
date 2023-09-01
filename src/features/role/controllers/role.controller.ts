import { Request, Response, NextFunction } from 'express'
import { HttpStatus } from '@/core/interfaces/httpStatus.interface'
import { RoleSevice } from '../services/role.service'
import { IRole } from '../interfaces/role.interface'
import { KeyPermissions } from '../interfaces/permissions'

export class RoleController {
  static async getRoles(req: Request, res: Response, next: NextFunction) {
    let page = Number(req.query.page) || 1
    let limit = Number(req.query.limit) || Infinity

    try {
      const roles = await RoleSevice.findAllRoles(page, limit)
      res.status(HttpStatus.OK).json(roles)
    } catch (err) {
      next(err)
    }
  }

  static async getRole(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
      const role = await RoleSevice.findRoleById(id)
      res.status(HttpStatus.OK).json(role)
    } catch (err) {
      next(err)
    }
  }

  static async createRole(req: Request, res: Response, next: NextFunction) {
    const role: IRole = req.body
    try {
      const newRole = await RoleSevice.createRole(role)
      res.status(HttpStatus.OK).json(newRole)
    } catch (err) {
      next(err)
    }
  }

  static async deleteRole(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
      const role = await RoleSevice.deleteRoleById(id)
      res.status(HttpStatus.OK).json(role)
    } catch (err) {
      next(err)
    }
  }

  static async updateRole(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    const role: IRole = req.body
    try {
      const updateRole = await RoleSevice.updateRoleById(id, role)
      res.status(HttpStatus.OK).json(updateRole)
    } catch (err) {
      next(err)
    }
  }

  // ** RELATIONSHIPS

  static async updatePermissions(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params
    const { permissions }: { permissions: [KeyPermissions] } = req.body

    try {
      const role = await RoleSevice.updatePermissionsByRoleId(id, permissions)
      res.status(HttpStatus.OK).json(role)
    } catch (err) {
      next(err)
    }
  }
}
