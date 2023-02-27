import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { CLEAR_CACHE, RootState } from "../../app/store";
import { HttpError, User } from "../../types";
import { fetchSessionUser, login, logout } from "./sessionAPI";

export interface SessionState {
  value: User | null;
  loading: boolean;
  isLoggingIn: boolean;
  isLoggingOut: boolean;
}

const initialState: SessionState = {
  value: null,
  loading: false,
  isLoggingIn: false,
  isLoggingOut: false,
};

export const loginAsync = createAsyncThunk(
  "login",
  async (credentials: { login: string; password: string }) => {
    try {
      return await login(credentials);
    } catch (err) {
      if (err instanceof HttpError) toast.error(err.message);
      throw err;
    }
  }
);

export const logoutAsync = createAsyncThunk(
  "logout",
  async (arg1, { dispatch }) => {
    try {
      await logout();
      dispatch({ type: CLEAR_CACHE });
    } catch (err) {
      if (err instanceof HttpError && err.status === 401)
        dispatch({ type: CLEAR_CACHE });
      else if (err instanceof HttpError) toast.error(err.message);
      throw err;
    }
  }
);

export const fetchSessionUserAsync = createAsyncThunk(
  "fetchSessionUser",
  async (arg1, { signal, dispatch }) => {
    try {
      return await fetchSessionUser(signal);
    } catch (err) {
      if (err instanceof HttpError && err.status === 401)
        dispatch({ type: CLEAR_CACHE });
      else if (err instanceof HttpError) toast.error(err.message);
      throw err;
    }
  }
);

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSessionUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSessionUserAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.value = payload;
      })
      .addCase(fetchSessionUserAsync.rejected, (state, { meta }) => {
        if (meta.aborted) return;
        state.loading = false;
      })
      .addCase(loginAsync.fulfilled, (state, { payload }) => {
        state.value = payload;
      });
  },
});

export const selectSession = (state: RootState) => state.session.value;
export const selectSessionStatus = (state: RootState) => state.session.loading;

export default sessionSlice.reducer;
