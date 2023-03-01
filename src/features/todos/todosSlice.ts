import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { clearCache, RootState } from "../../app/store";
import { HttpError, Todo } from "../../types";
import { addTodo, deleteTodo, editTodo, fetchTodos } from "./todosAPI";

export interface TodosState {
  value: Todo[];
  loading: boolean;
}

const initialState: TodosState = {
  value: [],
  loading: false,
};

export const fetchTodosAsync = createAsyncThunk(
  "fetchTodos",
  async (arg1, { signal, dispatch }) => {
    try {
      return await fetchTodos(signal);
    } catch (err) {
      if (err instanceof HttpError && err.status === 401)
        dispatch(clearCache());
      else if (err instanceof HttpError) toast.error(err.message);
      throw err;
    }
  }
);

export const addTodoAsync = createAsyncThunk(
  "addTodo",
  async (data: { title: string; description: string }, { dispatch }) => {
    try {
      return await addTodo(data);
    } catch (err) {
      if (err instanceof HttpError && err.status === 401)
        dispatch(clearCache());
      else if (err instanceof HttpError) toast.error(err.message);
      throw err;
    }
  }
);

export const deleteTodoAsync = createAsyncThunk(
  "deleteTodo",
  async (id: number, { dispatch }) => {
    try {
      await deleteTodo(id);
      return id;
    } catch (err) {
      if (err instanceof HttpError && err.status === 401)
        dispatch(clearCache());
      else if (err instanceof HttpError) toast.error(err.message);
      throw err;
    }
  }
);

export const editTodoAsync = createAsyncThunk(
  "editTodo",
  async (
    arg: {
      id: number;
      data: {
        title: string;
        description: string;
      };
    },
    { dispatch }
  ) => {
    try {
      await editTodo(arg.id, arg.data);
      return arg;
    } catch (err) {
      if (err instanceof HttpError && err.status === 401)
        dispatch(clearCache());
      else if (err instanceof HttpError) toast.error(err.message);
      throw err;
    }
  }
);

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodosAsync.pending, (state) => {
        if (state.value.length === 0) state.loading = true;
      })
      .addCase(fetchTodosAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.value = payload;
      })
      .addCase(fetchTodosAsync.rejected, (state, { meta }) => {
        if (meta.aborted) return;
        state.loading = false;
      })
      .addCase(addTodoAsync.fulfilled, (state, { payload }) => {
        state.value.push(payload);
      })
      .addCase(editTodoAsync.fulfilled, (state, { payload }) => {
        state.value = state.value.map((t) =>
          t.id === payload.id ? { ...t, ...payload.data } : t
        );
      })
      .addCase(deleteTodoAsync.fulfilled, (state, { payload }) => {
        state.value = state.value.filter((t) => t.id !== payload);
      });
  },
});

export const selectTodos = (state: RootState) => state.todos.value;
export const selectTodosStatus = (state: RootState) => state.todos.loading;

export default todosSlice.reducer;
