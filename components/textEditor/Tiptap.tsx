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
    immediatelyRender: false,
  });

  if (!editor) return null;

  return (
    <div>
      <Toolbar editor={editor} /> <Editor editor={editor} />
    </div>
  );
};

export default Tiptap;
