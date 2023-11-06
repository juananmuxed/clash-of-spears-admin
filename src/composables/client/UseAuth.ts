import { AuthApi } from "src/services/api/AuthApi"
import { useFetch } from "../fetch/UseFetch"

export const useAuth = () => {
  const authApi = new AuthApi()

  const login = useFetch(authApi.login);

  const signup = useFetch(authApi.signup);

  const refreshToken = useFetch(authApi.refreshToken);

  return {
    login,
    signup,
    refreshToken,
  }
}
