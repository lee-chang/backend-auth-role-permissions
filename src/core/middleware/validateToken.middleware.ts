import { Request, Response, NextFunction } from 'express'
import { HttpStatus } from '@/core/interfaces/httpStatus.interface'
import jwt from 'jsonwebtoken'
import { ENV_CONFIG } from '@/config/env.config'
import { ErrorExt } from '@/core/utils/http.response.util'

export const authRequired = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //Recuperar token de la cookie o del header Authorization - Bearer token
  // const token = req.cookies.jwt_token

  let token = ''

  try {
    const bearerToken = req.headers.authorization as string

    if (!bearerToken)
      throw new ErrorExt('INVALID_SESSION', HttpStatus.BAD_REQUEST)

    token = bearerToken.split(' ')[1]
  } catch (error) {
    throw new ErrorExt('INVALID_SESSION', HttpStatus.BAD_REQUEST)
  }

  try {
    const decoded = jwt.verify(token, ENV_CONFIG.JWT_SECRET)

    if (!decoded)
      throw new ErrorExt('INVALID_SESSION', HttpStatus.UNAUTHORIZED)

    req.user = decoded

    next()
  } catch (err) {
    throw new ErrorExt('INVALID_SESSION', HttpStatus.UNAUTHORIZED)
  }
}
