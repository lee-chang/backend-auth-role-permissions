import { IUser } from '@/features/user/interfaces/user.interface'
import { Payload } from '@/features/auth/interfaces/jwt.payload.interface'

import { IAuth } from '@/features/auth/interfaces/auth.interface'
import { AuthRepository } from '../repositories/auth.repository'
import { HttpStatus } from '@/core/interfaces/httpStatus.interface'

import { ErrorExt } from '@/core/utils/http.response.util'
import { AuthUtil } from '../utils/auth.util'

const authRepository = new AuthRepository()

export class AuthUserService {
  private static authRepository = authRepository

  static async createUser(user: IUser) {
    const hashedPassword = await AuthUtil.hashPassword(user.password)
    user.password = hashedPassword

    const newUser = await this.authRepository.createUser(user)

    if (!newUser) throw new ErrorExt('USER_NOT_CREATED')

    const payload: Payload = {
      id: newUser._id,
      authority: newUser.authority,
    }
    const token = await AuthUtil.generateToken(payload)
    if (!token) throw new ErrorExt('TOKEN_NOT_GENERATED')

    return { token, user: newUser }
  }

  static async authenticationUser(user: IAuth) {
    const isRememberMe = user.rememberMe ? user.rememberMe : false

    const userFount = await this.authRepository.findUserByEmail(user.email)
    if (!userFount) throw new ErrorExt('CREDENTIAL_INVALID', HttpStatus.BAD_REQUEST)

    const validPassword = await AuthUtil.comparePassword(user.password,
      userFount.password)

    if (!validPassword) throw new ErrorExt('CREDENTIAL_INVALID', HttpStatus.BAD_REQUEST)

    const payload: Payload = {
      id: userFount._id,
      authority: userFount.authority,
      rememberMe: isRememberMe,
    }

    const token = await AuthUtil.generateToken(payload)
    if (!token) throw new ErrorExt('TOKEN_NOT_GENERATED')

    return { token, user: userFount }
  }
}
