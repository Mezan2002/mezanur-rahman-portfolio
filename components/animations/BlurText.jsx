// components/animations/BlurText.jsx
"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function BlurText({
  text,
  className = "",
  delay = 0,
  stagger = 0.03,
  trigger = null,
}) {
  const textRef = useRef(null);
  const words = text.split(" ");

  useEffect(() => {
    const chars = textRef.current.querySelectorAll(".char");

    const ctx = gsap.context(() => {
      gsap.from(chars, {
        scrollTrigger: {
          trigger: trigger || textRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        filter: "blur(10px)",
        y: 20,
        stagger: stagger,
        duration: 0.8,
        delay: delay,
        ease: "power2.out",
      });
    }, textRef);

    return () => ctx.revert();
  }, [delay, stagger, trigger]);

  return (
    <div ref={textRef} className={className}>
      {words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          className="word"
          style={{ display: "inline-block", marginRight: "0.3em" }}
        >
          {word.split("").map((char, charIndex) => (
            <span
              key={charIndex}
              className="char"
              style={{ display: "inline-block" }}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </div>
  );
}
