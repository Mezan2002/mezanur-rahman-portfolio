"use client";

import gsap from "gsap";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";

// Mock Data
const blogs = {
  "future-web-animations": {
    title: "The Future of Web Animations",
    date: "October 24, 2024",
    readTime: "5 min read",
    cover:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1600",
    content: `
            <p class="mb-6 text-xl leading-relaxed">Web animation has evolved from simple hover effects to complex, cinematic experiences. With tools like GSAP and WebGL, developers now have the power to create immersive narratives directly in the browser.</p>
            <h2 class="text-3xl font-bold text-white mb-4 mt-12">The Shift to Micro-interactions</h2>
            <p class="mb-6 text-gray-400 leading-relaxed">It's not just about big, flashy intros. The most effective animations are often the subtle ones—the way a button presses down, the slight lag on a cursor, the smooth transition between pages. These details build trust and make the application feel "alive".</p>
            <h2 class="text-3xl font-bold text-white mb-4 mt-12">Performance Matters</h2>
            <p class="mb-6 text-gray-400 leading-relaxed">Beauty shouldn't come at the cost of speed. Using <code>will-change</code> strategically and sticking to transform/opacity changes is key to maintaining 60fps.</p>
        `,
  },
  // Default fallback
  default: {
    title: "Blog Post Title",
    date: "January 01, 2025",
    readTime: "3 min read",
    cover:
      "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?auto=format&fit=crop&q=80&w=1600",
    content: `<p class="text-xl leading-relaxed text-gray-400">Content loading or not found...</p>`,
  },
};

export default function BlogDetails() {
  const { slug } = useParams();
  const blog = blogs[slug] || blogs.default;
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".blog-reveal", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2,
      });
    }, containerRef);
    return () => ctx.revert();
  }, [slug]);

  return (
    <main
      ref={containerRef}
      className="bg-dark-background min-h-screen text-white pt-32 pb-20"
    >
      <div className="fixed top-24 left-8 z-40">
        <Link
          href="/blog"
          className="flex items-center gap-2 text-white hover:text-gray-400 transition-colors uppercase tracking-widest text-sm font-bold"
        >
          <ArrowLeft size={20} /> Back to Insights
        </Link>
      </div>

      <article className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <header className="mb-16 text-center blog-reveal">
          <div className="flex justify-center gap-6 text-sm text-gray-500 uppercase tracking-widest mb-6">
            <span className="flex items-center gap-2">
              <Calendar size={14} /> {blog.date}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={14} /> {blog.readTime}
            </span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black font-syne uppercase leading-tight mb-8">
            {blog.title}
          </h1>
        </header>

        {/* Cover Image */}
        <div className="w-full aspect-[21/9] relative rounded-2xl overflow-hidden mb-16 blog-reveal">
          <Image
            src={blog.cover}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div
          className="prose prose-invert prose-lg max-w-none text-gray-400 blog-reveal"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Footer */}
        <div className="border-t border-white/10 mt-20 pt-12 flex justify-center">
          <Link
            href="/contact"
            className="text-2xl font-bold font-syne hover:text-gray-400 transition-colors border-b border-white pb-1"
          >
            Have a topic request? Let me know.
          </Link>
        </div>
      </article>
    </main>
  );
}
