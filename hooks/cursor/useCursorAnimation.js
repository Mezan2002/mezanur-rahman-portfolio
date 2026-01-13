// hooks/useCursorAnimation.js
import gsap from "gsap";
import { useCallback } from "react";

export function useCursorAnimation(cursorRef) {
  const animateHover = useCallback(() => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        scale: 1.5,
        rotation: 360,
        duration: 0.4,
        ease: "back.out(1.7)",
      });
    }
  }, [cursorRef]);

  const animateLeave = useCallback(() => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
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
          scale: isHovering ? 1.5 : 1,
          duration: 0.2,
          ease: "elastic.out(1, 0.5)",
        });
      }
    },
    [cursorRef]
  );

  const animateDoubleClick = useCallback(
    (isHovering) => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          scale: 2,
          rotation: 720,
          duration: 0.5,
          ease: "back.out(2)",
          onComplete: () => {
            gsap.to(cursorRef.current, {
              scale: isHovering ? 1.5 : 1,
              rotation: 0,
              duration: 0.3,
            });
          },
        });
      }
    },
    [cursorRef]
  );

  return {
    animateHover,
    animateLeave,
    animateDown,
    animateUp,
    animateDoubleClick,
  };
}
