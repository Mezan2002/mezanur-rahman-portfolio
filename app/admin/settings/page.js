"use client";

import gsap from "gsap";
import {
  Check,
  Github,
  Globe,
  Instagram,
  Linkedin,
  Loader2,
  Lock,
  Mail,
  Save,
  Share2,
  Smartphone,
  Twitter,
  User,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function SettingsPage() {
  const containerRef = useRef(null);
  const [activeTab, setActiveTab] = useState("general");
  const [isSaving, setIsSaving] = useState(false);

  const tabs = [
    { id: "general", label: "General", icon: Globe },
    { id: "socials", label: "Social Links", icon: Share2 },
    { id: "account", label: "Account", icon: User },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".animate-in", { opacity: 0, y: 30 });
      gsap.to(".animate-in", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "all",
      });
    }, containerRef);
    return () => ctx.revert();
  }, [activeTab]);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("Settings updated successfully!");
    }, 1500);
  };

  return (
    <div ref={containerRef} className="space-y-12 min-h-screen pb-20">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
        <div className="animate-in">
          <p className="text-xs font-mono text-primary mb-2 tracking-widest uppercase flex items-center gap-2">
            <span className="w-1 h-1 bg-primary rounded-full"></span>
            Admin Portal / Configuration
          </p>
          <h1 className="text-4xl md:text-5xl font-black font-syne uppercase text-white leading-none mb-4">
            Site Settings
          </h1>
          <p className="text-gray-500 font-mono text-sm">
            Control your portfolio's core identity and social presence
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="animate-in group flex items-center gap-3 px-10 py-4 bg-primary text-black font-black font-syne uppercase tracking-widest rounded-full hover:bg-white hover:scale-105 transition-all shadow-[0_0_30px_rgba(180,255,0,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Save size={18} />
          )}
          <span>{isSaving ? "Syncing..." : "Save Configuration"}</span>
        </button>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`animate-in w-full group flex items-center gap-4 px-6 py-4 rounded-2xl border transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-white/10 border-white/20 text-white"
                  : "bg-transparent border-transparent text-gray-500 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div
                className={`p-2 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? "bg-primary/20 text-primary"
                    : "bg-white/5 group-hover:bg-white/10"
                }`}
              >
                <tab.icon size={18} />
              </div>
              <span className="uppercase tracking-[0.2em] text-[10px] font-mono font-bold">
                {tab.label}
              </span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <div className="animate-in bg-gradient-to-br from-[#0a0a0a] to-black border border-white/5 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[150px] pointer-events-none"></div>

            {activeTab === "general" && (
              <div className="space-y-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 ml-1">
                      Site Title
                    </label>
                    <input
                      type="text"
                      defaultValue="Mezanur Rahman"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-primary/50 outline-none transition-all placeholder-gray-700"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 ml-1">
                      Tagline
                    </label>
                    <input
                      type="text"
                      defaultValue="Creative Developer"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-primary/50 outline-none transition-all placeholder-gray-700"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 ml-1">
                    Meta Description
                  </label>
                  <textarea
                    rows={4}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-primary/50 outline-none transition-all placeholder-gray-700 resize-none"
                    defaultValue="Portfolio of Mezanur Rahman, a creative developer specializing in premium digital experiences."
                  ></textarea>
                </div>

                <div className="pt-4 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex items-center justify-between p-6 bg-white/[0.02] border border-white/10 rounded-3xl">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                        <Check size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">
                          Maintenance Mode
                        </p>
                        <p className="text-[10px] text-gray-500 font-mono uppercase">
                          Offline for visitors
                        </p>
                      </div>
                    </div>
                    <div className="w-12 h-6 bg-white/10 rounded-full relative cursor-pointer">
                      <div className="absolute left-1 top-1 w-4 h-4 bg-gray-500 rounded-full"></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-6 bg-white/[0.02] border border-white/10 rounded-3xl">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                        <Check size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">
                          Google Analytics
                        </p>
                        <p className="text-[10px] text-gray-500 font-mono uppercase">
                          Tracking Active
                        </p>
                      </div>
                    </div>
                    <div className="w-12 h-6 bg-primary/20 rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-primary rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "socials" && (
              <div className="space-y-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-[#0077b5]/10 border border-[#0077b5]/20 flex items-center justify-center text-[#0077b5] group-hover:scale-110 transition-transform">
                      <Linkedin size={20} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <label className="text-[9px] font-mono uppercase tracking-widest text-gray-500">
                        LinkedIn URL
                      </label>
                      <input
                        type="text"
                        className="w-full bg-transparent border-b border-white/10 py-2 text-white focus:border-primary outline-none transition-all font-mono text-sm"
                        placeholder="https://linkedin.com/in/..."
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      <Github size={20} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <label className="text-[9px] font-mono uppercase tracking-widest text-gray-500">
                        GitHub URL
                      </label>
                      <input
                        type="text"
                        className="w-full bg-transparent border-b border-white/10 py-2 text-white focus:border-primary outline-none transition-all font-mono text-sm"
                        placeholder="https://github.com/..."
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-[#1da1f2]/10 border border-[#1da1f2]/20 flex items-center justify-center text-[#1da1f2] group-hover:scale-110 transition-transform">
                      <Twitter size={20} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <label className="text-[9px] font-mono uppercase tracking-widest text-gray-500">
                        Twitter (X) URL
                      </label>
                      <input
                        type="text"
                        className="w-full bg-transparent border-b border-white/10 py-2 text-white focus:border-primary outline-none transition-all font-mono text-sm"
                        placeholder="https://x.com/..."
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-[#e1306c]/10 border border-[#e1306c]/20 flex items-center justify-center text-[#e1306c] group-hover:scale-110 transition-transform">
                      <Instagram size={20} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <label className="text-[9px] font-mono uppercase tracking-widest text-gray-500">
                        Instagram URL
                      </label>
                      <input
                        type="text"
                        className="w-full bg-transparent border-b border-white/10 py-2 text-white focus:border-primary outline-none transition-all font-mono text-sm"
                        placeholder="https://instagram.com/..."
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/5">
                  <div className="flex items-center gap-6 p-6 bg-white/[0.02] border border-dashed border-white/10 rounded-3xl">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-500">
                      <Share2 size={24} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold font-syne uppercase text-xs">
                        Add Custom Channel
                      </h4>
                      <p className="text-[10px] text-gray-500 font-mono uppercase mt-1">
                        Dribbble, Behance, or personal blog
                      </p>
                    </div>
                    <button className="ml-auto flex items-center gap-2 text-primary font-mono text-[10px] uppercase font-bold tracking-widest group">
                      Add New{" "}
                      <span className="group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "account" && (
              <div className="space-y-10 relative z-10">
                <div className="flex flex-col md:flex-row gap-10">
                  <div className="flex flex-col items-center gap-4 text-center">
                    <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-gray-700 to-gray-900 border-2 border-primary/20 flex items-center justify-center text-4xl font-black text-white relative group">
                      M
                      <div className="absolute inset-0 bg-black/60 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center flex-col gap-1 cursor-pointer">
                        <Save size={16} className="text-primary" />
                        <span className="text-[8px] font-mono uppercase">
                          Update
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">
                        Super Admin
                      </p>
                      <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">
                        Mezanur Rahman
                      </p>
                    </div>
                  </div>

                  <div className="flex-1 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[9px] font-mono uppercase tracking-[0.2em] text-gray-500 flex items-center gap-2">
                          <Mail size={10} /> Email Address
                        </label>
                        <input
                          type="email"
                          defaultValue="mezan@example.com"
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-3 text-white focus:border-primary/50 outline-none transition-all text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] font-mono uppercase tracking-[0.2em] text-gray-500 flex items-center gap-2">
                          <Smartphone size={10} /> Contact Number
                        </label>
                        <input
                          type="text"
                          defaultValue="+880 1234 567890"
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-3 text-white focus:border-primary/50 outline-none transition-all text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/5 space-y-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Lock size={16} className="text-primary" />
                    <h3 className="text-white font-bold font-syne uppercase text-xs tracking-widest">
                      Security Configuration
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-[9px] font-mono uppercase text-gray-500">
                        Current Password
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-3 text-white focus:border-primary/50 outline-none transition-all text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-mono uppercase text-gray-500">
                        New Password
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-3 text-white focus:border-primary/50 outline-none transition-all text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-mono uppercase text-gray-500">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-3 text-white focus:border-primary/50 outline-none transition-all text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
