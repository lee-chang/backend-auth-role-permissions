import { IAuth } from '@/features/auth/interfaces/auth.interface'
import { IAddress } from '@/features/shared/interfaces/address.interface'
import { IPhone } from '@/features/shared/interfaces/phone.interface'

export interface IUser extends IAuth {
  id: string
  userName: string
  fullName: string
  authority: [string]
  verified: boolean
  login_code: string
  phone: [IPhone]
  address: [IAddress]
  createdAt: Date
  updatedAt: Date
}
