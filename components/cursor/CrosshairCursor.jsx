"use client";

import gsap from "gsap";
import { memo, useEffect, useRef } from "react";

const CrosshairCursor = memo(({ isHovering, isClicking }) => {
  const containerRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const xSet = gsap.quickSetter(containerRef.current, "x", "px");
    const ySet = gsap.quickSetter(containerRef.current, "y", "px");

    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      xSet(e.clientX);
      ySet(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    gsap.to(".crosshair-line-h", {
      width: isHovering ? "40px" : "20px",
      opacity: isHovering ? 1 : 0.5,
      duration: 0.3,
    });
    gsap.to(".crosshair-line-v", {
      height: isHovering ? "40px" : "20px",
      opacity: isHovering ? 1 : 0.5,
      duration: 0.3,
    });
  }, [isHovering]);

  useEffect(() => {
    if (isClicking) {
      gsap.to(containerRef.current, {
        rotate: 45,
        scale: 0.8,
        duration: 0.1,
      });
    } else {
      gsap.to(containerRef.current, {
        rotate: 0,
        scale: 1,
        duration: 0.2,
      });
    }
  }, [isClicking]);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 pointer-events-none z-99999 mix-blend-difference"
      style={{ willChange: "transform" }}
    >
      <div className="crosshair-line-h absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-px bg-white opacity-50" />
      <div className="crosshair-line-v absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-5 bg-white opacity-50" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full" />
    </div>
  );
});

CrosshairCursor.displayName = "CrosshairCursor";

export default CrosshairCursor;
