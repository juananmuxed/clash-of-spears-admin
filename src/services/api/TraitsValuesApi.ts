import { TraitValue } from "src/models/api/Traits";
import { Pagination } from "src/models/fetch/Pagination";
import { clientApi } from "src/plugins/Axios";

const controller = 'traits-values'

export class TraitsValuesApi {
  async getTraitsValues() {
    return clientApi.getListClient<TraitValue>(controller, '');
  }

  async createTraitValue(traitValue: TraitValue) {
    return clientApi.postClient<TraitValue>(controller, '', traitValue);
  }

  async updateTraitValue(traitValue: TraitValue) {
    return clientApi.putClient<TraitValue>(controller, '', traitValue);
  }

  async deleteTraitValue(traitValue: TraitValue) {
    return clientApi.deleteClient<TraitValue>(controller, '', traitValue);
  }

  async getTraitsValuesPaginated(pagination: Pagination) {
    return clientApi.getListPaginatedClient<TraitValue, Pagination>(controller, 'admin', pagination)
  }

  async postTraitsValuesBulk(file: File) {
    return clientApi.postMultiPartClient(controller, 'bulk', { file })
  }
}
