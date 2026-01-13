// components/PageTransition.jsx
"use client";

import gsap from "gsap";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function PageTransition({ children }) {
  const pathname = usePathname();
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const content = contentRef.current;

    if (!overlay || !content) return;

    // Page transition animation
    const tl = gsap.timeline();

    // Slide down and then up
    tl.set(overlay, {
      scaleY: 1,
      transformOrigin: "top",
      zIndex: 9999,
    })
      .to(overlay, {
        scaleY: 0,
        duration: 0.8,
        ease: "power4.inOut",
        transformOrigin: "top",
      })
      .from(
        content,
        {
          opacity: 0,
          y: 50,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.3"
      );
  }, [pathname]);

  return (
    <>
      {/* Transition Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[9999] pointer-events-none"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          transformOrigin: "top",
        }}
      />

      {/* Page Content */}
      <div ref={contentRef}>{children}</div>
    </>
  );
}
