// components/animations/RollingCounter.jsx
"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

export default function RollingCounter({
  value,
  duration = 1,
  decimals = 0,
  className = "",
  suffix = "",
  prefix = "",
  stagger = 0.05,
}) {
  const containerRef = useRef(null);
  // Fix: Initialize as string instead of number
  const [currentValue, setCurrentValue] = useState(value.toFixed(decimals));
  const previousValueRef = useRef(value);

  useEffect(() => {
    const previousValue = previousValueRef.current;
    const isIncreasing = value > previousValue;
    const direction = isIncreasing ? -1 : 1; // -1 for up, 1 for down

    const obj = { value: previousValue };

    const animation = gsap.to(obj, {
      value: value,
      duration: duration,
      ease: "power2.out",
      snap: { value: decimals === 0 ? 1 : 1 / Math.pow(10, decimals) },
      onUpdate: () => {
        const newValue = obj.value.toFixed(decimals);
        const oldValue = currentValue;

        if (newValue !== oldValue && containerRef.current) {
          // Create animation for each digit change
          const digits = containerRef.current.querySelectorAll(".digit-slot");

          digits.forEach((digit, index) => {
            // Slide animation
            gsap.fromTo(
              digit,
              {
                y: `${direction * 100}%`,
                opacity: 0,
              },
              {
                y: "0%",
                opacity: 1,
                duration: 0.4,
                ease: "power2.out",
                delay: index * stagger,
              }
            );
          });
        }

        setCurrentValue(newValue);
      },
      onComplete: () => {
        setCurrentValue(value.toFixed(decimals));
        previousValueRef.current = value;
      },
    });

    return () => animation.kill();
  }, [value, duration, decimals, currentValue, stagger]);

  // Split number into individual digits for animation
  const renderDigits = () => {
    // Ensure currentValue is a string
    const valueString = String(currentValue);

    return valueString.split("").map((char, index) => (
      <span
        key={`${char}-${index}`}
        className="digit-slot inline-block overflow-hidden"
        style={{ minWidth: char === "." ? "0.3em" : "0.6em" }}
      >
        {char}
      </span>
    ));
  };

  return (
    <span className={`inline-flex ${className}`}>
      {prefix && <span className="mr-1">{prefix}</span>}
      <span
        ref={containerRef}
        className="inline-flex items-center justify-center"
      >
        {renderDigits()}
      </span>
      {suffix && <span className="ml-1">{suffix}</span>}
    </span>
  );
}
