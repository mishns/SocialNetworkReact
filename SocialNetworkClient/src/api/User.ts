import { validateResponse } from "@api/validateResponse";
import { API_URL, REFERRER_POLICY } from "@constants";
import { z } from "zod";

const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
});

export type User = z.infer<typeof UserSchema>;

export function fetchUser(id: string): Promise<User> {
  return fetch(`${API_URL}/users/${id}`)
    .then(response => response.json())
    .then(data => UserSchema.parse(data));
}

export function registerUser(
  username: string,
  password: string,
): Promise<void> {
  return fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  }).then(() => undefined);
}

export function login(username: string, password: string): Promise<void> {
  return fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    mode: "cors",
    referrerPolicy: REFERRER_POLICY,
    body: JSON.stringify({ username, password }),
  })
    .then(validateResponse)
    .then(() => undefined);
}

export function fetchMe(): Promise<User> {
  return fetch(`${API_URL}/users/me`, {
    credentials: "include",
    mode: "cors",
    referrerPolicy: REFERRER_POLICY,
  })
    .then(validateResponse)
    .then(response => response.json())
    .then(data => UserSchema.parse(data));
}
