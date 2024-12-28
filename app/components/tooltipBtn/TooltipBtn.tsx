"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipB } from "@/utils/types/common";
import { useState } from "react";

function TooltipBtn({ data }: { data: TooltipB }) {
  const [tooltipText, setTooltipText] = useState(data.text);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const handleButtonClick = ({
    setTooltipText,
    actionText,
    initialText,
  }: {
    setTooltipText: (arg: string) => void;
    actionText: string;
    initialText: string;
  }) => {
    setTooltipText(actionText);
    setTimeout(() => {
      setTooltipText(initialText);
    }, 2000);
  };
  return (
    <TooltipProvider key={data.text}>
      <Tooltip open={isTooltipOpen}>
        <TooltipTrigger
          asChild
          onMouseEnter={() => setIsTooltipOpen(true)}
          onMouseLeave={() => setIsTooltipOpen(false)}
        >
          <div
            onClick={() => {
            if (typeof data?.action === "function") {
              data.action();
            }
              handleButtonClick({
                setTooltipText,
                actionText: data.actionText,
                initialText: data.text,
              });
            }}
            className="hover:bg-gray-200 rounded p-1"
          >
            <data.icon size={25} className={`${data.styles} cursor-pointer`} />
          </div>
        </TooltipTrigger>

        <TooltipContent>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
export default TooltipBtn;
