import axios from "axios";
import { store } from "@redux/store"; // Import your Redux store
import { updateToken } from "@redux/userReducers";

export const BASE_URL = import.meta.env.VITE_APP_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = store.getState().rootReducer.userReducer.access_token;
  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error?.response?.data?.statusCode === 401 &&
      window.location.pathname !== "/signin"
    ) {
      originalRequest._retry = true;
      const refresh = store.getState().rootReducer.userReducer.refresh_token;
      const config = {
        headers: {
          Authorization: `Bearer ${refresh}`,
        },
      };
      try {
        const response = await axios.post(
          `${BASE_URL}/auth/refresh`,
          {},
          config,
        );
        const { access_token } = response?.data ?? "";
        store.dispatch(updateToken(access_token));
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return axios(originalRequest);
      } catch (error) {}
    }
    return Promise.reject(error);
  },
);

export default api;
