"use client";

import React, { useState } from "react";
import { LoginCredentials } from "@/types";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { login } from "@/lib/actions/auth";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await login(credentials.email, credentials.password);

      if (res) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-sm  p-4 ">
      <Input
        name="email"
        type="email"
        placeholder="Email"
        value={credentials.email}
        onChange={handleChange}
      />
      <Input
        name="password"
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={handleChange}
      />
      <Button
        className="text-white bg-orange-550 hover:bg-orange-550/80 cursor-pointer active:scale-95 transition-all duration-150"
        onClick={handleSubmit}>
        Login
      </Button>
    </div>
  );
};

export default LoginForm;
