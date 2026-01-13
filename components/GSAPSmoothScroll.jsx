// components/GSAPSmoothScroll.jsx
"use client";

import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

export default function GSAPSmoothScroll({ children }) {
  const smootherRef = useRef(null);

  useEffect(() => {
    // Only initialize on client
    if (typeof window === "undefined") return;

    try {
      const smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.5,
        effects: true,
        smoothTouch: 0.1,
      });

      smootherRef.current = smoother;

      return () => {
        smoother?.kill();
      };
    } catch (error) {
      console.error("ScrollSmoother error:", error);
    }
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
