// components/animations/HackerText.jsx
"use client";

import { useEffect, useRef, useState } from "react";

export default function HackerText({
  text,
  className = "",
  delay = 0,
  speed = 50,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*",
  triggerOnHover = false, // New prop to enable hover animation
}) {
  const [displayText, setDisplayText] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const intervalRef = useRef(null);
  const iterationRef = useRef(0);

  const animate = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    iterationRef.current = 0;

    setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((char, index) => {
              if (index < iterationRef.current) {
                return text[index];
              }
              return characters[Math.floor(Math.random() * characters.length)];
            })
            .join("")
        );

        if (iterationRef.current >= text.length) {
          clearInterval(intervalRef.current);
          setIsAnimating(false);
          setHasAnimated(true);
        }

        iterationRef.current += 1 / 3;
      }, speed);
    }, delay);
  };

  useEffect(() => {
    requestAnimationFrame(() => animate());

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text]);

  const handleMouseEnter = () => {
    if (triggerOnHover && !isAnimating) {
      setHasAnimated(false);
      animate();
    }
  };

  return (
    <span className={className} onMouseEnter={handleMouseEnter}>
      {displayText || text}
    </span>
  );
}
