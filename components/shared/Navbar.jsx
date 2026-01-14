"use client";

import CreativeMenu from "@/components/CreativeMenu";
import {
  Crosshair,
  MousePointer2,
  Sun,
  Volume2,
  VolumeX,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [isCustomCursor, setIsCustomCursor] = useState(true);
  const [cursorVariant, setCursorVariant] = useState("emoji");

  useEffect(() => {
    const savedMute = localStorage.getItem("cursorSoundEnabled");
    if (savedMute !== null) {
      setIsMuted(savedMute === "false");
    }
    const savedCursorEnabled = localStorage.getItem("customCursorEnabled");
    if (savedCursorEnabled !== null) {
      setIsCustomCursor(savedCursorEnabled !== "false");
    }
    const savedVariant = localStorage.getItem("cursorVariant");
    if (savedVariant) {
      setCursorVariant(savedVariant);
    }
  }, []);

  // Handle Scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // No longer needed due to lazy state initialization

  // Handle Time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleMute = () => {
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);
    window.dispatchEvent(
      new CustomEvent("toggleCursorSound", {
        detail: { enabled: !newMuteState },
      })
    );
  };

  const cycleCursor = () => {
    if (!isCustomCursor) {
      // From System -> Emoji
      setIsCustomCursor(true);
      setCursorVariant("emoji");
      localStorage.setItem("customCursorEnabled", "true");
      localStorage.setItem("cursorVariant", "emoji");
      window.dispatchEvent(
        new CustomEvent("toggleCustomCursor", { detail: { enabled: true } })
      );
      window.dispatchEvent(
        new CustomEvent("changeCursorVariant", { detail: { variant: "emoji" } })
      );
    } else if (cursorVariant === "emoji") {
      // From Emoji -> Premium
      setCursorVariant("premium");
      localStorage.setItem("cursorVariant", "premium");
      window.dispatchEvent(
        new CustomEvent("changeCursorVariant", {
          detail: { variant: "premium" },
        })
      );
    } else if (cursorVariant === "premium") {
      // From Premium -> Glow
      setCursorVariant("glow");
      localStorage.setItem("cursorVariant", "glow");
      window.dispatchEvent(
        new CustomEvent("changeCursorVariant", { detail: { variant: "glow" } })
      );
    } else if (cursorVariant === "glow") {
      // From Glow -> Crosshair
      setCursorVariant("crosshair");
      localStorage.setItem("cursorVariant", "crosshair");
      window.dispatchEvent(
        new CustomEvent("changeCursorVariant", {
          detail: { variant: "crosshair" },
        })
      );
    } else {
      // From Crosshair -> System
      setIsCustomCursor(false);
      localStorage.setItem("customCursorEnabled", "false");
      window.dispatchEvent(
        new CustomEvent("toggleCustomCursor", { detail: { enabled: false } })
      );
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-100 flex justify-between items-center px-6 md:px-12 transition-all duration-300 ${
          scrolled
            ? "py-4 bg-dark-background/80 backdrop-blur-md border-b border-white/10"
            : "py-8 bg-transparent"
        } text-white`}
      >
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-widest font-syne uppercase z-50"
        >
          Mezanur
        </Link>

        {/* Center Time */}
        <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-mono tracking-widest text-opacity-80 text-white uppercase">
          {time}
        </div>

        {/* Right Section: Utilities + Menu */}
        <div className="flex items-center gap-6 md:gap-10 z-50">
          <div className="hidden items-center gap-4 md:flex">
            {/* Toggle Cursor */}
            <button
              onClick={cycleCursor}
              className="p-2 hover:bg-white/10 rounded-full transition-colors group relative"
              title={
                !isCustomCursor
                  ? "Switch to Emoji Cursor"
                  : cursorVariant === "emoji"
                  ? "Premium Cursor"
                  : cursorVariant === "premium"
                  ? "Glow Cursor"
                  : cursorVariant === "glow"
                  ? "Crosshair Cursor"
                  : "System Cursor"
              }
            >
              {!isCustomCursor ? (
                <MousePointer2
                  size={16}
                  className="group-hover:scale-110 transition-transform opacity-50"
                />
              ) : cursorVariant === "emoji" ? (
                <Zap
                  size={16}
                  className="group-hover:scale-110 transition-transform text-yellow-400"
                />
              ) : cursorVariant === "premium" ? (
                <MousePointer2
                  size={16}
                  className="group-hover:scale-110 transition-transform text-blue-400"
                />
              ) : cursorVariant === "glow" ? (
                <Sun
                  size={16}
                  className="group-hover:scale-110 transition-transform text-orange-400"
                />
              ) : (
                <Crosshair
                  size={16}
                  className="group-hover:scale-110 transition-transform text-white"
                />
              )}
              <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-white text-black text-[10px] font-mono rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
                {!isCustomCursor
                  ? "System"
                  : cursorVariant === "emoji"
                  ? "Emoji"
                  : cursorVariant === "premium"
                  ? "Premium"
                  : cursorVariant === "glow"
                  ? "Glow"
                  : "Target"}
              </span>
            </button>

            {/* Mute Toggle */}
            <button
              onClick={toggleMute}
              className="p-2 hover:bg-white/10 rounded-full transition-colors group relative"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-white text-black text-[10px] font-mono rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
                {isMuted ? "Unmute" : "Mute"}
              </span>
            </button>
          </div>

          <div className="w-px h-4 bg-white/20 hidden md:block"></div>

          {/* Minimal Menu Trigger */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="text-sm font-medium tracking-widest uppercase hover:opacity-50 transition-opacity group relative cursor-pointer"
          >
            <span className="relative z-10">Menu</span>
            <span className="absolute bottom-0 left-0 w-full h-px bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-right group-hover:origin-left duration-300"></span>
          </button>
        </div>
      </nav>

      <CreativeMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Navbar;
