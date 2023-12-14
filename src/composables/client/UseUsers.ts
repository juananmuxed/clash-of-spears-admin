import { UsersApi } from "src/services/api/UsersApi"
import { useFetch } from "../fetch/UseFetch"
import { t } from "src/plugins/I18n";
import { useFetchPaginated } from "../fetch/UseFetchPaginated";
import { useFetchSelect } from "../fetch/UseFetchSelect";

export const useUsers = () => {
  const usersApi = new UsersApi();

  const getUsers = useFetch(usersApi.getUsers);

  const getUsersSelect = useFetchSelect(usersApi.getUsers, { optionLabel: 'username' })

  const createUser = useFetch(usersApi.createUser,
    { successMessage: t('common.messages.correctlyCreated') },
  );

  const updateUser = useFetch(usersApi.updateUser,
    { successMessage: t('common.messages.correctlyUpdated') },
  );

  const deleteUser = useFetch(usersApi.deleteUser,
    { successMessage: t('common.messages.correctlyDeleted') },
  );

  const getUsersPaginated = useFetchPaginated(usersApi.getUsersPaginated);

  return {
    getUsers,
    getUsersSelect,
    createUser,
    updateUser,
    deleteUser,
    getUsersPaginated,
  }
}
