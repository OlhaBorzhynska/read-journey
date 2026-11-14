import axios, { type InternalAxiosRequestConfig } from "axios";
import {
  getAccessToken,
  getRefreshToken,
  saveTokens,
  clearTokens,
} from "./tokenService";
import type { RefreshResponse } from "../types/auth";

const BASE_URL = "https://readjourney.b.goit.study/api";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

interface RetryConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let refreshPromise: Promise<string> | null = null;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as RetryConfig | undefined;

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      originalRequest.url?.includes("/users/current/refresh")
    ) {
      return Promise.reject(error);
    }

    const refreshToken = getRefreshToken();

    const handleAuthFailure = () => {
      clearTokens();
      window.dispatchEvent(new Event("auth:logout"));
    };

    if (!refreshToken) {
      handleAuthFailure();

      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      if (!refreshPromise) {
        refreshPromise = axios
          .get<RefreshResponse>(`${BASE_URL}/users/current/refresh`, {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          })
          .then(({ data }) => {
            saveTokens(data.token, data.refreshToken);
            return data.token;
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      const newAccessToken = await refreshPromise;

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return api(originalRequest);
    } catch (refreshError) {
      handleAuthFailure();

      return Promise.reject(refreshError);
    }
  },
);
