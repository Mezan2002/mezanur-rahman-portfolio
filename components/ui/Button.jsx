// components/Button.jsx
"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import { useRef } from "react";

export default function Button({
  variant = "primary",
  size = "md",
  children,
  leftIcon,
  rightIcon,
  className,
  disabled,
  ...props
}) {
  const buttonRef = useRef(null);
  const textDefaultRef = useRef(null);
  const textHoverRef = useRef(null);
  const iconLeftRef = useRef(null);
  const iconRightRef = useRef(null);
  const shineRef = useRef(null);

  const variants = {
    primary: "bg-primary",
    secondary:
      "bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white shadow-lg shadow-fuchsia-500/50",
    outline: "border-2 border-violet-600 text-violet-600 bg-transparent",
    ghost: "bg-violet-600/10 text-violet-600",
    gradient:
      "bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 text-white shadow-lg shadow-violet-500/50",
    dark: "bg-gradient-to-r from-slate-900 to-slate-700 text-white shadow-lg shadow-slate-900/50",
    success:
      "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/50",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-xl",
    lg: "px-8 py-4 text-lg rounded-2xl",
  };

  const handleMouseEnter = () => {
    if (disabled) return;

    const tl = gsap.timeline();

    // Text slide animation
    tl.to(
      textDefaultRef.current,
      {
        y: "-100%",
        duration: 0.4,
        ease: "power2.out",
      },
      0
    ).to(
      textHoverRef.current,
      {
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      },
      0
    );

    // Button lift
    gsap.to(buttonRef.current, {
      y: -3,
      scale: 1.02,
      boxShadow:
        variant === "outline"
          ? "0 10px 30px rgba(139, 92, 246, 0.4)"
          : variant === "ghost"
          ? "0 5px 15px rgba(139, 92, 246, 0.2)"
          : "0 20px 40px rgba(139, 92, 246, 0.5)",
      duration: 0.3,
      ease: "power2.out",
    });

    // Icon animations
    if (iconLeftRef.current) {
      gsap.to(iconLeftRef.current, {
        x: -4,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    if (iconRightRef.current) {
      gsap.to(iconRightRef.current, {
        x: 4,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    // Shine effect
    if (shineRef.current && variant !== "outline" && variant !== "ghost") {
      gsap.fromTo(
        shineRef.current,
        { x: "-100%", opacity: 0 },
        {
          x: "100%",
          opacity: 1,
          duration: 0.6,
          ease: "power2.inOut",
        }
      );
    }
  };

  const handleMouseLeave = () => {
    if (disabled) return;

    const tl = gsap.timeline();

    // Text slide back
    tl.to(
      textDefaultRef.current,
      {
        y: 0,
        duration: 0.4,
        ease: "power2.in",
      },
      0
    ).to(
      textHoverRef.current,
      {
        y: "100%",
        duration: 0.4,
        ease: "power2.in",
      },
      0
    );

    // Button back to normal
    gsap.to(buttonRef.current, {
      y: 0,
      scale: 1,
      boxShadow:
        variant === "outline"
          ? "0 0 0 rgba(139, 92, 246, 0)"
          : variant === "ghost"
          ? "0 0 0 rgba(139, 92, 246, 0)"
          : "0 10px 25px rgba(139, 92, 246, 0.3)",
      duration: 0.3,
      ease: "power2.in",
    });

    // Icons back
    if (iconLeftRef.current) {
      gsap.to(iconLeftRef.current, {
        x: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }

    if (iconRightRef.current) {
      gsap.to(iconRightRef.current, {
        x: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  };

  const handleMouseDown = () => {
    if (disabled) return;

    gsap.to(buttonRef.current, {
      scale: 0.95,
      duration: 0.1,
      ease: "power2.out",
    });
  };

  const handleMouseUp = () => {
    if (disabled) return;

    gsap.to(buttonRef.current, {
      scale: 1.02,
      duration: 0.1,
      ease: "power2.out",
    });
  };

  return (
    <button
      ref={buttonRef}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 font-semibold overflow-hidden transition-colors duration-300",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      disabled={disabled}
      {...props}
    >
      {/* Shine effect */}
      {variant !== "outline" && variant !== "ghost" && (
        <span
          ref={shineRef}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
          style={{ transform: "translateX(-100%)" }}
        />
      )}

      {leftIcon && (
        <span
          ref={iconLeftRef}
          className="inline-flex items-center relative z-10"
        >
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
        <span
          ref={iconRightRef}
          className="inline-flex items-center relative z-10"
        >
          {rightIcon}
        </span>
      )}
    </button>
  );
}
