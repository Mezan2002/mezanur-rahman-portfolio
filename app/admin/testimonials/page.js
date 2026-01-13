"use client";

import gsap from "gsap";
import {
  Edit3,
  MessageSquare,
  MoreVertical,
  Plus,
  Quote,
  Search,
  Star,
  ToggleLeft,
  ToggleRight,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const mockTestimonials = [
  {
    id: 1,
    name: "John Doe",
    position: "CEO, TechFlow",
    content:
      "Working with Mezanur was a game-changer for our project. His attention to detail and creative approach is unparalleled.",
    rating: 5,
    isVisible: true,
    avatar: "JD",
  },
  {
    id: 2,
    name: "Sarah Williams",
    position: "Product Manager, CreativeCo",
    content:
      "The premium design and smooth animations he implemented for our dashboard received rave reviews from our users.",
    rating: 5,
    isVisible: true,
    avatar: "SW",
  },
  {
    id: 3,
    name: "David Smith",
    position: "Founder, StartupX",
    content:
      "Highly recommended! delivered ahead of schedule and the quality of work exceeded all expectations.",
    rating: 4,
    isVisible: false,
    avatar: "DS",
  },
  {
    id: 4,
    name: "Emily Blunt",
    position: "Marketing Director, GlobalApps",
    content:
      "Mezanur has a unique ability to translate complex requirements into beautiful, intuitive user interfaces.",
    rating: 5,
    isVisible: true,
    avatar: "EB",
  },
];

export default function TestimonialsPage() {
  const containerRef = useRef(null);
  const [testimonials, setTestimonials] = useState(mockTestimonials);
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredTestimonials = testimonials.filter(
    (t) =>
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleVisibility = (id) => {
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isVisible: !t.isVisible } : t))
    );
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTestimonials.map((testimonial, index) => (
          <div
            key={testimonial.id}
            className={`animate-in group relative bg-linear-to-br from-[#0a0a0a] to-black border ${
              testimonial.isVisible
                ? "border-white/5"
                : "border-red-500/20 opacity-70"
            } rounded-3xl p-8 hover:border-white/20 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-default`}
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
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleVisibility(testimonial.id)}
                    className={`p-2 rounded-lg transition-all ${
                      testimonial.isVisible
                        ? "text-primary bg-primary/10"
                        : "text-gray-500 bg-white/5 hover:bg-white/10"
                    }`}
                    title={
                      testimonial.isVisible
                        ? "Visible on site"
                        : "Hidden from site"
                    }
                  >
                    {testimonial.isVisible ? (
                      <ToggleRight size={20} />
                    ) : (
                      <ToggleLeft size={20} />
                    )}
                  </button>
                  <button className="p-2 text-gray-500 hover:text-white transition-colors">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed mb-8 italic font-serif">
                &apos;{testimonial.content}&apos;
              </p>
            </div>

            {/* Author Footer */}
            <div className="relative z-10 flex items-center justify-between pt-6 border-t border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-white/10 to-white/5 border border-white/10 flex items-center justify-center text-sm font-bold text-white group-hover:scale-110 transition-transform">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-primary transition-colors">
                    {testimonial.name}
                  </h4>
                  <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">
                    {testimonial.position}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 bg-white/5 rounded-lg text-white hover:bg-primary hover:text-black transition-all">
                  <Edit3 size={14} />
                </button>
                <button className="p-2 bg-white/5 rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-all">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            {/* Status Indicator */}
            {!testimonial.isVisible && (
              <div className="absolute top-2 left-2 px-2 py-0.5 bg-red-500/20 text-red-400 text-[8px] font-mono uppercase tracking-widest rounded">
                Hidden
              </div>
            )}
          </div>
        ))}

        {/* Create Card (Ghost) */}
        <div className="animate-in group border-2 border-dashed border-white/5 rounded-3xl p-8 flex flex-col items-center justify-center text-center hover:border-primary/50 hover:bg-white/1 transition-all cursor-pointer min-h-[250px]">
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
        </div>
      </div>

      {/* Empty State */}
      {filteredTestimonials.length === 0 && (
        <div className="animate-in py-20 bg-white/1 border border-dashed border-white/5 rounded-3xl text-center">
          <h2 className="text-2xl font-bold font-syne text-gray-700 uppercase">
            No feedback matches
          </h2>
          <p className="text-xs font-mono text-gray-500 uppercase tracking-[0.2em] mt-2">
            Adjust your search or add a new entry
          </p>
        </div>
      )}
    </div>
  );
}
