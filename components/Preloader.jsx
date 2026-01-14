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
        onUpdate: function () {
          // Progress calculation based on the fills portion of the timeline
          // Since the timeline has other parts (delay, exit), we calculate progress
          // based on the total progress of the two fill animations.
          const progress = Math.floor(this.progress() * 100);
          const counter = document.getElementById("loader-percentage");
          if (counter) counter.textContent = `${progress}%`;
        },
      });

      // 1. Sequential Text Fill Animation
      tl.to("#fill-mezanur", {
        clipPath: "inset(0 0% 0 0)",
        duration: 2.5,
        delay: 0.5,
        ease: "power1.inOut",
      }).to(
        "#fill-rahman",
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 2.5,
          ease: "power1.inOut",
        },
        ">"
      );

      // 2. Text Exit (Slide Up & Fade Out)
      tl.to(["#loader-text-wrapper", "#loader-percentage"], {
        y: -50,
        opacity: 0,
        duration: 2,
        ease: "power4.inOut",
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
      className="loader-overlay fixed inset-0 z-99999 bg-dark-background flex flex-col items-center justify-center pointer-events-none px-4 md:px-12 overflow-hidden"
    >
      <div
        id="loader-text-wrapper"
        className="relative flex flex-col items-center"
      >
        {/* Line 1: Mezanur */}
        <div className="relative overflow-hidden mb-4 px-6 py-2">
          {/* Base Layer */}
          <h1 className="block font-black font-syne text-[15vw] md:text-[12vw] leading-none text-white uppercase tracking-wider select-none">
            Mezanur
          </h1>
          {/* Solid Fill Layer with White Background */}
          <div
            id="fill-mezanur"
            className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden bg-white"
            style={{ clipPath: "inset(0 100% 0 0)" }}
          >
            <h1 className="block font-black font-syne text-[15vw] md:text-[12vw] leading-none text-black uppercase tracking-wider select-none">
              Mezanur
            </h1>
          </div>
        </div>

        {/* Line 2: Rahman */}
        <div className="relative overflow-hidden px-6 py-2">
          {/* Base Layer */}
          <h1 className="block font-black font-syne text-[15vw] md:text-[12vw] leading-none text-white uppercase tracking-wider select-none">
            Rahman
          </h1>
          {/* Solid Fill Layer with White Background */}
          <div
            id="fill-rahman"
            className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden bg-white"
            style={{ clipPath: "inset(0 100% 0 0)" }}
          >
            <h1 className="block font-black font-syne text-[15vw] md:text-[12vw] leading-none text-black uppercase tracking-wider select-none">
              Rahman
            </h1>
          </div>
        </div>
      </div>

      {/* Numerical Progress Indicator */}
      <div
        id="loader-percentage"
        className="mt-12 font-mono text-gray-600 text-lg tracking-[0.5em] uppercase opacity-40"
      >
        0%
      </div>
    </div>
  );
}
