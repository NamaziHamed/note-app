"use client";
import React from "react";
import Toolbar from "./Toolbar";
import Editor from "./Editor";
import { JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const Tiptap = ({
  initialValue,
  onChange,
}: {
  initialValue: JSONContent | null;
  onChange: (json: JSONContent) => void;
}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: initialValue,
    editorProps: {
      attributes: { class: "bg-muted rounded-b-xl min-h-[400px]" },
    },
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      onChange(json);
    },
    immediatelyRender: false,
  });

  if (!editor) return null;

  return (
    <div className="">
      <Toolbar editor={editor} />
      <Editor editor={editor} />
    </div>
  );
};

export default Tiptap;
