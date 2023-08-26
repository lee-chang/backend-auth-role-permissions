import { UserRepository } from '../repositories/user.repository'
import { IUser } from '../interfaces/user.interface'
import { notUndefinedOrNull } from '@/core/service/exceptions/data-not-received.exception'

// import { addAbortSignal } from 'nodemailer/lib/xoauth2'

const userRepository = new UserRepository()

export class UserService {
  private static userRepository = userRepository

  static async getUserById(id: string): Promise<IUser> {
    const user = await this.userRepository.findUserById(id)
    return notUndefinedOrNull(user)
  }

  static async getAllUsers(): Promise<IUser[]> {
    const users = await this.userRepository.findAllUsers()
    return users
  }

  static async updateUserById(id: string, user: IUser): Promise<IUser> {
    const userUpdated = await this.userRepository.updateUserById(id, user)
    return notUndefinedOrNull(userUpdated)
  }

  static async deleteUserById(id: string): Promise<IUser> {
    const userDeleted = await this.userRepository.deleteUserById(id)
    return notUndefinedOrNull(userDeleted)
  }

  static async createUser(user: IUser): Promise<IUser> {
    const userCreated = await this.userRepository.createUser(user)
    return notUndefinedOrNull(userCreated)
  }


  // ** UTILS

  static async isUserExistWithEmail(email: string): Promise<Boolean> {
    const userFount = await this.userRepository.findUserByEmail(email)
    return userFount ? true : false
  }

  static async isUserExistWithId(id: string): Promise<Boolean> {
    const userFount = await this.userRepository.findUserById(id)
    return userFount ? true : false
  }
}