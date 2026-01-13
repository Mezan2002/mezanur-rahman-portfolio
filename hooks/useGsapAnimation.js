// hooks/useGsapAnimation.js
import gsap from "gsap";
import { useEffect, useRef } from "react";

export function useGsapAnimation(animationConfig) {
  const elementRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(elementRef.current, animationConfig);
    }, elementRef);

    return () => ctx.revert();
  }, [animationConfig]);

  return elementRef;
}
