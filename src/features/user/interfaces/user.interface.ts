import { IAuth } from '@/features/auth/interfaces/auth.interface'
import { IPhone } from '@/features/shared/interfaces/phone.interface'

export interface IUser extends IAuth {
  _id: string
  userName: string
  fullName: string
  authority: [string]
  verified: boolean
  login_code: string
  phone: IPhone
  createdAt: Date
  updatedAt: Date
}
