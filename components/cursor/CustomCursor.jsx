// components/CustomCursor.jsx
"use client";

import { memo, useEffect, useRef, useState } from "react";

import { DEFAULT_EMOJI, INTERACTIVE_SELECTORS } from "@/config/cursorConfig";

import { useCursorAnimation } from "@/hooks/cursor/useCursorAnimation";
import { useCursorEmoji } from "@/hooks/cursor/useCursorEmoji";
import { useCursorEvents } from "@/hooks/cursor/useCursorEvents";
import { useCursorPosition } from "@/hooks/cursor/useCursorPosition";
import { useCursorSound } from "@/hooks/cursor/useCursorSound";

import CursorEmoji from "@/components/cursor/CursorEmoji";
import CursorRipple from "@/components/cursor/CursorRipple";

const CustomCursor = memo(() => {
  const cursorRef = useRef(null);
  const [emoji, setEmoji] = useState(DEFAULT_EMOJI);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [showRipple, setShowRipple] = useState(false);
  const [ripplePos, setRipplePos] = useState({ x: 0, y: 0 });

  // Custom hooks
  const { playSound } = useCursorSound();
  const { getEmojiForElement } = useCursorEmoji();
  const { handleMouseMove, mousePos } = useCursorPosition(cursorRef);
  const {
    animateHover,
    animateLeave,
    animateDown,
    animateUp,
    animateDoubleClick,
  } = useCursorAnimation(cursorRef);

  // Event handlers
  const {
    handleMouseEnter,
    handleMouseLeave,
    handleMouseDown,
    handleMouseUp,
    handleClick,
    handleDoubleClick,
    handleScroll,
    handleContextMenu,
  } = useCursorEvents({
    setEmoji,
    setIsHovering,
    setIsClicking,
    setShowRipple,
    setRipplePos,
    getEmojiForElement,
    playSound,
    animateHover,
    animateLeave,
    animateDown,
    animateUp,
    animateDoubleClick,
    mousePos,
    isHovering,
  });

  // Setup event listeners
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("click", handleClick);
    window.addEventListener("dblclick", handleDoubleClick);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("contextmenu", handleContextMenu);

    const interactiveElements = document.querySelectorAll(
      INTERACTIVE_SELECTORS
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    // Observer for dynamically added elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1 && node.matches?.(INTERACTIVE_SELECTORS)) {
            node.addEventListener("mouseenter", handleMouseEnter);
            node.addEventListener("mouseleave", handleMouseLeave);
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("dblclick", handleDoubleClick);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("contextmenu", handleContextMenu);

      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });

      observer.disconnect();
    };
  }, [
    handleMouseMove,
    handleMouseDown,
    handleMouseUp,
    handleClick,
    handleDoubleClick,
    handleScroll,
    handleContextMenu,
    handleMouseEnter,
    handleMouseLeave,
  ]);

  return (
    <>
      <CursorEmoji
        cursorRef={cursorRef}
        emoji={emoji}
        isClicking={isClicking}
      />
      {showRipple && <CursorRipple x={ripplePos.x} y={ripplePos.y} />}
    </>
  );
});

CustomCursor.displayName = "CustomCursor";

export default CustomCursor;
