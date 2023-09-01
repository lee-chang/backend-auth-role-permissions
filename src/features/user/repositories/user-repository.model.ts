import { PaginateData } from '@/core/interfaces/resPaginate.interface'
import { IUser } from '../interfaces/user.interface'

export interface UserRepositoryPort {
  createUser(user: IUser): Promise<IUser>
  findAllUsers(page: number, limit: number): Promise<PaginateData<IUser>>
  findUserById(id: string): Promise<IUser | null>
  findUserByEmail(email: string): Promise<IUser | null>
  updateUserById(id: string, user: IUser): Promise<IUser | null>
  deleteUserById(id: string): Promise<IUser | null>
}
