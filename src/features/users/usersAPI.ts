import { BASE_URL } from "../../app/constants";
import { HttpError, User } from "../../types";

const ERR_MSG = "Something went wrong. Try refreshing the page";

export async function fetchUsers(signal: AbortSignal): Promise<User[]> {
  try {
    var res = await fetch(`${BASE_URL}users`, {
      credentials: "include",
      signal,
    });
  } catch (err) {
    throw new Error(ERR_MSG, { cause: err });
  }

  if (!res.ok) {
    throw new HttpError(ERR_MSG, { cause: res, status: res.status });
  }

  return await res.json();
}
