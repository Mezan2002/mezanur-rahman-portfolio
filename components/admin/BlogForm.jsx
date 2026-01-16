"use client";

import ImageUploader from "@/components/admin/ImageUploader";
import TiptapEditor from "@/components/admin/TiptapEditor";
import { getCategories } from "@/lib/api";
import gsap from "gsap";
import { ArrowLeft, Loader2, Save, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function BlogForm({
  initialData = {},
  isEditing = false,
  onSubmit, // async (data) => void
}) {
  const containerRef = useRef(null);

  // Form States
  const [title, setTitle] = useState(initialData.title || "");
  const [category, setCategory] = useState(
    initialData.category?._id || initialData.category || ""
  );
  const [content, setContent] = useState(initialData.content || "");
  const [tags, setTags] = useState(
    Array.isArray(initialData.tags)
      ? initialData.tags.join(", ")
      : initialData.tags || ""
  );
  const [excerpt, setExcerpt] = useState(initialData.excerpt || "");
  const [readTimeManual, setReadTimeManual] = useState(
    initialData.readTime || ""
  );
  const [featuredImage, setFeaturedImage] = useState(
    initialData.featuredImage || ""
  );
  const [status, setStatus] = useState(initialData.status || "draft");

  // UI States
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Populate form when initialData changes (vital for edit mode async fetch)
  useEffect(() => {
    if (Object.keys(initialData).length > 0) {
      setTitle(initialData.title || "");
      setCategory(initialData.category?._id || initialData.category || "");
      setContent(initialData.content || "");
      setTags(
        Array.isArray(initialData.tags)
          ? initialData.tags.join(", ")
          : initialData.tags || ""
      );
      setExcerpt(initialData.excerpt || "");
      setReadTimeManual(initialData.readTime || "");
      setFeaturedImage(initialData.featuredImage || "");
      setStatus(initialData.status || "draft");
    }
  }, [initialData]);

  useEffect(() => {
    // 1. Fetch categories
    const fetchCats = async () => {
      try {
        const res = await getCategories();
        setCategories(res.data || []);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCats();

    // 2. Animations
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
    if (!title || !category || !content) {
      setError("Please fill in title, category, and content.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    // Calculate reading time
    const wordsPerMinute = 200;
    const textContent = content.replace(/<[^>]*>/g, ""); // Remove HTML tags
    const wordCount = textContent.split(/\s+/).filter(Boolean).length;
    const readTimeMinutes = Math.ceil(wordCount / wordsPerMinute) || 1;
    const readTimeAuto = `${readTimeMinutes} min read`;
    const readTime = readTimeManual || readTimeAuto;

    // Generate Slug
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    // Format Tags
    const tagsArray = tags
      ? tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean)
      : [];

    const blogData = {
      title,
      slug,
      readTime,
      category,
      content,
      tags: tagsArray,
      featuredImage:
        featuredImage ||
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
      status,
      excerpt: excerpt || textContent.substring(0, 150) + "...",
    };

    try {
      await onSubmit(blogData);
      // Let parent handle redirect
    } catch (err) {
      setError(err.message || "Failed to save blog post");
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={containerRef} className="pb-40 min-h-screen">
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
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-1 rounded-full backdrop-blur-md">
            <button
              onClick={() => setStatus("draft")}
              className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                status === "draft"
                  ? "bg-white text-black"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              Draft
            </button>
            <button
              onClick={() => setStatus("published")}
              className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                status === "published"
                  ? "bg-primary text-black"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              Publish
            </button>
          </div>

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
                <span>{isEditing ? "Update Post" : "Save Post"}</span>
                <Save size={18} />
              </>
            )}
          </button>
        </div>
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
            placeholder="Untitled Article..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-transparent text-5xl md:text-7xl font-black font-syne text-white placeholder-gray-800 outline-none leading-tight selection:bg-primary/30"
          />
        </div>

        {/* Excerpt Input */}
        <div className="animate-in group relative">
          <textarea
            placeholder="Short excerpt..."
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="w-full bg-transparent text-xl font-medium text-gray-400 placeholder-gray-800 outline-none resize-none h-20 border-l-2 border-transparent pl-1 focus:border-primary/50 transition-colors"
          />
        </div>

        {/* Metadata Ribbon */}
        <div className="animate-in flex flex-col gap-8">
          {/* Row 1: Category, Tags, Read Time (Horizontal Ribbon) */}
          <div className="flex flex-wrap items-center gap-4 md:gap-8 pb-8 border-b border-white/5">
            {/* Category */}
            <div className="relative group">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="appearance-none bg-transparent py-2 pr-8 text-lg font-bold font-syne text-white placeholder-gray-600 focus:text-primary outline-none transition-all cursor-pointer min-w-[200px]"
              >
                <option value="" disabled className="bg-black text-gray-500">
                  Select Category
                </option>
                {categories.length > 0 ? (
                  categories.map((cat) => (
                    <option
                      key={cat._id}
                      value={cat._id}
                      className="bg-black text-white"
                    >
                      {cat.name}
                    </option>
                  ))
                ) : (
                  <option disabled className="bg-black">
                    No categories
                  </option>
                )}
              </select>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 group-hover:text-primary transition-colors">
                <span className="text-xs font-mono uppercase tracking-widest">
                  ▼
                </span>
              </div>
              <span className="absolute -top-4 left-0 text-[10px] font-mono uppercase tracking-widest text-gray-600 group-hover:text-primary transition-colors">
                Category
              </span>
            </div>

            <div className="w-px h-12 bg-white/10 hidden md:block"></div>

            {/* Tags */}
            <div className="flex-1 min-w-[300px] relative group">
              <input
                type="text"
                placeholder="Add tags separated by comma..."
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full bg-transparent py-2 text-lg font-bold font-syne text-white placeholder-gray-700 outline-none border-none focus:placeholder-white/20 transition-all"
              />
              <span className="absolute -top-4 left-0 text-[10px] font-mono uppercase tracking-widest text-gray-600 group-focus-within:text-primary transition-colors">
                Tags
              </span>
            </div>

            <div className="w-px h-12 bg-white/10 hidden md:block"></div>

            {/* Read Time */}
            <div className="relative group min-w-[150px]">
              <input
                type="text"
                placeholder="5 min read"
                value={readTimeManual}
                onChange={(e) => setReadTimeManual(e.target.value)}
                className="w-full bg-transparent py-2 text-lg font-bold font-syne text-white placeholder-gray-700 outline-none border-none focus:placeholder-white/20 transition-all text-right"
              />
              <span className="absolute -top-4 right-0 text-[10px] font-mono uppercase tracking-widest text-gray-600 group-focus-within:text-primary transition-colors">
                Read Time
              </span>
            </div>
          </div>

          {/* Featured Image (Cinematic Banner) */}
          <div className="w-full group">
            <label className="text-xs font-mono uppercase tracking-widest text-gray-600 mb-4 block group-hover:text-primary transition-colors">
              Featured Cover Visual
            </label>
            <div className="overflow-hidden rounded-none border-b border-white/5 pb-8 group-hover:border-primary/20 transition-colors">
              <ImageUploader
                value={featuredImage}
                onChange={setFeaturedImage}
                className="w-full aspect-[21/9]" // Cinematic aspect ratio
              />
            </div>
          </div>
        </div>

        {/* Rich Text Editor */}
        <div className="animate-in relative mx-8 md:mx-12 pt-8">
          <div className="absolute -left-12 top-0 h-full w-px bg-linear-to-b from-primary/50 to-transparent hidden xl:block"></div>
          <label className="flex text-xs font-mono uppercase tracking-widest text-primary mb-6 items-center gap-2">
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
