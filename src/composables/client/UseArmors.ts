import { ArmorsApi } from "src/services/api/ArmorsApi"
import { useFetch } from "../fetch/UseFetch"
import { t } from "src/plugins/I18n";
import { useFetchPaginated } from "../fetch/UseFetchPaginated";
import { useFetchSelect } from "../fetch/UseFetchSelect";

export const useArmors = () => {
  const armorsApi = new ArmorsApi();

  const getArmors = useFetch(armorsApi.getArmors);

  const getArmorsSelect = useFetchSelect(armorsApi.getArmors, { optionLabel: 'name' })

  const createArmor = useFetch(armorsApi.createArmor,
    { successMessage: t('common.messages.correctlyCreated') },
  );

  const updateArmor = useFetch(armorsApi.updateArmor,
    { successMessage: t('common.messages.correctlyUpdated') },
  );

  const deleteArmor = useFetch(armorsApi.deleteArmor,
    { successMessage: t('common.messages.correctlyDeleted') },
  );

  const getArmorsPaginated = useFetchPaginated(armorsApi.getArmorsPaginated);

  const postArmorsBulk = useFetch(armorsApi.postArmorsBulk);

  return {
    getArmors,
    getArmorsSelect,
    createArmor,
    updateArmor,
    deleteArmor,
    getArmorsPaginated,
    postArmorsBulk,
  }
}
