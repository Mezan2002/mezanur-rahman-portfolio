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
    let ease = 0.075;
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

      // Update ScrollTrigger to use the smoothed value
      ScrollTrigger.update();

      // Always continue the animation loop
      animationFrameId = requestAnimationFrame(smoothScroll);
    };

    const init = () => {
      // Set initial height
      updateBodyHeight();

      // GSAP ScrollTrigger Proxy
      ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value) {
          if (arguments.length) {
            window.scrollTo(0, value);
            return;
          }
          return currentScroll; // Return the smoothed value
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
        // We use document.body since that's what has the height and scrollbar
        pinType: "transform",
      });

      // Start smooth scroll
      if (!isRunning) {
        isRunning = true;
        animationFrameId = requestAnimationFrame(smoothScroll);
      }

      // Set as default scroller
      ScrollTrigger.defaults({ scroller: document.body });

      setIsReady(true);
      ScrollTrigger.refresh();
    };

    // Initialize after a small delay to ensure DOM is ready
    const timeoutId = setTimeout(init, 100);

    // Update height on resize
    const handleResize = () => {
      updateBodyHeight();
      ScrollTrigger.refresh();
    };

    // Update height when images load
    const handleLoad = () => {
      updateBodyHeight();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("load", handleLoad);

    // Observe content changes
    const observer = new MutationObserver(() => {
      updateBodyHeight();
      ScrollTrigger.refresh();
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

      // Reset defaults
      ScrollTrigger.defaults({ scroller: window });

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
