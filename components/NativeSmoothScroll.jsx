// components/NativeSmoothScroll.jsx
"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function NativeSmoothScroll({ children }) {
  const scrollContainerRef = useRef(null);
  const contentRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let currentScroll = 0;
    let targetScroll = 0;
    let ease = 1;
    let animationFrameId = null;
    let isRunning = false;

    const updateBodyHeight = () => {
      if (contentRef.current) {
        const height = contentRef.current.getBoundingClientRect().height;
        document.body.style.height = `${height}px`;
      }
    };

    const smoothScroll = () => {
      targetScroll = window.scrollY;
      currentScroll += (targetScroll - currentScroll) * ease;

      if (contentRef.current) {
        contentRef.current.style.transform = `translate3d(0, -${currentScroll}px, 0)`;
      }

      // Always continue the animation loop
      animationFrameId = requestAnimationFrame(smoothScroll);
    };

    const init = () => {
      // Set initial height
      updateBodyHeight();

      // Start smooth scroll
      if (!isRunning) {
        isRunning = true;
        animationFrameId = requestAnimationFrame(smoothScroll);
      }

      setIsReady(true);
    };

    // Initialize after a small delay to ensure DOM is ready
    const timeoutId = setTimeout(init, 100);

    // Update height on resize
    const handleResize = () => {
      updateBodyHeight();
      if (ScrollTrigger) {
        ScrollTrigger.refresh();
      }
    };

    // Update height when images load
    const handleLoad = () => {
      updateBodyHeight();
      if (ScrollTrigger) {
        ScrollTrigger.refresh();
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("load", handleLoad);

    // Observe content changes
    const observer = new MutationObserver(() => {
      updateBodyHeight();
    });

    if (contentRef.current) {
      observer.observe(contentRef.current, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      clearTimeout(timeoutId);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", handleLoad);
      observer.disconnect();
      document.body.style.height = "";
      isRunning = false;
    };
  }, []);

  return (
    <div
      ref={scrollContainerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <div
        ref={contentRef}
        style={{
          width: "100%",
          willChange: "transform",
          pointerEvents: "auto",
        }}
      >
        {children}
      </div>
    </div>
  );
}
