import { BASE_URL } from "../../app/constants";
import { HttpError, Todo } from "../../types";

const ERR_MSG = "Something went wrong. Try refreshing the page";

export async function fetchTodos(signal: AbortSignal): Promise<Todo[]> {
  try {
    var res = await fetch(`${BASE_URL}todos`, {
      credentials: "include",
      signal,
    });
  } catch (err) {
    throw new Error(ERR_MSG, { cause: err });
  }

  if (res.ok) return await res.json();

  throw new HttpError(ERR_MSG, { cause: res, status: res.status });
}

export async function addTodo(body: {
  title: string;
  description: string;
}): Promise<Todo> {
  try {
    var res = await fetch(`${BASE_URL}todos`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (err) {
    throw new Error(ERR_MSG, { cause: err });
  }

  if (res.ok) return await res.json();

  if (res.status === 400) {
    const data = await res.json();
    throw new HttpError(data.message);
  }

  throw new HttpError(ERR_MSG, { cause: res, status: res.status });
}

export async function deleteTodo(id: number) {
  try {
    var res = await fetch(`${BASE_URL}todos/${id.toString()}`, {
      method: "DELETE",
      credentials: "include",
    });
  } catch (err) {
    throw new Error(ERR_MSG, { cause: err });
  }

  if (res.ok) return;

  throw new HttpError(ERR_MSG, { cause: res, status: res.status });
}

export async function editTodo(
  id: number,
  data: { title: string; description: string }
) {
  try {
    var res = await fetch(`${BASE_URL}todos/${id.toString()}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch (err) {
    throw new Error(ERR_MSG, { cause: err });
  }

  if (res.ok) return;

  if (res.status === 400) {
    const data = await res.json();
    throw new HttpError(data.message);
  }

  throw new HttpError(ERR_MSG, { cause: res, status: res.status });
}
