import React from "react";
import LoginForm from "@/components/login/LoginForm";
import Section from "@/components/Section";
import Link from "next/link";
import { SessionProvider } from "next-auth/react";

export default async function Page() {
  return (
    <div className="flex xl:flex-row flex-col items-center justify-center h-screen">
      <div className="w-full flex h-full flex-col justify-center items-center gap-5">
        <div className="w-full flex justify-center items-center">
          <Section isLogin={true} />
        </div>
        <div>
          <SessionProvider>
            <LoginForm />
          </SessionProvider>
        </div>
        <div className="flex gap-2">
          <p>Dont have an account?</p>
          <Link className="text-orange-550 cursor-pointer" href="/register">
            <span>Register</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
