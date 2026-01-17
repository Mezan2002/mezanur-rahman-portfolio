"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowUpRight, Copy, Mail } from "lucide-react";
import { useRef, useState } from "react";

export default function CTA({ data = {} }) {
  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const contactEmail = data?.contactEmail || "hello@mezan.dev";

  const handleCopy = () => {
    navigator.clipboard.writeText(contactEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const titleLines = data?.title?.split(" ") || ["Let'S", "Connect."];

  useGSAP(
    () => {
      // Magnetic Button with "Liquid" behavior
      const handleMouseMove = (e) => {
        const btn = buttonRef.current;
        if (!btn) return;
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
          x: x * 0.35,
          y: y * 0.35,
          duration: 0.6,
          ease: "power2.out",
        });

        gsap.to(".btn-content", {
          x: x * 0.15,
          y: y * 0.15,
          duration: 0.6,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to([buttonRef.current, ".btn-content"], {
          x: 0,
          y: 0,
          duration: 1,
          ease: "elastic.out(1, 0.3)",
        });
      };

      const btn = buttonRef.current;
      if (btn) {
        btn.addEventListener("mousemove", handleMouseMove);
        btn.addEventListener("mouseleave", handleMouseLeave);
      }

      // Reveal Animation
      const runAnimations = () => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        tl.from(".executive-header", {
          y: 100,
          opacity: 0,
          duration: 1.5,
        })
          .from(
            ".matrix-col",
            {
              y: 40,
              opacity: 0,
              stagger: 0.1,
              duration: 1.2,
            },
            "-=1"
          )
          .from(
            ".rule-line",
            {
              scaleX: 0,
              stagger: 0.1,
              duration: 1.5,
              transformOrigin: "left",
            },
            "-=1.5"
          );
      };

      if (window.isPageReady) {
        runAnimations();
      } else {
        window.addEventListener("page-transition-complete", runAnimations);
        return () => {
          window.removeEventListener("page-transition-complete", runAnimations);
          if (btn) {
            btn.removeEventListener("mousemove", handleMouseMove);
            btn.removeEventListener("mouseleave", handleMouseLeave);
          }
        };
      }

      return () => {
        if (btn) {
          btn.removeEventListener("mousemove", handleMouseMove);
          btn.removeEventListener("mouseleave", handleMouseLeave);
        }
      };
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[85vh] bg-black py-32 flex flex-col justify-between overflow-hidden font-syne"
    >
      {/* Structural Background */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-[150px] pointer-events-none translate-x-1/4 -translate-y-1/4" />

      {/* HEADER SECTION */}
      <div className="relative z-10 w-full px-6 md:px-12 flex flex-col items-start gap-12">
        <div className="flex items-center gap-4 text-white/20 font-mono text-[10px] tracking-[0.5em] uppercase">
          <div className="w-8 h-px bg-white/20" />
          {data?.tag || "Final_Sequence"}
        </div>

        <h2 className="executive-header text-[12vw] font-black uppercase tracking-tighter leading-none flex flex-col">
          <span>{titleLines[0]}</span>
          <span className="bg-white text-black inline-block px-4 self-start">
            {titleLines.slice(1).join(" ") || "Connect."}
          </span>
        </h2>
      </div>

      {/* THE CONTACT MATRIX */}
      <div className="relative z-10 w-full mt-32">
        <div className="rule-line w-full h-px bg-white/10" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full">
          {/* COL 1: SOCIAL NODES */}
          <div className="matrix-col p-12 lg:border-r lg:border-b border-white/10 space-y-8 group transition-colors hover:bg-white/2 flex flex-col justify-center">
            <span className="block font-mono text-[9px] text-white/30 uppercase tracking-widest italic">
              01_Social_Nodes
            </span>
            <div className="flex flex-col gap-6">
              <a
                href={data?.socialLinks?.linkedin || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-xl font-bold group-hover:text-primary transition-colors"
              >
                LinkedIn{" "}
                <ArrowUpRight
                  size={20}
                  className="text-white/20 group-hover:text-primary transition-transform group-hover:rotate-45"
                />
              </a>
              <a
                href={data?.socialLinks?.github || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-xl font-bold group-hover:text-primary transition-colors"
              >
                GitHub{" "}
                <ArrowUpRight
                  size={20}
                  className="text-white/20 group-hover:text-primary transition-transform group-hover:rotate-45"
                />
              </a>
            </div>
          </div>

          {/* COL 2: COMMUNICATION */}
          <div className="matrix-col p-12 lg:border-r lg:border-b border-white/10 space-y-8 group transition-colors hover:bg-white/2 flex flex-col justify-center">
            <span className="block font-mono text-[9px] text-white/30 uppercase tracking-widest italic">
              02_Communication
            </span>
            <div className="space-y-4">
              <a
                href={`mailto:${contactEmail}`}
                className="block text-2xl font-bold hover:text-primary transition-colors truncate"
              >
                {contactEmail}
              </a>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 font-mono text-[10px] text-white/40 hover:text-white transition-colors"
              >
                {copied ? "COPIED_SUCCESS" : "COPY_TO_CLIPBOARD"}{" "}
                <Copy size={12} />
              </button>
            </div>
          </div>

          {/* COL 3: AVAILABILITY */}
          <div className="matrix-col p-12 lg:border-r lg:border-b border-white/10 space-y-8 group transition-colors hover:bg-white/2 flex justify-center flex-col">
            <span className="block font-mono text-[9px] text-white/30 uppercase tracking-widest italic">
              03_Availability
            </span>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xl font-bold">
                  {data?.availabilityStatus || "Open for Project"}
                </span>
              </div>
              <p className="text-sm text-white/40 leading-relaxed font-light">
                {data?.locationStatus ||
                  "Global outreach active. Currently based in Dhaka [UTC+6]."}
              </p>
            </div>
          </div>

          {/* COL 4: THE MAIN ACTION */}
          <div className="matrix-col p-12 flex items-center justify-center lg:border-b border-white/10 bg-white/2 transition-colors hover:bg-white/5">
            <button
              ref={buttonRef}
              className="group relative w-full h-full min-h-[200px] flex flex-col items-center justify-center gap-4 overflow-hidden"
            >
              {/* Liquid Fill Overlay */}
              <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-power4" />

              <div className="btn-content relative z-10 flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:border-black group-hover:bg-black transition-all duration-500">
                  <Mail
                    size={24}
                    className="text-white group-hover:text-primary"
                  />
                </div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] group-hover:text-black transition-colors">
                  Send_Direct_Signal
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
