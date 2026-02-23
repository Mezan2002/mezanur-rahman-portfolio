// hooks/useCursorAnimation.js
import gsap from "gsap";
import { useCallback } from "react";

export function useCursorAnimation(cursorRef) {
  const animateHover = useCallback(() => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        scale: 1.2,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [cursorRef]);

  const animateLeave = useCallback(() => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  }, [cursorRef]);

  const animateDown = useCallback(() => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        scale: 0.7,
        duration: 0.1,
        ease: "power2.in",
      });
    }
  }, [cursorRef]);

  const animateUp = useCallback(
    (isHovering) => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          scale: isHovering ? 1.2 : 1,
          duration: 0.2,
          ease: "power2.out",
        });
      }
    },
    [cursorRef],
  );

  const animateDoubleClick = useCallback(
    (isHovering) => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          scale: 1.5,
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => {
            gsap.to(cursorRef.current, {
              scale: isHovering ? 1.2 : 1,
              duration: 0.2,
            });
          },
        });
      }
    },
    [cursorRef],
  );

  return {
    animateHover,
    animateLeave,
    animateDown,
    animateUp,
    animateDoubleClick,
  };
}
