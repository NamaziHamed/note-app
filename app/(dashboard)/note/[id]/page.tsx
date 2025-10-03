"use client";
import React, { useEffect, useState } from "react";
import Tiptap from "@/components/textEditor/Tiptap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowBigLeft, Loader2Icon } from "lucide-react";
import { JSONContent } from "@tiptap/react";
import axios from "axios";
import Link from "next/link";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useNoteStore } from "@/store/useNoteStore";
import { NoteData } from "@/utils/types";

const NotePage = () => {
  const { id, title, jsonText, setNote, setTitle, setJsonText, clearNote } =
    useNoteStore();

  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [hasChanged, setHasChanged] = useState(false);

  // Loading initial note data or clearning it
  useEffect(() => {
    const id = params.id as string;
    setIsLoading(true);

    const loadNote = async () => {
      if (id === "new") {
        clearNote();
      } else {
        try {
          const res = await axios.get<NoteData>(`/api/note/${id}`);
          if (res.status === 200) {
            const note = res.data;
            setNote({
              id: id,
              title: note.title || "",
              jsonText: JSON.parse(note.jsonText || "{}"),
            });
          }
        } catch (error) {
          toast.error("Failed to load note.");
        }
      }
      setIsLoading(false);
      setHasChanged(false);
    };

    loadNote();
  }, [params.id]);

  // Saving process controlled by hasChanged
  // useEffect(() => {
  //   if (!hasChanged) return;

  //   const saveNote = async () => {
  //     const payload = { title, jsonText };
  //     try {
  //       if (id === "new") {
  //         const res = await axios.post("/api/note", payload);
  //         setNote({ id: res.data.id, title, jsonText });
  //         toast.success("Note saved!");
  //       } else {
  //         await axios.put(`/api/note/${id}`, payload);
  //       }
  //     } catch (error) {
  //       toast.error("Error saving progress.");
  //     }
  //   };
  //
  //   const timer = setTimeout(saveNote, 3000);
  //   return () => clearTimeout(timer);
  // }, [title, jsonText, hasChanged]);

  if (isLoading) {
    return (
      <div className="flex gap-2 items-center min-w-screen min-h-screen justify-center">
        <Loader2Icon className="text-primary w-8 h-8 animate-spin" />
        <span className="animate-pulse">Loading...</span>
      </div>
    );
  }

  return (
    <div className="pt-24 relative">
      <div className="h-24 w-full absolute top-0 left-0 py-6 px-3">
        <Button variant={"outline"} asChild>
          <Link href={"/dashboard"} className="flex gap-2 items-center">
            <ArrowBigLeft />
            <span>Dashboard</span>
          </Link>
        </Button>
      </div>
      <Input
        className="py-8 text-2xl md:text-3xl lg:text-4xl font-bold"
        placeholder="Untitled"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          setHasChanged(true);
        }}
      />
      <Tiptap
        key={id}
        initialValue={jsonText}
        onChange={(newContent: JSONContent) => {
          setJsonText(newContent);
          setHasChanged(true);
        }}
      />
    </div>
  );
};

export default NotePage;
