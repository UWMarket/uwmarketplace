import React from "react";
import { Button } from "./ui/button";
import { MessageCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface MessageButtonProps {
  sellerId: string;
  onMessage?: (sellerId: string) => void;
  variant?:
    | "default"
    | "ghost"
    | "outline"
    | "secondary"
    | "destructive"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  showTooltip?: boolean;
}

const MessageButton = ({
  sellerId,
  onMessage = () => {},
  variant = "ghost",
  size = "icon",
  className = "",
  showTooltip = true,
}: MessageButtonProps) => {
  const handleMessageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMessage(sellerId);
  };

  const button = (
    <Button
      variant={variant}
      size={size}
      className={`${className}`}
      onClick={handleMessageClick}
    >
      <MessageCircle className="h-5 w-5 text-gray-500" />
    </Button>
  );

  if (!showTooltip) {
    return button;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent>
          <p>Message seller</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default MessageButton;
