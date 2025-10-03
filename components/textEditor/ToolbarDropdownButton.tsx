"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { EditorActiveState } from "@/utils/types";
import { Editor } from "@tiptap/react";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Heading,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ListIcon,
  ListOrderedIcon,
  ListTodoIcon,
  LucideList,
  PilcrowIcon,
} from "lucide-react";

const ToolbarDropdownButton = ({
  editorState,
  editor,
}: {
  editorState: EditorActiveState;
  editor: Editor;
}) => {
  const [isHeadingsOpen, setIsHeadingsOpen] = useState(false);
  const [isListsOpen, setIsListsOpen] = useState(false);
  const [isAlignOpen, setIsAlignOpen] = useState(false);

  const dropdownItems = [
    {
      title: "Heading",
      Icon: Heading,
      isOpen: isHeadingsOpen,
      command: () => setIsHeadingsOpen(!isHeadingsOpen),
      dropdowns: [
        {
          title: "Heading 1",
          Icon: Heading1Icon,
          command: () =>
            editor.chain().focus().toggleHeading({ level: 1 }).run(),
          isActive: editorState.isHeading1,
        },
        {
          title: "Heading 2",
          Icon: Heading2Icon,
          command: () =>
            editor.chain().focus().toggleHeading({ level: 2 }).run(),
          isActive: editorState.isHeading2,
        },
        {
          title: "Heading 3",
          Icon: Heading3Icon,
          command: () =>
            editor.chain().focus().toggleHeading({ level: 3 }).run(),
          isActive: editorState.isHeading3,
        },
        {
          title: "Paragraph",
          Icon: PilcrowIcon,
          command: () => editor.chain().focus().setParagraph().run(),
          isActive: editorState.isParagraph,
        },
      ],
    },
    {
      title: "Lists",
      Icon: LucideList,
      isOpen: isListsOpen,
      command: () => setIsListsOpen(!isListsOpen),
      dropdowns: [
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
          title: "Check list",
          Icon: ListTodoIcon,
          command: () => editor.chain().focus().toggleTaskList().run(),
          isActive: editorState.isTaskList,
        },
      ],
    },
    {
      title: "Alignments",
      Icon: AlignCenterIcon,
      isOpen: isAlignOpen,
      command: () => setIsAlignOpen(!isAlignOpen),
      dropdowns: [
        {
          title: "Justify Left",
          Icon: AlignLeftIcon,
          command: () => editor.chain().focus().setTextAlign("left").run(),
          isActive: editorState.isAlignLeft,
        },
        {
          title: "Bullet list",
          Icon: ListIcon,
          command: () => editor.chain().focus().setTextAlign("right").run(),
          isActive: editorState.isAlignRight,
        },
        {
          title: "Check list",
          Icon: ListTodoIcon,
          command: () => editor.chain().focus().setTextAlign("center").run(),
          isActive: editorState.isAlignCenter,
        },
        {
          title: "Justify",
          Icon: AlignJustifyIcon,
          command: () => editor.chain().focus().setTextAlign("justify").run(),
          isActive: editorState.isJustify,
        },
      ],
    },
  ];

  return (
    <div className="space-x-0.5 flex items-center">
      {dropdownItems.map((item) => (
        <div key={item.title} className="relative">
          <Button
            variant={"outline"}
            size={"sm"}
            onClick={item.command}
            className="relative"
          >
            <item.Icon />
            {item.title === "Heading" &&
              (isHeadingsOpen ? <ChevronUpIcon /> : <ChevronDownIcon />)}

            {item.title === "Lists" &&
              (isListsOpen ? <ChevronUpIcon /> : <ChevronDownIcon />)}

            {item.title === "Alignments" &&
              (isAlignOpen ? <ChevronUpIcon /> : <ChevronDownIcon />)}
          </Button>

          {item.isOpen && (
            <div
              className="absolute left-0 translate-y-0.5 top-full bg-muted border rounded-md
            flex flex-col z-50 justify-start"
            >
              {item.dropdowns.map((subItem) => (
                <Button
                  variant={"outline"}
                  size={"sm"}
                  key={subItem.title}
                  onClick={subItem.command}
                  className="justify-start"
                >
                  <subItem.Icon />
                  <span>{subItem.title}</span>
                </Button>
              ))}
            </div>
          )}
          {(isHeadingsOpen || isListsOpen || isAlignOpen) && (
            <div
              className="fixed inset-0 top-0 min-w-screen max-w-screen z-30"
              onClick={() => {
                setIsListsOpen(false);
                setIsHeadingsOpen(false);
                setIsAlignOpen(false);
              }}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ToolbarDropdownButton;
