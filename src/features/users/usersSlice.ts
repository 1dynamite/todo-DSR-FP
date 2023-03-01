import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { clearCache, RootState } from "../../app/store";
import { HttpError, User } from "../../types";
import { fetchUsers } from "./usersAPI";

export interface UsersState {
  value: User[];
  loading: boolean;
}

const initialState: UsersState = {
  value: [],
  loading: false,
};

export const fetchUsersAsync = createAsyncThunk(
  "fetchUsers",
  async (arg1, { signal, dispatch }) => {
    try {
      return await fetchUsers(signal);
    } catch (err) {
      if (err instanceof HttpError && err.status === 401)
        dispatch(clearCache());
      else if (err instanceof HttpError) toast.error(err.message);
      throw err;
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsersAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.value = payload;
      })
      .addCase(fetchUsersAsync.rejected, (state, { meta }) => {
        if (meta.aborted) return;
        state.loading = false;
      });
  },
});

export const selectUsers = (state: RootState) => state.users.value;
export const selectUsersStatus = (state: RootState) => state.users.loading;

export default usersSlice.reducer;
