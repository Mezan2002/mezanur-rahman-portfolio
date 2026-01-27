"use client";

import gsap from "gsap";
import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function AlertModal({
  isOpen,
  onClose,
  title = "Notification",
  message = "Action completed.",
  type = "success", // success, error
}) {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const ctx = gsap.context(() => {
        gsap.set(overlayRef.current, { opacity: 0 });
        gsap.set(contentRef.current, { opacity: 0, scale: 0.9, y: 20 });

        gsap.to(overlayRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });

        gsap.to(contentRef.current, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.4,
          ease: "back.out(1.7)",
          delay: 0.1,
        });
      }, modalRef);
      return () => ctx.revert();
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle2 size={32} className="text-green-500" />;
      case "error":
        return <XCircle size={32} className="text-red-500" />;
      default:
        return <AlertCircle size={32} className="text-blue-500" />;
    }
  };

  const getButtonClass = () => {
    switch (type) {
      case "success":
        return "bg-green-500 hover:bg-green-600 shadow-green-500/20";
      case "error":
        return "bg-red-500 hover:bg-red-600 shadow-red-500/20";
      default:
        return "bg-blue-500 hover:bg-blue-600 shadow-blue-500/20";
    }
  };

  const getIconContainerClass = () => {
    switch (type) {
      case "success":
        return "bg-green-500/10 border-green-500/20 text-green-500";
      case "error":
        return "bg-red-500/10 border-red-500/20 text-red-500";
      default:
        return "bg-blue-500/10 border-blue-500/20 text-blue-500";
    }
  };

  return createPortal(
    <div
      ref={modalRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        ref={overlayRef}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
      ></div>

      {/* Modal Content */}
      <div
        ref={contentRef}
        className="relative w-full max-w-sm bg-[#0F0F0F] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-transparent via-primary/50 to-transparent opacity-50"></div>

        <div className="p-8 text-center">
          <div
            className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center border ${getIconContainerClass()}`}
          >
            {getIcon()}
          </div>

          <h3 className="text-xl font-bold font-syne text-white mb-2">
            {title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-8">
            {message}
          </p>

          <button
            onClick={onClose}
            className={`w-full py-3 rounded-full text-sm font-bold uppercase tracking-wider text-white transition-all shadow-lg hover:shadow-xl ${getButtonClass()}`}
          >
            OK
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
