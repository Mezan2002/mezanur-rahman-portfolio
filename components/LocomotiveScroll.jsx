// components/LocomotiveScroll.jsx
"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LocomotiveScrollProvider({ children }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    let locoScroll = null;

    const initScroll = async () => {
      try {
        // Dynamic import to avoid SSR issues
        const LocomotiveScroll = (await import("locomotive-scroll")).default;

        // Wait for next tick to ensure DOM is ready
        await new Promise((resolve) => setTimeout(resolve, 100));

        locoScroll = new LocomotiveScroll({
          el: scrollRef.current,
          smooth: true,
          multiplier: 1,
          class: "is-revealed",
          smartphone: {
            smooth: false,
          },
          tablet: {
            smooth: false,
          },
        });

        // Update on scroll
        locoScroll.on("scroll", () => {
          ScrollTrigger.update();
        });

        // Update ScrollTrigger
        ScrollTrigger.scrollerProxy(scrollRef.current, {
          scrollTop(value) {
            if (locoScroll) {
              return arguments.length
                ? locoScroll.scrollTo(value, { duration: 0, disableLerp: true })
                : locoScroll.scroll.instance.scroll.y;
            }
            return 0;
          },
          getBoundingClientRect() {
            return {
              top: 0,
              left: 0,
              width: window.innerWidth,
              height: window.innerHeight,
            };
          },
          pinType: scrollRef.current?.style.transform ? "transform" : "fixed",
        });

        // Refresh on update
        const handleRefresh = () => {
          if (locoScroll) locoScroll.update();
        };

        ScrollTrigger.addEventListener("refresh", handleRefresh);
        ScrollTrigger.refresh();

        // Update on window resize
        window.addEventListener("resize", handleRefresh);

        return () => {
          window.removeEventListener("resize", handleRefresh);
          ScrollTrigger.removeEventListener("refresh", handleRefresh);
        };
      } catch (error) {
        console.error("Locomotive Scroll initialization error:", error);
      }
    };

    initScroll();

    return () => {
      if (locoScroll) {
        locoScroll.destroy();
        locoScroll = null;
      }
    };
  }, []);

  return (
    <div data-scroll-container ref={scrollRef}>
      {children}
    </div>
  );
}
