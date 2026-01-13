// components/ScrollProgress.jsx
"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
  const progressRef = useRef(null);

  useEffect(() => {
    const progress = progressRef.current;
    if (!progress) return;

    const ctx = gsap.context(() => {
      gsap.to(progress, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      });
    }, progressRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-9998 pointer-events-none">
      <div
        ref={progressRef}
        className="h-full from-primary via-secondary origin-left"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
