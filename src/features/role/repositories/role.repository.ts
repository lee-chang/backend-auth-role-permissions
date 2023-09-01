import { RoleRepositoryPort } from './role-reposiory.model'
import { RoleRepositoryMongoDB } from './mongoose/role-mongo.repository'
import { IRole } from '../interfaces/role.interface'
import { PaginateData } from '@/core/interfaces/resPaginate.interface'

export class RoleRepository implements RoleRepositoryPort {
  private roleRepository: RoleRepositoryPort

  constructor() {
    this.roleRepository = new RoleRepositoryMongoDB()
  }

  async findAllRoles(
    page: number,
    limit: number
  ): Promise<PaginateData<IRole>> {
    return await this.roleRepository.findAllRoles(page, limit)
  }

  async findRoleById(id: string): Promise<IRole | null> {
    return await this.roleRepository.findRoleById(id)
  }

  async findRoleByName(name: string): Promise<IRole | null> {
    return await this.roleRepository.findRoleByName(name)
  }

  async createRole(role: IRole) {
    return await this.roleRepository.createRole(role)
  }

  async updateRoleById(id: string, rol: IRole): Promise<IRole | null> {
    return await this.roleRepository.updateRoleById(id, rol)
  }

  async deleteRoleById(id: string): Promise<IRole | null> {
    return await this.roleRepository.deleteRoleById(id)
  }
}
