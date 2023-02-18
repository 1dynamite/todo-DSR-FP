import useSWR from "swr";
import { HttpError, Todo, User } from "../types";

const BASE_URL = "http://localhost:3000/api/v1/";

const ERR_MSG = "Something went wrong. Try refreshing the page";

export async function login(body: { login: string; password: string }) {
  try {
    var res = await fetch(`${BASE_URL}login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    });
  } catch (err) {
    throw new HttpError(ERR_MSG, { cause: err });
  }

  if (res.ok) return await res.json();

  if (res.status === 400) {
    const data = await res.json();
    throw new HttpError(data.message);
  }

  throw new HttpError(ERR_MSG, { cause: res });
}

export async function logout() {
  try {
    var res = await fetch(`${BASE_URL}logout`, {
      method: "POST",
      credentials: "include",
    });
  } catch (err) {
    throw new HttpError(ERR_MSG, { cause: err });
  }

  if (res.ok) return;

  throw new HttpError(ERR_MSG, { cause: res, status: res.status });
}

export async function addTodo(body: { title: string; description: string }) {
  try {
    var res = await fetch(`${BASE_URL}todos`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (err) {
    throw new HttpError(ERR_MSG, { cause: err });
  }

  if (res.ok) return await res.json();

  if (res.status === 400) {
    const data = await res.json();
    throw new HttpError(data.message);
  }

  throw new HttpError(ERR_MSG, { cause: res, status: res.status });
}

export async function deleteTodo(id: string) {
  try {
    var res = await fetch(`${BASE_URL}todos/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
  } catch (err) {
    throw new HttpError(ERR_MSG, { cause: err });
  }

  if (res.ok) return;

  throw new HttpError(ERR_MSG, { cause: res, status: res.status });
}

export async function editTodo(
  id: string,
  body: { title: string; description: string }
) {
  try {
    var res = await fetch(`${BASE_URL}todos/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (err) {
    throw new HttpError(ERR_MSG, { cause: err });
  }

  if (res.ok) return;

  if (res.status === 400) {
    const data = await res.json();
    throw new HttpError(data.message);
  }

  throw new HttpError(ERR_MSG, { cause: res, status: res.status });
}

export function useSession(
  locationState: User,
  handleError: (err: any) => void
) {
  const { data, error } = useSWR<User, HttpError, "me">(
    "me",
    async (url) => {
      if (locationState) return locationState;

      try {
        var res = await fetch(`${BASE_URL}${url}`, {
          credentials: "include",
        });
      } catch (err) {
        throw new HttpError(ERR_MSG, { cause: err });
      }

      if (res.ok) return await res.json();

      throw new HttpError(ERR_MSG, { cause: res, status: res.status });
    },
    {
      onError(err, key, config) {
        handleError(err);
      },
    }
  );

  return {
    user: data,
    error,
  };
}

export function useTodos(handleError: (err: HttpError) => void) {
  const { data, isLoading, mutate } = useSWR<Todo[], HttpError, "todos">(
    "todos",
    async (url) => {
      try {
        var res = await fetch(`${BASE_URL}${url}`, {
          credentials: "include",
        });
      } catch (err) {
        throw new HttpError(ERR_MSG, { cause: err });
      }

      if (res.ok) return await res.json();

      throw new HttpError(ERR_MSG, { cause: res, status: res.status });
    },
    {
      onError(err, key, config) {
        handleError(err);
      },
    }
  );

  return {
    todos: data ?? [],
    isLoadingTodos: isLoading,
    mutate,
  };
}

export function useUsers(handleError: (err: HttpError) => void) {
  const { data, isLoading } = useSWR<User[], HttpError, "users">(
    "users",
    async (url) => {
      try {
        var res = await fetch(`${BASE_URL}${url}`, {
          credentials: "include",
        });
      } catch (err) {
        throw new HttpError(ERR_MSG, { cause: err });
      }

      if (!res.ok) {
        throw new HttpError(ERR_MSG, { cause: res, status: res.status });
      }

      return await res.json();
    },
    {
      onError(err, key, config) {
        handleError(err);
      },
    }
  );

  return {
    users: data ?? [],
    isLoading,
  };
}
