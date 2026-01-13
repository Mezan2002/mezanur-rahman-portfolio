"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

export default function Preloader() {
  const containerRef = useRef(null);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("hasLoadedSession");

    if (hasLoaded) {
      setComplete(true);
      window.dispatchEvent(new CustomEvent("preloader-complete"));
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setComplete(true);
          sessionStorage.setItem("hasLoadedSession", "true");
        },
      });

      // 1. Counter Animation
      const counterObj = { value: 0 };
      tl.to(counterObj, {
        value: 100,
        duration: 2.0,
        ease: "power3.inOut",
        onUpdate: () => {
          const counter = document.getElementById("loader-counter");
          if (counter) {
            counter.textContent = Math.floor(counterObj.value);
          }
        },
      });

      // 2. Counter Exit (Fade Out)
      tl.to(["#loader-counter", ".loader-text"], {
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => {
          // Signal Template to start its sequence
          window.dispatchEvent(new CustomEvent("preloader-complete"));
        },
      });

      // 3. Brief hold to ensure smooth handoff
      tl.to({}, { duration: 0.2 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (complete) return null;

  return (
    <div
      ref={containerRef}
      className="loader-overlay fixed inset-0 z-99999 bg-dark-background flex items-end justify-end pointer-events-none px-4 md:px-12 pb-0 md:pb-4 overflow-hidden"
    >
      <div className="relative z-10 overflow-hidden">
        <span
          id="loader-counter"
          className="block font-black font-syne text-[30vw] leading-[0.8] text-white mix-blend-difference tracking-tighter"
        >
          0
        </span>
      </div>
    </div>
  );
}
