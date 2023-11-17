import { Weapon, WeaponType } from "src/models/api/Weapons";
import { Pagination } from "src/models/fetch/Pagination";
import { clientApi } from "src/plugins/Axios";

const controller = 'weapons'

export class WeaponsApi {
  async getWeapons() {
    return clientApi.getListClient<Weapon>(controller, '');
  }

  async createWeapon(weapon: Weapon) {
    return clientApi.postClient<Weapon>(controller, '', weapon);
  }

  async updateWeapon(weapon: Weapon) {
    return clientApi.putClient<Weapon>(controller, '', weapon);
  }

  async deleteWeapon(weapon: Weapon) {
    return clientApi.deleteClient<Weapon>(controller, '', weapon);
  }

  async getWeaponsPaginated(pagination: Pagination) {
    return clientApi.getListPaginatedClient<Weapon, Pagination>(controller, 'admin', pagination);
  }

  async getWeaponTypes() {
    return clientApi.getListClient<WeaponType>(controller, 'types');
  }
}
