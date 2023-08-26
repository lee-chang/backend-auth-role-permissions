import { ENV_CONFIG } from '@/config/env.config'
import { Payload } from '../interfaces/jwt.payload.interface'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { ErrorExt } from '@/core/utils/http.response.util'

export class AuthUtil {
  static async generateToken(payload: Payload) {
    return new Promise<string | undefined>((resolve, reject) => {

      // ** Checkboxes rememberMe
      const expiresIn = payload.rememberMe ? "30d" : "6d";
  
      jwt.sign(
        { id: payload.id, authority: payload.authority },
        ENV_CONFIG.JWT_SECRET,
        { expiresIn: expiresIn },
        (err, token) => {
          if (err) reject(err);
          resolve(token);
        }
      );
    });
  }

  static async hashPassword(password: string) {
    try {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
      return hashedPassword
    } catch (error) {
      console.log(error)
      throw new ErrorExt('PASSWORD_NOT_HASHED')
    }
  }

  static async comparePassword(password: string, hashedPassword: string) {
    try {
      const validPassword = await bcrypt.compare(password, hashedPassword)
      return validPassword
    } catch (error) {
      console.log(error)
      throw new ErrorExt('PASSWORD_NOT_COMPARED')
    }
  }
}
