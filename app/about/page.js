"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Code, Cpu, Layers } from "lucide-react";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax Image
      gsap.to(".cover-image", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: ".cover-container",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Text Reveals
      const headings = gsap.utils.toArray(".reveal-text");
      headings.forEach((h) => {
        gsap.from(h, {
          y: 50,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: h,
            start: "top 85%",
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="bg-dark-background min-h-screen">
      {/* 1. EDITORIAL COVER */}
      <section className="cover-container relative h-[70vh] md:h-[85vh] overflow-hidden w-full">
        <div className="absolute inset-0 cover-image scale-110">
          <Image
            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2000"
            alt="Workspace"
            fill
            className="object-cover brightness-[0.4]"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark-background to-transparent"></div>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-10 flex flex-col md:flex-row justify-between items-end">
          <div>
            <h1 className="text-[12vw] md:text-[10vw] font-black font-syne text-white uppercase leading-[0.85] tracking-tighter">
              Mezanur
            </h1>
            <h1 className="text-[12vw] md:text-[10vw] font-black font-syne bg-white text-black uppercase leading-[0.85] tracking-tighter ml-12 md:ml-24">
              Rahman
            </h1>
          </div>
          <div className="flex gap-4 mb-4 md:mb-8 text-white">
            <span className="px-4 py-1 border border-white/20 rounded-full text-xs uppercase tracking-widest bg-white/5 backdrop-blur-sm">
              Dev
            </span>
            <span className="px-4 py-1 border border-white/20 rounded-full text-xs uppercase tracking-widest bg-white/5 backdrop-blur-sm">
              Design
            </span>
            <span className="px-4 py-1 border border-white/20 rounded-full text-xs uppercase tracking-widest bg-white/5 backdrop-blur-sm">
              Art
            </span>
          </div>
        </div>
      </section>

      {/* 2. BIG INTRO */}
      <section className="py-24 px-6 md:px-12 max-w-[1200px] mx-auto text-center md:text-left">
        <p className="reveal-text text-2xl md:text-5xl font-light text-white leading-relaxed mb-12">
          <span className="text-primary font-serif italic">Crafting</span>{" "}
          digital experiences that exist at the intersection of Art and
          Engineering. I build products that are not just functional, but{" "}
          <span className="font-serif italic text-gray-400">memorable</span>.
        </p>
        <div className="reveal-text grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-12">
          <div>
            <h3 className="text-4xl font-bold text-white mb-2">04+</h3>
            <p className="text-xs uppercase tracking-widest text-gray-500">
              Years Active
            </p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-white mb-2">25+</h3>
            <p className="text-xs uppercase tracking-widest text-gray-500">
              Projects
            </p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-white mb-2">15+</h3>
            <p className="text-xs uppercase tracking-widest text-gray-500">
              Happy Clients
            </p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-white mb-2">100%</h3>
            <p className="text-xs uppercase tracking-widest text-gray-500">
              Commitment
            </p>
          </div>
        </div>
      </section>

      {/* 3. CAPABILITIES GRID */}
      <section className="py-24 px-6 md:px-12 bg-white/[0.02]">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16 flex justify-between items-end">
            <h2 className="reveal-text text-6xl md:text-7xl font-black font-syne text-white uppercase tracking-tighter">
              Capabilities
            </h2>
            <span className="hidden md:block text-sm font-mono text-gray-500 uppercase">
              What I do best
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {/* Card 1 */}
            <div className="bg-dark-background p-12 min-h-[300px] group hover:bg-white/[0.02] transition-colors">
              <Cpu className="w-10 h-10 text-white mb-8" strokeWidth={1.5} />
              <h3 className="text-2xl font-bold text-white mb-4">
                Development
              </h3>
              <p className="text-gray-400 leading-relaxed mb-8">
                Scalable, rigid, and type-safe applications using the modern
                React stack.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs text-primary bg-primary/10 px-2 py-1 ">
                  Next.js
                </span>
                <span className="text-xs text-primary bg-primary/10 px-2 py-1 ">
                  TypeScript
                </span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-dark-background p-12 min-h-[300px] group hover:bg-white/[0.02] transition-colors">
              <Layers className="w-10 h-10 text-white mb-8" strokeWidth={1.5} />
              <h3 className="text-2xl font-bold text-white mb-4">Design</h3>
              <p className="text-gray-400 leading-relaxed mb-8">
                UI/UX design that focuses on usability, accessibility, and
                visual impact.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs text-primary bg-primary/10 px-2 py-1 ">
                  Figma
                </span>
                <span className="text-xs text-primary bg-primary/10 px-2 py-1 ">
                  Systems
                </span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-dark-background p-12 min-h-[300px] group hover:bg-white/[0.02] transition-colors">
              <Code className="w-10 h-10 text-white mb-8" strokeWidth={1.5} />
              <h3 className="text-2xl font-bold text-white mb-4">Animation</h3>
              <p className="text-gray-400 leading-relaxed mb-8">
                Bringing interfaces to life with smooth, physics-based
                micro-interactions.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs text-primary bg-primary/10 px-2 py-1 ">
                  GSAP
                </span>
                <span className="text-xs text-primary bg-primary/10 px-2 py-1 ">
                  Motion
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. EXPERIENCE LIST */}
      <section className="py-24 px-6 md:px-12 max-w-[1000px] mx-auto">
        <h2 className="reveal-text text-4xl md:text-5xl font-bold font-syne text-white uppercase mb-16 text-center">
          Selected Roles
        </h2>

        <div className="flex flex-col">
          {[
            {
              role: "Senior Frontend Engineer",
              company: "TechCorps",
              year: "2023 - Present",
            },
            {
              role: "Creative Developer",
              company: "Studio Abstract",
              year: "2021 - 2023",
            },
            {
              role: "Frontend Developer",
              company: "Freelance",
              year: "2019 - 2021",
            },
          ].map((job, i) => (
            <div
              key={i}
              className="group flex flex-col md:flex-row justify-between items-center py-10 border-b border-white/10 hover:border-white transition-colors cursor-pointer"
            >
              <div className="text-center md:text-left mb-4 md:mb-0">
                <h4 className="text-2xl md:text-3xl font-bold text-white group-hover:pl-4 transition-all duration-300">
                  {job.role}
                </h4>
                <span className="text-gray-500 mt-1 block group-hover:pl-4 transition-all duration-300 delay-75">
                  {job.company}
                </span>
              </div>
              <div className="flex items-center gap-8">
                <span className="font-mono text-sm text-gray-500">
                  {job.year}
                </span>
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-transform duration-300">
                  <ArrowUpRight className="text-white w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
