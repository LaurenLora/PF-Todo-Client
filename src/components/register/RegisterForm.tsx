"use client";

import { RegisterFormType } from "@/types";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { handleRegister } from "@/lib/api/authApi";
import { login } from "@/lib/actions/auth";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState<RegisterFormType>({
    email: "",
    password: "",
    firstName: "",
    lastName: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await handleRegister(credentials);

      if (res?.status === 201) {
        const res = await login(credentials.email, credentials.password);
        if (res) {
          router.push("/dashboard");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-sm  p-4 ">
      <Input
        name="firstName"
        type="text"
        placeholder="Firstname"
        value={credentials.firstName}
        onChange={handleChange}
      />
      <Input
        name="lastName"
        type="text"
        placeholder="Lastname"
        value={credentials.lastName}
        onChange={handleChange}
      />
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
        disabled={
          credentials.email === "" ||
          credentials.firstName === "" ||
          credentials.lastName === "" ||
          credentials.password === ""
        }
        className="text-white bg-orange-550 hover:bg-orange-550/80 cursor-pointer active:scale-95 transition-all duration-150"
        onClick={handleSubmit}>
        Register
      </Button>
    </div>
  );
};

export default RegisterForm;
