"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { LogIn } from "lucide-react"; // Assuming you have lucide-react installed

export default function Login({
  children,
  className,
  variant = "default",
  size = "default",
}: Readonly<{
  children?: React.ReactNode;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
}>) {
  return (
    <Button
      onClick={() => signIn()}
      className={`flex items-center gap-2 font-medium ${className || ""}`}
      variant={variant}
      size={size}
    >
      <LogIn className="w-4 h-4" />
      {children || "Sign in"}
    </Button>
  );
}
