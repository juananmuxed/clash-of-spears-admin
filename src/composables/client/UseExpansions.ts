import { ExpansionsApi } from "src/services/api/ExpansionsApi"
import { useFetch } from "../fetch/UseFetch"
import { t } from "src/plugins/I18n";
import { useFetchPaginated } from "../fetch/UseFetchPaginated";
import { useFetchSelect } from "../fetch/UseFetchSelect";

export const useExpansions = () => {
  const expansionsApi = new ExpansionsApi();

  const getExpansions = useFetch(expansionsApi.getExpansions);

  const getExpansionsSelect = useFetchSelect(expansionsApi.getExpansions, { optionLabel: 'book' })

  const createExpansion = useFetch(expansionsApi.createExpansion,
    { successMessage: t('common.messages.correctlyCreated') },
  );

  const updateExpansion = useFetch(expansionsApi.updateExpansion,
    { successMessage: t('common.messages.correctlyUpdated') },
  );

  const deleteExpansion = useFetch(expansionsApi.deleteExpansion,
    { successMessage: t('common.messages.correctlyDeleted') },
  );

  const getExpansionsPaginated = useFetchPaginated(expansionsApi.getExpansionsPaginated);

  const postExpansionsBulk = useFetch(expansionsApi.postExpansionsBulk);

  return {
    getExpansions,
    getExpansionsSelect,
    createExpansion,
    updateExpansion,
    deleteExpansion,
    getExpansionsPaginated,
    postExpansionsBulk,
  }
}
