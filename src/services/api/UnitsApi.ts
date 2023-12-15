import { Unit } from "src/models/api/Units";
import { Pagination } from "src/models/fetch/Pagination";
import { clientApi } from "src/plugins/Axios";

const controller = 'units'

export class UnitsApi {
  async getUnits() {
    return clientApi.getListClient<Unit>(controller, '');
  }

  async createUnit(unit: Unit) {
    return clientApi.postClient<Unit>(controller, '', unit);
  }

  async updateUnit(unit: Unit) {
    return clientApi.putClient<Unit>(controller, '', unit);
  }

  async deleteUnit(unit: Unit) {
    return clientApi.deleteClient<Unit>(controller, '', unit);
  }

  async getUnitsPaginated(pagination: Pagination) {
    return clientApi.getListPaginatedClient<Unit, Pagination>(controller, 'admin', pagination)
  }

  async postUnitsBulk(file: File) {
    return clientApi.postMultiPartClient(controller, 'bulk', { file })
  }
}
