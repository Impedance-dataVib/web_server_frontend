import axios from "axios";
import { AUTH_TOKEN_KEY } from "./auth";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

axiosInstance.interceptors.request.use((config: any) => {
  const authToken = sessionStorage.getItem(AUTH_TOKEN_KEY);

  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${authToken}`,
    },
  };
});

export default axiosInstance;
