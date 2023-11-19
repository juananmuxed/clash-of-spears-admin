import { WeaponsApi } from "src/services/api/WeaponsApi"
import { useFetch } from "../fetch/UseFetch"
import { t } from "src/plugins/I18n";
import { useFetchPaginated } from "../fetch/UseFetchPaginated";
import { useFetchSelect } from "../fetch/UseFetchSelect";

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

  const getWeaponsPaginated = useFetchPaginated(weaponsApi.getWeaponsPaginated);

  const getWeaponTypesSelect = useFetchSelect(weaponsApi.getWeaponTypes, { optionLabel: 'name' });

  const postWeaponsBulk = useFetch(weaponsApi.postWeaponsBulk);

  return {
    getWeapons,
    createWeapon,
    updateWeapon,
    deleteWeapon,
    getWeaponsPaginated,
    getWeaponTypesSelect,
    postWeaponsBulk,
  }
}
