"use client";

import gsap from "gsap";
import { ArrowLeft, Loader2, Save, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ImageUploader from "./ImageUploader";

export default function ServiceForm({
  initialData = {},
  isEditing = false,
  onSubmit,
}) {
  const containerRef = useRef(null);

  // Form States
  const [title, setTitle] = useState(initialData.title || "");
  const [icon, setIcon] = useState(initialData.icon || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [tags, setTags] = useState(
    Array.isArray(initialData.tags) ? initialData.tags.join(", ") : ""
  );

  // UI States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Populate form when initialData changes
  useEffect(() => {
    if (Object.keys(initialData).length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTitle(initialData.title || "");
      setIcon(initialData.icon || "");
      setDescription(initialData.description || "");
      setTags(
        Array.isArray(initialData.tags) ? initialData.tags.join(", ") : ""
      );
    }
  }, [initialData]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".animate-in", { opacity: 0, y: 20 });
      gsap.to(".animate-in", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "all",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async () => {
    if (!title || !description) {
      setError("Please fill in title and description.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    // Format Tags from comma-separated string to array
    const tagsArray = tags
      ? tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean)
      : [];

    const serviceData = {
      title,
      icon,
      description,
      tags: tagsArray,
    };

    try {
      await onSubmit(serviceData);
    } catch (err) {
      setError(err.message || "Failed to save service");
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={containerRef} className="pb-40 min-h-screen">
      {/* Header Actions */}
      <div className="flex justify-between items-center mb-12 animate-in sticky top-8 z-50">
        <Link
          href="/admin/services"
          className="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors bg-black/50 px-4 py-2 rounded-full backdrop-blur-md border border-white/5 hover:border-white/20"
        >
          <div className="p-1 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
            <ArrowLeft size={16} />
          </div>
          <span className="uppercase tracking-widest text-xs font-bold">
            Back
          </span>
        </Link>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !title}
          className="flex items-center gap-2 px-8 py-3 bg-primary text-black font-bold font-syne uppercase tracking-wider rounded-full hover:bg-white hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-[0_0_20px_rgba(180,255,0,0.3)] hover:shadow-[0_0_30px_rgba(180,255,0,0.5)]"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>{isEditing ? "Updating..." : "Saving..."}</span>
            </>
          ) : (
            <>
              <span>{isEditing ? "Update Service" : "Save Service"}</span>
              <Save size={18} />
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="animate-in mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm font-mono flex items-center justify-between">
          <span>Error: {error}</span>
          <button onClick={() => setError(null)}>
            <X size={16} />
          </button>
        </div>
      )}

      {/* Editor Layout */}
      <div className="space-y-12">
        {/* Title Input */}
        <div className="animate-in group relative">
          <input
            type="text"
            placeholder="Untitled Service..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-transparent text-5xl md:text-7xl font-black font-syne text-white placeholder-gray-800 outline-none leading-tight selection:bg-primary/30"
          />
        </div>

        {/* Description Input */}
        <div className="animate-in group relative">
          <textarea
            placeholder="Service description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-transparent text-xl font-medium text-gray-400 placeholder-gray-800 outline-none resize-none h-32 border-l-2 border-transparent pl-1 focus:border-primary/50 transition-colors"
          />
        </div>

        {/* Metadata Ribbon */}
        <div className="animate-in flex flex-col gap-8">
          {/* Row 1: Icon & Tags */}
          <div className="flex flex-wrap items-center gap-4 md:gap-8 pb-8 border-b border-white/5">
            {/* Icon Upload */}
            <div className="relative group min-w-[250px]">
              <ImageUploader value={icon} onChange={(url) => setIcon(url)} />
              <span className="absolute -top-8 left-0 text-[10px] font-mono uppercase tracking-widest text-gray-600 group-focus-within:text-primary transition-colors">
                Icon Image Upload
              </span>
            </div>

            <div className="w-px h-12 bg-white/10 hidden md:block"></div>

            {/* Tags Section */}
            <div className="flex-1 min-w-[300px] relative group">
              <input
                type="text"
                placeholder="Add tags separated by comma..."
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full bg-transparent py-2 text-lg font-bold font-syne text-white placeholder-gray-700 outline-none border-none focus:placeholder-white/20 transition-all"
              />
              <span className="absolute -top-4 left-0 text-[10px] font-mono uppercase tracking-widest text-gray-600 group-focus-within:text-primary transition-colors">
                Service Tags
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
