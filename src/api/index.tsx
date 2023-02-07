const BASE_URL = "http://localhost:3000/api/v1/";

export async function login(body: any) {
  const res = await fetch(`${BASE_URL}login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body,
  });
  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
}

export async function logout() {
  const res = await fetch(`${BASE_URL}logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) throw new Error();
}

export async function getCurrentSession(signal: AbortSignal) {
  const res = await fetch(`${BASE_URL}me`, { credentials: "include", signal });
  const data = await res.json();

  if (!res.ok) throw new Error("Not Authenticated");

  return data;
}
