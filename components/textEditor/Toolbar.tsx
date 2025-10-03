"use client";
import React from "react";
import { Editor, useEditorState } from "@tiptap/react";
import {
  BoldIcon,
  ItalicIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from "lucide-react";
import { BubbleMenu } from "@tiptap/react/menus";
import ToolbarButton from "./ToolbarButton";
import ToolbarDropdownButton from "./ToolbarDropdownButton";
import ColorSeterButtons from "./ColorSeterButtons";

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
        isTaskList: ctx.editor.isActive("taskList") ?? false,
        isParagraph: ctx.editor.isActive("paragraph") ?? false,
        isAlignLeft: ctx.editor.isActive({ textAlign: "left" }) ?? false,
        isAlignRight: ctx.editor.isActive({ textAlign: "right" }) ?? false,
        isAlignCenter: ctx.editor.isActive({ textAlign: "center" }) ?? false,
        isJustify: ctx.editor.isActive({ textAlign: "justify" }) ?? false,
        currentBgColor:
          ctx.editor.getAttributes("textStyle").backgroundColor ?? "",
        currentTextColor: ctx.editor.getAttributes("textStyle").color ?? "",
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
  ];

  return (
    <BubbleMenu editor={editor}>
      <div
        className="w-fit bg-muted border border-zinc-300 px-2 py-1 flex
        items-center justify-between sm:justify-start  rounded-md
    "
      >
        {tools.map(({ title, Icon, command, isActive }) => (
          <ToolbarButton
            title={title}
            command={command}
            isActive={isActive}
            key={title}
          >
            <Icon className="h-3 w-3" />
          </ToolbarButton>
        ))}
        <div className="bg-white w-0.5 mx-1 h-6"></div>
        <ColorSeterButtons editor={editor} editorState={editorState} />
        <div className="bg-white w-0.5 mx-1 h-6"></div>
        <ToolbarDropdownButton editor={editor} editorState={editorState} />
      </div>
    </BubbleMenu>
  );
};

export default Toolbar;
