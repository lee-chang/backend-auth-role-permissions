import { NextFunction, Request, Response } from 'express'
import { HttpStatus } from '@/core/interfaces/httpStatus.interface'
import { UserService } from '../services/user.service'

export class UserControlller {

  static async getUsers(req: Request, res: Response,next:NextFunction) {
    try {
      const users = await UserService.getAllUsers()
      return res.status(HttpStatus.OK).send(users)
    } catch (err) {
      // console.log(err)
      next(err)
    }
  }

  static async getUser(req: Request, res: Response,next:NextFunction) {
    const { id } = req.params

    try {
      const user = await UserService.getUserById(id)
      return res.status(HttpStatus.OK).send(user)
    } catch (err) {
      next(err)
    }
  }

  static async updateUser(req: Request, res: Response,next:NextFunction) {
    const { id } = req.params
    const user = req.body
    try {
      const userUpdated = await UserService.updateUserById(id, user)
      return res.status(HttpStatus.OK).send(userUpdated)
    } catch (err) {
      next(err)
    }
  }

  static async deleteUser(req: Request, res: Response,next:NextFunction) {
    const { id } = req.params
    try {
      const userDeleted = await UserService.deleteUserById(id)
      return res.status(HttpStatus.OK).send(userDeleted)
    } catch (err) {
      next(err)
    }
  }
}
