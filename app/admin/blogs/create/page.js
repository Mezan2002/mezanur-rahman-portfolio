"use client";

import TiptapEditor from "@/components/admin/TiptapEditor";
import gsap from "gsap";
import { ArrowLeft, Image as ImageIcon, Loader2, Save } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function CreateBlogPage() {
  const containerRef = useRef(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);

  const categories = [
    "Design",
    "Development",
    "Tutorial",
    "Lifestyle",
    "Thoughts",
  ];

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

  const handlePublish = async () => {
    setIsPublishing(true);
    // Simulate API call
    console.log({ title, category, content });
    setTimeout(() => {
      alert("Blog published temporarily (Frontend Demo)!");
      setIsPublishing(false);
    }, 1500);
  };

  return (
    <div ref={containerRef} className="max-w-5xl mx-auto pb-40 min-h-screen">
      {/* Header Actions */}
      <div className="flex justify-between items-center mb-12 animate-in sticky top-8 z-50">
        <Link
          href="/admin/blogs"
          className="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors bg-black/50 px-4 py-2 rounded-full backdrop-blur-md border border-white/5 hover:border-white/20"
        >
          <div className="p-1 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
            <ArrowLeft size={16} />
          </div>
          <span className="uppercase tracking-widest text-xs font-bold">
            Back
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-gray-500 uppercase tracking-widest bg-black/50 px-4 py-2 rounded-full backdrop-blur-md border border-white/5">
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse"></div>
            Draft Mode
          </div>

          <button
            onClick={handlePublish}
            disabled={isPublishing || !title}
            className="flex items-center gap-2 px-8 py-3 bg-primary text-black font-bold font-syne uppercase tracking-wider rounded-full hover:bg-white hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-[0_0_20px_rgba(180,255,0,0.3)] hover:shadow-[0_0_30px_rgba(180,255,0,0.5)]"
          >
            {isPublishing ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Publishing...</span>
              </>
            ) : (
              <>
                <span>Publish</span>
                <Save size={18} />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editor Layout */}
      <div className="space-y-12">
        {/* Title Input */}
        <div className="animate-in group relative">
          <input
            type="text"
            placeholder="Untitled Article..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-transparent text-5xl md:text-7xl font-black font-syne text-white placeholder-gray-800 outline-none leading-tight selection:bg-primary/30"
          />
          <div className="absolute -left-8 top-4 opacity-0 group-focus-within:opacity-100 transition-opacity text-gray-600 hidden md:block">
            <span className="text-xs font-mono">H1</span>
          </div>
        </div>

        {/* Category Select */}
        <div className="animate-in flex items-center gap-4">
          <span className="text-xs font-mono uppercase tracking-widest text-gray-500">
            Filed Under:
          </span>
          <div className="relative group">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="appearance-none bg-white/5 border border-white/10 rounded-full px-6 py-2 pr-10 text-sm font-bold uppercase tracking-wider text-white focus:border-primary cursor-pointer hover:bg-white/10 transition-colors outline-none"
            >
              <option value="" disabled>
                Select Category
              </option>
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-black text-white">
                  {cat}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                className="group-hover:text-white transition-colors"
              >
                <path
                  d="M1 1L5 5L9 1"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Cover Image Upload */}
        <div className="animate-in group relative overflow-hidden rounded-3xl border-2 border-dashed border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-primary/50 transition-all cursor-pointer h-[400px] flex flex-col items-center justify-center gap-4">
          <div className="p-6 rounded-full bg-white/5 group-hover:scale-110 transition-transform duration-500 border border-white/5">
            <ImageIcon
              size={48}
              className="text-gray-600 group-hover:text-primary transition-colors"
            />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-bold font-syne text-white mb-1 group-hover:text-primary transition-colors">
              Add Cover Image
            </h3>
            <p className="text-sm text-gray-500 font-mono tracking-wide">
              Drag & drop or click to browse
            </p>
          </div>

          {/* Decorative Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none opacity-20"></div>
        </div>

        {/* Rich Text Editor */}
        <div className="animate-in relative max-w-4xl mx-auto pt-8">
          <div className="absolute -left-12 top-0 h-full w-px bg-gradient-to-b from-primary/50 to-transparent hidden xl:block"></div>
          <label className="block text-xs font-mono uppercase tracking-widest text-primary mb-6 flex items-center gap-2">
            <span className="w-1 h-1 bg-primary rounded-full"></span>
            Story Content
          </label>

          <div className="prose prose-invert prose-lg max-w-none prose-p:text-gray-300 prose-headings:font-syne prose-headings:font-bold prose-headings:text-white prose-a:text-primary hover:prose-a:text-white prose-blockquote:border-primary prose-blockquote:bg-white/5 prose-blockquote:p-4 prose-blockquote:rounded-r-lg prose-code:text-primary prose-code:bg-white/10 prose-code:px-2 prose-code:rounded prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10">
            <TiptapEditor content={content} onChange={setContent} />
          </div>
        </div>
      </div>
    </div>
  );
}
