"use client";

import gsap from "gsap";
import { AlertTriangle, Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Delete",
  confirmButtonClass = "bg-red-500 hover:bg-red-600",
  isLoading = false,
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

  return createPortal(
    <div
      ref={modalRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        ref={overlayRef}
        onClick={!isLoading ? onClose : undefined}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
      ></div>

      {/* Modal Content */}
      <div
        ref={contentRef}
        className="relative w-full max-w-md bg-[#0F0F0F] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-transparent via-primary/50 to-transparent opacity-50"></div>

        <div className="p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-6 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/20 text-red-500">
            <AlertTriangle size={32} />
          </div>

          <h3 className="text-xl font-bold font-syne text-white mb-2">
            {title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-8">
            {message}
          </p>

          <div className="flex items-center gap-3 justify-center">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-gray-400 bg-white/5 hover:bg-white/10 hover:text-white transition-colors border border-transparent hover:border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed ${confirmButtonClass}`}
            >
              {isLoading && <Loader2 size={14} className="animate-spin" />}
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
