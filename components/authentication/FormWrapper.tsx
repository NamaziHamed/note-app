import React, { ReactNode } from "react";
import { Separator } from "@/components/ui/separator";
import { ArrowBigRight } from "lucide-react";
import Link from "next/link";
import GoogleBtn from "./GoogleBtn";

interface wrapperProps {
  title: string;
  description: string;
  isLogin: boolean;
  children: ReactNode;
}

const FormWrapper = ({
  title,
  children,
  isLogin,
  description,
}: wrapperProps) => {
  return (
    <div
      className="sm:max-w-md w-full bg-card p-8 rounded-xl shadow-sm
     shadow-blue-500"
    >
      <h2 className="text-center mb-2 text-2xl md:text-3xl lg:text-4xl font-semibold">
        {title}
      </h2>
      <p className="text-center mb-4 text-muted-foreground">{description}</p>
      <GoogleBtn />

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">
            Or continue with email
          </span>
        </div>
      </div>
      {children}
      <Link
        href={isLogin ? "/register" : "/login"}
        className="flex gap-2 text-sm text-muted-foreground items-center
        hover:underline hover:text-primary transition-colors duration-300"
      >
        {isLogin ? (
          <>
            Don&apos;t have an account? register
            <ArrowBigRight className="h-4 w-4" />
          </>
        ) : (
          <>
            Already registered? login <ArrowBigRight className="h-4 w-4" />
          </>
        )}
      </Link>
    </div>
  );
};

export default FormWrapper;
