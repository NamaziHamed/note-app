"use client";
import React, { useState } from "react";
import Toolbar from "./Toolbar";
import { EditorContent } from "@tiptap/react";
import { JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import BubbleMenu from "@tiptap/extension-bubble-menu";
import { TaskItem, TaskList } from "@tiptap/extension-list";

const Tiptap = ({
  initialValue,
  onChange,
}: {
  initialValue: JSONContent | null;
  onChange: (json: JSONContent) => void;
}) => {
  const [text] = useState(initialValue || null);
  const editor = useEditor({
    extensions: [
      StarterKit,
      TaskList,
      TaskItem.configure({
        nested: true,
        HTMLAttributes: {
          class: "checkList",
        },
      }),
    ],
    content: text,
    editorProps: {
      attributes: { class: "bg-card rounded-b-xl min-h-[75vh]" },
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
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
