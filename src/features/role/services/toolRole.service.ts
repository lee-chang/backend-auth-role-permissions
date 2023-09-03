import { notUndefinedOrNull } from "@/core/service/exceptions/data-not-received.exception";
import { RoleRepository } from "../repositories/role.repository";
import { ErrorExt } from "@/core/utils/http.response.util";

const roleRepository = new RoleRepository();

export class ToolRoleService {
  static async nameRoleByIdOfArray(ids: string[]) {
    const names = ids.map(async (id) => {
      const role = await roleRepository.findRoleById(id);
      notUndefinedOrNull(role);

      if (! role) throw new ErrorExt("Role not found");

      return role.name;
    })

    return await Promise.all(names);
  }
}
