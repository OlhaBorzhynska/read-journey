import { api } from "./api";
import { saveTokens, clearTokens } from "./tokenService";

import type {
  AuthResponse,
  CurrentUserResponse,
  LoginRequest,
  LogoutResponse,
  //   RefreshResponse,
  RegisterRequest,
} from "../types/auth";

export const registerUser = async (
  credentials: RegisterRequest,
): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>("/users/signup", credentials);

  saveTokens(data.token, data.refreshToken);

  return data;
};

export const loginUser = async (
  credentials: LoginRequest,
): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>("/users/signin", credentials);

  saveTokens(data.token, data.refreshToken);

  return data;
};

export const getCurrentUser = async (): Promise<CurrentUserResponse> => {
  const { data } = await api.get<CurrentUserResponse>("/users/current");

  return data;
};

// export const refreshUser = async (): Promise<RefreshResponse> => {
//   const { data } = await api.get<RefreshResponse>("/users/current/refresh");

//   saveTokens(data.token, data.refreshToken);

//   return data;
// };

export const logoutUser = async (): Promise<LogoutResponse> => {
  try {
    const { data } = await api.post<LogoutResponse>("/users/signout");

    return data;
  } finally {
    clearTokens();
  }
};
