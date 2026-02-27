"use client";

import ConfirmationModal from "@/components/admin/ConfirmationModal";
import { deleteBlog, getBlogs } from "@/lib/api";
import gsap from "gsap";
import { ArrowUpRight, Eye, Plus, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function BlogsPage() {
  const containerRef = useRef(null);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    id: null,
  });

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await getBlogs();
      setBlogs(response.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (id) => {
    setDeleteModal({ isOpen: true, id });
  };

  const handleDelete = async () => {
    const id = deleteModal.id;
    if (!id) return;

    try {
      await deleteBlog(id);
      setBlogs(blogs.filter((blog) => blog._id !== id));
      setDeleteModal({ isOpen: false, id: null });
    } catch (err) {
      alert("Failed to delete blog: " + err.message);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (!loading && blogs.length > 0) {
      const ctx = gsap.context(() => {
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
    }
  }, [loading, blogs]);

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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

      {loading ? (
        <div className="flex flex-col gap-12">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="w-full h-48 bg-white/3 rounded-3xl animate-pulse"
            ></div>
          ))}
        </div>
      ) : error ? (
        <div className="text-red-400 font-mono p-8 border border-red-500/20 rounded-3xl bg-red-500/5">
          Error: {error}
        </div>
      ) : (
        <div className="flex flex-col gap-1 pb-24">
          {filteredBlogs.map((blog, index) => (
            <article
              key={blog._id || blog.id}
              className="blog-card group relative py-12 border-b border-white/5 hover:border-white/10 transition-all duration-500"
            >
              <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                {/* Image - Large & Immersive */}
                <Link
                  href={`/admin/blogs/${blog._id || blog.id}`}
                  className="relative w-full md:w-80 h-64 md:h-48 shrink-0 rounded-3xl overflow-hidden group/image"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-500 z-10" />
                  {(() => {
                    const imgSrc =
                      blog.image ||
                      blog.featuredImage ||
                      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop";
                    if (imgSrc.includes("http") || imgSrc.startsWith("data:")) {
                      return (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={imgSrc}
                          alt={blog.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transform scale-100 group-hover/image:scale-105 transition-transform duration-700"
                        />
                      );
                    }
                    return (
                      <Image
                        src={imgSrc}
                        alt={blog.title}
                        width={1200}
                        height={800}
                        className="w-full h-full object-cover transform scale-100 group-hover/image:scale-105 transition-transform duration-700"
                      />
                    );
                  })()}

                  {/* Issue Number Overlay */}
                  <div className="absolute top-6 left-6 z-20">
                    <div className="text-5xl font-black font-syne text-white/20 group-hover/image:text-white/40 transition-colors">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>
                </Link>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-center space-y-6">
                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                    <div className="flex items-center gap-2">
                      {blog.status && (
                        <span
                          className={`w-2 h-2 rounded-full ${
                            blog.status === "Published" ||
                            blog.status === "published"
                              ? "bg-emerald-400"
                              : "bg-amber-400"
                          }`}
                        ></span>
                      )}
                      <span className="text-xs text-gray-500 uppercase tracking-wider">
                        {blog.status}
                      </span>
                    </div>

                    <span className="text-xs text-gray-600">•</span>

                    <time className="text-xs text-gray-500 uppercase tracking-wider">
                      {new Date(
                        blog.date || blog.publishedAt || Date.now(),
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>

                    {blog.category && (
                      <>
                        <span className="text-xs text-gray-600">•</span>
                        <span className="text-xs text-primary uppercase tracking-wider font-medium">
                          {typeof blog.category === "object"
                            ? blog.category.name
                            : blog.category}
                        </span>
                      </>
                    )}

                    <span className="text-xs text-gray-600 hidden md:inline">
                      •
                    </span>
                    <div className="hidden md:flex items-center gap-2 text-xs text-gray-500">
                      <Eye size={14} />
                      <span>{blog.views || 0} views</span>
                    </div>
                  </div>

                  {/* Title */}
                  <Link
                    href={`/admin/blogs/${blog._id || blog.id}`}
                    className="block group/title"
                  >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-syne text-white leading-[1.1] group-hover/title:text-primary transition-colors duration-300">
                      {blog.title}
                    </h2>
                  </Link>

                  {/* Actions */}
                  <div className="flex items-center gap-4 pt-2">
                    <Link
                      href={`/admin/blogs/${blog._id || blog.id}`}
                      className="text-sm text-gray-400 hover:text-white uppercase tracking-wide transition-colors flex items-center gap-2 group/read"
                    >
                      Read More
                      <ArrowUpRight
                        size={16}
                        className="group-hover/read:translate-x-1 group-hover/read:-translate-y-1 transition-transform"
                      />
                    </Link>

                    <span className="text-gray-700">|</span>

                    <Link
                      href={`/admin/blogs/edit/${blog._id || blog.id}`}
                      className="text-sm text-gray-400 hover:text-white uppercase tracking-wide transition-colors"
                    >
                      Edit
                    </Link>

                    <span className="text-gray-700">|</span>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        confirmDelete(blog._id || blog.id);
                      }}
                      className="text-sm text-gray-400 hover:text-red-400 uppercase tracking-wide transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}

          {/* Create New - Elegant CTA */}
          <Link
            href="/admin/blogs/create"
            className="group flex flex-col items-center justify-center py-24 border-b border-dashed border-white/5 hover:border-primary/30 transition-all duration-500"
          >
            <div className="w-16 h-16 rounded-full border-2 border-white/10 group-hover:border-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Plus
                size={24}
                className="text-gray-600 group-hover:text-primary transition-colors"
              />
            </div>
            <h3 className="text-2xl font-bold font-syne text-gray-600 group-hover:text-white uppercase tracking-wide transition-colors mb-2">
              Create New Article
            </h3>
            <p className="text-sm text-gray-700 group-hover:text-gray-400 transition-colors">
              Start writing your next story
            </p>
          </Link>
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        onConfirm={handleDelete}
        title="Delete Article?"
        message="Are you sure you want to delete this blog post? This action cannot be undone."
      />
    </div>
  );
}
