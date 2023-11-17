import { WeaponsApi } from "src/services/api/WeaponsApi"
import { useFetch } from "../fetch/UseFetch"
import { t } from "src/plugins/I18n";
import { useFetchPaginated } from "../fetch/UseFetchPaginated";

export const useWeapons = () => {
  const weaponsApi = new WeaponsApi();

  const getWeapons = useFetch(weaponsApi.getWeapons);

  const createWeapon = useFetch(weaponsApi.createWeapon,
    { successMessage: t('common.messages.correctlyCreated') },
  );

  const updateWeapon = useFetch(weaponsApi.updateWeapon,
    { successMessage: t('common.messages.correctlyUpdated') },
  );

  const deleteWeapon = useFetch(weaponsApi.deleteWeapon,
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
