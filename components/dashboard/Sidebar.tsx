import { Session } from "next-auth";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOutIcon } from "lucide-react";
import { logout } from "@/utils/authActions";

const Sidebar = ({ session }: { session: Session | null }) => {
  return (
    <aside className="min-h-screen fixed top-0 bg-card flex flex-col justify-between items-center p-3">
      <div className="flex items-center flex-col">
        <Avatar>
          <AvatarImage src={session?.user?.image ?? ""} />
          <AvatarFallback>{session?.user?.name?.slice(0)}</AvatarFallback>
        </Avatar>
        <p className="max-w-20 text-xs truncate">
          {session?.user?.name?.split(" ")[0]}
        </p>
      </div>

      <form action={logout}>
        <Button variant={"outline"} title="Log Out" type="submit">
          <LogOutIcon />
        </Button>
      </form>
    </aside>
  );
};

export default Sidebar;
