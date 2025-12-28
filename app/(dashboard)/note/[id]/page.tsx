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
import { useParams } from "next/navigation";
import { NoteData } from "@/utils/types";

const NotePage = () => {
  const initialData = {
    id: "new",
    title: "",
    jsonText: {},
    hasChanged: false,
  };
  const [noteData, setNoteData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();

  const noteStateRef = useRef(noteData);

  useEffect(() => {
    noteStateRef.current = noteData;
  }, [noteData]);

  useEffect(() => {
    const noteId = params.id as string;
    setIsLoading(true);

    const loadNote = async () => {
      if (noteId !== "new") {
        try {
          const res = await axios.get<NoteData>(`/api/note/${noteId}`);
          if (res.status === 200) {
            const note = res.data;
            setNoteData({
              id: noteId,
              title: note.title || "",
              jsonText: JSON.parse(note.jsonText || "{}"),
              hasChanged: false,
            });
          }
        } catch (error) {
          toast.error("Failed to load note.");
          console.error(error);
        }
      }
      setIsLoading(false);
    };

    loadNote();
  }, [params.id]);

  useEffect(() => {
    const saveOnExit = () => {
      const lastState = noteStateRef.current;

      if (lastState.hasChanged) {
        const data = { title: lastState.title, jsonText: lastState.jsonText };
        const blob = new Blob([JSON.stringify(data)], {
          type: "application/json",
        });

        if (lastState.id === "new") {
          navigator.sendBeacon("/api/note/", blob);
        } else {
          navigator.sendBeacon(`/api/note/${lastState.id}`, blob);
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
      <div
        className="h-24 w-full fixed top-0 left-0 py-6 px-3 bg-zinc-950 z-10
      border-b border-white"
      >
        <Button variant={"outline"} asChild>
          <Link href={"/dashboard"} className="flex gap-2 items-center">
            <ArrowBigLeft />
            <span>Dashboard</span>
          </Link>
        </Button>
      </div>
      <Input
        className="py-9 text-2xl md:text-3xl lg:text-4xl font-bold border-b"
        placeholder="Untitled"
        value={noteData.title}
        onChange={(e) => {
          setNoteData({ ...noteData, title: e.target.value, hasChanged: true });
        }}
      />

      <Tiptap
        key={noteData.id}
        initialValue={noteData.jsonText}
        onChange={(newContent: JSONContent) => {
          setNoteData({ ...noteData, jsonText: newContent, hasChanged: true });
        }}
      />
    </div>
  );
};

export default NotePage;
