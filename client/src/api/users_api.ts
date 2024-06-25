import { fetchData } from "./fetchData";
import { User } from "../models/user";

export async function getLoggedInUser(): Promise<User> {
  const response = await fetchData("http://localhost:5000/users", {
    method: "GET",
  });
  return response.json();
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

export async function register(credetials: RegisterCredentials): Promise<User> {
  const response = await fetchData("http://localhost:5000/users/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credetials),
  });
  return response.json();
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export async function login(credetials: LoginCredentials): Promise<User> {
  const response = await fetchData("http://localhost:5000/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credetials),
  });
  return response.json();
}

export async function logout() {
  await fetchData("http://localhost:5000/users/logout", {
    method: "POST",
  });
}
