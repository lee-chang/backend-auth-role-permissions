import { IAuth } from "../interfaces/auth.interface"
import { IUser } from "@/features/user/interfaces/user.interface"

export interface AuthRepositoryPort {
  createUser(user: IUser): Promise<IUser>
  findUserByEmail(email: string): Promise<IUser | null>
}