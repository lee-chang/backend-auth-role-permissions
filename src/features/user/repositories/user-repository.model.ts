import { IUser } from "../interfaces/user.interface"

export interface UserRepositoryPort {
  createUser(user: IUser): Promise<IUser>
  findAllUsers(): Promise<IUser[]>
  findUserById(id: string): Promise<IUser | null>
  findUserByEmail(email: string): Promise<IUser | null>
  updateUserById(id: string, user: IUser): Promise<IUser | null>
  deleteUserById(id: string): Promise<IUser | null>
}