// hooks/useScrollAnimation.js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimation(animation, options = {}) {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.from(element, {
        ...animation,
        scrollTrigger: {
          trigger: element,
          start: options.start || "top 80%",
          end: options.end || "bottom 20%",
          toggleActions: options.toggleActions || "play none none reverse",
          scrub: options.scrub || false,
          markers: options.markers || false,
          ...options.scrollTrigger,
        },
      });
    }, elementRef);

    return () => ctx.revert();
  }, [
    animation,
    options.end,
    options.markers,
    options.scrollTrigger,
    options.scrub,
    options.start,
    options.toggleActions,
  ]);

  return elementRef;
}
