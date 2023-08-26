import { KeyPermissions } from '@/features/role/interfaces/permissions'
import { IUser } from '../interfaces/user.interface'
import { UserRepository } from '../repositories/user.repository'
import { RoleRepository } from '@/features/role/repositories/role.repository'

import { notUndefinedOrNull } from '@/core/service/exceptions/data-not-received.exception' 
import { ErrorExt } from '@/core/utils/http.response.util'
import { HttpStatus } from '@/core/interfaces/httpStatus.interface'



const userRepository = new UserRepository()
const roleRepository = new RoleRepository()

export class UserRoleService {
  static async updateUserRolesById(id: string, roles: [string]): Promise<IUser> {

    // Validar si el usuario existe
    const findUser = await userRepository.findUserById(id)
    const user = notUndefinedOrNull(findUser)

    const { authority: oldRoles } = user


    // Validar si los roles existen

    const invalidRoles = await Promise.all(
      roles.map(async (id) => {
        const roleFound = await roleRepository.findRoleById(id)
        return roleFound ? null : id
      })
    )

    if (invalidRoles.some((role) => role !== null)) {
      throw new ErrorExt(`The roles ${invalidRoles.join(', ')} are invalid`, HttpStatus.BAD_REQUEST)
    }

    if (JSON.stringify(roles) === JSON.stringify(oldRoles)) {
      throw new ErrorExt('The roles are the same', HttpStatus.BAD_REQUEST)
    }

    const newRoleList: [string] = [...oldRoles]

    const someNewRoles = roles.filter((r) => !oldRoles.includes(r))

    await Promise.all(
      someNewRoles.map(async (idRole) => {
        await UtilsService.addUserInRol(user._id, idRole)
        newRoleList.push(idRole)
      })
    )

    const someRemovedRoles = oldRoles.filter((r) => !roles.includes(r))

    await Promise.all(
      someRemovedRoles.map(async (idRole) => {
        await UtilsService.removeUserInRol(user._id, idRole)
        const index = newRoleList.indexOf(idRole)
        if (index !== -1) {
          newRoleList.splice(index, 1)
        }
      })
    )

    console.log('isNewRole', someNewRoles)
    console.log('isDeleteRole', someRemovedRoles)

    user.authority = newRoleList

    const updatedUser = await userRepository.updateUserById(id, user)
    return notUndefinedOrNull(updatedUser)
  }
}



// ** UTILS

class UtilsService {
  static async addUserInRol(idUser: string, idRole: string) {
    const role = await roleRepository.findRoleById(idRole)

    if (!role) throw new ErrorExt('ROLE_NOT_EXIST', HttpStatus.BAD_REQUEST)

    // ** Validar que el usuario no este duplicado en el array de usuarios del rol

    const { users } = role

    let isDuplicatedUser = false

    users.forEach((u) => {
      if (u === idUser) isDuplicatedUser = true
    })

    if (!isDuplicatedUser) {
      role.users.push(idUser)

      const updateRole = await roleRepository.updateRoleById(idRole, role)
      return updateRole
    }

    return role
  }

  static async removeUserInRol(idUser: string, idRole: string) {
    const role = await roleRepository.findRoleById(idRole)

    if (!role) throw new ErrorExt('ROLE_NOT_EXIST', HttpStatus.BAD_REQUEST)

    const { users } = role

    const index = users.indexOf(idUser)

    if (index > -1) {
      users.splice(index, 1)
    }

    const updateRole = await roleRepository.updateRoleById(idRole, role)
    return updateRole
  }
}
