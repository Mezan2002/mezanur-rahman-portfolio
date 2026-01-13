"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function Hero() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const runAnimation = () => {
        const tl = gsap.timeline({ delay: 0.2 });

        // Staggered reveal for text
        tl.fromTo(
          ".hero-text",
          {
            y: 80,
            rotateX: -45,
            opacity: 0,
            filter: "blur(10px)",
          },
          {
            y: 0,
            rotateX: 0,
            opacity: 1,
            filter: "blur(0px)",
            stagger: 0.1,
            duration: 1.2,
            ease: "power4.out",
          }
        ).fromTo(
          ".scroll-indicator",
          { y: -10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.5"
        );
      };

      if (window.isPageReady) {
        runAnimation();
      } else {
        window.addEventListener("page-transition-complete", runAnimation);
        return () =>
          window.removeEventListener("page-transition-complete", runAnimation);
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="h-screen w-full flex flex-col justify-center items-center px-4 md:px-12 bg-dark-background relative overflow-hidden"
    >
      {/* Background gradients */}
      {/* Top Right Highlight - Near Menu */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-primary/10 rounded-full blur-[120px] pointer-events-none translate-x-1/4 -translate-y-1/4"></div>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto flex-1 flex flex-col justify-center items-center">
        {/* Main Heading - Centered Stack */}
        <div className="flex flex-col items-center leading-[0.9] mt-0 text-center">
          {/* Line 1 */}
          <div className="overflow-hidden">
            <h1 className="hero-text text-[15vw] md:text-[12vw] font-black font-syne text-white uppercase tracking-tighter mix-blend-difference">
              Creative
            </h1>
          </div>

          {/* Line 2 - Solid Background */}
          <div className="overflow-hidden">
            <h1 className="hero-text inline-block text-[15vw] md:text-[12vw] font-black font-syne text-black bg-white px-4 md:px-8 py-0 md:py-2 uppercase tracking-tighter transform shadow-2xl shadow-white/10 hover:shadow-white/20 transition-shadow duration-500 cursor-default">
              Developer
            </h1>
          </div>

          {/* Line 3 - Outlined */}
          <div className="overflow-hidden">
            <h1
              className="hero-text inline-block text-[15vw] md:text-[12vw] font-black font-syne text-transparent uppercase tracking-tighter hover:text-white/10 transition-colors duration-500 cursor-default"
              style={{ WebkitTextStroke: "2px rgba(255, 255, 255, 0.3)" }}
            >
              & Designer
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
