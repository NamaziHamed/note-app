import React, { ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";

interface IToolbarButtonProps {
  title: string;
  command: () => void;
  isActive: boolean;
  children: ReactNode;
}

const ToolbarButton = ({
  title,
  command,
  isActive,
  children,
}: IToolbarButtonProps) => {
  return (
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
          }  transition-all duration-300 cursor-pointer disabled:bg-gray-700`}
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{title}</TooltipContent>
    </Tooltip>
  );
};

export default ToolbarButton;
