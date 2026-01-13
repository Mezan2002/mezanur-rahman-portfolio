"use client";

import gsap from "gsap";
import { ArrowLeft, Calendar, Eye, PenTool } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function BlogPreviewPage({ params }) {
  const containerRef = useRef(null);
  const router = useRouter();

  // Mock Data (In a real app, fetch based on params.id)
  const blog = {
    id: params.id,
    title: "The Evolution of Digital Aesthetics",
    content: `
      <p class="mb-6 leading-relaxed text-gray-300">In the rapidly evolving landscape of digital design, the concept of aesthetics has transcended mere visual appeal to become a fundamental component of user experience. We are witnessing a shift from flat, utilitarian interfaces to rich, immersive environments that prioritize depth, motion, and emotional connection.</p>
      
      <h2 class="text-2xl font-bold font-syne text-white mb-4 mt-8">The Return of Depth</h2>
      <p class="mb-6 leading-relaxed text-gray-300">Gone are the days of strict flat design. Modern interfaces are embracing glassmorphism, neumorphism, and 3D elements to create a sense of hierarchy and tactile realism. This "digital materiality" helps users intuitively understand the structure of an application.</p>
      
      <blockquote class="border-l-4 border-primary pl-6 py-2 my-8 italic text-white/80 bg-white/5 rounded-r-lg">
        "Design is not just what it looks like and feels like. Design is how it works." — Steve Jobs
      </blockquote>

      <h2 class="text-2xl font-bold font-syne text-white mb-4 mt-8">Motion as Meaning</h2>
      <p class="mb-6 leading-relaxed text-gray-300">Animation is no longer a delight factor; it is a necessity. Motion guides the eye, provides feedback, and tells a story. From subtle micro-interactions to sweeping page transitions, motion design is the glue that holds the user journey together.</p>
    `,
    category: "Design",
    status: "Published",
    views: "1.2k",
    date: "Oct 24, 2025",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".animate-enter", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen pb-20">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-8 animate-enter">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors uppercase tracking-widest text-xs font-bold"
        >
          <ArrowLeft size={16} />
          Back to Blogs
        </button>

        <div className="flex items-center gap-4">
          <span className="px-3 py-1 bg-green-500/10 text-green-500 text-xs font-mono uppercase tracking-widest border border-green-500/20 rounded">
            {blog.status}
          </span>
          <Link
            href={`/admin/blogs/edit/${blog.id}`}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-black font-bold uppercase tracking-wider rounded hover:bg-white transition-colors text-xs"
          >
            <PenTool size={14} />
            Edit Post
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative w-full h-[400px] rounded-3xl overflow-hidden mb-12 animate-enter group">
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10"></div>
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
        />
        <div className="absolute bottom-0 left-0 p-10 z-20 w-full">
          <div className="flex items-center gap-6 mb-4 text-xs font-mono uppercase tracking-widest text-gray-300">
            <span className="bg-white/10 px-3 py-1 rounded backdrop-blur-md text-white border border-white/10">
              {blog.category}
            </span>
            <span className="flex items-center gap-2">
              <Calendar size={14} /> {blog.date}
            </span>
            <span className="flex items-center gap-2">
              <Eye size={14} /> {blog.views} Views
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black font-syne text-white leading-tight max-w-4xl drop-shadow-2xl">
            {blog.title}
          </h1>
        </div>
      </div>

      {/* Content Body */}
      <div
        className="max-w-3xl mx-auto prose prose-invert prose-lg animate-enter"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  );
}
