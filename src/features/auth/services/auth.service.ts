import { IUser } from '@/features/user/interfaces/user.interface'
import { Payload } from '@/features/auth/interfaces/jwt.payload.interface'
import { ErrorExt } from '@/core/utils/http.response.util'
import { HttpStatus } from '@/core/interfaces/httpStatus.interface'
import { IAuth } from '@/features/auth/interfaces/auth.interface'

import { AuthUserService } from './auth-user.service'
import { AuthRepository } from '../repositories/auth.repository'

import { ToolRoleService } from '@/features/role/services/toolRole.service'

interface userData {
  id: string
  userName: string
  email: string
  role: string[]
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

    const roles = await ToolRoleService.nameRoleByIdOfArray(newUser.user.role)
  
    const data: resAuth = {
      user: {
        id: newUser.user.id.toString(),
        userName: newUser.user.userName,
        email: newUser.user.email,
        role: roles,
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

    const roles = await ToolRoleService.nameRoleByIdOfArray(userLogged.role)
    
    const data: resAuth = {
      user: {
        id: userLogged.id,
        userName: userLogged.userName,
        email: userLogged.email,
        role: roles,
      },
      token: token,
    }
    return data

  }

  static async logoutService(user: IAuth) {}

  static async meService(user: Payload) {

    const userFound = await authRepository.findUserById(user.id)
    if (!userFound) throw new ErrorExt('USER_NOT_FOUND', HttpStatus.BAD_REQUEST)

    const roles = await ToolRoleService.nameRoleByIdOfArray(userFound.role)

    const data: userData = {
      id: userFound.id.toString(),
      userName: userFound.userName,
      email: userFound.email,
      role: roles,
    }
    return data
  }
}
