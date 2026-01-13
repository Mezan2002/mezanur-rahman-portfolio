// components/MagneticButton.jsx
"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function MagneticButton({
  variant = "primary",
  size = "md",
  children,
  leftIcon,
  rightIcon,
  className,
  disabled,
  magneticStrength = 0.3,
  ...props
}) {
  const buttonRef = useRef(null);
  const textDefaultRef = useRef(null);
  const textHoverRef = useRef(null);

  const variants = {
    primary:
      "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/50",
    secondary:
      "bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white shadow-lg shadow-fuchsia-500/50",
    outline: "border-2 border-violet-600 text-violet-600 bg-transparent",
    ghost: "bg-violet-600/10 text-violet-600",
    gradient:
      "bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 text-white shadow-lg shadow-violet-500/50",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-xl",
    lg: "px-8 py-4 text-lg rounded-2xl",
  };

  useEffect(() => {
    if (disabled) return;

    const button = buttonRef.current;

    const handleMouseMove = (e) => {
      const { left, top, width, height } = button.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const deltaX = (e.clientX - centerX) * magneticStrength;
      const deltaY = (e.clientY - centerY) * magneticStrength;

      gsap.to(button, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseEnter = () => {
      gsap.to(textDefaultRef.current, {
        y: "-100%",
        duration: 0.5,
        ease: "power3.out",
      });
      gsap.to(textHoverRef.current, {
        y: 0,
        duration: 0.5,
        ease: "power3.out",
      });
      gsap.to(button, {
        scale: 1.05,
        boxShadow: "0 25px 50px rgba(139, 92, 246, 0.6)",
        duration: 0.3,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        scale: 1,
        boxShadow: "0 10px 25px rgba(139, 92, 246, 0.3)",
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
      });
      gsap.to(textDefaultRef.current, {
        y: 0,
        duration: 0.5,
        ease: "power3.in",
      });
      gsap.to(textHoverRef.current, {
        y: "100%",
        duration: 0.5,
        ease: "power3.in",
      });
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [disabled, magneticStrength]);

  return (
    <button
      ref={buttonRef}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 font-semibold overflow-hidden",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {leftIcon && (
        <span className="inline-flex items-center relative z-10">
          {leftIcon}
        </span>
      )}

      <span className="relative inline-block h-[1.2em] overflow-hidden z-10">
        <span ref={textDefaultRef} className="block">
          {children}
        </span>
        <span
          ref={textHoverRef}
          className="absolute top-0 left-0 block"
          style={{ transform: "translateY(100%)" }}
        >
          {children}
        </span>
      </span>

      {rightIcon && (
        <span className="inline-flex items-center relative z-10">
          {rightIcon}
        </span>
      )}
    </button>
  );
}
