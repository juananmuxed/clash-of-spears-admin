import { TraitsApi } from "src/services/api/TraitsApi"
import { useFetch } from "../fetch/UseFetch"
import { t } from "src/plugins/I18n";
import { useFetchPaginated } from "../fetch/UseFetchPaginated";
import { useFetchSelect } from "../fetch/UseFetchSelect";

export const useTraits = () => {
  const traitsApi = new TraitsApi();

  const getTraits = useFetch(traitsApi.getTraits);

  const getTraitsSelect = useFetchSelect(traitsApi.getTraits, { optionLabel: 'name' })

  const createTrait = useFetch(traitsApi.createTrait,
    { successMessage: t('common.messages.correctlyCreated') },
  );

  const updateTrait = useFetch(traitsApi.updateTrait,
    { successMessage: t('common.messages.correctlyUpdated') },
  );

  const deleteTrait = useFetch(traitsApi.deleteTrait,
    { successMessage: t('common.messages.correctlyDeleted') },
  );

  const getTraitsPaginated = useFetchPaginated(traitsApi.getTraitsPaginated);

  const postTraitsBulk = useFetch(traitsApi.postTraitsBulk);

  return {
    getTraits,
    getTraitsSelect,
    createTrait,
    updateTrait,
    deleteTrait,
    getTraitsPaginated,
    postTraitsBulk,
  }
}
