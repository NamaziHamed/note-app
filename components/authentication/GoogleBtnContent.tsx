"use client";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export function GoogleButtonContent() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <>
          <Loader2 className="animate-spin" />
          <span>Redirecting...</span>
        </>
      ) : (
        <>
          <Image
            src={"/google.svg"}
            width={20}
            height={20}
            alt="Google G icon"
          />
          <span>Continue with Google</span>
        </>
      )}
    </>
  );
}
