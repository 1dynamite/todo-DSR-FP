import { redirect } from "react-router-dom";

const BASE_URL = "http://localhost:3000/api/v1/";

export async function login(body: { login: string; password: string }) {
  try {
    var res = await fetch(`${BASE_URL}login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    });
  } catch (err) {
    throw new Error("Something went wrong. Try refreshing the page");
  }

  if (res.ok) {
    const data = await res.json();

    return data;
  }

  if (res.status === 400) {
    const data = await res.json();
    throw new Error(data.message);
  }

  throw new Error("Something went wrong. Try refreshing the page");
}

export async function logout() {
  try {
    var res = await fetch(`${BASE_URL}logout`, {
      method: "POST",
      credentials: "include",
    });
  } catch (err) {
    throw new Error("Something went wrong. Try refreshing the page");
  }

  if (res.ok) return;

  throw new Error("Something went wrong. Try refreshing the page", {
    cause: res.status,
  });
}

export async function getCurrentSession(signal: AbortSignal) {
  try {
    var res = await fetch(`${BASE_URL}me`, {
      credentials: "include",
      signal,
    });
  } catch (err) {
    if (err instanceof DOMException) throw err;
    throw new Error("Something went wrong. Try refreshing the page");
  }

  if (res.ok) {
    const data = await res.json();
    return data;
  }

  throw new Error("Something went wrong. Try refreshing the page", {
    cause: res.status,
  });
}

export async function getTodos(signal: AbortSignal) {
  try {
    var res = await fetch(`${BASE_URL}todos`, {
      credentials: "include",
      signal,
    });
  } catch (err) {
    if (err instanceof DOMException) throw err;
    throw new Error("Something went wrong. Try refreshing the page");
  }

  if (res.ok) {
    const data = await res.json();
    return data;
  }

  throw new Error("Something went wrong. Try refreshing the page", {
    cause: res.status,
  });
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
    throw new Error("Something went wrong. Try refreshing the page");
  }

  if (res.ok) {
    const data = await res.json();
    return data;
  }

  if (res.status === 400) {
    const data = await res.json();
    throw new Error(data.message);
  }

  throw new Error("Something went wrong. Try refreshing the page", {
    cause: res.status,
  });
}

export async function deleteTodo(id: string) {
  try {
    var res = await fetch(`${BASE_URL}todos/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
  } catch (err) {
    throw new Error("Something went wrong. Try refreshing the page");
  }

  if (res.ok) return;

  throw new Error("Something went wrong. Try refreshing the page", {
    cause: res.status,
  });
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
    throw new Error("Something went wrong. Try refreshing the page");
  }

  if (res.ok) return;

  if (res.status === 400) {
    const data = await res.json();
    throw new Error(data.message);
  }

  throw new Error("Something went wrong. Try refreshing the page", {
    cause: res.status,
  });
}

export async function getUsers(signal: AbortSignal) {
  try {
    var res = await fetch(`${BASE_URL}users`, {
      credentials: "include",
      signal,
    });
  } catch (err) {
    if (err instanceof DOMException) throw err;
    throw new Error("Something went wrong. Try refreshing the page");
  }

  if (!res.ok) {
    throw new Error("Something went wrong. Try refreshing the page", {
      cause: res.status,
    });
  }

  const data = await res.json();

  return data;
}
