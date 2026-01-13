"use client";

import gsap from "gsap";
import {
  ArrowLeft,
  Building2,
  Image as ImageIcon,
  Loader2,
  MessageSquare,
  Plus,
  Save,
  Star,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function CreateTestimonialPage() {
  const containerRef = useRef(null);
  const router = useRouter();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [isPublishing, setIsPublishing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    content: "",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".animate-in", { opacity: 0, y: 30 });
      gsap.to(".animate-in", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "all",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handlePublish = (e) => {
    e.preventDefault();
    setIsPublishing(true);

    // Simulate API call
    console.log("Publishing Testimonial:", { ...formData, rating });

    setTimeout(() => {
      setIsPublishing(false);
      router.push("/admin/testimonials");
    }, 1500);
  };

  return (
    <div ref={containerRef} className="max-w-4xl mx-auto pb-20 min-h-screen">
      {/* Header / Navigation */}
      <div className="animate-in flex items-center justify-between mb-12 sticky top-8 z-50">
        <Link
          href="/admin/testimonials"
          className="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors bg-black/50 px-5 py-2.5 rounded-full backdrop-blur-md border border-white/5 hover:border-white/20"
        >
          <div className="p-1 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
            <ArrowLeft size={16} />
          </div>
          <span className="uppercase tracking-widest text-[10px] font-bold font-mono">
            Back to Reviews
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => router.push("/admin/testimonials")}
            className="hidden md:flex items-center gap-2 px-6 py-2.5 text-gray-400 hover:text-white font-bold font-syne uppercase tracking-wider text-xs transition-colors"
          >
            Discard
          </button>
          <button
            onClick={handlePublish}
            disabled={isPublishing || !formData.name || !formData.content}
            className="flex items-center gap-3 px-8 py-2.5 bg-primary text-black font-black font-syne uppercase tracking-wider text-xs rounded-full hover:bg-white hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(180,255,0,0.2)]"
          >
            {isPublishing ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Save size={16} />
            )}
            <span>{isPublishing ? "Publishing..." : "Publish Review"}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Form Side */}
        <div className="lg:col-span-2 space-y-8">
          <div className="animate-in">
            <h1 className="text-4xl md:text-6xl font-black font-syne uppercase text-white leading-none mb-4">
              Add New <br />
              <span className="text-primary font-outline">Success Story.</span>
            </h1>
            <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">
              Client Feedback & Appreciation
            </p>
          </div>

          <form className="space-y-6">
            <div className="animate-in grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 ml-1">
                  Client Name
                </label>
                <div className="relative group">
                  <User
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-primary transition-colors"
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="e.g. Alexander Walker"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-white/3 border border-white/10 rounded-2xl px-12 py-4 text-white focus:border-primary/50 outline-none transition-all placeholder-gray-700"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 ml-1">
                  Position / Company
                </label>
                <div className="relative group">
                  <Building2
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-primary transition-colors"
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="e.g. CEO at TechFlow"
                    value={formData.position}
                    onChange={(e) =>
                      setFormData({ ...formData, position: e.target.value })
                    }
                    className="w-full bg-white/3 border border-white/10 rounded-2xl px-12 py-4 text-white focus:border-primary/50 outline-none transition-all placeholder-gray-700"
                  />
                </div>
              </div>
            </div>

            <div className="animate-in space-y-3">
              <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 ml-1">
                Testimonial Content
              </label>
              <div className="relative group">
                <MessageSquare
                  className="absolute left-5 top-5 text-gray-600 group-focus-within:text-primary transition-colors"
                  size={16}
                />
                <textarea
                  rows={6}
                  placeholder="Paste the kind words here..."
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  className="w-full bg-white/3 border border-white/10 rounded-3xl px-12 py-5 text-white focus:border-primary/50 outline-none transition-all placeholder-gray-700 resize-none leading-relaxed"
                ></textarea>
              </div>
            </div>
          </form>
        </div>

        {/* Sidebar Controls */}
        <div className="lg:col-span-1 space-y-6">
          {/* Star Rating Control */}
          <div className="animate-in bg-linear-to-br from-[#0a0a0a] to-black border border-white/5 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-2xl pointer-events-none"></div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
              <Star size={12} className="text-primary" /> Satisfaction Level
            </h3>

            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="transition-transform active:scale-95"
                >
                  <Star
                    size={28}
                    className={`transition-all duration-300 ${
                      (hoverRating || rating) >= star
                        ? "text-primary fill-primary scale-110"
                        : "text-gray-800"
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="mt-4 text-[10px] font-mono text-gray-600 uppercase tracking-widest">
              Selected:{" "}
              <span className="text-white font-bold">{rating} Stars</span>
            </p>
          </div>

          {/* Avatar Dropzone */}
          <div className="animate-in bg-linear-to-br from-[#0a0a0a] to-black border border-white/5 rounded-3xl p-8 group cursor-pointer hover:border-primary/30 transition-all">
            <h3 className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
              <ImageIcon size={12} /> Client Avatar
            </h3>

            <div className="aspect-square rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-3 group-hover:bg-white/2 transition-all">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-600 group-hover:text-primary transition-colors">
                <Plus size={24} />
              </div>
              <span className="text-[10px] font-mono text-gray-600 uppercase">
                Upload Photo
              </span>
            </div>
          </div>

          {/* Tips */}
          <div className="animate-in p-6 bg-blue-500/5 border border-blue-500/10 rounded-2xl">
            <p className="text-[10px] text-blue-400 font-mono leading-relaxed italic">
              &apos;Great testimonials often include specific results or
              problems solved. Keep it authentic!&apos;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
