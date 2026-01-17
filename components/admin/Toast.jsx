"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";
import { useRef } from "react";

const toastTypes = {
  success: {
    icon: <CheckCircle2 size={20} className="text-primary" />,
    label: "Success",
    accent: "bg-primary",
  },
  error: {
    icon: <AlertCircle size={20} className="text-red-500" />,
    label: "Error",
    accent: "bg-red-500",
  },
  info: {
    icon: <Info size={20} className="text-blue-500" />,
    label: "Info",
    accent: "bg-blue-500",
  },
};

export default function Toast({
  message,
  type = "success",
  isVisible,
  onClose,
}) {
  const toastRef = useRef(null);
  const progressRef = useRef(null);

  useGSAP(
    () => {
      if (isVisible) {
        // Entrance
        gsap.fromTo(
          toastRef.current,
          { x: 100, opacity: 0, scale: 0.9 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power4.out",
          }
        );

        // Progress bar animation
        gsap.fromTo(
          progressRef.current,
          { scaleX: 1 },
          {
            scaleX: 0,
            duration: 4,
            ease: "none",
            transformOrigin: "left",
            onComplete: () => onClose?.(),
          }
        );
      } else if (toastRef.current) {
        // Exit
        gsap.to(toastRef.current, {
          x: 100,
          opacity: 0,
          scale: 0.9,
          duration: 0.6,
          ease: "power4.in",
        });
      }
    },
    { dependencies: [isVisible], scope: toastRef }
  );

  const currentType = toastTypes[type] || toastTypes.success;

  return (
    <div
      ref={toastRef}
      className={`fixed bottom-10 right-10 z-100 pointer-events-auto transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="relative overflow-hidden bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-5 min-w-[320px] max-w-[400px]">
        {/* Accent Bar */}
        <div
          ref={progressRef}
          className={`absolute bottom-0 left-0 h-[2px] w-full ${currentType.accent} opacity-50`}
        />

        {/* Icon & Label */}
        <div className="shrink-0 flex flex-col items-center gap-1">
          {currentType.icon}
          <span className="text-[8px] font-mono uppercase tracking-widest text-gray-500">
            {currentType.label}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1">
          <p className="text-xs font-mono text-gray-400 mb-1 uppercase tracking-tighter opacity-50">
            System_Signal
          </p>
          <p className="text-sm font-syne font-bold text-white leading-tight">
            {message}
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="shrink-0 p-2 hover:bg-white/5 rounded-full text-gray-500 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
