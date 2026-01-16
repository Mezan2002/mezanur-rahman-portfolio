"use strict";
"use client";

import ImageUploader from "@/components/admin/ImageUploader";
import TiptapEditor from "@/components/admin/TiptapEditor";
import gsap from "gsap";
import { ArrowLeft, Loader2, Save, Star, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function TestimonialForm({
  initialData = {},
  isEditing = false,
  onSubmit, // async (data) => void
}) {
  const containerRef = useRef(null);

  // Form States
  const [name, setName] = useState(initialData.name || "");
  const [role, setRole] = useState(
    initialData.role || initialData.position || ""
  );
  const [content, setContent] = useState(initialData.content || "");
  const [rating, setRating] = useState(initialData.rating || 5);
  const [image, setImage] = useState(initialData.image || "");

  // UI States
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [error, setError] = useState(null);

  // ... (keeping useEffects same)

  // ... (inside JSX)
  {
    /* Avatar Upload - Clean & Interactive */
  }
  <div className="flex flex-col gap-3 group/avatar">
    <label className="text-[10px] font-mono uppercase tracking-widest text-gray-500">
      Client Identity
    </label>
    <div className="flex items-center gap-6">
      {/* Preview */}
      <div className="relative w-16 h-16 rounded-full border-2 border-white/10 overflow-hidden bg-white/5 group-hover/avatar:border-primary/50 transition-colors duration-500 flex items-center justify-center">
        {isUploadingImage ? (
          <Loader2 className="w-5 h-5 text-primary animate-spin" />
        ) : image ? (
          <>
            <Image
              src={image}
              alt="Client"
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                setImage("");
              }}
              className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white"
              title="Remove Image"
            >
              <X size={18} />
            </button>
          </>
        ) : (
          <User className="w-full h-full p-4 text-white/20" />
        )}
      </div>

      {/* Uploader Trigger & Actions */}
      <div className="flex flex-col items-start gap-1">
        <div className="relative cursor-pointer group/upload">
          <ImageUploader
            value={image}
            onChange={setImage}
            onUploadStart={() => setIsUploadingImage(true)}
            onUploadEnd={() => setIsUploadingImage(false)}
            className="opacity-0 absolute inset-0 w-full h-full z-20 cursor-pointer"
            folder="testimonials"
          />
          <span className="text-sm font-bold text-white group-hover/upload:text-primary transition-colors relative z-10">
            {isUploadingImage
              ? "Uploading..."
              : image
              ? "Change Photo"
              : "Upload Photo"}
          </span>
        </div>

        {!isUploadingImage && image ? (
          <button
            type="button"
            onClick={() => setImage("")}
            className="text-[10px] font-mono uppercase text-red-500 hover:text-red-400 flex items-center gap-1 transition-colors z-20 relative"
          >
            <X size={12} /> Remove Photo
          </button>
        ) : (
          !isUploadingImage && (
            <span className="text-[10px] text-gray-500 font-mono uppercase">
              JPG, PNG • Max 5MB
            </span>
          )
        )}
      </div>
    </div>
  </div>;

  // Populate form when initialData changes
  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setName(initialData.name || "");
      setRole(initialData.role || initialData.position || "");
      setContent(initialData.content || "");
      setRating(initialData.rating || 5);
      setImage(initialData.image || "");
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
    if (!name || !content) {
      setError("Please fill in client name and testimonial content.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const testimonialData = {
      name,
      role,
      content,
      rating,
      image,
    };

    try {
      await onSubmit(testimonialData);
    } catch (err) {
      setError(err.message || "Failed to save testimonial");
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={containerRef} className="pb-40 min-h-screen">
      {/* Header Actions */}
      <div className="flex justify-between items-center mb-12 animate-in sticky top-8 z-50">
        <Link
          href="/admin/testimonials"
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
          disabled={isSubmitting || !name}
          className="flex items-center gap-2 px-8 py-3 bg-primary text-black font-bold font-syne uppercase tracking-wider rounded-full hover:bg-white hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-[0_0_20px_rgba(180,255,0,0.3)] hover:shadow-[0_0_30px_rgba(180,255,0,0.5)]"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>{isEditing ? "Updating..." : "Saving..."}</span>
            </>
          ) : (
            <>
              <span>{isEditing ? "Update Review" : "Save Review"}</span>
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

      {/* Editor Layout - MATCHING BLOG FORM STYLE */}
      <div className="space-y-12">
        {/* Name Input (Title) */}
        <div className="animate-in group relative">
          <input
            type="text"
            placeholder="Client Name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-transparent text-5xl md:text-7xl font-black font-syne text-white placeholder-gray-800 outline-none leading-tight selection:bg-primary/30"
          />
        </div>

        {/* Role Input (Excerpt) */}
        <div className="animate-in group relative">
          <input
            type="text"
            placeholder="Role / Company..."
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full bg-transparent text-xl font-medium text-gray-400 placeholder-gray-800 outline-none border-l-2 border-transparent pl-1 focus:border-primary/50 transition-colors"
          />
        </div>

        {/* Metadata Ribbon */}
        {/* Metadata Ribbon - Simplified & Cinematic */}
        <div className="animate-in flex flex-wrap items-center gap-12 pb-8 border-b border-white/5">
          {/* Rating */}
          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-mono uppercase tracking-widest text-gray-500">
              Satisfaction Level
            </label>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className="transition-transform active:scale-95 hover:scale-110 focus:outline-none"
                  >
                    <Star
                      size={32}
                      weight="fill"
                      className={`transition-all duration-300 ${
                        (hoverRating || rating) >= star
                          ? "text-primary fill-primary drop-shadow-[0_0_10px_rgba(180,255,0,0.4)]"
                          : "text-white/10"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <span className="text-2xl font-black font-syne text-white translation-all duration-300">
                {hoverRating || rating}.0
              </span>
            </div>
          </div>

          <div className="w-px h-16 bg-white/10 hidden md:block"></div>

          {/* Avatar Upload - Clean & Interactive */}
          <div className="flex flex-col gap-3 group/avatar">
            <label className="text-[10px] font-mono uppercase tracking-widest text-gray-500">
              Client Identity
            </label>
            <div className="flex items-center gap-6">
              {/* Preview */}
              <div className="relative w-16 h-16 rounded-full border-2 border-white/10 overflow-hidden bg-white/5 group-hover/avatar:border-primary/50 transition-colors duration-500">
                {image ? (
                  <>
                    <Image
                      src={image}
                      alt="Client"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setImage("");
                      }}
                      className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white"
                      title="Remove Image"
                    >
                      <X size={18} />
                    </button>
                  </>
                ) : (
                  <User className="w-full h-full p-4 text-white/20" />
                )}
              </div>

              {/* Uploader Trigger & Actions */}
              <div className="flex flex-col items-start gap-1">
                <div className="relative cursor-pointer group/upload">
                  <ImageUploader
                    value={image}
                    onChange={setImage}
                    className="opacity-0 absolute inset-0 w-full h-full z-20 cursor-pointer"
                    folder="testimonials"
                  />
                  <span className="text-sm font-bold text-white group-hover/upload:text-primary transition-colors relative z-10">
                    {image ? "Change Photo" : "Upload Photo"}
                  </span>
                </div>

                {image ? (
                  <button
                    type="button"
                    onClick={() => setImage("")}
                    className="text-[10px] font-mono uppercase text-red-500 hover:text-red-400 flex items-center gap-1 transition-colors"
                  >
                    <X size={12} /> Remove Photo
                  </button>
                ) : (
                  <span className="text-[10px] text-gray-500 font-mono uppercase">
                    JPG, PNG • Max 5MB
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Content (Tiptap Editor) */}
        <div className="animate-in relative pt-4">
          <div className="absolute -left-4 md:-left-12 top-0 h-full w-px bg-linear-to-b from-primary/50 to-transparent hidden xl:block"></div>
          <label className="flex text-xs font-mono uppercase tracking-widest text-primary mb-6 items-center gap-2">
            <span className="w-1 h-1 bg-primary rounded-full"></span>
            The Kind Words
          </label>

          <div className="prose prose-invert prose-lg max-w-none prose-p:text-gray-300 prose-headings:font-syne prose-headings:font-bold prose-headings:text-white prose-a:text-primary hover:prose-a:text-white prose-blockquote:border-primary prose-blockquote:bg-white/5 prose-blockquote:p-4 prose-blockquote:rounded-r-lg prose-code:text-primary prose-code:bg-white/10 prose-code:px-2 prose-code:rounded prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10">
            <TiptapEditor content={content} onChange={setContent} />
          </div>
        </div>
      </div>
    </div>
  );
}
