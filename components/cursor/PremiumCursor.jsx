"use client";

import gsap from "gsap";
import { memo, useEffect, useRef } from "react";

const PremiumCursor = memo(({ isHovering, isClicking }) => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const xSetDot = gsap.quickSetter(dotRef.current, "x", "px");
    const ySetDot = gsap.quickSetter(dotRef.current, "y", "px");
    const xSetRing = gsap.quickSetter(ringRef.current, "x", "px");
    const ySetRing = gsap.quickSetter(ringRef.current, "y", "px");

    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      xSetDot(e.clientX);
      ySetDot(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    gsap.ticker.add(() => {
      const dt = 1.0 - Math.pow(1.0 - 0.15, gsap.ticker.deltaRatio());

      const currentX = gsap.getProperty(ringRef.current, "x");
      const currentY = gsap.getProperty(ringRef.current, "y");

      const nextX = currentX + (mouse.current.x - currentX) * dt;
      const nextY = currentY + (mouse.current.y - currentY) * dt;

      xSetRing(nextX);
      ySetRing(nextY);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Handle Hover/Click animations
  useEffect(() => {
    if (isHovering) {
      gsap.to(ringRef.current, {
        scale: 1.5,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        duration: 0.3,
      });
      gsap.to(dotRef.current, {
        scale: 0.5,
        duration: 0.3,
      });
    } else {
      gsap.to(ringRef.current, {
        scale: 1,
        backgroundColor: "transparent",
        duration: 0.3,
      });
      gsap.to(dotRef.current, {
        scale: 1,
        duration: 0.3,
      });
    }
  }, [isHovering]);

  useEffect(() => {
    if (isClicking) {
      gsap.to([dotRef.current, ringRef.current], {
        scale: 0.8,
        duration: 0.1,
      });
    } else {
      gsap.to([dotRef.current, ringRef.current], {
        scale: isHovering ? 1.5 : 1,
        duration: 0.2,
      });
    }
  }, [isClicking, isHovering]);

  return (
    <>
      {/* Outer Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 border border-white/30 rounded-full pointer-events-none z-99999 -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{ willChange: "transform" }}
      />
      {/* Inner Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-99999 -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{ willChange: "transform" }}
      />
    </>
  );
});

PremiumCursor.displayName = "PremiumCursor";

export default PremiumCursor;
