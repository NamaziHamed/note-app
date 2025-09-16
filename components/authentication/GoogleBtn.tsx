"use client";
import React from "react";
import { Button } from "../ui/button";
import { signInWithGoogle } from "@/utils/authActions";
import { GoogleButtonContent } from "./GoogleBtnContent";

export default function GoogleBtn() {
  const onClick = () => {
    localStorage.setItem("showWelcomeToast", "true");
    signInWithGoogle();
  };

  return (
    <Button
      variant={"outline"}
      className="w-full mb-4 cursor-pointer flex gap-2 py-5"
      type="button"
      onClick={onClick}
    >
      <GoogleButtonContent />
    </Button>
  );
}
