"use client";

import { getBlogById, getBlogs } from "@/lib/api";
import gsap from "gsap";
import parse from "html-react-parser";
import { ArrowLeft, Calendar, Eye, Loader2, PenTool } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function BlogPreviewPage() {
  const containerRef = useRef(null);
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        // 1. Try fetching specifically by ID
        let res = await getBlogById(id).catch(() => ({ data: null }));
        let blogData = res.data;

        // 2. Fallback: fetch all if specific ID fetch fails
        if (!blogData) {
          try {
            const allBlogsRes = await getBlogs();
            const allBlogs = allBlogsRes.data || [];
            blogData = allBlogs.find((b) => (b._id || b.id) === id);
          } catch (fallbackErr) {
            console.error("Fallback fetch failed", fallbackErr);
          }
        }

        if (!blogData) {
          throw new Error("Post not found");
        }

        setBlog(blogData);
      } catch (err) {
        setError(err.message || "Failed to fetch blog post");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  useEffect(() => {
    if (!loading && blog) {
      const ctx = gsap.context(() => {
        gsap.from(".animate-enter", {
          y: 50,
          opacity: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power4.out",
        });
      }, containerRef);
      return () => ctx.revert();
    }
  }, [loading, blog]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6">
        <Loader2 className="w-16 h-16 text-primary animate-spin" />
        <p className="text-gray-500 font-mono text-sm uppercase tracking-widest">
          Loading article...
        </p>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen py-20 px-10 max-w-4xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 text-sm uppercase tracking-wide"
        >
          <ArrowLeft size={18} /> Back
        </button>
        <div className="p-12 border border-red-500/20 bg-red-500/5 rounded-3xl text-red-400 text-center">
          <p className="text-2xl font-bold font-syne mb-2">Article Not Found</p>
          <p className="text-sm text-gray-500">
            {error || "This post doesn't exist"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen">
      {/* Refined Header */}
      <header className="border-b border-white/5 py-8 mb-16 animate-enter">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
          >
            <ArrowLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span className="text-sm uppercase tracking-wider">
              Back to Articles
            </span>
          </button>

          <div className="flex items-center gap-4">
            <span
              className={`px-4 py-1.5 text-xs uppercase tracking-wider font-medium rounded-full ${
                blog.status === "Published" || blog.status === "published"
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
              }`}
            >
              {blog.status}
            </span>
            <Link
              href={`/admin/blogs/edit/${blog._id || blog.id}`}
              className="flex items-center gap-2 px-6 py-2.5 bg-white text-black font-bold uppercase tracking-wider rounded-full hover:bg-primary transition-colors text-xs"
            >
              <PenTool size={16} />
              Edit Article
            </Link>
          </div>
        </div>
      </header>

      {/* Article Header */}
      <article className="max-w-5xl mx-auto space-y-16">
        {/* Meta & Title */}
        <div className="space-y-8 animate-enter">
          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <time className="uppercase tracking-wide">
                {new Date(
                  blog.publishedAt || blog.createdAt || Date.now()
                ).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </div>

            <span className="text-gray-700">•</span>

            <div className="flex items-center gap-2">
              <Eye size={16} />
              <span>{blog.views || 0} views</span>
            </div>

            {blog.readTime && (
              <>
                <span className="text-gray-700">•</span>
                <span className="text-primary">{blog.readTime}</span>
              </>
            )}

            {blog.category && (
              <>
                <span className="text-gray-700">•</span>
                <span className="text-primary uppercase tracking-wider font-medium">
                  {typeof blog.category === "object"
                    ? blog.category.name
                    : blog.category}
                </span>
              </>
            )}
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black font-syne text-white leading-[1.05] tracking-tight">
            {blog.title}
          </h1>

          {/* Excerpt/Description if available */}
          {blog.excerpt && (
            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-3xl">
              {blog.excerpt}
            </p>
          )}
        </div>

        {/* Featured Image */}
        <figure className="w-full aspect-[21/9] rounded-3xl overflow-hidden animate-enter">
          <Image
            src={
              blog.featuredImage ||
              blog.image ||
              "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
            }
            alt={blog.title}
            width={1920}
            height={1080}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
          />
        </figure>

        {/* Article Content */}
        <div className="max-w-3xl mx-auto prose prose-invert prose-lg md:prose-xl animate-enter selection:bg-primary/30 prose-headings:font-syne prose-headings:font-black prose-headings:tracking-tight prose-p:text-gray-300 prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-code:text-primary prose-code:bg-white/5 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10">
          {parse(blog.content || "")}
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="max-w-3xl mx-auto pt-12 border-t border-white/5 animate-enter">
            <div className="flex items-start gap-6">
              <span className="text-sm text-gray-500 uppercase tracking-wider font-medium pt-2">
                Tagged
              </span>
              <div className="flex flex-wrap gap-3 flex-1">
                {blog.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-400 hover:text-white hover:border-white/20 transition-colors uppercase tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="pt-16 pb-24 border-t border-white/5 animate-enter">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                Ready to make changes?
              </p>
              <h3 className="text-2xl font-bold font-syne text-white">
                Edit this article
              </h3>
            </div>
            <Link
              href={`/admin/blogs/edit/${blog._id || blog.id}`}
              className="px-8 py-4 bg-white text-black font-bold uppercase tracking-wider rounded-full hover:bg-primary transition-colors text-sm flex items-center gap-3 group"
            >
              <PenTool size={18} />
              Open Editor
              <ArrowLeft
                size={18}
                className="rotate-180 group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
