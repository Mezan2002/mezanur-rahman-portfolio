// components/PageTransition.jsx
"use client";

import gsap from "gsap";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function PageTransition({ children }) {
  const pathname = usePathname();
  const overlay1Ref = useRef(null);
  const overlay2Ref = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const overlay1 = overlay1Ref.current;
    const overlay2 = overlay2Ref.current;
    const content = contentRef.current;

    if (!overlay1 || !overlay2 || !content) return;

    const tl = gsap.timeline();

    // First overlay covers
    tl.fromTo(
      overlay1,
      { scaleY: 0, transformOrigin: "bottom" },
      {
        scaleY: 1,
        duration: 0.4,
        ease: "power3.inOut",
      }
    )
      // Second overlay covers
      .fromTo(
        overlay2,
        { scaleY: 0, transformOrigin: "bottom" },
        {
          scaleY: 1,
          duration: 0.4,
          ease: "power3.inOut",
        },
        "-=0.2"
      )
      // First overlay reveals
      .to(overlay1, {
        scaleY: 0,
        transformOrigin: "top",
        duration: 0.4,
        ease: "power3.inOut",
      })
      // Second overlay reveals
      .to(
        overlay2,
        {
          scaleY: 0,
          transformOrigin: "top",
          duration: 0.4,
          ease: "power3.inOut",
        },
        "-=0.2"
      )
      // Content fades in
      .fromTo(
        content,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.3,
        },
        "-=0.4"
      );

    return () => tl.kill();
  }, [pathname]);

  return (
    <>
      {/* First Overlay - Dark */}
      <div
        ref={overlay1Ref}
        className="fixed inset-0 z-9999 pointer-events-none bg-[#0a0a0a]"
      />

      {/* Second Overlay - Gradient */}
      <div
        ref={overlay2Ref}
        className="fixed inset-0 z-9998 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)",
        }}
      />

      {/* Content */}
      <div ref={contentRef}>{children}</div>
    </>
  );
}
