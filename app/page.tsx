import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  ArrowRightIcon,
  FastForwardIcon,
  LogInIcon,
  LucideToolCase,
  SearchCheckIcon,
  UserPlus2,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    id: 2,
    title: "Search system",
    content: "You can search your notes with title or text",
    Icon: SearchCheckIcon,
    iconColor: "text-blue-500",
  },
  {
    id: 1,
    title: "Easy signup",
    content:
      "Using out third party login system, you can register and login on the go",
    Icon: FastForwardIcon,
    iconColor: "text-violet-300",
  },

  {
    id: 3,
    title: "User Friendly tools",
    content:
      "No extra tools, just the things you need. headings, text alignment, lists, color and highlight changer",
    Icon: LucideToolCase,
    iconColor: "text-sky-500",
  },
];

export default function Home() {
  return (
    <div className="min-w-screen min-h-screen relative">
      <div className="absolute top-0 left-0 inset-0 bg-[url('/banner.png')] bg-cover bg-center z-0 opacity-40"></div>
      <header
        className="absolute top-0 left-0 w-full h-20 bg-card z-50 flex items-center justify-between
      p-3"
      >
        <div></div>
        <div className="space-x-2">
          <Button asChild size={"sm"}>
            <Link href={"/login"}>
              <LogInIcon /> Login
            </Link>
          </Button>

          <Button asChild size={"sm"}>
            <Link href={"/register"}>
              <UserPlus2 /> Signup
            </Link>
          </Button>
        </div>
      </header>
      <div className=" pt-20 absolute min-w-screen min-h-screen flex flex-col justify-around items-center">
        <div
          className="
          flex items-center justify-center flex-col text-white z-40 space-y-5"
        >
          <h2 className="font-bold text-pretty text-primary text-3xl md:text-4xl lg:text-5xl">
            Your second brain is here!
          </h2>
          <p className="animate-in slide-in-from-bottom-120 duration-700 fade-in-10">
            Write down your thoughts and get them out of your head!
          </p>
          <Button
            asChild
            size={"lg"}
            className="group hover:-translate-y-0.5 
          hover:scale-105 transition-all duration-500"
          >
            <Link href={"/register"}>
              <ArrowRightIcon className="group-hover:animate-caret-blink" /> Get
              started
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1  md:grid-cols-3 gap-2 md:gap-5 py-10 max-w-3xl">
          {features.map(({ id, title, content, Icon }) => (
            <Card
              key={id}
              className="hover:scale-105 hover:-translate-y-0.5 duration-300 transition-all"
            >
              <CardContent>
                <CardTitle className="font-semibold italic text-primary mb-3 text-center">
                  {title}
                </CardTitle>
                <Icon className="w-5 h-5 mx-auto" />
                <p className="text-xs text-center text-pretty">{content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
