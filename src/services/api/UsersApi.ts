import { User } from "src/models/api/Users";
import { Pagination } from "src/models/fetch/Pagination";
import { clientApi } from "src/plugins/Axios";

const controller = 'users'

export class UsersApi {
  async getUsers() {
    return clientApi.getListClient<User>(controller, '');
  }

  async createUser(user: User) {
    return clientApi.postClient<User>(controller, '', user);
  }

  async updateUser(user: User) {
    return clientApi.putClient<User>(controller, '', user);
  }

  async deleteUser(user: User) {
    return clientApi.deleteClient<User>(controller, '', user);
  }

  async getUsersPaginated(pagination: Pagination) {
    return clientApi.getListPaginatedClient<User, Pagination>(controller, 'admin', pagination)
  }
}
