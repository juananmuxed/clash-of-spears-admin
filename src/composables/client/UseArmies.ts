import { ArmiesApi } from "src/services/api/ArmiesApi"
import { useFetch } from "../fetch/UseFetch"
import { t } from "src/plugins/I18n";
import { useFetchPaginated } from "../fetch/UseFetchPaginated";
import { useFetchSelect } from "../fetch/UseFetchSelect";

export const useArmies = () => {
  const weaponsApi = new ArmiesApi();

  const getArmies = useFetch(weaponsApi.getArmies);

  const getArmiesSelect = useFetchSelect(weaponsApi.getArmies, { optionLabel: 'name' });

  const createArmy = useFetch(weaponsApi.createArmy,
    { successMessage: t('common.messages.correctlyCreated') },
  );

  const updateArmy = useFetch(weaponsApi.updateArmy,
    { successMessage: t('common.messages.correctlyUpdated') },
  );

  const deleteArmy = useFetch(weaponsApi.deleteArmy,
    { successMessage: t('common.messages.correctlyDeleted') },
  );

  const getArmiesPaginated = useFetchPaginated(weaponsApi.getArmiesPaginated);

  const postArmiesBulk = useFetch(weaponsApi.postArmiesBulk);

  return {
    getArmies,
    getArmiesSelect,
    createArmy,
    updateArmy,
    deleteArmy,
    getArmiesPaginated,
    postArmiesBulk,
  }
}
