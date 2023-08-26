import { IUser } from '@/features/user/interfaces/user.interface'
import { Payload } from '@/features/auth/interfaces/jwt.payload.interface'
import { ErrorExt } from '@/core/utils/http.response.util'
import { HttpStatus } from '@/core/interfaces/httpStatus.interface'
import { IAuth } from '@/features/auth/interfaces/auth.interface'

import { AuthUserService } from './auth-user.service'
import { AuthRepository } from '../repositories/auth.repository'

interface userData {
  id: string
  userName: string
  email: string
  authority: string[]
}

interface resAuth {
  user: userData
  token: string
}

const authRepository = new AuthRepository()

export class AuthService {
  

  static async registerService(user: IUser) {


    const avalibleUser = await authRepository.findUserByEmail(user.email)

    const isExistEmail = avalibleUser ? true : false

    if (isExistEmail)
      throw new ErrorExt('EMAIL_ALREADY_EXIST', HttpStatus.BAD_REQUEST)

    const newUser = await AuthUserService.createUser(user)

    // console.log('New user',newUser)

    if (!newUser) throw new ErrorExt('USER_NOT_CREATED', HttpStatus.BAD_REQUEST)

    const data: resAuth = {
      user: {
        id: newUser.user.id.toString(),
        userName: newUser.user.userName,
        email: newUser.user.email,
        authority: newUser.user.authority,
      },
      token: newUser.token,
    }
    return data
  }

  static async loginService(auth: IAuth) {

    const loginUser = await AuthUserService.authenticationUser(auth)
    if (!loginUser)
      throw new ErrorExt('USER_NOT_LOGIN', HttpStatus.BAD_REQUEST)

    const { user: userLogged, token } = loginUser

    const data: resAuth = {
      user: {
        id: userLogged.id,
        userName: userLogged.userName,
        email: userLogged.email,
        authority: userLogged.authority,
      },
      token: token,
    }
    return data

  }

  static async logoutService(user: IAuth) {}

  static async meService(auth: IAuth) {

    const userFound = await authRepository.findUserByEmail(auth.email)
    if (!userFound) throw new ErrorExt('USER_NOT_FOUND', HttpStatus.BAD_REQUEST)

    const data: userData = {
      id: userFound.id.toString(),
      userName: userFound.userName,
      email: userFound.email,
      authority: userFound.authority,
    }
    return data
  }
}
