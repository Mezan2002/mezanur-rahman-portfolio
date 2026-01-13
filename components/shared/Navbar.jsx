"use client";

import CreativeMenu from "@/components/CreativeMenu";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState("");

  // Handle Scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-mono tracking-widest text-opacity-80 text-white">
          {time}
        </div>

        {/* Minimal Menu Trigger */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="text-sm font-medium tracking-widest uppercase hover:opacity-50 transition-opacity z-50 group relative cursor-pointer"
        >
          <span className="relative z-10">Menu</span>
          <span className="absolute bottom-0 left-0 w-full h-px bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-right group-hover:origin-left duration-300"></span>
        </button>
      </nav>

      <CreativeMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Navbar;
