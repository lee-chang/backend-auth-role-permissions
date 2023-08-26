import { IUser } from '../../interfaces/user.interface'
import { UserRepositoryPort } from '../user-repository.model'
import UserModel from './user.model'

export class UserRepositoryMongoDB implements UserRepositoryPort {
  async createUser(user: IUser) {
    const userCreated = await UserModel.create(user)
    return userCreated
  }

  async findAllUsers() {
    const users = await UserModel.find()
    if (!users) {
      return []
    }

    return users
  }

  async findUserById(id: string) {
    const user = await UserModel.findById(id)
    if (!user) {
      return null
    }
    return user
  }

  async findUserByEmail(email: string) {
    const user = await UserModel.findOne({ email })
    if (!user) {
      return null
    }

    return user
  }

  async updateUserById(id: string, user: IUser) {
    const updateUser = await UserModel.findByIdAndUpdate(id, user, {
      new: true,
    })

    if (!updateUser) {
      return null
    }

    return updateUser
  }

  async deleteUserById(id: string) {
    const deleteUser = await UserModel.findByIdAndDelete(id)

    if (!deleteUser) {
      return null
    }
    return deleteUser
  }
}
