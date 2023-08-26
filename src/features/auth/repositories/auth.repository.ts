import { AuthRepositoryPort } from './auth-repository.model'
import { AuthRepositoryMongoDB } from './mongoose/auth-mongo.repository'

export class AuthRepository implements AuthRepositoryPort {

  private userRepository: AuthRepositoryPort

  constructor() {
    this.userRepository = new AuthRepositoryMongoDB()
  }

  async createUser(user: any) {
    return await this.userRepository.createUser(user)
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findUserByEmail(email)
  }

}
