"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function Template({ children }) {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        onComplete: () => {
          window.dispatchEvent(new CustomEvent("page-transition-complete"));
          // Ensure container is visible
          gsap.set(".page-content", { visibility: "visible" });

          import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
            ScrollTrigger.refresh();
          });
        },
      });

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
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.5",
      );

      const playTransition = () => {
        tl.play();
      };

      // Check session status to see if we should wait for the first-time preloader
      const hasLoadedPreloader = sessionStorage.getItem("hasLoadedSession");

      if (!hasLoadedPreloader) {
        // First visit: Wait for Preloader signal
        window.addEventListener("preloader-complete", playTransition, {
          once: true,
        });

        // Safety timeout
        const timeout = setTimeout(() => {
          if (tl.progress() === 0) playTransition();
        }, 5000);

        return () => clearTimeout(timeout);
      } else {
        // Subsequent navigations: Play after a tiny delay for DOM stability
        const timeout = setTimeout(playTransition, 150);
        return () => clearTimeout(timeout);
      }
    },
    { scope: containerRef },
  );

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

      {/* Page Content - Hidden initially to prevent flash before columns appear */}
      <div className="page-content opacity-0 invisible">{children}</div>
    </div>
  );
}
