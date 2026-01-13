"use client";

import gsap from "gsap";
import { ArrowLeft, Quote, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

const allTestimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "CEO, TechFlow",
    content:
      "Working with Mezanur was transformative for our product. His attention to detail and ability to translate complex requirements into elegant solutions is unmatched.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    rating: 5,
  },
  {
    id: 2,
    name: "James Wilson",
    role: "CTO, FinanceHub",
    content:
      "Exceptional developer who understands both the technical and business side. The dashboard he built increased our user engagement by 40%.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Product Manager, Cloudify",
    content:
      "Mezanur doesn't just code—he thinks like a product designer. His GSAP animations brought our brand to life in ways we never imagined.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
    rating: 5,
  },
  {
    id: 4,
    name: "Michael Ross",
    role: "Founding Engineer, ScaleUp",
    content:
      "The level of craftsmanship in his code is rare. He delivered a high-performance application that exceeded all our speed benchmarks.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    rating: 5,
  },
  {
    id: 5,
    name: "Jessica Lee",
    role: "Director of UX, DesignFirst",
    content:
      "A truly creative mind who pushes the boundaries of web experiences. His work on our portfolio transition was flawless.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    rating: 5,
  },
  {
    id: 6,
    name: "David Chen",
    role: "Founder, Zenith AI",
    content:
      "Rare combination of aesthetic sense and technical depth. Mezanur is our go-to for high-end frontend development.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    rating: 5,
  },
];

export default function PublicTestimonialsPage() {
  const containerRef = useRef(null);

  useEffect(() => {
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
  }, []);

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

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allTestimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="animate-in group p-10 bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-500 flex flex-col justify-between"
            >
              <div className="relative">
                <Quote className="w-10 h-10 text-primary/20 mb-8" />
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className="fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="text-xl text-gray-400 leading-relaxed font-medium mb-10 group-hover:text-white transition-colors">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-5 pt-8 border-t border-white/5">
                <div className="w-14 h-14 rounded-full overflow-hidden border border-white/10 grayscale group-hover:grayscale-0 transition-all duration-500">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={56}
                    height={56}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-white font-bold font-syne uppercase tracking-wider">
                    {testimonial.name}
                  </h4>
                  <p className="text-[10px] text-gray-500 font-mono uppercase tracking-[0.2em]">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
