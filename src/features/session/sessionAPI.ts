import { BASE_URL } from "../../app/constants";
import { HttpError, User } from "../../types";

const ERR_MSG = "Something went wrong. Try refreshing the page";

export async function login(body: {
  login: string;
  password: string;
}): Promise<User> {
  try {
    var res = await fetch(`${BASE_URL}login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
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

  throw new HttpError(ERR_MSG, { cause: res });
}

export async function logout() {
  try {
    var res = await fetch(`${BASE_URL}logout`, {
      method: "POST",
      credentials: "include",
    });
  } catch (err) {
    throw new Error(ERR_MSG, { cause: err });
  }

  if (res.ok) return;

  throw new HttpError(ERR_MSG, { cause: res, status: res.status });
}

export async function fetchSessionUser(signal: AbortSignal): Promise<User> {
  try {
    var res = await fetch(`${BASE_URL}me`, {
      credentials: "include",
      signal,
    });
  } catch (err) {
    throw new Error(ERR_MSG, { cause: err });
  }

  if (res.ok) return await res.json();

  throw new HttpError(ERR_MSG, { cause: res, status: res.status });
}
