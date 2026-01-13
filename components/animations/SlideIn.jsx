// components/animations/SlideIn.jsx
"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function SlideIn({
  children,
  direction = "up", // 'up', 'down', 'left', 'right'
  delay = 0,
  distance = 100,
  duration = 1,
  stagger = 0,
  className = "",
  triggerOnScroll = true,
}) {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const getAnimationProps = () => {
      switch (direction) {
        case "up":
          return { y: distance, opacity: 0 };
        case "down":
          return { y: -distance, opacity: 0 };
        case "left":
          return { x: distance, opacity: 0 };
        case "right":
          return { x: -distance, opacity: 0 };
        default:
          return { y: distance, opacity: 0 };
      }
    };

    const ctx = gsap.context(() => {
      const animProps = getAnimationProps();

      if (triggerOnScroll) {
        gsap.from(element, {
          ...animProps,
          duration,
          delay,
          stagger,
          ease: "power4.out",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      } else {
        gsap.from(element, {
          ...animProps,
          duration,
          delay,
          stagger,
          ease: "power4.out",
        });
      }
    }, elementRef);

    return () => ctx.revert();
  }, [direction, delay, distance, duration, stagger, triggerOnScroll]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}
