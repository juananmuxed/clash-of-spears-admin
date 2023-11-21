import { Expansion } from "src/models/api/Expansions";
import { Pagination } from "src/models/fetch/Pagination";
import { clientApi } from "src/plugins/Axios";

const controller = 'expansions'

export class ExpansionsApi {
  async getExpansions() {
    return clientApi.getListClient<Expansion>(controller, '');
  }

  async createExpansion(expansion: Expansion) {
    return clientApi.postClient<Expansion>(controller, '', expansion);
  }

  async updateExpansion(expansion: Expansion) {
    return clientApi.putClient<Expansion>(controller, '', expansion);
  }

  async deleteExpansion(expansion: Expansion) {
    return clientApi.deleteClient<Expansion>(controller, '', expansion);
  }

  async getExpansionsPaginated(pagination: Pagination) {
    return clientApi.getListPaginatedClient<Expansion, Pagination>(controller, 'admin', pagination)
  }

  async postExpansionsBulk(file: File) {
    return clientApi.postMultiPartClient(controller, 'bulk', { file })
  }
}
