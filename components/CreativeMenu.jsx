"use client";

import gsap from "gsap";
import { X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function CreativeMenu({ isOpen, onClose }) {
  const menuRef = useRef(null);
  const overlayRef = useRef(null);
  const linksRef = useRef([]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const tl = gsap.timeline();

      // Ensure menu is visible
      gsap.set(menuRef.current, { visibility: "visible" });

      // Animate overlay
      tl.to(overlayRef.current, {
        scaleY: 1,
        duration: 0.8,
        ease: "power4.inOut",
        transformOrigin: "top",
      });

      // Animate links
      tl.fromTo(
        ".menu-link",
        { y: 100, opacity: 0, rotate: 5 },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.4",
      );
    } else {
      document.body.style.overflow = "";
      const tl = gsap.timeline({
        onComplete: () => gsap.set(menuRef.current, { visibility: "hidden" }),
      });

      tl.to(".menu-link", {
        y: -50,
        opacity: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.in",
      });

      tl.to(overlayRef.current, {
        scaleY: 0,
        duration: 0.6,
        ease: "power4.inOut",
        transformOrigin: "bottom",
      });
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Work", href: "/work" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <div
      ref={menuRef}
      className="fixed inset-0 z-100 invisible pointer-events-none"
    >
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-dark-light transform scale-y-0 pointer-events-auto flex flex-col justify-between items-center h-screen w-screen overflow-hidden py-10"
      >
        {/* Background Elements for Texture */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, #222 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        ></div>

        <button
          onClick={onClose}
          className="absolute top-8 right-8 md:top-12 md:right-12 text-white hover:rotate-90 transition-transform duration-500 z-50 p-2"
        >
          <X size={32} />
        </button>

        <nav className="flex-1 flex flex-col justify-center items-center gap-1 md:gap-4 w-full overflow-y-auto no-scrollbar z-40 min-h-0">
          {links.map((link, index) => (
            <div key={link.name} className="overflow-hidden shrink-0">
              <Link
                href={link.href}
                onClick={onClose}
                className="menu-link block text-3xl lg:text-[10vh] md:text-[6vw] font-black uppercase text-white font-syne leading-none hover:text-stroke-white transition-all duration-300 py-1"
              >
                {link.name}
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
