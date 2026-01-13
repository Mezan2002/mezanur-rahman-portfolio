"use client";

import gsap from "gsap";
import {
  ArrowUpRight,
  Calendar,
  Eye,
  PenTool,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const mockBlogs = [
  {
    id: 1,
    title: "The Evolution of Digital Aesthetics",
    category: "Design",
    status: "Published",
    views: "1.2k",
    date: "Oct 24, 2025",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Mastering GSAP Animations in Next.js",
    category: "Development",
    status: "Published",
    views: "856",
    date: "Nov 02, 2025",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Why Minimalism is Timeless",
    category: "Philosophy",
    status: "Draft",
    views: "0",
    date: "Nov 15, 2025",
    image:
      "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2574&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Building Scalable Systems",
    category: "Engineering",
    status: "Published",
    views: "3.4k",
    date: "Dec 01, 2025",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "The Future of AI in Design",
    category: "AI",
    status: "Draft",
    views: "0",
    date: "Jan 10, 2026",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop",
  },
];

export default function BlogsPage() {
  const containerRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Safer animation for React
      gsap.set(".blog-card", { opacity: 0, y: 30 });
      gsap.to(".blog-card", {
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

  return (
    <div ref={containerRef} className="space-y-8 min-h-screen">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-xs font-mono text-primary mb-2 tracking-widest uppercase">
            Admin Portal / Content
          </p>
          <h1 className="text-4xl md:text-5xl font-black font-syne uppercase text-white leading-none">
            Blog Posts
          </h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-white/5 border border-white/10 rounded-full flex items-center px-4 py-3 w-64 backdrop-blur-md focus-within:border-primary/50 transition-colors">
              <Search size={16} className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent border-none outline-none text-sm text-white placeholder-gray-500 font-mono w-full"
              />
            </div>
          </div>

          {/* Create Button */}
          <Link
            href="/admin/blogs/create"
            className="group relative px-6 py-3 bg-white text-black font-bold font-syne uppercase tracking-wider rounded-full overflow-hidden hover:scale-105 transition-transform"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Plus size={18} />
              <span>Create</span>
            </span>
            <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockBlogs.map((blog) => (
          <div
            key={blog.id}
            className="blog-card group relative bg-[#050505] border border-white/5 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-300 hover:-translate-y-2"
          >
            {/* Image Container */}
            <div className="h-48 w-full overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent z-10"></div>
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 z-20 flex gap-2">
                <span
                  className={`px-2 py-1 text-[9px] font-bold uppercase tracking-widest rounded bg-black/50 backdrop-blur-md border border-white/10 ${
                    blog.status === "Published"
                      ? "text-green-400"
                      : "text-yellow-400"
                  }`}
                >
                  {blog.status}
                </span>
                <span className="px-2 py-1 text-[9px] font-bold uppercase tracking-widest rounded bg-white/10 backdrop-blur-md border border-white/10 text-white">
                  {blog.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 relative z-20 -mt-10">
              <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-gray-400 font-mono mb-3">
                <span className="flex items-center gap-1">
                  <Calendar size={10} /> {blog.date}
                </span>
                <span className="flex items-center gap-1">
                  <Eye size={10} /> {blog.views}
                </span>
              </div>

              <h3 className="text-xl font-bold font-syne text-white mb-6 group-hover:text-primary transition-colors leading-tight">
                {blog.title}
              </h3>

              {/* Actions Hover Overlay */}
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <Link
                  href={`/admin/blogs/edit/${blog.id}`}
                  className="text-xs font-bold uppercase tracking-wider text-white hover:text-primary flex items-center gap-2 group/link"
                >
                  Edit Article{" "}
                  <ArrowUpRight
                    size={14}
                    className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"
                  />
                </Link>

                <div className="flex gap-2">
                  <button className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-full transition-colors">
                    <PenTool size={14} />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Add New Placeholder Card */}
        <Link
          href="/admin/blogs/create"
          className="blog-card flex flex-col items-center justify-center h-full min-h-[300px] border border-dashed border-white/10 rounded-3xl hover:border-primary/50 hover:bg-primary/5 transition-all group/new"
        >
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover/new:scale-110 transition-transform">
            <Plus
              size={32}
              className="text-gray-500 group-hover/new:text-primary transition-colors"
            />
          </div>
          <p className="text-sm font-bold uppercase tracking-widest text-gray-500 group-hover/new:text-white transition-colors">
            Create New Post
          </p>
        </Link>
      </div>
    </div>
  );
}
