// hooks/useCursorEvents.js
import { CELEBRATION_EMOJIS, DEFAULT_EMOJI } from "@/config/cursorConfig";
import { useCallback } from "react";

export function useCursorEvents({
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
}) {
  const handleMouseEnter = useCallback(
    (e) => {
      const target = e.target;
      const newEmoji = getEmojiForElement(target);

      setEmoji(newEmoji);
      setIsHovering(true);
      playSound("hover");
      animateHover();
    },
    [getEmojiForElement, playSound, animateHover, setEmoji, setIsHovering]
  );

  const handleMouseLeave = useCallback(() => {
    setEmoji(DEFAULT_EMOJI);
    setIsHovering(false);
    animateLeave();
  }, [animateLeave, setEmoji, setIsHovering]);

  const handleMouseDown = useCallback(() => {
    setEmoji("👇");
    setIsClicking(true);
    animateDown();
  }, [animateDown, setEmoji, setIsClicking]);

  const handleMouseUp = useCallback(() => {
    const element = document.elementFromPoint(
      mousePos.current.x,
      mousePos.current.y
    );
    setEmoji(isHovering ? getEmojiForElement(element) : DEFAULT_EMOJI);
    setIsClicking(false);
    animateUp(isHovering);
  }, [
    isHovering,
    getEmojiForElement,
    animateUp,
    mousePos,
    setEmoji,
    setIsClicking,
  ]);

  const handleClick = useCallback(
    (e) => {
      setRipplePos({ x: e.clientX, y: e.clientY });
      setShowRipple(true);
      playSound("click");

      const randomEmoji =
        CELEBRATION_EMOJIS[
          Math.floor(Math.random() * CELEBRATION_EMOJIS.length)
        ];
      setEmoji(randomEmoji);

      setTimeout(() => {
        const element = document.elementFromPoint(
          mousePos.current.x,
          mousePos.current.y
        );
        setEmoji(isHovering ? getEmojiForElement(element) : DEFAULT_EMOJI);
      }, 300);

      setTimeout(() => {
        setShowRipple(false);
      }, 600);
    },
    [
      isHovering,
      getEmojiForElement,
      playSound,
      mousePos,
      setEmoji,
      setRipplePos,
      setShowRipple,
    ]
  );

  const handleDoubleClick = useCallback(() => {
    playSound("doubleclick");
    setEmoji("💝");
    animateDoubleClick(isHovering);

    setTimeout(() => {
      const element = document.elementFromPoint(
        mousePos.current.x,
        mousePos.current.y
      );
      setEmoji(isHovering ? getEmojiForElement(element) : DEFAULT_EMOJI);
    }, 700);
  }, [
    isHovering,
    getEmojiForElement,
    playSound,
    animateDoubleClick,
    mousePos,
    setEmoji,
  ]);

  const handleScroll = useCallback(() => {
    if (!isHovering) {
      setEmoji("📜");

      if (window.scrollTimeout) {
        clearTimeout(window.scrollTimeout);
      }

      window.scrollTimeout = setTimeout(() => {
        setEmoji(DEFAULT_EMOJI);
      }, 150);
    }
  }, [isHovering, setEmoji]);

  const handleContextMenu = useCallback(
    (e) => {
      e.preventDefault();
      setEmoji("🤔");
      playSound("hover");

      setTimeout(() => {
        const element = document.elementFromPoint(
          mousePos.current.x,
          mousePos.current.y
        );
        setEmoji(isHovering ? getEmojiForElement(element) : DEFAULT_EMOJI);
      }, 500);
    },
    [isHovering, getEmojiForElement, playSound, mousePos, setEmoji]
  );

  return {
    handleMouseEnter,
    handleMouseLeave,
    handleMouseDown,
    handleMouseUp,
    handleClick,
    handleDoubleClick,
    handleScroll,
    handleContextMenu,
  };
}
