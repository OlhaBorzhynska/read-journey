export interface AuthResponse {
  email: string;
  name: string;
  token: string;
  refreshToken: string;
}

export interface CurrentUserResponse extends AuthResponse {
  _id: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RefreshResponse {
  token: string;
  refreshToken: string;
}

export interface LogoutResponse {
  message: string;
}
