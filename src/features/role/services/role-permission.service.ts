import { ErrorExt } from '@/core/utils/http.response.util'
import Permission, { KeyPermissions } from '../interfaces/permissions'

import { RoleRepository } from '../repositories/role.repository'
import { HttpStatus } from '@/core/interfaces/httpStatus.interface'

const roleRepository = new RoleRepository()

export class RolePermissionService {
  static isValidPermission(permission: KeyPermissions) {
    const listAllPermissions = Object.keys(Permission)

    const isValid = listAllPermissions.includes(permission)

    return isValid ? true : false
  }

  static async isValidatePermissionByRol(
    id: string,
    permission: Permission
  ): Promise<Boolean> {
    const role = await roleRepository.findRoleById(id)
    if (!role) throw new ErrorExt('ROLE_NOT_EXIST', HttpStatus.BAD_REQUEST)

    // -> Rol.permissions = [ '[key] del permiso'  ]
    // -> permission = 'value del permiso'

    // ** Buscar la key del permiso en el array de permisos del rol

    const { permissions }: { permissions: [KeyPermissions] } = role

    let checking = false

    // ** Si tiene el permissions tiene ALL_PERMISSIONS no se valida el permiso

    console.log('permissions', permissions)

    const hasAllPermissions = permissions.includes('ALL_PERMISSIONS')

    console.log('hasAllPermissions', hasAllPermissions)

    if (hasAllPermissions) return true

    permissions.forEach((p) => {
      if (Permission[p] === permission) checking = true
    })

    return checking ? true : false
  }
}
