"use client";
import { EditorContent, Editor } from "@tiptap/react";

const TextEditor = ({ editor }: { editor: Editor }) => {
  return <EditorContent editor={editor} />;
};

export default TextEditor;
