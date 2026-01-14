"use client";

import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";

export default function Template({ children }) {
  const containerRef = useRef(null);

  // Reset readiness immediately on render to prevent children from firing prematurely
  if (typeof window !== "undefined") {
    window.isPageReady = false;
  }

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Columns Reveal (Slide Up)
      tl.to(".transition-column", {
        scaleY: 0,
        transformOrigin: "top",
        duration: 0.8,
        stagger: 0.1,
        ease: "power4.inOut",
      });

      // Content Fade In
      tl.fromTo(
        ".page-content",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      );

      const finishHandoff = () => {
        tl.play();
      };

      // Check session status
      const hasLoadedPreloader = sessionStorage.getItem("hasLoadedSession");

      if (!hasLoadedPreloader) {
        // First visit: Wait for Preloader
        window.addEventListener("preloader-complete", finishHandoff, {
          once: true,
        });

        // Safety timeout
        setTimeout(() => {
          if (tl.progress() === 0) finishHandoff();
        }, 4000);
      } else {
        // Subsequent visits/reloads: Play transition immediately
        // We delay slightly to allow the DOM to stabilize
        gsap.delayedCall(0.1, finishHandoff);
      }

      // Add completion signal to timeline
      tl.eventCallback("onComplete", () => {
        window.dispatchEvent(new CustomEvent("page-transition-complete"));
        window.isPageReady = true;

        // Ensure all ScrollTriggers are updated after transition columns disappear
        import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
          ScrollTrigger.refresh();
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      {/* 5 Columns for Transition */}
      <div className="fixed inset-0 z-9999 flex pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="transition-column flex-1 bg-dark-light h-full"
            style={{ transformOrigin: "top" }}
          />
        ))}
      </div>

      {/* Page Content */}
      <div className="page-content opacity-0">{children}</div>
    </div>
  );
}
