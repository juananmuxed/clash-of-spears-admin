import axios from "axios";
import { ClientApi } from "src/api/factory/Client";

const axiosApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 60000
});

axiosApi.interceptors.request.use(async (config) => {
  return config;
});

const clientApi = new ClientApi(axiosApi);

export {
  axiosApi,
  clientApi,
}
