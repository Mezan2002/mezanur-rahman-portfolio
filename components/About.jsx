"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Code2, Rocket, Zap } from "lucide-react";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const runAnimations = () => {
      const ctx = gsap.context(() => {
        // Header Text Reveal
        gsap.fromTo(
          ".about-header-text",
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            },
          }
        );

        // Grid Reveal
        gsap.fromTo(
          ".swiss-card",
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".swiss-grid",
              start: "top 80%",
            },
          }
        );
      }, sectionRef);

      return () => ctx.revert();
    };

    if (window.isPageReady) {
      runAnimations();
    } else {
      window.addEventListener("page-transition-complete", runAnimations);
      return () =>
        window.removeEventListener("page-transition-complete", runAnimations);
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-32 px-6 md:px-12 bg-dark-background relative"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Massive Header */}
        <div className="mb-24 flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-12">
          <div className="overflow-hidden">
            <h2 className="about-header-text text-[10vw] md:text-[6vw] font-black font-syne text-white uppercase leading-[0.8] tracking-tighter">
              About
              <span className="text-gray-600"> Me.</span>
            </h2>
          </div>
          <div className="about-header-text mt-8 md:mt-0 max-w-md text-right">
            <p className="text-xl text-gray-400 font-light leading-relaxed">
              I architect digital solutions that merge robust engineering with
              cutting-edge design.
            </p>
          </div>
        </div>

        {/* The Symmetrical Grid */}
        <div className="swiss-grid grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10 overflow-hidden">
          {/* 1. Engineering */}
          <div className="swiss-card bg-dark-background p-12 md:p-16 flex flex-col justify-between group hover:bg-white/[0.02] transition-colors min-h-[400px]">
            <div className="flex justify-between items-start">
              <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-500">
                <Code2 size={32} strokeWidth={1.5} />
              </div>
              <span className="font-mono text-sm text-gray-500">01</span>
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Engineering
              </h3>
              <p className="text-gray-400 leading-relaxed hover:text-white transition-colors">
                Scalable, type-safe architecture using Next.js and TypeScript.
              </p>
            </div>
          </div>

          {/* 2. Interaction */}
          <div className="swiss-card bg-dark-background p-12 md:p-16 flex flex-col justify-between group hover:bg-white/[0.02] transition-colors min-h-[400px]">
            <div className="flex justify-between items-start">
              <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-500">
                <Zap size={32} strokeWidth={1.5} />
              </div>
              <span className="font-mono text-sm text-gray-500">02</span>
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Interaction
              </h3>
              <p className="text-gray-400 leading-relaxed hover:text-white transition-colors">
                Immersive animations with GSAP and WebGL for deep engagement.
              </p>
            </div>
          </div>

          {/* 3. Performance */}
          <div className="swiss-card bg-dark-background p-12 md:p-16 flex flex-col justify-between group hover:bg-white/[0.02] transition-colors min-h-[400px]">
            <div className="flex justify-between items-start">
              <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-500">
                <Rocket size={32} strokeWidth={1.5} />
              </div>
              <span className="font-mono text-sm text-gray-500">03</span>
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Performance
              </h3>
              <p className="text-gray-400 leading-relaxed hover:text-white transition-colors">
                99+ Lighthouse scores. Speed as a fundamental feature.
              </p>
            </div>
          </div>

          {/* 4. Contact / Status  */}
          <div className="swiss-card bg-dark-background p-12 md:p-16 flex flex-col justify-between group hover:bg-white/[0.02] transition-colors min-h-[400px]">
            <div className="flex justify-between items-start">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border border-green-500/30 flex items-center justify-center">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                </div>
              </div>
              <span className="font-mono text-sm text-gray-500">04</span>
            </div>
            <div>
              <span className="text-xs font-mono text-green-500 uppercase tracking-widest block mb-2">
                Based in Dhaka
              </span>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Available for Work
              </h3>
              <div className="flex items-center gap-2 text-white group-hover:gap-4 transition-all">
                <span className="border-b border-white">Contact Me</span>
                <ArrowRight size={18} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
