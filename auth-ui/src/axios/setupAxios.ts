import { AxiosInstance } from "axios";

import { Store } from "../store";

export const setupAxios = (axios: AxiosInstance, store: Store) => {
  axios.interceptors.request.use(
    async (config: any) => {
      const { auth } = store.getState();
      config.headers.Authorization = `Bearer ${auth.accessToken}`;
      return config;
    },
    (err: any) => Promise.reject(err)
  );
};
