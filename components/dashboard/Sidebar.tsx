import { Session } from "next-auth";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { signOut } from "@/auth";
import { LogOutIcon } from "lucide-react";

const Sidebar = ({ session }: { session: Session | null }) => {
  return (
    <aside className="min-h-screen fixed top-0 bg-card flex flex-col justify-between items-center p-3">
      <div className="flex items-center flex-col">
        <Avatar>
          <AvatarImage src={session?.user?.image ?? undefined} />
          <AvatarFallback>{session?.user?.name?.slice(0)}</AvatarFallback>
        </Avatar>
        <p className="max-w-20 text-xs truncate">
          {session?.user?.name?.split(" ")[0]}
        </p>
      </div>

      <div>
        <Button variant={"outline"} onClick={() => signOut()} title="Log Out">
          <LogOutIcon />
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
