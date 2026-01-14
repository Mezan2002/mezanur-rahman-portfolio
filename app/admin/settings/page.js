"use client";

import gsap from "gsap";
import {
  Cpu,
  Fingerprint,
  Github,
  Globe,
  Instagram,
  Link2,
  Linkedin,
  Loader2,
  Lock,
  ShieldCheck,
  Twitter,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function SettingsPage() {
  const containerRef = useRef(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered entry for bento modules
      gsap.fromTo(
        ".bento-card",
        { opacity: 0, scale: 0.95, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          stagger: {
            amount: 0.4,
            grid: [3, 4],
            from: "start",
          },
          ease: "expo.out",
        }
      );

      // Header line animation
      gsap.fromTo(
        ".header-line",
        { scaleX: 0 },
        { scaleX: 1, duration: 1.5, ease: "power4.inOut" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 1500);
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen pb-20 max-w-[1600px] mx-auto"
    >
      {/* Dynamic Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 mb-12 px-2">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white flex items-center justify-center text-black">
              <Cpu size={24} />
            </div>
            <div>
              <p className="text-[10px] font-mono tracking-[0.4em] text-gray-500 uppercase">
                System Interface / v2.0
              </p>
              <h1 className="text-4xl font-black font-syne uppercase tracking-tighter text-white">
                Command Center<span className="text-gray-800">_</span>
              </h1>
            </div>
          </div>
          <div className="w-full h-px bg-white/5 origin-left header-line"></div>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="relative group px-10 py-4 bg-white text-black font-black font-syne uppercase tracking-widest hover:bg-gray-200 transition-all flex items-center gap-4 disabled:opacity-50 active:scale-95"
        >
          {isSaving ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <Fingerprint size={20} />
          )}
          <span>{isSaving ? "Syncing..." : "Commit Changes"}</span>
          <div className="absolute -inset-px border border-white/20 group-hover:-inset-2 transition-all opacity-0 group-hover:opacity-100"></div>
        </button>
      </div>

      {/* Bento Grid Architecture */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-2">
        {/* Identity Block - Large Spanning */}
        <div className="md:col-span-8 md:row-span-2 bento-card bg-white/2 border border-white/5 p-10 flex flex-col justify-between group hover:bg-white/4 transition-colors relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 text-white/5 group-hover:text-white/10 transition-colors">
            <Globe size={120} strokeWidth={0.5} />
          </div>

          <div className="space-y-2 mb-12">
            <h3 className="text-xs font-mono uppercase tracking-[0.4em] text-gray-600">
              01. Identity Matrix
            </h3>
            <h2 className="text-3xl font-black font-syne uppercase text-white tracking-widest">
              Public Persona
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 relative z-10">
            <div className="space-y-3">
              <label className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">
                Global Title
              </label>
              <input
                type="text"
                defaultValue="Mezanur Rahman"
                className="w-full bg-white/5 border-l border-white/10 px-6 py-4 text-white focus:bg-white/10 focus:border-white/40 outline-none transition-all font-syne font-bold text-xl uppercase tracking-tighter"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">
                Professional Rank
              </label>
              <input
                type="text"
                defaultValue="Creative Developer"
                className="w-full bg-white/5 border-l border-white/10 px-6 py-4 text-white focus:bg-white/10 focus:border-white/40 outline-none transition-all font-syne font-bold text-xl uppercase tracking-tighter"
              />
            </div>
          </div>
        </div>

        {/* Status Block - Small Vertical */}
        <div className="md:col-span-4 md:row-span-1 bento-card bg-white/5 border border-white/10 p-8 flex items-center justify-between group hover:border-blue-500/50 transition-colors">
          <div className="space-y-1">
            <p className="text-[9px] font-mono text-blue-400 uppercase tracking-widest">
              Monitoring
            </p>
            <h4 className="text-xl font-black font-syne uppercase text-white">
              Maintenance
            </h4>
          </div>
          <div className="w-16 h-8 bg-black/40 border border-white/10 rounded-full relative flex items-center px-1 cursor-pointer">
            <div className="w-6 h-6 bg-gray-600 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)]"></div>
          </div>
        </div>

        {/* Analytics Block - Small Vertical */}
        <div className="md:col-span-4 md:row-span-1 bento-card bg-white/5 border border-white/10 p-8 flex items-center justify-between group hover:border-green-500/50 transition-colors">
          <div className="space-y-1">
            <p className="text-[9px] font-mono text-green-400 uppercase tracking-widest">
              Active Link
            </p>
            <h4 className="text-xl font-black font-syne uppercase text-white">
              Analytics
            </h4>
          </div>
          <div className="w-16 h-8 bg-white/10 border border-white/20 rounded-full relative flex items-center justify-end px-1 cursor-pointer">
            <div className="w-6 h-6 bg-green-500 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.5)]"></div>
          </div>
        </div>

        {/* SEO Description - Large Wide Spanning */}
        <div className="md:col-span-12 md:row-span-1 bento-card bg-black border border-white/5 p-12 group hover:bg-white/5 transition-all">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-3">
              <h3 className="text-xs font-mono uppercase tracking-[0.4em] text-gray-600 mb-4">
                02. SEO Matrix
              </h3>
              <h2 className="text-3xl font-black font-syne uppercase text-white leading-none">
                Meta
                <br />
                Descriptor
              </h2>
            </div>
            <div className="md:col-span-9">
              <textarea
                rows={3}
                className="w-full bg-white/3 border border-white/5 p-8 text-white focus:bg-white/5 focus:border-white/20 outline-none transition-all resize-none font-medium leading-relaxed tracking-wide text-lg"
                defaultValue="Portfolio of Mezanur Rahman, a creative developer specializing in premium digital experiences. Crafting the future of the web."
              ></textarea>
            </div>
          </div>
        </div>

        {/* Social Network - Complex Internal Grid */}
        <div className="md:col-span-7 bento-card bg-white/2 border border-white/5 p-10 group relative">
          <div className="flex items-center justify-between mb-10">
            <div className="space-y-1">
              <h3 className="text-[10px] font-mono uppercase tracking-[0.4em] text-gray-600">
                03. Connectivity
              </h3>
              <h2 className="text-2xl font-black font-syne uppercase text-white">
                Social Grid
              </h2>
            </div>
            <Link2
              size={24}
              className="text-white/10 group-hover:text-white transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              { icon: Linkedin, label: "LinkedIn", link: "in/mezan" },
              { icon: Github, label: "GitHub", link: "mezan2002" },
              { icon: Twitter, label: "Twitter", link: "mezan_x" },
              { icon: Instagram, label: "Instagram", link: "mezan.raw" },
            ].map((p, i) => (
              <div
                key={i}
                className="flex items-center gap-5 p-4 border border-white/5 hover:bg-white/5 transition-all cursor-pointer"
              >
                <div className="w-12 h-12 bg-white/5 flex items-center justify-center text-white/40 group-hover:text-white transition-colors">
                  <p.icon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[8px] font-mono uppercase text-gray-500 tracking-tighter">
                    {p.label}
                  </p>
                  <p className="text-sm font-bold text-white truncate group-hover:text-gray-400 transition-colors">
                    /{p.link}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security / Admin Control - Tall Vertical */}
        <div className="md:col-span-5 bento-card bg-white/5 border border-white/10 p-10 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute -bottom-10 -right-10 text-white/3 group-hover:text-white/7 transition-all rotate-12">
            <Lock size={200} strokeWidth={1} />
          </div>

          <div className="space-y-8 relative z-10">
            <div className="space-y-1">
              <h3 className="text-[10px] font-mono uppercase tracking-[0.4em] text-gray-600">
                04. Clearance
              </h3>
              <h2 className="text-2xl font-black font-syne uppercase text-white">
                Admin Protocol
              </h2>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[8px] font-mono text-gray-500 uppercase">
                    Access ID
                  </label>
                  <p className="text-xs font-bold font-syne text-white tracking-widest truncate">
                    mezan@root.sys
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[8px] font-mono text-gray-500 uppercase">
                    Comm Link
                  </label>
                  <p className="text-xs font-bold font-syne text-white tracking-widest">
                    +880 123 456
                  </p>
                </div>
              </div>
              <div className="h-px bg-white/10 w-full"></div>
              <button className="w-full py-4 border border-white/5 text-[10px] font-mono uppercase tracking-[0.3em] text-gray-500 hover:text-white hover:bg-white/5 transition-all">
                Rotate Security Keys
              </button>
            </div>
          </div>

          <div className="pt-10 relative z-10">
            <div className="flex items-center gap-4 text-white/20 group-hover:text-white transition-colors">
              <ShieldCheck size={18} />
              <span className="text-[9px] font-mono uppercase tracking-widest">
                Encryption: Active (v4.1)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Experimental Footer Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-2 mt-2">
        {[
          { label: "Memory used", value: "244MB" },
          { label: "Uptime", value: "99.9%" },
          { label: "Queries", value: "1.2k/hr" },
          { label: "Build state", value: "OPTIMIZED" },
        ].map((s, i) => (
          <div
            key={i}
            className="bento-card border border-white/5 p-6 bg-white/1 group hover:bg-white/3 transition-all"
          >
            <p className="text-[8px] font-mono uppercase text-gray-600 tracking-widest mb-1">
              {s.label}
            </p>
            <p className="text-lg font-black font-syne text-white tracking-tighter group-hover:translate-x-1 transition-transform">
              {s.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
