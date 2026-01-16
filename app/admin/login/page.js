"use client";

import { login } from "@/lib/api";
import gsap from "gsap";
import { ArrowRight, Lock, Mail, Scan, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Grid Animation
      gsap.to(".grid-line-x", {
        x: "100%",
        duration: 3,
        repeat: -1,
        ease: "none",
        stagger: 0.5,
      });

      // 2. Entrance Animation
      const tl = gsap.timeline();
      tl.from(".login-container", {
        scale: 0.95,
        opacity: 0,
        y: 20,
        duration: 1.5,
        ease: "power4.out",
      }).from(
        ".login-content",
        {
          y: 20,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=1"
      );

      // 3. Ambient Glow
      gsap.to(".glow-orb", {
        scale: 1.2,
        opacity: 0.6,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const scanLine = document.querySelector(".scan-line");
    if (scanLine) {
      gsap.to(scanLine, {
        height: "100%",
        opacity: 1,
        duration: 1.5,
        ease: "power2.inOut",
      });
    }

    try {
      const response = await login(email, password);

      if (response.success) {
        const userData = response.data?.user || response.data;
        localStorage.setItem(
          "accessToken",
          response.data?.accessToken || response.accessToken
        );
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("isAdmin", "true");

        gsap.to(".login-container", {
          scale: 1.1,
          opacity: 0,
          filter: "blur(20px)",
          duration: 0.5,
          ease: "back.in(1.7)",
          onComplete: () => router.push("/admin"),
        });
      }
    } catch (error) {
      alert(error.message || "Access Denied");
      setIsLoading(false);
      if (scanLine) {
        gsap.to(scanLine, { height: "0%", opacity: 0, duration: 0.5 });
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-full flex items-center justify-center bg-[#000] relative overflow-hidden text-white font-syne"
    >
      {/* --- BACKGROUND ARCHITECTURE --- */}
      <div className="absolute inset-0 bg-[#050505] z-0">
        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]"></div>

        {/* Animated Lines */}
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent grid-line-x"></div>
        <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent grid-line-x"></div>

        {/* Ambient Glow */}
        <div className="glow-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]"></div>
      </div>

      {/* --- LOGIN FRAME --- */}
      <div className="login-container relative z-10 w-full max-w-[400px]">
        {/* Structural Border */}
        <div className="absolute -inset-0.5 bg-gradient-to-b from-white/20 to-white/0 rounded-2xl blur-[1px]"></div>

        <div className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl p-1 overflow-hidden shadow-2xl">
          {/* Scan Line Overlay */}
          <div className="scan-line absolute top-0 left-0 w-full h-0 bg-primary/10 z-0 pointer-events-none border-b border-primary/50 opacity-0 transition-opacity"></div>

          <div className="relative z-10 p-8 flex flex-col items-center">
            {/* Header */}
            <div className="login-content mb-10 text-center">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                <Scan size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-white mb-2">
                ADMIN PORTAL
              </h1>
              <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gray-500">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                Secure Connection
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="w-full space-y-6">
              {/* Email Input */}
              <div className="group login-content">
                <div className="relative transform transition-transform duration-300 group-hover:-translate-y-1">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-purple-500/50 rounded-lg blur opacity-0 group-focus-within:opacity-100 transition duration-500"></div>
                  <div className="relative bg-[#050505] border border-white/10 rounded-lg p-1 flex items-center">
                    <div className="p-3 text-gray-500">
                      <Mail size={18} />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent text-sm text-white placeholder-gray-600 focus:outline-none font-mono py-2"
                      placeholder="ADMIN ID"
                    />
                  </div>
                </div>
              </div>

              {/* Password Input */}
              <div className="group login-content">
                <div className="relative transform transition-transform duration-300 group-hover:-translate-y-1">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-purple-500/50 rounded-lg blur opacity-0 group-focus-within:opacity-100 transition duration-500"></div>
                  <div className="relative bg-[#050505] border border-white/10 rounded-lg p-1 flex items-center">
                    <div className="p-3 text-gray-500">
                      <Lock size={18} />
                    </div>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-transparent text-sm text-white placeholder-gray-600 focus:outline-none font-mono py-2"
                      placeholder="PASSCODE"
                    />
                  </div>
                </div>
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="login-content w-full group relative overflow-hidden bg-white text-black py-4 rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-gray-200 transition-colors"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isLoading ? "Verifying Identity..." : "Initiate Session"}
                  {!isLoading && (
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  )}
                </span>
              </button>
            </form>

            {/* Footer */}
            <div className="login-content mt-10 pt-6 border-t border-white/5 w-full flex justify-between items-center text-[9px] text-gray-600 uppercase tracking-wider font-mono">
              <span>V.4.0.1</span>
              <span className="flex items-center gap-1">
                <ShieldCheck size={10} /> Encrypted
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
