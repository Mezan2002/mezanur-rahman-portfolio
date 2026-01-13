// components/LoadingScreen.jsx
"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const loaderRef = useRef(null);
  const progressRef = useRef(null);
  const textRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const loader = loaderRef.current;
    const progress = progressRef.current;
    const text = textRef.current;
    const overlay = overlayRef.current;

    if (!loader || !progress || !text || !overlay) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setIsLoading(false);
        document.body.style.overflow = "auto";
      },
    });

    // Prevent scroll during loading
    document.body.style.overflow = "hidden";

    // Animate progress
    tl.to(progress, {
      scaleX: 1,
      duration: 2,
      ease: "power2.inOut",
    })
      // Animate counter
      .to(
        {},
        {
          duration: 2,
          onUpdate: function () {
            const progress = Math.round(this.progress() * 100);
            if (text) text.textContent = `${progress}%`;
          },
        },
        "<"
      )
      // Fade out loader
      .to(loader, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
      })
      // Slide up overlay
      .to(
        overlay,
        {
          yPercent: -100,
          duration: 0.8,
          ease: "power4.inOut",
        },
        "-=0.3"
      );
  }, []);

  if (!isLoading) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[99999] bg-[#0a0a0a] flex items-center justify-center"
    >
      <div ref={loaderRef} className="text-center">
        {/* Logo/Text */}
        <h1 className="text-6xl md:text-8xl font-black text-gradient mb-8">
          PORTFOLIO
        </h1>

        {/* Progress Bar */}
        <div className="w-64 md:w-96 h-0.5 bg-white/10 rounded-full overflow-hidden mx-auto mb-4">
          <div
            ref={progressRef}
            className="h-full bg-gradient-to-r from-primary to-secondary origin-left"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        {/* Percentage */}
        <p ref={textRef} className="text-primary text-2xl font-bold">
          0%
        </p>
      </div>
    </div>
  );
}
