"use client";
import Tiptap from "@/components/textEditor/Tiptap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowBigLeft, Target } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const page = () => {
  const [title, setTitle] = useState("");

  return (
    <div className="min-w-[100vw] min-h-[100vh] bg-zinc-900 py-20 ">
      <Button className="fixed top-5 left-5" variant={"outline"} asChild>
        <Link href={"/dashboard"}>
          <ArrowBigLeft />
          All notes
        </Link>
      </Button>
      <div className="max-w-3xl mx-auto mb-10">
        <Label htmlFor="title" className="mb-3">
          Title:
        </Label>
        <Input
          type="text"
          id="title"
          name="title"
          placeholder="Document"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <Tiptap />
    </div>
  );
};

export default page;
