import axios from "axios";
import { getAccessToken } from "./tokenService";

export const api = axios.create({
  baseURL: "https://readjourney.b.goit.study/api",
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
