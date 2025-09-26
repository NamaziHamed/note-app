"use client";
import React, { use, useEffect, useState } from "react";
import Tiptap from "@/components/textEditor/Tiptap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowBigLeft, Loader2Icon } from "lucide-react";
import { JSONContent } from "@tiptap/react";
import axios from "axios";
import Link from "next/link";
import { toast } from "sonner";
import { useParams } from "next/navigation";

const page = () => {
  const paramsData = useParams();
  const [title, setTitle] = useState("");
  const [editorContent, setEditorContent] = useState<JSONContent | null>(null);
  const [id, setId] = useState(paramsData.id);
  const [isChanged, setIsChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Loading initial data if( params.id != new)
  useEffect(() => {
    const fetchData = async () => {
      if (id === "new") {
        setIsLoading(false);
        return;
      }
      try {
        const res = await axios.get(`/api/note/${id}`);
        console.log(res);
        if (res.status === 200) {
          const note = res.data;
          setEditorContent(JSON.parse(note.jsonText ?? "{}"));
          setTitle(note.title ?? "");
        }
      } catch (error) {
        console.error(error);
      } finally {
        console.log(id, title, editorContent);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Process for saving new note or updatin one by checking the state of id
  useEffect(() => {
    const saveNote = async () => {
      if (id === "new" && !title && !editorContent) return;

      const baseURL = process.env.NEXT_PUBLIC_BASE_URL + "/api/note";

      if (id === "new") {
        const res = await axios.post(
          baseURL,
          { title, jsonText: editorContent },
          { headers: { "Content-Type": "application/json" } }
        );
        if (res.status === 201) setId(res.data.id);
        setIsChanged(false);
      }
      if (isChanged) {
        try {
          const res = await axios.put(
            baseURL + `/${id}`,
            { title, jsonText: editorContent },
            { headers: { "Content-Type": "application/json" } }
          );
        } catch (error) {
          toast.error("Error saving progress! check your internet connection");
        }
      }
    };

    const timer = setTimeout(() => {
      saveNote();
      setIsChanged(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [title, editorContent, id]);

  if (isLoading)
    return (
      <div className="min-h-screen min-w-screen flex items-center justify-center gap-2">
        <Loader2Icon className="text-primary w-6 h-6 animate-spin" />
        <p className="animate-pulse">Loading ...</p>
      </div>
    );
  return (
    <div className="min-w-[100vw] min-h-[100vh] bg-zinc-900 pt-30 ">
      <div className="w-full fixed top-0 bg-zinc-950 px-4 py-5 border-b border-zinc-300">
        <Button className="" variant={"secondary"} asChild>
          <Link href={"/dashboard"}>
            <ArrowBigLeft />
            All notes
          </Link>
        </Button>
      </div>

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
              setIsChanged(true);
            }}
          />
        </div>
        <Tiptap
        initialValue={editorContent}
          onChange={(newContent: JSONContent) => {
            setEditorContent(newContent);
            setIsChanged(true);
          }}
        />
      </div>
    </div>
  );
};

export default page;
