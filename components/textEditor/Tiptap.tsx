"use client";
import React from "react";
import Toolbar from "./Toolbar";
import Editor from "./Editor";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const Tiptap = ({ initialValue }: { initialValue?: JSON }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: { initialValue },
    editorProps: {
      attributes: { class: "bg-muted rounded-b-xl min-h-[400px]" },
    },
    immediatelyRender: false,
  });

  if (!editor) return null;

  return (
    <div className="max-w-3xl mx-auto rounded-md shadow-sm shadow-gray-400">
      <Toolbar editor={editor} />
      <Editor editor={editor} />
    </div>
  );
};

export default Tiptap;
