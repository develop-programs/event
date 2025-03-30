"use client";
import { useState, useCallback, useEffect } from "react";

export function useFullScreen() {
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Check if browser supports fullscreen
  const fullScreenAvailable =
    typeof document !== "undefined" &&
    (document.fullscreenEnabled ||
      (document as any).webkitFullscreenEnabled ||
      (document as any).mozFullScreenEnabled ||
      (document as any).msFullscreenEnabled);

  // Enter fullscreen
  const requestFullScreen = useCallback((element: HTMLElement = document.documentElement) => {
    if (!fullScreenAvailable) return;

    if (
      !document.fullscreenElement &&
      !(document as any).webkitFullscreenElement &&
      !(document as any).mozFullScreenElement &&
      !(document as any).msFullscreenElement
    ) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if ((element as any).webkitRequestFullscreen) {
        (element as any).webkitRequestFullscreen();
      } else if ((element as any).mozRequestFullScreen) {
        (element as any).mozRequestFullScreen();
      } else if ((element as any).msRequestFullscreen) {
        (element as any).msRequestFullscreen();
      }
    }
  }, [fullScreenAvailable]);

  // Only exit fullscreen with Alt+Escape or Alt+F11
  const exitFullScreen = useCallback(() => {
    if (!fullScreenAvailable) return;

    if (
      document.fullscreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).mozFullScreenElement ||
      (document as any).msFullscreenElement
    ) {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        (document as any).mozCancelFullScreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }

      setIsFullScreen(false);
    }
  }, [fullScreenAvailable]);

  // Monitor changes to fullscreen state and handle keydown events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(
        !!document.fullscreenElement ||
          !!(document as any).webkitFullscreenElement ||
          !!(document as any).mozFullScreenElement ||
          !!(document as any).msFullscreenElement
      );
    };

    // Handle keydown events to override default fullscreen exit behavior
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if we're in fullscreen mode
      const inFullScreen =
        !!document.fullscreenElement ||
        !!(document as any).webkitFullscreenElement ||
        !!(document as any).mozFullScreenElement ||
        !!(document as any).msFullscreenElement;

      if (inFullScreen) {
        // Prevent default exit behavior for Escape and F11
        if ((event.key === "Escape" || event.key === "F11") && !event.altKey) {
          event.preventDefault();
          event.stopPropagation();
          return false;
        }

        // Only exit with Alt+Escape or Alt+F11
        if (event.altKey && (event.key === "Escape" || event.key === "F11")) {
          exitFullScreen();
        }
      }
    };

    // Use capture phase to intercept events before they reach the document
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);
    document.addEventListener("keydown", handleKeyDown, true); // true for capture phase

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [exitFullScreen]);

  return {
    isFullScreen,
    exitFullScreen,
    fullScreenAvailable,
    requestFullScreen,
  };
}
