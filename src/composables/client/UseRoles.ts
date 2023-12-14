import { RolesApi } from "src/services/api/RolesApi"
import { useFetch } from "../fetch/UseFetch"
import { t } from "src/plugins/I18n";
import { useFetchPaginated } from "../fetch/UseFetchPaginated";
import { useFetchSelect } from "../fetch/UseFetchSelect";

export const useRoles = () => {
  const rolesApi = new RolesApi();

  const getRoles = useFetch(rolesApi.getRoles);

  const getRolesSelect = useFetchSelect(rolesApi.getRoles, { optionLabel: 'name' })

  const createRole = useFetch(rolesApi.createRole,
    { successMessage: t('common.messages.correctlyCreated') },
  );

  const updateRole = useFetch(rolesApi.updateRole,
    { successMessage: t('common.messages.correctlyUpdated') },
  );

  const deleteRole = useFetch(rolesApi.deleteRole,
    { successMessage: t('common.messages.correctlyDeleted') },
  );

  const getRolesPaginated = useFetchPaginated(rolesApi.getRolesPaginated);

  return {
    getRoles,
    getRolesSelect,
    createRole,
    updateRole,
    deleteRole,
    getRolesPaginated,
  }
}
