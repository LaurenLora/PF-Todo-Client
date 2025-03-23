"use client";

import React from "react";
import { Button } from "../ui/button";
import { logout } from "@/lib/actions/auth";

const LogOutButton = () => {
  const handleSignOut = async () => {
    try {
      const out = await logout();
      console.log(out);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button
      className="bg-orange-550 text-white hover:bg-orange-550 active:scale-95 cursor-pointer"
      onClick={handleSignOut}>
      Sign Out
    </Button>
  );
};

export default LogOutButton;
