"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { EditorActiveState } from "@/utils/types";
import { Editor } from "@tiptap/react";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  ChevronDownIcon,
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
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleMenuToggle = (title: string) => {
    setOpenMenu((current) => (current === title ? null : title));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };

    if (openMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenu]);

  const dropdownItems = [
    {
      title: "Heading",
      Icon: Heading,
      isOpen: openMenu === "Heading",
      command: () => handleMenuToggle("Heading"),
      dropdowns: [
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
      isOpen: openMenu === "Lists",
      command: () => handleMenuToggle("Lists"),
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
      isOpen: openMenu === "Alignments",
      command: () => handleMenuToggle("Alignments"),
      dropdowns: [
        {
          title: "Justify Left",
          Icon: AlignLeftIcon,
          command: () => editor.chain().focus().setTextAlign("left").run(),
          isActive: editorState.isAlignLeft,
        },
        {
          title: "Align Right",
          Icon: AlignRightIcon,
          command: () => editor.chain().focus().setTextAlign("right").run(),
          isActive: editorState.isAlignRight,
        },
        {
          title: "Align Center",
          Icon: AlignCenterIcon,
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
    <div className="space-x-0.5 flex items-center" ref={dropdownRef}>
      {dropdownItems.map((item) => (
        <div key={item.title} className="relative">
          <Button
            variant={"ghost"}
            size={"sm"}
            onClick={item.command}
            className="flex items-center gap-1"
          >
            <item.Icon className="w-4 h-4" />
            <ChevronDownIcon
              className={`w-3 h-3 transition-transform ${
                item.isOpen ? "rotate-180" : ""
              }`}
            />
          </Button>

          {item.isOpen && (
            <div
              className="absolute right-0 mt-1 top-full bg-muted border rounded-md
             flex flex-col z-50 justify-start shadow-lg"
            >
              {item.dropdowns.map((subItem) => (
                <Button
                  variant={subItem.isActive ? "secondary" : "ghost"}
                  size={"sm"}
                  key={subItem.title}
                  onClick={() => {
                    subItem.command();
                    setOpenMenu(null); // Close menu after selection
                  }}
                  className="justify-start gap-2 px-2"
                >
                  <subItem.Icon className="w-4 h-4" />
                  <span>{subItem.title}</span>
                </Button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ToolbarDropdownButton;

