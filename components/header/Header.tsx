import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { LogInIcon, UserPlus2 } from "lucide-react";

const Header = () => {
  return (
    <header
      className="absolute top-0 left-0 w-full h-20 bg-card z-50 flex items-center justify-between
      p-3"
    >
      <div>
        <Link href={".."}>
          <Image src={"/logo.png"} width={120} height={50} alt="Parch logo" />
        </Link>
      </div>
      <div className="space-x-2">
        <Button asChild size={"sm"} variant={"default"}>
          <Link href={"/login"}>
            <LogInIcon /> Login
          </Link>
        </Button>

        <Button asChild size={"sm"} variant={"outline"}>
          <Link href={"/register"}>
            <UserPlus2 /> Signup
          </Link>
        </Button>
      </div>
    </header>
  );
};

export default Header;
