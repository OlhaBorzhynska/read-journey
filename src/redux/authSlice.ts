import type { User } from "../types/auth";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { getAccessToken, clearTokens } from "../services/tokenService";
import { getCurrentUser, logoutUser } from "../services/authService";
import axios from "axios";

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  isRefreshing: true,
};

export const refreshUser = createAsyncThunk(
  "auth/refreshUser",
  async (_, thunkAPI) => {
    const accessToken = getAccessToken();

    if (!accessToken) {
      return thunkAPI.rejectWithValue("No access token");
    }

    try {
      const user = await getCurrentUser();

      return {
        _id: user._id,
        name: user.name,
        email: user.email,
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        clearTokens();
      }

      return thunkAPI.rejectWithValue("Unable to fetch current user");
    }
  },
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await logoutUser();
  } catch {
    return thunkAPI.rejectWithValue("Unable to log out");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },

    clearUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.user = null;
        state.isLoggedIn = false;
        state.isRefreshing = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isLoggedIn = false;
        state.isRefreshing = false;
      })
      .addCase(logout.rejected, (state) => {
        state.user = null;
        state.isLoggedIn = false;
        state.isRefreshing = false;
      });
  },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
