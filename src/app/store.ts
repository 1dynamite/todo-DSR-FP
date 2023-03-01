import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
  AnyAction,
} from "@reduxjs/toolkit";
import sessionReducer from "../features/session/sessionSlice";
import todosReducer from "../features/todos/todosSlice";
import usersReducer from "../features/users/usersSlice";

const appReducer = combineReducers({
  session: sessionReducer,
  todos: todosReducer,
  users: usersReducer,
});

export function clearCache() {
  return { type: "CLEAR_CACHE" };
}

// clear cache when logging out
const rootReducer = (
  state: ReturnType<typeof appReducer> | undefined,
  action: AnyAction
) => {
  if (action.type === clearCache().type) {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
