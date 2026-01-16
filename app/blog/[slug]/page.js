"use client";

import { getBlogById, getBlogs } from "@/lib/api";
import gsap from "gsap";
import parse from "html-react-parser";
import { ArrowLeft, Calendar, Clock, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function BlogDetails() {
  const { slug: id } = useParams(); // Treat 'slug' param as 'id' for now based on user pattern
  const router = useRouter();
  const containerRef = useRef(null);

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        // 1. Try fetching specifically by ID
        let res = await getBlogById(id).catch(() => ({ data: null }));
        let blogData = res.data;

        // 2. Fallback: fetch all if specific ID fetch fails
        if (!blogData) {
          try {
            const allBlogsRes = await getBlogs();
            const allBlogs = allBlogsRes.data || [];
            // Try finding by ID first, then by actual slug if we implement that later
            blogData = allBlogs.find(
              (b) => (b._id || b.id) === id || b.slug === id
            );
          } catch (fallbackErr) {
            console.error("Fallback fetch failed", fallbackErr);
          }
        }

        if (!blogData) {
          throw new Error("Blog post not found");
        }

        setBlog(blogData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlogData();
    }
  }, [id]);

  useEffect(() => {
    if (!loading && blog) {
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
    }
  }, [loading, blog]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-background flex items-center justify-center text-white">
        <Loader2 className="animate-spin text-primary w-12 h-12" />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-dark-background flex flex-col items-center justify-center text-white gap-6">
        <p className="text-xl text-red-400 font-mono">
          Error: {error || "Post not found"}
        </p>
        <Link
          href="/blog"
          className="px-6 py-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors font-bold uppercase text-xs tracking-widest"
        >
          Back to Journal
        </Link>
      </div>
    );
  }

  return (
    <main
      ref={containerRef}
      className="bg-dark-background min-h-screen text-white pt-32 pb-20"
    >
      <div className="fixed top-24 left-8 z-40">
        <Link
          href="/blog"
          className="flex items-center gap-2 text-white hover:text-gray-400 transition-colors uppercase tracking-widest text-sm font-bold bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/5"
        >
          <ArrowLeft size={20} />{" "}
          <span className="hidden md:inline">Back to Insights</span>
        </Link>
      </div>

      <article className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <header className="mb-16 text-center blog-reveal">
          <div className="flex justify-center gap-6 text-sm text-gray-500 uppercase tracking-widest mb-6">
            <span className="flex items-center gap-2">
              <Calendar size={14} />
              {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString(
                "en-US",
                {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                }
              )}
            </span>
            {blog.readTime && (
              <span className="flex items-center gap-2">
                <Clock size={14} /> {blog.readTime}
              </span>
            )}
            <span className="text-primary border border-primary/20 px-2 rounded">
              {typeof blog.category === "object"
                ? blog.category?.name
                : blog.category}
            </span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black font-syne uppercase leading-tight mb-8">
            {blog.title}
          </h1>
        </header>

        {/* Cover Image */}
        <div className="w-full aspect-[21/9] relative rounded-2xl overflow-hidden mb-16 blog-reveal border border-white/10">
          <Image
            src={
              blog.featuredImage ||
              blog.image ||
              "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1600"
            }
            alt={blog.title}
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none text-gray-400 blog-reveal prose-headings:font-syne prose-headings:font-bold prose-headings:text-white prose-a:text-primary hover:prose-a:text-white prose-strong:text-white prose-blockquote:border-primary prose-blockquote:bg-white/5 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-code:text-primary prose-code:bg-white/10 prose-code:px-2 prose-code:rounded prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10">
          {parse(blog.content || "")}
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="border-t border-white/10 mt-16 pt-8 blog-reveal">
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-white/5 rounded-full text-xs font-mono text-gray-400 uppercase tracking-wider"
                >
                  #{tag.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-white/10 mt-12 pt-12 flex justify-center blog-reveal">
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
