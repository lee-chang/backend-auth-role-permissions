import { IUser } from '@/features/user/interfaces/user.interface'
import { Payload } from '@/features/auth/interfaces/jwt.payload.interface'
import bcrypt from 'bcryptjs'
import { generateToken } from './generateToken.service'
import { IAuth } from '@/features/auth/interfaces/auth.interface'

import { AuthRepository } from '../repositories/auth.repository'
import {RoleRepository} from '@/features/role/repositories/role.repository'
import { HttpStatus } from '@/core/interfaces/httpStatus.interface'
import { ErrorExt } from '@/core/utils/http.response.util'

const authRepository = new AuthRepository()
const roleRepository = new RoleRepository()

export class AuthUserService {
  private static authRepository = authRepository

  static async createUser(user: IUser) {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(user.password, salt)
    user.password = hashedPassword

    if (user.authority.length > 0) {
      // Existe el rol?
      user.authority.map(async (role) => {
        await roleRepository.findRoleById(role)
      })
    }

    const newUser = await this.authRepository.createUser(user)

    const payload: Payload = {
      id: newUser._id,
      authority: newUser.authority,
    }
    const token = await generateToken(payload)
    if (!token) throw new Error('TOKEN_NOT_GENERATED')

    return { token, user: newUser }
  }

  static async authenticationUser(user: IAuth) {
    const isRememberMe = user.rememberMe ? user.rememberMe : false

    const userFount = await this.authRepository.findUserByEmail(user.email)
    if (!userFount) throw new ErrorExt('CREDENTIAL_INVALID', HttpStatus.BAD_REQUEST)

    const validPassword = await bcrypt.compare(
      user.password,
      userFount.password
    )
    if (!validPassword) throw new ErrorExt('CREDENTIAL_INVALID', HttpStatus.BAD_REQUEST)

    const payload: Payload = {
      id: userFount._id,
      authority: userFount.authority,
      rememberMe: isRememberMe,
    }

    const token = await generateToken(payload)
    if (!token) throw new Error('TOKEN_NOT_GENERATED')

    return { token, user: userFount }
  }
}
