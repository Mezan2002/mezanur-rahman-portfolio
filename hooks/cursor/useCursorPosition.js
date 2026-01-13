// hooks/useCursorPosition.js
import gsap from "gsap";
import { useCallback, useRef } from "react";

export function useCursorPosition(cursorRef) {
  const mousePos = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (cursorRef.current) {
        gsap.set(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
        });
      }
    },
    [cursorRef]
  );

  return { handleMouseMove, mousePos };
}
