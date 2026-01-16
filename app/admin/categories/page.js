"use client";

import { createCategory, deleteCategory, getCategories } from "@/lib/api";
import gsap from "gsap";
import {
  ChevronRight,
  Folder,
  Loader2,
  Plus,
  Tag,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function CategoriesPage() {
  const containerRef = useRef(null);

  // Data States
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  // UI States
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await getCategories();
      setCategories(res.data || []);
    } catch (err) {
      setError(err.message || "Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();

    const ctx = gsap.context(() => {
      gsap.set(".animate-in", { opacity: 0, y: 20 });
      gsap.to(".animate-in", {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        clearProps: "all",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategory) return;

    setActionLoading(true);
    setError(null);

    try {
      const slug = newCategory.toLowerCase().replace(/ /g, "-");
      await createCategory({ name: newCategory, slug });
      setNewCategory("");
      await fetchCategories(); // Refresh list
    } catch (err) {
      setError(err.message || "Failed to create category");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (
      !confirm(
        "Are you sure you want to delete this category? This might affect blogs using it."
      )
    )
      return;

    try {
      setError(null);
      await deleteCategory(id);
      setCategories(categories.filter((c) => c._id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete category");
    }
  };

  // Helper colors for categories based on index if not provided by backend
  const colors = ["#B4FF00", "#00D9FF", "#FF006E", "#9D4EDD", "#FFB800"];

  return (
    <div ref={containerRef} className="space-y-12 min-h-screen pb-20">
      {/* Header */}
      <div className="animate-in">
        <p className="text-xs font-mono text-primary mb-2 tracking-widest uppercase flex items-center gap-2">
          <span className="w-1 h-1 bg-primary rounded-full"></span>
          Admin Portal / Content Management
        </p>
        <h1 className="text-4xl md:text-6xl font-black font-syne uppercase text-white leading-none mb-3">
          Categories
        </h1>
        <p className="text-gray-500 font-mono text-sm">
          Organize your content into meaningful topics
        </p>
      </div>

      {error && (
        <div className="animate-in p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm font-mono flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => setError(null)}>
            <X size={16} />
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Create Form - Sticky Sidebar */}
        <div className="lg:col-span-2 animate-in">
          <div className="bg-linear-to-br from-[#0a0a0a] to-black border border-white/10 rounded-3xl p-8 lg:sticky lg:top-8 shadow-2xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                <Plus size={24} strokeWidth={3} />
              </div>
              <div>
                <h2 className="text-xl font-bold font-syne text-white">
                  Create New
                </h2>
                <p className="text-xs text-gray-500 font-mono">
                  Add a category
                </p>
              </div>
            </div>

            <form onSubmit={handleAddCategory} className="space-y-6">
              <div>
                <label className="flex text-xs font-mono uppercase tracking-widest text-gray-400 mb-3 items-center gap-2">
                  <Tag size={12} />
                  Category Name
                </label>
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-gray-600 focus:border-primary/50 focus:bg-black/60 outline-none transition-all font-medium"
                  placeholder="e.g. UI/UX Design"
                />
                <p className="text-xs text-gray-600 mt-2 font-mono">
                  Slug will be auto-generated
                </p>
              </div>

              <button
                type="submit"
                disabled={!newCategory || actionLoading}
                className="w-full py-4 bg-primary text-black font-black font-syne uppercase tracking-widest rounded-2xl hover:bg-white hover:scale-[1.02] transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-[0_0_20px_rgba(180,255,0,0.2)] hover:shadow-[0_0_30px_rgba(180,255,0,0.4)]"
              >
                <span className="flex items-center justify-center gap-2">
                  {actionLoading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Plus size={18} />
                  )}
                  {actionLoading ? "Adding..." : "Add Category"}
                </span>
              </button>
            </form>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="lg:col-span-3 space-y-5">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-24 bg-white/5 animate-pulse rounded-3xl border border-white/5 shadow-inner"
                ></div>
              ))}
            </div>
          ) : categories.length === 0 ? (
            <div className="animate-in text-center py-20 bg-white/2 border border-dashed border-white/10 rounded-3xl">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                <Folder size={32} className="text-gray-600" />
              </div>
              <h3 className="text-xl font-bold font-syne text-white mb-2">
                No Categories Yet
              </h3>
              <p className="text-gray-500 text-sm font-mono">
                Create your first category to get started
              </p>
            </div>
          ) : (
            categories.map((cat, index) => (
              <div
                key={cat._id}
                className="animate-in group relative bg-linear-to-br from-[#0a0a0a] to-black border border-white/5 rounded-3xl p-6 hover:border-white/20 transition-all duration-300 overflow-hidden"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Accent Line */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-1 opacity-50 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: colors[index % colors.length] }}
                ></div>

                {/* Background Glow */}
                <div
                  className="absolute -right-10 -top-10 w-40 h-40 rounded-full opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-700"
                  style={{ backgroundColor: colors[index % colors.length] }}
                ></div>

                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center border transition-all group-hover:scale-110 duration-300"
                      style={{
                        backgroundColor: `${colors[index % colors.length]}10`,
                        borderColor: `${colors[index % colors.length]}30`,
                      }}
                    >
                      <Folder
                        size={24}
                        style={{ color: colors[index % colors.length] }}
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-syne text-white mb-1 group-hover:text-primary transition-colors">
                        {cat.name}
                      </h3>
                      <div className="flex items-center gap-3 text-xs font-mono text-gray-500">
                        <span className="flex items-center gap-1.5">
                          <span className="text-gray-600">/</span>
                          {cat.slug}
                        </span>
                        {/* Status/Count if available */}
                        {cat.count !== undefined && (
                          <>
                            <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
                            <span
                              className="font-bold"
                              style={{ color: colors[index % colors.length] }}
                            >
                              {cat.count} Posts
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 md:opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleDelete(cat._id)}
                      className="p-3 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
                      title="Delete category"
                    >
                      <Trash2 size={18} />
                    </button>
                    <button className="p-3 text-gray-500 hover:text-white hover:bg-white/10 rounded-xl transition-all">
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
