import RegisterForm from "@/components/register/RegisterForm";
import Section from "@/components/Section";
import { SessionProvider } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default async function Page() {
  return (
    <div className="flex xl:flex-row flex-col items-center justify-center h-screen">
      <div className="w-full flex h-full flex-col justify-center items-center gap-5">
        <div className="w-full flex justify-center items-center">
          <Section isLogin={false} />
        </div>
        <div>
          <SessionProvider>
            <RegisterForm />
          </SessionProvider>
        </div>
        <div className="flex gap-2">
          <p>Already have an Account?</p>
          <Link className="text-orange-550 cursor-pointer" href="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
