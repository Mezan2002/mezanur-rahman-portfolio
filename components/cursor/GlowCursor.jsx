"use client";

import gsap from "gsap";
import { memo, useEffect, useRef } from "react";

const GlowCursor = memo(({ isHovering }) => {
  const glowRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const xSet = gsap.quickSetter(glowRef.current, "x", "px");
    const ySet = gsap.quickSetter(glowRef.current, "y", "px");

    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);

    gsap.ticker.add(() => {
      const dt = 1.0 - Math.pow(1.0 - 0.1, gsap.ticker.deltaRatio());
      const currentX = gsap.getProperty(glowRef.current, "x");
      const currentY = gsap.getProperty(glowRef.current, "y");

      const nextX = currentX + (mouse.current.x - currentX) * dt;
      const nextY = currentY + (mouse.current.y - currentY) * dt;

      xSet(nextX);
      ySet(nextY);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    gsap.to(glowRef.current, {
      scale: isHovering ? 2.5 : 1,
      opacity: isHovering ? 0.8 : 0.4,
      duration: 0.5,
      ease: "power2.out",
    });
  }, [isHovering]);

  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 w-32 h-32 rounded-full pointer-events-none z-99999 -translate-x-1/2 -translate-y-1/2"
      style={{
        background:
          "radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%)",
        filter: "blur(20px)",
        willChange: "transform, opacity",
        mixBlendMode: "screen",
      }}
    />
  );
});

GlowCursor.displayName = "GlowCursor";

export default GlowCursor;
