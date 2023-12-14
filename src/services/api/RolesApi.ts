import { Role } from "src/models/api/Roles";
import { Pagination } from "src/models/fetch/Pagination";
import { clientApi } from "src/plugins/Axios";

const controller = 'roles'

export class RolesApi {
  async getRoles() {
    return clientApi.getListClient<Role>(controller, '');
  }

  async createRole(role: Role) {
    return clientApi.postClient<Role>(controller, '', role);
  }

  async updateRole(role: Role) {
    return clientApi.putClient<Role>(controller, '', role);
  }

  async deleteRole(role: Role) {
    return clientApi.deleteClient<Role>(controller, '', role);
  }

  async getRolesPaginated(pagination: Pagination) {
    return clientApi.getListPaginatedClient<Role, Pagination>(controller, 'admin', pagination)
  }
}
