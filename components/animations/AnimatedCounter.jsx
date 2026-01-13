// components/animations/AnimatedCounter.jsx
"use client";

import { fancyAnimations } from "@/animations/fancyAnimations";
import { useEffect, useRef, useState } from "react";

export default function AnimatedCounter({
  start = 0,
  end,
  duration = 2,
  decimals = 0,
  className = "",
  suffix = "",
  prefix = "",
  animationType = "default", // 'default', 'step', 'bounce', 'scale', 'rolling'
  triggerOnView = false, // Start animation when element is in view
  ease = "power2.out",
  onComplete = null,
}) {
  const counterRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    if (!counterRef.current) return;

    const startAnimation = () => {
      if (hasAnimated && triggerOnView) return;

      let anim;

      switch (animationType) {
        case "step":
          anim = fancyAnimations.stepCounter(counterRef.current, {
            start,
            end,
            duration,
            ease,
            onComplete: () => {
              setHasAnimated(true);
              if (onComplete) onComplete();
            },
          });
          break;

        case "bounce":
          anim = fancyAnimations.bounceCounter(counterRef.current, {
            start,
            end,
            duration,
            decimals,
            onComplete: () => {
              setHasAnimated(true);
              if (onComplete) onComplete();
            },
          });
          break;

        case "scale":
          anim = fancyAnimations.scaleCounter(counterRef.current, {
            start,
            end,
            duration,
            decimals,
            onComplete: () => {
              setHasAnimated(true);
              if (onComplete) onComplete();
            },
          });
          break;

        case "rolling":
          anim = fancyAnimations.rollingCounter(counterRef.current, {
            start,
            end,
            duration,
            decimals,
          });
          break;

        default:
          anim = fancyAnimations.counter(counterRef.current, {
            start,
            end,
            duration,
            decimals,
            ease,
            onComplete: () => {
              setHasAnimated(true);
              if (onComplete) onComplete();
            },
          });
      }

      return anim;
    };

    // Intersection Observer for triggerOnView
    if (triggerOnView && !hasAnimated) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const anim = startAnimation();
              observerRef.current?.disconnect();

              return () => {
                if (anim) anim.kill();
              };
            }
          });
        },
        { threshold: 0.5 }
      );

      if (counterRef.current) {
        observerRef.current.observe(counterRef.current.parentElement);
      }

      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
      };
    } else {
      const anim = startAnimation();
      return () => {
        if (anim) anim.kill();
      };
    }
  }, [
    end,
    duration,
    decimals,
    animationType,
    triggerOnView,
    hasAnimated,
    start,
    ease,
    onComplete,
  ]);

  return (
    <span className={className}>
      {prefix}
      <span ref={counterRef}>{start}</span>
      {suffix}
    </span>
  );
}
