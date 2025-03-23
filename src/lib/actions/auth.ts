"use server";

import { signIn, signOut } from "../auth";

export const login = async (email: string, password: string) => {
  return await signIn("credentials", {
    email: email,
    password: password,
    redirect: false
  });
};

export const logout = async () => {
  return await signOut({
    redirect: true,
    redirectTo: "/login"
  });
};
