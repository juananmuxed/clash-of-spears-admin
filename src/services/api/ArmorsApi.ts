import { Armor } from "src/models/api/Armors";
import { Pagination } from "src/models/fetch/Pagination";
import { clientApi } from "src/plugins/Axios";

const controller = 'armors'

export class ArmorsApi {
  async getArmors() {
    return clientApi.getListClient<Armor>(controller, '');
  }

  async createArmor(armor: Armor) {
    return clientApi.postClient<Armor>(controller, '', armor);
  }

  async updateArmor(armor: Armor) {
    return clientApi.putClient<Armor>(controller, '', armor);
  }

  async deleteArmor(armor: Armor) {
    return clientApi.deleteClient<Armor>(controller, '', armor);
  }

  async getArmorsPaginated(pagination: Pagination) {
    return clientApi.getListPaginatedClient<Armor, Pagination>(controller, 'admin', pagination)
  }

  async postArmorsBulk(file: File) {
    return clientApi.postMultiPartClient(controller, 'bulk', { file })
  }
}
