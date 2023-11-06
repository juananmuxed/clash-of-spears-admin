import axios from "axios";
import { ClientApi } from "src/api/factory/Client";
import { useUserStore } from "src/stores/UseUserStore";

const axiosApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 60000
});

const controllersWithoutAuth = ['auth'];

axiosApi.interceptors.request.use(async (config) => {
  const controller = config.url?.split('/')[0];
  if (controller && controllersWithoutAuth.includes(controller)) return config;
  const user = useUserStore();
  if (!user.validToken) await user.refreshTokenHandler();
  if (config.headers && user.token) config.headers.Authorization = `Bearer ${user.token.token}`;
  return config;
});

const clientApi = new ClientApi(axiosApi);

export {
  axiosApi,
  clientApi,
}
