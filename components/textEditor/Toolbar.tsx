import React from "react";
import { Editor, useEditorState } from "@tiptap/react";
import {
  BoldIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  Redo2Icon,
  StrikethroughIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";

const Toolbar = ({ editor }: { editor: Editor }) => {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive("bold") ?? false,
        isUnderline: ctx.editor.isActive("underline") ?? false,
        isItalic: ctx.editor.isActive("italic") ?? false,
        isStrike: ctx.editor.isActive("strike") ?? false,
        isHeading1: ctx.editor.isActive("heading", { level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive("heading", { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive("heading", { level: 3 }) ?? false,
        isBulletList: ctx.editor.isActive("bulletList") ?? false,
        isOrderedList: ctx.editor.isActive("orderedList") ?? false,
        canUndo: ctx.editor.can().chain().undo().run() ?? false,
        canRedo: ctx.editor.can().chain().redo().run() ?? false,
      };
    },
  });

  const tools = [
    {
      title: "Bold",
      Icon: BoldIcon,
      command: () => editor.chain().focus().toggleBold().run(),
      isActive: editorState.isBold,
    },
    {
      title: "Italice",
      Icon: ItalicIcon,
      command: () => editor.chain().focus().toggleItalic().run(),
      isActive: editorState.isItalic,
    },
    {
      title: "Underline",
      Icon: UnderlineIcon,
      command: () => editor.chain().focus().toggleUnderline().run(),
      isActive: editorState.isUnderline,
    },
    {
      title: "Strike",
      Icon: StrikethroughIcon,
      command: () => editor.chain().focus().toggleStrike().run(),
      isActive: editorState.isStrike,
    },
    {
      title: "Heading 1",
      Icon: Heading1Icon,
      command: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editorState.isHeading1,
    },
    {
      title: "Heading 2",
      Icon: Heading2Icon,
      command: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editorState.isHeading2,
    },
    {
      title: "Heading 3",
      Icon: Heading3Icon,
      command: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: editorState.isHeading3,
    },
    {
      title: "Ordered List",
      Icon: ListOrderedIcon,
      command: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editorState.isOrderedList,
    },
    {
      title: "Bullet list",
      Icon: ListIcon,
      command: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editorState.isBulletList,
    },
    {
      title: "Undo",
      Icon: Undo2Icon,
      command: () => editor.chain().focus().undo().run(),
      isActive: editorState.canUndo,
    },
    {
      title: "Redo",
      Icon: Redo2Icon,
      command: () => editor.chain().focus().redo().run(),
      isActive: editorState.canRedo,
    },
  ];

  return (
    <div
      className="w-full bg-muted border-b flex gap-0 sm:space-x-0 sm:gap-2 items-center justify-center
    rounded-t-xl"
    >
      {tools.map(({ title, Icon, command, isActive }) => (
        <Tooltip key={title}>
          <TooltipTrigger asChild>
            <Button
              size={"sm"}
              variant={"ghost"}
              onClick={command}
              disabled={(title === "Redo" || title === "Undo") && !isActive}
              className={`${
                !(title === "Redo" || title === "Undo") && isActive
                  ? "border border-primary text-primary"
                  : "border-0 text-foreground"
              } transition-all duration-300 cursor-pointer disabled:bg-gray-700`}
            >
              <Icon className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{title}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
};

export default Toolbar;
