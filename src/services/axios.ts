import { auth } from "@/lib/auth";
import axios, { AxiosInstance } from "axios";

export const API: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

export const AuthAPI: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

AuthAPI.interceptors.request.use(async (conf) => {
  const session = await auth();
  if (session) {
    console.log("burda");
    const token = session.user.accessToken;
    conf.headers.Authorization = `Bearer ${token}`;
  }
  return conf;
});
