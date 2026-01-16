"use client";

import { getTestimonials } from "@/lib/api";
import gsap from "gsap";
import parse from "html-react-parser";
import { ArrowLeft, Loader2, Quote, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function PublicTestimonialsPage() {
  const containerRef = useRef(null);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const res = await getTestimonials();
        setTestimonials(res.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (!loading && testimonials.length > 0) {
      const ctx = gsap.context(() => {
        gsap.set(".animate-in", { opacity: 0, y: 50 });
        gsap.to(".animate-in", {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
          clearProps: "all",
        });
      }, containerRef);
      return () => ctx.revert();
    }
  }, [loading, testimonials]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-background flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">
          Gathering Feedback...
        </p>
      </div>
    );
  }

  return (
    <main
      ref={containerRef}
      className="min-h-screen bg-dark-background pt-40 pb-32 px-6 md:px-12 selection:bg-primary selection:text-white"
    >
      {/* Background Decor */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(180,255,0,0.03),transparent_70%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Navigation */}
        <Link
          href="/"
          className="animate-in group inline-flex items-center gap-3 text-gray-500 hover:text-white transition-colors mb-16"
        >
          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary/50 group-hover:text-primary transition-all">
            <ArrowLeft size={18} />
          </div>
          <span className="uppercase tracking-[0.3em] text-[10px] font-mono">
            Back to Home
          </span>
        </Link>

        {/* Header */}
        <div className="animate-in mb-24">
          <p className="text-primary uppercase tracking-[0.5em] text-xs mb-6 font-mono font-bold">
            ( Kind Words From Partners )
          </p>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black font-syne text-white uppercase leading-[0.85]">
            Client
            <br />
            <span className="text-black bg-white inline-block px-4">
              Feedback.
            </span>
          </h1>
        </div>

        {error ? (
          <div className="animate-in p-8 border border-red-500/20 bg-red-500/5 rounded-3xl text-red-400 font-mono">
            Error loading testimonials: {error}
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial._id || testimonial.id}
                className="animate-in break-inside-avoid group p-10 bg-white/2 border border-white/5 hover:border-white/10 transition-all duration-500 flex flex-col justify-between"
              >
                <div className="relative">
                  <Quote className="w-10 h-10 text-primary/20 mb-8" />
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: testimonial.rating || 5 }).map(
                      (_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className="fill-primary text-primary"
                        />
                      )
                    )}
                  </div>
                  <div className="text-xl text-gray-400 leading-relaxed font-medium mb-10 group-hover:text-white transition-colors">
                    {parse(testimonial.content || "")}
                  </div>
                </div>

                <div className="flex items-center gap-5 pt-8 border-t border-white/5">
                  <div className="w-14 h-14 rounded-full overflow-hidden border border-white/10 grayscale group-hover:grayscale-0 transition-all duration-500 shrink-0">
                    <Image
                      src={
                        testimonial.image ||
                        testimonial.avatar ||
                        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
                      }
                      alt={testimonial.name}
                      width={56}
                      height={56}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-bold font-syne uppercase tracking-wider mb-1">
                      {testimonial.name}
                    </h4>
                    <p className="text-[10px] text-gray-500 font-mono uppercase tracking-[0.2em]">
                      {testimonial.role || testimonial.position}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
