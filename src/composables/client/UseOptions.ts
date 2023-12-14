import { OptionsApi } from "src/services/api/OptionsApi"
import { useFetch } from "../fetch/UseFetch"
import { t } from "src/plugins/I18n";
import { useFetchPaginated } from "../fetch/UseFetchPaginated";
import { useFetchSelect } from "../fetch/UseFetchSelect";

export const useOptions = () => {
  const optionsApi = new OptionsApi();

  const getOptions = useFetch(optionsApi.getOptions);

  const getOptionsSelect = useFetchSelect(optionsApi.getOptions, { optionLabel: 'name' })

  const createOption = useFetch(optionsApi.createOption,
    { successMessage: t('common.messages.correctlyCreated') },
  );

  const updateOption = useFetch(optionsApi.updateOption,
    { successMessage: t('common.messages.correctlyUpdated') },
  );

  const deleteOption = useFetch(optionsApi.deleteOption,
    { successMessage: t('common.messages.correctlyDeleted') },
  );

  const getOptionsPaginated = useFetchPaginated(optionsApi.getOptionsPaginated);

  const postOptionsBulk = useFetch(optionsApi.postOptionsBulk);

  return {
    getOptions,
    getOptionsSelect,
    createOption,
    updateOption,
    deleteOption,
    getOptionsPaginated,
    postOptionsBulk,
  }
}
