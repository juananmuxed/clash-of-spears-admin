import { Army } from "src/models/api/Armies";
import { Pagination } from "src/models/fetch/Pagination";
import { clientApi } from "src/plugins/Axios";

const controller = 'armies'

export class ArmiesApi {
  async getArmies() {
    return clientApi.getListClient<Army>(controller, '');
  }

  async createArmy(weapon: Army) {
    return clientApi.postClient<Army>(controller, '', weapon);
  }

  async updateArmy(weapon: Army) {
    return clientApi.putClient<Army>(controller, '', weapon);
  }

  async deleteArmy(weapon: Army) {
    return clientApi.deleteClient<Army>(controller, '', weapon);
  }

  async getArmiesPaginated(pagination: Pagination) {
    return clientApi.getListPaginatedClient<Army, Pagination>(controller, 'admin', pagination);
  }

  async postArmiesBulk(file: File) {
    return clientApi.postMultiPartClient(controller, 'bulk', { file })
  }
}
