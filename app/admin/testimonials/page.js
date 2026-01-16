"use client";

import ConfirmationModal from "@/components/admin/ConfirmationModal";
import { deleteTestimonial, getTestimonials } from "@/lib/api";
import gsap from "gsap";
import parse from "html-react-parser";
import {
  Edit3,
  MessageSquare,
  Plus,
  Quote,
  Search,
  Star,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function TestimonialsPage() {
  const containerRef = useRef(null);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await getTestimonials();
      setTestimonials(res.data || []);
    } catch (error) {
      console.error("Failed to fetch testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (!loading && testimonials.length > 0) {
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
    }
  }, [loading, testimonials]);

  const filteredTestimonials = testimonials.filter(
    (t) =>
      t.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.content?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const confirmDelete = (id) => {
    setDeleteModal({ isOpen: true, id });
  };

  const handleDelete = async () => {
    if (!deleteModal.id) return;
    try {
      await deleteTestimonial(deleteModal.id);
      setTestimonials(testimonials.filter((t) => t._id !== deleteModal.id));
      setDeleteModal({ isOpen: false, id: null });
    } catch (error) {
      console.error("Failed to delete testimonial:", error);
      alert("Failed to delete testimonial");
    }
  };

  return (
    <div ref={containerRef} className="space-y-12 min-h-screen pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="animate-in text-left">
          <p className="text-xs font-mono text-primary mb-2 tracking-widest uppercase flex items-center gap-2">
            <span className="w-1 h-1 bg-primary rounded-full"></span>
            Admin Portal / Social Proof
          </p>
          <h1 className="text-4xl md:text-5xl font-black font-syne uppercase text-white leading-none mb-3">
            Client{" "}
            <span className="text-dark-background bg-white px-2">
              Testimonials.
            </span>
          </h1>
          <p className="text-gray-500 font-mono text-sm max-w-xl">
            Curate and manage feedback from your clients to build trust and
            highlight your expertise.
          </p>
        </div>

        <Link
          href="/admin/testimonials/create"
          className="animate-in group flex items-center gap-3 px-8 py-3 bg-primary text-black font-bold font-syne uppercase tracking-wider rounded-full hover:bg-white hover:scale-105 transition-all shadow-[0_0_20px_rgba(180,255,0,0.3)]"
        >
          <Plus size={18} />
          <span>Add New Review</span>
        </Link>
      </div>

      {/* Global Filter Bar */}
      <div className="animate-in max-w-2xl relative group">
        <Search
          className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors"
          size={18}
        />
        <input
          type="text"
          placeholder="Filter by name, company, or keywords..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white/3 border border-white/5 rounded-full py-4 pl-14 pr-6 text-white placeholder-gray-600 focus:border-primary/30 focus:bg-white/5 outline-none transition-all placeholder:font-mono placeholder:text-xs"
        />
      </div>

      {/* Grid of Testimonials */}
      {loading ? (
        <div className="animate-in text-center py-20 text-gray-500 font-mono">
          Loading testimonials...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((testimonial, index) => (
            <div
              key={testimonial._id}
              className="animate-in group relative bg-linear-to-br from-[#0a0a0a] to-black border border-white/5 rounded-3xl p-8 hover:border-white/20 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-default"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* Quote Icon Background */}
              <div className="absolute -top-4 -right-4 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                <Quote size={120} />
              </div>

              {/* Content Top */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={
                          i < testimonial.rating
                            ? "text-primary fill-primary"
                            : "text-gray-700"
                        }
                      />
                    ))}
                  </div>
                </div>

                <div className="text-gray-400 text-sm leading-relaxed mb-8 italic font-serif line-clamp-4">
                  {parse(testimonial.content || "")}
                </div>
              </div>

              {/* Author Footer */}
              <div className="relative z-10 flex items-center justify-between pt-6 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-linear-to-tr from-white/10 to-white/5 border border-white/10 flex items-center justify-center text-sm font-bold text-white group-hover:scale-110 transition-transform overflow-hidden shrink-0 rounded-full">
                    {testimonial.image ? (
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={1000}
                        height={1000}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      testimonial.name?.charAt(0)
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-primary transition-colors">
                      {testimonial.name}
                    </h4>
                    <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link
                    href={`/admin/testimonials/edit/${testimonial._id}`}
                    className="p-2 bg-white/5 rounded-lg text-white hover:bg-primary hover:text-black transition-all"
                  >
                    <Edit3 size={14} />
                  </Link>
                  <button
                    onClick={() => confirmDelete(testimonial._id)}
                    className="p-2 bg-white/5 rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Create Card (Ghost) */}
          <Link
            href="/admin/testimonials/create"
            className="animate-in group border-2 border-dashed border-white/5 rounded-3xl p-8 flex flex-col items-center justify-center text-center hover:border-primary/50 hover:bg-white/1 transition-all cursor-pointer min-h-[250px]"
          >
            <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary transition-all duration-300">
              <MessageSquare
                size={24}
                className="text-gray-500 group-hover:text-black"
              />
            </div>
            <h3 className="text-white font-bold font-syne uppercase text-sm tracking-widest">
              New Testimonial
            </h3>
            <p className="text-[10px] font-mono text-gray-600 uppercase mt-2">
              Capture a new success story
            </p>
          </Link>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredTestimonials.length === 0 && (
        <div className="animate-in py-20 bg-white/1 border border-dashed border-white/5 rounded-3xl text-center">
          <h2 className="text-2xl font-bold font-syne text-gray-700 uppercase">
            No feedback matches
          </h2>
          <p className="text-xs font-mono text-gray-500 uppercase tracking-[0.2em] mt-2">
            Adjust your search or add a new entry
          </p>
        </div>
      )}

      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        onConfirm={handleDelete}
        title="Remove Testimonial?"
        message="Are you sure you want to delete this testimonial? This action cannot be undone."
      />
    </div>
  );
}
