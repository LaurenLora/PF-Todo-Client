import React from "react";
import { Logo } from "./ui/Icons";

interface SessionProps {
  isLogin: boolean;
}

const Section = ({ isLogin }: SessionProps) => {
  return (
    <>
      <div className="flex flex-col">
        <div className="logo-slow ">
          <Logo width={240} height={80} />
        </div>
        {isLogin ? (
          <h1 className="text-3xl font-bold">Welcome Back!</h1>
        ) : (
          <h1 className="text-3xl font-bold">Welcome the Todo App!</h1>
        )}
      </div>
    </>
  );
};

export default Section;
