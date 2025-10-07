const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function request(path, { method = "GET", body } = {}) {
  const headers = { "Content-Type": "application/json" };
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status} ${res.statusText} - ${text}`);
  }
  return res.status === 204 ? null : res.json();
}

export const api = {
  listUsers: () => request("/users"),
  createUser: (data) =>
    request("/users", { method: "POST", body: { users: data } }),
  updateUser: (id, data) =>
    request(`/users/${id}`, { method: "PATCH", body: { users: data } }),
  deleteUser: (id) => request(`/users/${id}`, { method: "DELETE" }),
};
