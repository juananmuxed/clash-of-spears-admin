import { WeaponsApi } from "src/services/api/WeaponsApi"
import { useFetch } from "../fetch/UseFetch"
import { Weapon } from "src/models/api/Weapons";
import { t } from "src/plugins/I18n";
import { useFetchPaginated } from "../fetch/UseFetchPaginated";

export const useWeapons = () => {
  const weaponsApi = new WeaponsApi();

  const getWeapons = useFetch(weaponsApi.getWeapons);

  const createWeapon = useFetch(
    async (weapon: Weapon) => weaponsApi.createWeapon(weapon),
    { successMessage: t('common.messages.correctlyCreated') },
  );

  const updateWeapon = useFetch(
    async (weapon: Weapon) => weaponsApi.updateWeapon(weapon),
    { successMessage: t('common.messages.correctlyUpdated') },
  );

  const deleteWeapon = useFetch(
    async (weapon: Weapon) => weaponsApi.deleteWeapon(weapon),
    { successMessage: t('common.messages.correctlyDeleted') },
  );

  const getWeaponsPaginated = useFetchPaginated(weaponsApi.getWeaponsPaginated)

  return {
    getWeapons,
    createWeapon,
    updateWeapon,
    deleteWeapon,
    getWeaponsPaginated,
  }
}
