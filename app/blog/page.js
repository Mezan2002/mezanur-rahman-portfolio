"use client";

import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

const blogs = [
  {
    id: 1,
    title: "The Future of Web Animations",
    excerpt:
      "Exploring next-gen browser capabilities and the rise of performant motion tools.",
    date: "Oct 24, 2024",
    read: "5 min read",
    slug: "future-web-animations",
    tag: "Development",
  },
  {
    id: 2,
    title: "Mastering Next.js Server Actions",
    excerpt:
      "A deep dive into server-side mutations and the new mental model for React apps.",
    date: "Sep 12, 2024",
    read: "8 min read",
    slug: "mastering-nextjs",
    tag: "Engineering",
  },
  {
    id: 3,
    title: "Why Minimalist Design Wins",
    excerpt:
      "How reducing cognitive load leads to higher conversion and better user retention.",
    date: "Aug 05, 2024",
    read: "4 min read",
    slug: "minimalist-design",
    tag: "Design",
  },
  {
    id: 4,
    title: "GSAP vs Framer Motion",
    excerpt:
      "Benchmarking performance and developer experience for modern React animations.",
    date: "Jul 22, 2024",
    read: "10 min read",
    slug: "gsap-vs-framer",
    tag: "Tech",
  },
];

export default function BlogPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(".page-title-char", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.05,
        ease: "power4.out",
        delay: 0.2,
      }).from(
        ".blog-divider",
        {
          scaleX: 0,
          duration: 1,
          ease: "power3.inOut",
          transformOrigin: "left",
        },
        "-=0.5"
      );

      gsap.from(".blog-item", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.6,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={containerRef}
      className="bg-dark-background min-h-screen pt-32 pb-20 px-6 md:px-12"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* HEADER */}
        <div className="mb-32">
          <div className="overflow-hidden">
            <span className="page-title-char inline-block text-xs font-mono text-primary mb-4 tracking-widest uppercase">
              / The Journal
            </span>
          </div>
          <h1 className="flex flex-col text-[10vw] md:text-[7vw] font-black font-syne text-white uppercase leading-[0.8] tracking-tighter mix-blend-difference">
            <span className="overflow-hidden block">
              {"WRITINGS ON".split("").map((c, i) => (
                <span
                  key={i}
                  className="page-title-char inline-block whitespace-pre"
                >
                  {c}
                </span>
              ))}
            </span>
            <span className="overflow-hidden">
              {"CODE & ART".split("").map((c, i) => (
                <span
                  key={i}
                  className="page-title-char inline-block whitespace-pre bg-white text-black"
                >
                  {c}
                </span>
              ))}
            </span>
          </h1>
        </div>

        {/* LIST */}
        <div className="flex flex-col">
          {blogs.map((blog) => (
            <Link
              href={`/blog/${blog.slug}`}
              key={blog.id}
              className="blog-item group relative py-12 md:py-16 border-t border-white/20 flex flex-col md:flex-row items-baseline gap-6 md:gap-0 transition-colors hover:bg-white/5 -mx-6 px-6 md:mx-0 md:px-0"
            >
              <div className="w-full md:w-2/12 relative">
                <span className="font-mono text-xs text-gray-500 group-hover:text-primary transition-colors block mb-2">
                  {blog.date}
                </span>
                <span className="text-[10px] uppercase tracking-widest border border-white/20 px-2 py-1 rounded-full text-white/60 size-full">
                  {blog.tag}
                </span>
              </div>

              <div className="w-full md:w-7/12 md:pr-12">
                <h2 className="text-3xl md:text-5xl font-bold text-white group-hover:translate-x-4 transition-transform duration-500 ease-out font-syne mb-3">
                  {blog.title}
                </h2>
                <p className="text-gray-400 group-hover:translate-x-4 transition-transform duration-500 ease-out delay-75 max-w-lg text-sm md:text-base leading-relaxed">
                  {blog.excerpt}
                </p>
              </div>

              <div className="w-full md:w-3/12 flex items-center justify-between md:justify-end gap-4 mt-4 md:mt-0">
                <span className="text-gray-600 text-xs font-mono uppercase tracking-widest hidden md:block">
                  {blog.read}
                </span>
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500 group-hover:-rotate-45">
                  <ArrowRight size={20} />
                </div>
              </div>
            </Link>
          ))}
          {/* Bottom Border */}
          <div className="blog-divider border-t border-white/20 w-full" />
        </div>
      </div>
    </main>
  );
}
