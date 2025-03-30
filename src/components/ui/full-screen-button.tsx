"use client";

import { Button } from "@/components/ui/button";
import { useFullScreen } from "@/hooks/useFullScreen";
import { Maximize2, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface FullScreenButtonProps {
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

export function FullScreenButton({ 
  className, 
  variant = "outline",
  size = "icon" 
}: FullScreenButtonProps) {
  const { isFullScreen, exitFullScreen, requestFullScreen, fullScreenAvailable } = useFullScreen();

  // Don't render if fullscreen is not available in the browser
  if (!fullScreenAvailable) {
    return null;
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={isFullScreen ? exitFullScreen : () => requestFullScreen()}
      className={cn("transition-all duration-200", className)}
      title={isFullScreen ? "Exit fullscreen" : "Enter fullscreen"}
      aria-label={isFullScreen ? "Exit fullscreen" : "Enter fullscreen"}
    >
      {isFullScreen ? (
        <Minimize2 className="size-4" />
      ) : (
        <Maximize2 className="size-4" />
      )}
    </Button>
  );
}
