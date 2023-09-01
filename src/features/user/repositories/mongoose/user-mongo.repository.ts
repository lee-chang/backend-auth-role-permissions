import { PaginateData } from '@/core/interfaces/resPaginate.interface'
import { IUser } from '../../interfaces/user.interface'
import { UserRepositoryPort } from '../user-repository.model'
import UserModel from './user.model'

export class UserRepositoryMongoDB implements UserRepositoryPort {
  async createUser(user: IUser) {
    const userCreated = await UserModel.create(user)
    return userCreated
  }

  async findAllUsers(page: number,
    limit: number
  ): Promise<PaginateData<IUser>>{
    const totalUsers = await UserModel.countDocuments()

    const totalPages = Math.ceil(totalUsers / limit)

    const currentPage = page > totalPages ? totalPages : page || 1

    const users = await UserModel.find()
      .limit(limit)
      .skip((page - 1) * limit)
      .exec()

    if (!users) {
      let response: PaginateData<IUser> = {
        total: 0,
        totalPages: 0,
        currentPage: 0,
        data: [],
      }
      return response
    }

    let response: PaginateData<IUser> = {
      total: totalUsers,
      totalPages,
      currentPage,
      data: users,
    }
    return response
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
