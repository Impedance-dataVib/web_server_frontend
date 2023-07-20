import axios from "axios";
import { AUTH_TOKEN_KEY, REFRESH_TOKEN_KEY } from "./auth";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

axiosInstance.interceptors.request.use((config: any) => {
  const authToken = sessionStorage.getItem(AUTH_TOKEN_KEY);

  return {
    ...config,
    timeout: 400000,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${authToken}`,
    },
  };
});

axiosInstance.interceptors.response.use(
  (response: any) => {
    return response;
  },
  async (error) => {
    const originalConfig = error.config;
    if (error.response) {
      if (
        error.response.status === 401 &&
        !originalConfig._retry &&
        originalConfig.url !== "/auth/refreshToken.php"
      ) {
        originalConfig._retry = true;
        const data = {
          token: sessionStorage.getItem(REFRESH_TOKEN_KEY),
        };
        try {
          const refreshToken = await axiosInstance.post(
            "/auth/refreshToken.php",
            data
          );

          sessionStorage.setItem(
            AUTH_TOKEN_KEY,
            refreshToken?.data.token || ""
          );
          return axiosInstance(originalConfig);
        } catch (error) {
          console.error("error", error, originalConfig);
        }
        // Do something, call refreshToken() request for example;
        // return a request
        return axiosInstance(originalConfig);
      } else if (
        error.response.status === 401 &&
        originalConfig.url === "/auth/refreshToken.php"
      ) {
        window.location.replace("/logout");
      }

      // Do something
      return Promise.reject(error.response.data);
    }

    return Promise.reject(error);
  }
);
export default axiosInstance;
