"use client";
import React, { useEffect, useState } from "react";
import Tiptap from "@/components/textEditor/Tiptap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowBigLeft } from "lucide-react";
import { JSONContent } from "@tiptap/react";
import axios from "axios";
import Link from "next/link";

const page = () => {
  const [title, setTitle] = useState("");
  const [editorContent, setEditorContent] = useState<JSONContent | null>(null);
  const [id, setId] = useState("");
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    const saveNote = async () => {
      if (!id && !title && !editorContent) return;

      const baseURL = process.env.NEXT_PUBLIC_BASE_URL + "/api/note";

      if (!id) {
        const res = await axios.post(
          baseURL,
          { title, jsonText: editorContent },
          { headers: { "Content-Type": "application/json" } }
        );
        if (res.status === 201) setId(res.data.id);
        setIsNew(false);
      }
      if (id && isNew) {
        const res = await axios.put(
          baseURL + `/${id}`,
          { title, jsonText: editorContent },
          { headers: { "Content-Type": "application/json" } }
        );
      }
    };

    const timer = setTimeout(() => {
      saveNote();
      setIsNew(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [title, editorContent, id]);

  return (
    <div className="min-w-[100vw] min-h-[100vh] bg-zinc-900 py-20 ">
      <Button className="fixed top-5 left-5" variant={"outline"} asChild>
        <Link href={"/dashboard"}>
          <ArrowBigLeft />
          All notes
        </Link>
      </Button>

      <div className="max-w-3xl mx-auto rounded-md shadow-sm shadow-gray-400 pt-4 bg-muted">
        <div className="max-w-3xl mx-auto mb-10 ">
          <Label htmlFor="title" className="mb-3 ps-4">
            Title:
          </Label>

          <Input
            type="text"
            id="title"
            name="title"
            placeholder="Document"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setIsNew(true);
            }}
          />
        </div>
        <Tiptap
          onChange={(newContent: JSONContent) => {
            setEditorContent(newContent);
            setIsNew(true);
          }}
        />
      </div>
    </div>
  );
};

export default page;
