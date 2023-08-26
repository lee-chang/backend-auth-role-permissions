import { IRole } from '../../interfaces/role.interface'
import { KeyPermissions } from '../../interfaces/permissions'
import { RoleModel } from './role.model'
import { RoleRepositoryPort } from '../role-reposiory.model'

export class RoleRepositoryMongoDB implements RoleRepositoryPort {
  async findAllRoles() {
    const roles = await RoleModel.find()

    if (!roles) {
      return []
    }

    return roles
  }

  async findRoleById(id: string) {
    const role = await RoleModel.findById(id)
    return role
  }

  async findRoleByName(name: string) {
    const role = await RoleModel.findOne({ name: name })
    return role
  }

  async createRole(rol: IRole) {
    const newRole = new RoleModel(rol)
    const roleCreated = await newRole.save()
    return roleCreated
  }

  async updateRoleById(id: string, rol: IRole) {
    const updateRol = await RoleModel.findByIdAndUpdate(id, rol, { new: true })
    return updateRol
  }

  async deleteRoleById(id: string) {
    const deleteRole = await RoleModel.findByIdAndDelete(id)
    return deleteRole
  }

  // static async updatePermissions(id: string, permissions: [KeyPermissions]) {
  //   const role = await findRoleById(id)
  //   if (!role) throw new Error('ROLE_NOT_EXIST')

  //   role.permissions = permissions
  //   const roleUpdated = await role.save()

  //   return roleUpdated
  // }
}
