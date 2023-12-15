import { UnitsApi } from "src/services/api/UnitsApi"
import { useFetch } from "../fetch/UseFetch"
import { t } from "src/plugins/I18n";
import { useFetchPaginated } from "../fetch/UseFetchPaginated";
import { useFetchSelect } from "../fetch/UseFetchSelect";

export const useUnits = () => {
  const unitsApi = new UnitsApi();

  const getUnits = useFetch(unitsApi.getUnits);

  const getUnitsSelect = useFetchSelect(unitsApi.getUnits, { optionLabel: 'name' });

  const createUnit = useFetch(unitsApi.createUnit,
    { successMessage: t('common.messages.correctlyCreated') },
  );

  const updateUnit = useFetch(unitsApi.updateUnit,
    { successMessage: t('common.messages.correctlyUpdated') },
  );

  const deleteUnit = useFetch(unitsApi.deleteUnit,
    { successMessage: t('common.messages.correctlyDeleted') },
  );

  const getUnitsPaginated = useFetchPaginated(unitsApi.getUnitsPaginated);

  const postUnitsBulk = useFetch(unitsApi.postUnitsBulk);

  return {
    getUnits,
    getUnitsSelect,
    createUnit,
    updateUnit,
    deleteUnit,
    getUnitsPaginated,
    postUnitsBulk,
  }
}
