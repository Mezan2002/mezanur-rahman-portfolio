"use client";

import gsap from "gsap";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function NotFound() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Glitch Effect utilizing standard CSS/GSAP
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });

      tl.to(".glitch-text", {
        skewX: 20,
        duration: 0.1,
        ease: "power4.inOut",
      })
        .to(".glitch-text", {
          skewX: -20,
          x: -5,
          duration: 0.1,
          ease: "power4.inOut",
        })
        .to(".glitch-text", {
          skewX: 0,
          x: 0,
          duration: 0.1,
          ease: "power4.inOut",
        });

      // Reveal
      gsap.from(".reveal", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-screen w-full bg-dark-background flex flex-col justify-center items-center text-white overflow-hidden relative"
    >
      {/* Background Noise/Gradient */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[60vw] h-[60vh] bg-primary/5 rounded-full blur-[150px] pointer-events-none"></div>

      {/* 404 Content */}
      <div className="relative z-10 text-center">
        <h1 className="glitch-text text-[20vw] font-black font-syne leading-[0.8] mb-4 mix-blend-difference select-none">
          404
        </h1>
        <div className="reveal">
          <h2 className="text-2xl md:text-4xl font-bold font-syne uppercase tracking-wider mb-8">
            Lost in the Void?
          </h2>
          <p className="text-gray-400 max-w-md mx-auto mb-12">
            The page you are looking for has been moved, deleted, or never
            existed.
          </p>

          <Link
            href="/"
            className="group inline-flex items-center gap-4 px-8 py-4 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest font-bold text-sm"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
