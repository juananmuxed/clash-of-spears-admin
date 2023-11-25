import { useFetch } from "../fetch/UseFetch"
import { t } from "src/plugins/I18n";
import { useFetchPaginated } from "../fetch/UseFetchPaginated";
import { useFetchSelect } from "../fetch/UseFetchSelect";
import { TraitsValuesApi } from "src/services/api/TraitsValuesApi";
import { TraitValue } from "src/models/api/Traits";

export const useTraitsValues = () => {
  const optionLabel = (row?: TraitValue): string => {
    if (!row) return '';
    if (row.armor) return row.armor.name;
    if (row.weapon) return row.weapon.name;
    return !row.value ? '' : row.value.toString();
  }
  const traitsApi = new TraitsValuesApi();

  const getTraitsValues = useFetch(traitsApi.getTraitsValues);

  const getTraitsValuesSelect = useFetchSelect(traitsApi.getTraitsValues, { optionLabel })

  const createTraitValue = useFetch(traitsApi.createTraitValue,
    { successMessage: t('common.messages.correctlyCreated') },
  );

  const updateTraitValue = useFetch(traitsApi.updateTraitValue,
    { successMessage: t('common.messages.correctlyUpdated') },
  );

  const deleteTraitValue = useFetch(traitsApi.deleteTraitValue,
    { successMessage: t('common.messages.correctlyDeleted') },
  );

  const getTraitsValuesPaginated = useFetchPaginated(traitsApi.getTraitsValuesPaginated);

  const postTraitsValuesBulk = useFetch(traitsApi.postTraitsValuesBulk);

  return {
    getTraitsValues,
    getTraitsValuesSelect,
    createTraitValue,
    updateTraitValue,
    deleteTraitValue,
    getTraitsValuesPaginated,
    postTraitsValuesBulk,
  }
}
