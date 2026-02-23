/* eslint-disable react-hooks/set-state-in-effect */
// components/CustomCursor.jsx
"use client";

import gsap from "gsap";
import { memo, useEffect, useRef, useState } from "react";

import {
  CURSOR_VARIANTS,
  DEFAULT_EMOJI,
  INTERACTIVE_SELECTORS,
} from "@/config/cursorConfig";

import { useCursorAnimation } from "@/hooks/cursor/useCursorAnimation";
import { useCursorEmoji } from "@/hooks/cursor/useCursorEmoji";
import { useCursorEvents } from "@/hooks/cursor/useCursorEvents";
import { useCursorPosition } from "@/hooks/cursor/useCursorPosition";
import { useCursorSound } from "@/hooks/cursor/useCursorSound";

import CrosshairCursor from "@/components/cursor/CrosshairCursor";
import CursorEmoji from "@/components/cursor/CursorEmoji";
import GlowCursor from "@/components/cursor/GlowCursor";
import PremiumCursor from "@/components/cursor/PremiumCursor";

const CustomCursor = memo(() => {
  const cursorRef = useRef(null);
  const [isEnabled, setIsEnabled] = useState(true);
  const [variant, setVariant] = useState(CURSOR_VARIANTS.EMOJI);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedEnabled = localStorage.getItem("customCursorEnabled");
    if (savedEnabled !== null) {
      setIsEnabled(savedEnabled !== "false");
    }
    const savedVariant = localStorage.getItem("cursorVariant");
    if (savedVariant) {
      setVariant(savedVariant);
    }
  }, []);
  const [emoji, setEmoji] = useState(DEFAULT_EMOJI);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [showRipple, setShowRipple] = useState(false);
  const [ripplePos, setRipplePos] = useState({ x: 0, y: 0 });

  // Manage Global CSS State - useLayoutEffect to prevent flicker
  useEffect(() => {
    if (isEnabled) {
      document.documentElement.classList.add("has-custom-cursor");
    } else {
      document.documentElement.classList.remove("has-custom-cursor");
    }
    return () => document.documentElement.classList.remove("has-custom-cursor");
  }, [isEnabled]);

  // Cursor Toggle & Variant Handler
  useEffect(() => {
    const handleToggle = (e) => {
      const isNowEnabled = e.detail.enabled;
      setIsEnabled(isNowEnabled);

      if (isNowEnabled) {
        setEmoji(DEFAULT_EMOJI);
        setIsHovering(false);
        setIsClicking(false);
        setShowRipple(false);
      } else if (cursorRef.current) {
        gsap.set(cursorRef.current, { clearProps: "all" });
      }
    };

    const handleVariantChange = (e) => {
      setVariant(e.detail.variant);
    };

    window.addEventListener("toggleCustomCursor", handleToggle);
    window.addEventListener("changeCursorVariant", handleVariantChange);
    return () => {
      window.removeEventListener("toggleCustomCursor", handleToggle);
      window.removeEventListener("changeCursorVariant", handleVariantChange);
    };
  }, []);

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
    if (!isEnabled) return;
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("click", handleClick);
    window.addEventListener("dblclick", handleDoubleClick);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("contextmenu", handleContextMenu);

    const interactiveElements = document.querySelectorAll(
      INTERACTIVE_SELECTORS,
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
    isEnabled,
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

  if (!isMounted || !isEnabled) return null;

  const renderCursor = () => {
    switch (variant) {
      case CURSOR_VARIANTS.EMOJI:
        return (
          <CursorEmoji
            cursorRef={cursorRef}
            emoji={emoji}
            isClicking={isClicking}
          />
        );
      case CURSOR_VARIANTS.PREMIUM:
        return (
          <PremiumCursor isHovering={isHovering} isClicking={isClicking} />
        );
      case CURSOR_VARIANTS.GLOW:
        return <GlowCursor isHovering={isHovering} />;
      case CURSOR_VARIANTS.CROSSHAIR:
        return (
          <CrosshairCursor isHovering={isHovering} isClicking={isClicking} />
        );
      default:
        return null;
    }
  };

  return <>{renderCursor()}</>;
});

CustomCursor.displayName = "CustomCursor";

export default CustomCursor;
