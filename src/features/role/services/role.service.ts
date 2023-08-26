import { HttpStatus } from '@/core/interfaces/httpStatus.interface'
import { IRole } from '../interfaces/role.interface'
import { RoleRepository } from '../repositories/role.repository'
import { notUndefinedOrNull } from '@/core/service/exceptions/data-not-received.exception'
import { ErrorExt } from '@/core/utils/http.response.util'
import { KeyPermissions } from '../interfaces/permissions'

const roleRepository = new RoleRepository()

export class RoleSevice {
  // ** CRUD

  static async findAllRoles() {
    const roles = await roleRepository.findAllRoles()
    return notUndefinedOrNull(roles)
  }

  static async findRoleById(id: string) {
    const role = await roleRepository.findRoleById(id)
    return notUndefinedOrNull(role)
  }

  static async updateRoleById(id: string, role: IRole) {
    const roleUpdated = await roleRepository.updateRoleById(id, role)
    return notUndefinedOrNull(roleUpdated)
  }

  static async deleteRoleById(id: string) {
    const roleDeleted = await roleRepository.deleteRoleById(id)
    return notUndefinedOrNull(roleDeleted)
  }

  static async createRole(role: IRole) {
    const roleCreated = await roleRepository.createRole(role)
    return notUndefinedOrNull(roleCreated)
  }

  static async updatePermissionsByRoleId(
    id: string,
    permissions: [KeyPermissions]
  ) {
    const role = await roleRepository.findRoleById(id)
    if (!role) throw new ErrorExt('ROLE_NOT_EXIST', HttpStatus.BAD_REQUEST)

    role.permissions = permissions

    const roleUpdated = await roleRepository.updateRoleById(id, role)

    return roleUpdated
  }
}
