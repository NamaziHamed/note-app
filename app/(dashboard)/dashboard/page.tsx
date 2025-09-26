"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";

const page = () => {
  const { data: session, status } = useSession();
  if (status === "loading")
    return (
      <div className="min-w-screen min-h-screen flex items-center justify-center gap-3">
        <Loader2 className="animate-spin w-6 h-6 text-primary" />
        <p>Loading ...</p>
      </div>
    );
  return (
    <main>
      <Sidebar session={session} />
    </main>
  );
};

export default page;
