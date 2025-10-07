"use client";
import React, { useEffect, useRef, useState } from "react";
import Tiptap from "@/components/textEditor/Tiptap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowBigLeft, Loader2Icon } from "lucide-react";
import { JSONContent } from "@tiptap/react";
import axios from "axios";
import Link from "next/link";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { useNoteStore } from "@/store/useNoteStore";
import { NoteData } from "@/utils/types";

const NotePage = () => {
  const { id, title, jsonText, setNote, setTitle, setJsonText, clearNote } =
    useNoteStore();

  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [hasChanged, setHasChanged] = useState(false);

  const noteStateRef = useRef({ id, title, jsonText, hasChanged });

  useEffect(() => {
    noteStateRef.current = { id, title, jsonText, hasChanged };
  }, [id, title, jsonText, hasChanged]);

  useEffect(() => {
    const noteId = params.id as string;
    setIsLoading(true);

    const loadNote = async () => {
      if (noteId === "new") {
        clearNote();
      } else {
        try {
          const res = await axios.get<NoteData>(`/api/note/${noteId}`);
          if (res.status === 200) {
            const note = res.data;
            setNote({
              id: noteId,
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
  }, [params.id, setNote, clearNote]);

  useEffect(() => {
    const saveOnExit = () => {
      const lastState = noteStateRef.current;
      console.log(lastState.id);

      if (lastState.hasChanged) {
        const data = { title: lastState.title, jsonText: lastState.jsonText };
        const blob = new Blob([JSON.stringify(data)], {
          type: "application/json",
        });

        if (id === "new") {
          navigator.sendBeacon("/api/note/", blob);
        } else {
          navigator.sendBeacon(`/api/note/${id}`, blob);
        }
      }
    };

    window.addEventListener("beforeunload", saveOnExit);

    return () => {
      window.removeEventListener("beforeunload", saveOnExit);
      saveOnExit();
    };
  }, []);

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
      <div className="h-24 w-full fixed top-0 left-0 py-6 px-3 bg-zinc-900 z-10">
        <Button variant={"outline"} asChild>
          <Link href={"/dashboard"} className="flex gap-2 items-center">
            <ArrowBigLeft />
            <span>Dashboard</span>
          </Link>
        </Button>
      </div>
      <Input
        className="py-8 text-2xl md:text-3xl lg:text-4xl font-bold bg-muted border-none"
        placeholder="Untitled"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          setHasChanged(true);
        }}
      />
      <Tiptap
        key={id || "new"}
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
