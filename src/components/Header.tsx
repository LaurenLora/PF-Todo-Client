import React from "react";
import { Logo } from "./ui/Icons";
import LogOutButton from "./login/LogOutButton";
import { SessionProvider } from "next-auth/react";

export default async function Header() {
  return (
    <div className="h-full  w-full flex justify-between  items-center">
      <div className="logo-slow ">
        <Logo width={160} height={120} />
      </div>
      <div>
        <SessionProvider>
          <LogOutButton />
        </SessionProvider>
      </div>
    </div>
  );
}
