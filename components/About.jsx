"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import * as Icons from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function About({ data = {} }) {
  const containerRef = useRef(null);
  const [time, setTime] = useState("");

  const getIcon = (iconName) => {
    const Icon = Icons[iconName] || Icons.Code2;
    return <Icon size={28} strokeWidth={1.5} />;
  };

  // Pillars Data from backend nested structure
  const pillars = (data?.pillarCards || []).map((card, index) => ({
    id: index + 1,
    title: card.title || ["Engineering", "Interaction", "Performance"][index],
    label: card.subLabel || ["Architect", "Cinematic", "Optimized"][index],
    icon: card.iconName || ["Code2", "Layers", "Compass"][index],
    desc:
      card.description ||
      [
        "Building robust, type-safe full-stack applications with Next.js and Cloud infrastructure.",
        "Crafting fluid user experiences with GSAP and Framer Motion.",
        "Optimization is a philosophy. I target 100/100 Lighthouse scores.",
      ][index],
  }));

  // Fallback for empty pillars
  if (pillars.length === 0) {
    pillars.push(
      {
        id: 1,
        title: "Engineering",
        label: "Architect",
        icon: "Code2",
        desc: "Building robust, type-safe full-stack applications with Next.js and Cloud infrastructure. Speed and reliability are my baseline.",
      },
      {
        id: 2,
        title: "Interaction",
        label: "Cinematic",
        icon: "Layers",
        desc: "Crafting fluid user experiences with GSAP and Framer Motion. I use movement to guide narratives and evoke emotions.",
      },
      {
        id: 3,
        title: "Performance",
        label: "Optimized",
        icon: "Compass",
        desc: "Optimization is a philosophy. I target 100/100 Lighthouse scores by focusing on critical paths and asset efficiency.",
      }
    );
  }

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useGSAP(
    () => {
      const runAnimations = () => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        tl.from(".about-header", {
          y: 60,
          opacity: 0,
          duration: 1.2,
        })
          .from(
            ".about-intro",
            {
              y: 40,
              opacity: 0,
              duration: 1,
            },
            "-=0.8"
          )
          .from(
            ".about-card",
            {
              y: 50,
              opacity: 0,
              stagger: 0.15,
              duration: 1,
            },
            "-=0.6"
          );
      };

      if (window.isPageReady) {
        runAnimations();
      } else {
        window.addEventListener("page-transition-complete", runAnimations);
        return () =>
          window.removeEventListener("page-transition-complete", runAnimations);
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative min-h-screen bg-dark-background py-24 md:py-48 px-6 md:px-12 overflow-hidden font-syne"
    >
      {/* Background Decorative Element */}
      <div className="absolute top-0 -left-1/4 w-[40vw] h-[40vw] bg-primary/5 rounded-full blur-[150px] pointer-events-none translate-x-1/4 -translate-y-1/4" />

      <div className="relative z-10 space-y-24">
        <div className="about-header border-b border-white/5 pb-12 flex flex-col md:flex-row justify-between items-end gap-8">
          <h2 className="text-7xl md:text-8xl font-black uppercase tracking-tighter leading-none">
            {data.heading?.[0] || "About"} <br />
            <span className="bg-white text-black">
              {data.heading?.[1] || "Me."}
            </span>
          </h2>
          <div className="flex items-center gap-4 text-green-600 font-mono text-xs tracking-widest bg-green-500/5 border border-green-500/10 px-6 py-3 rounded-full uppercase">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            {data.availabilityStatus || "Currently Available"}
          </div>
        </div>

        {/* TWO-COLUMN INTRO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="about-intro lg:col-span-8">
            <p className="text-3xl md:text-4xl font-light text-gray-400 leading-tight">
              {data.mainIntroText || (
                <>
                  I am a{" "}
                  <span className="text-white italic">Creative Developer</span>{" "}
                  dedicated to building stable, high-performance digital
                  products that don&apos;t just function, but inspire.
                </>
              )}
            </p>
          </div>
          <div className="about-intro lg:col-span-4 flex flex-col gap-8">
            <div className="p-8 bg-white/2 border border-white/5 rounded-3xl backdrop-blur-3xl space-y-6">
              <div className="flex justify-between items-center text-[10px] font-mono text-white/30 tracking-[0.3em] uppercase">
                <span>Location Node</span>
                <span>{time}</span>
              </div>
              <h4 className="text-xl font-bold">
                {data.locationNode || "Dhaka, Bangladesh"}
              </h4>
              <p className="text-sm text-gray-500 leading-relaxed font-light">
                {data.locationDescription || (
                  <>
                    Operating at the intersection of technology and design to
                    deliver{" "}
                    <span className="text-primary/60">
                      world-class solutions
                    </span>{" "}
                    for a global audience.
                  </>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* 3-COLUMN PILLAR GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-px md:bg-white/5 md:border md:border-white/5 overflow-hidden rounded-3xl">
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              className="about-card md:bg-dark-background p-10 flex flex-col justify-between min-h-[380px] hover:bg-white/2 transition-colors group"
            >
              <div className="space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-white/3 border border-white/10 flex items-center justify-center text-white group-hover:border-primary/50 transition-colors">
                  {getIcon(pillar.icon)}
                </div>
                <div className="space-y-2">
                  <span className="font-mono text-[10px] text-primary uppercase tracking-widest">
                    {pillar.label}
                  </span>
                  <h3 className="text-2xl font-bold">{pillar.title}</h3>
                </div>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        {/* BOTTOM ACTION */}
        <div className="about-card flex flex-col md:flex-row justify-between items-center gap-12 pt-12">
          <div className="flex gap-16 font-mono text-[10px] text-white/20 tracking-widest">
            <div className="space-y-1">
              <span className="block text-white/40">TECH_STACK</span>
              <span>{data.techStack || "NEXT.JS // TS // GSAP"}</span>
            </div>
            <div className="space-y-1">
              <span className="block text-white/40">VERSION</span>
              <span>{data.version || "FINAL_V1.0"}</span>
            </div>
          </div>

          <button className="group relative px-12 py-5 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-full overflow-hidden hover:pr-16 transition-all duration-500">
            <span className="relative z-10 transition-transform group-hover:-translate-x-2 inline-block">
              Work with me
            </span>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500">
              &rarr;
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
