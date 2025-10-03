"use client";
import { debounce } from "lodash";
import React, { useCallback } from "react";
import { Editor } from "@tiptap/react";
import { HexColorPicker } from "react-colorful";
import { HighlighterIcon, PaletteIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { EditorActiveState } from "@/utils/types";

interface ColorToolProps {
  editor: Editor;
  editorState: EditorActiveState;
}

const ColorSeterButtons = ({ editor, editorState }: ColorToolProps) => {
  const colorTools = [
    {
      title: "Text Color",
      Icon: PaletteIcon,
      current: editorState.currentTextColor,
      type: "text",
    },
    {
      title: "Highlight Color",
      Icon: HighlighterIcon,
      current: editorState.currentBgColor,
      type: "bg",
    },
  ];

  const handleColorChange = useCallback(
    debounce((type: string, color: string) => {
      type === "bg"
        ? editor.chain().focus().setBackgroundColor(color).run()
        : editor.chain().focus().setColor(color).run();
    }, 300),
    [editor]
  );
  return (
    <div>
      {colorTools.map((item) => (
        <Popover key={item.title}>
          <PopoverTrigger asChild>
            <Button
              variant={"ghost"}
              size={"sm"}
              className={`${item.current && "border"}`}
              style={{
                borderColor: item.current || "transparent",
                color: item.current || "inherit",
              }}
            >
              <item.Icon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-fit">
            <HexColorPicker
              color={item.current}
              onChange={(color: string) => handleColorChange(item.type, color)}
            />
          </PopoverContent>
        </Popover>
      ))}
    </div>
  );
};

export default ColorSeterButtons;
