import { AuthApi } from "src/services/api/AuthApi"
import { useFetch } from "../fetch/UseFetch"
import { t } from "src/plugins/I18n";

export const useAuth = () => {
  const authApi = new AuthApi()

  const login = useFetch(authApi.login, { errorMessage: t('errors.invalidUserPassword') });

  const signup = useFetch(authApi.signup);

  const refreshToken = useFetch(authApi.refreshToken);

  return {
    login,
    signup,
    refreshToken,
  }
}
