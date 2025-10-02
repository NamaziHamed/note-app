"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { EditorActiveState } from "@/utils/types";
import { Editor } from "@tiptap/react";
import {
  Heading,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ListIcon,
  ListOrderedIcon,
  ListTodoIcon,
  LucideList,
} from "lucide-react";

const ToolbarDropdownButton = ({
  editorState,
  editor,
}: {
  editorState: EditorActiveState;
  editor: Editor;
}) => {
  const [headingsOpen, setHeadingsOpen] = useState(false);
  const [listsOpen, setlistsOpen] = useState(false);

  const dropdownItems = [
    {
      title: "Heading",
      Icon: Heading,
      isOpen: headingsOpen,
      command: () => setHeadingsOpen(!headingsOpen),
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
      ],
    },
    {
      title: "Lists",
      Icon: LucideList,
      isOpen: listsOpen,
      command: () => setlistsOpen(!listsOpen),
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
  ];

  return (
    <>
      {dropdownItems.map((item) => (
        <div key={item.title} className="relative">
          <Button
            variant={"outline"}
            size={"sm"}
            onClick={item.command}
            className="relative"
          >
            <item.Icon />
            <span>{item.title}</span>
          </Button>

          {item.isOpen && (
            <div
              className="absolute left-0 translate-y-0.5 top-full bg-muted border rounded-md
            flex flex-col z-50"
            >
              {item.dropdowns.map((subItem) => (
                <Button
                  variant={"outline"}
                  size={"sm"}
                  key={subItem.title}
                  onClick={subItem.command}
                >
                  <subItem.Icon />
                  <span>{subItem.title}</span>
                </Button>
              ))}
            </div>
          )}
          {(headingsOpen || listsOpen) && (
            <div
              className="fixed inset-0 top-0 min-w-screen max-w-screen z-30"
              onClick={() => {
                setlistsOpen(false);
                setHeadingsOpen(false);
              }}
            ></div>
          )}
        </div>
      ))}
    </>
  );
};

export default ToolbarDropdownButton;
