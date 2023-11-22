import { Trait } from "src/models/api/Traits";
import { Pagination } from "src/models/fetch/Pagination";
import { clientApi } from "src/plugins/Axios";

const controller = 'traits'

export class TraitsApi {
  async getTraits() {
    return clientApi.getListClient<Trait>(controller, '');
  }

  async createTrait(trait: Trait) {
    return clientApi.postClient<Trait>(controller, '', trait);
  }

  async updateTrait(trait: Trait) {
    return clientApi.putClient<Trait>(controller, '', trait);
  }

  async deleteTrait(trait: Trait) {
    return clientApi.deleteClient<Trait>(controller, '', trait);
  }

  async getTraitsPaginated(pagination: Pagination) {
    return clientApi.getListPaginatedClient<Trait, Pagination>(controller, 'admin', pagination)
  }

  async postTraitsBulk(file: File) {
    return clientApi.postMultiPartClient(controller, 'bulk', { file })
  }
}
