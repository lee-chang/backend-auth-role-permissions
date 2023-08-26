import { IUser } from '@/features/user/interfaces/user.interface'
import { AuthRepositoryPort } from '../auth-repository.model'
import UserModel from '@/features/user/repositories/mongoose/user.model'

export class AuthRepositoryMongoDB implements AuthRepositoryPort {
  async createUser(user: IUser) {
    const userCreated = await UserModel.create(user)
    return userCreated
  }

  async findUserByEmail(email: string) {
    const user = await UserModel.findOne({ email })
    if (!user) {
      return null
    }

    return user
  }

}
