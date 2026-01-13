"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
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

export default function Testimonials() {
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  // 1. Entrance Reveal (Run Once)
  useGSAP(
    () => {
      const revealEntrance = () => {
        const cards = gsap.utils.toArray(
          ".testimonial-card",
          sectionRef.current
        );
        if (!cards || cards.length === 0) return;

        // Ensure all triggers are refreshed before we calculate positions
        ScrollTrigger.refresh();

        gsap.from(cards, {
          y: 60,
          opacity: 0,
          stagger: 0.1,
          duration: 1.2,
          ease: "power4.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true,
          },
        });
      };

      if (window.isPageReady) {
        revealEntrance();
      } else {
        const handleTransition = () => {
          // Double refresh safety to handle the transition columns disappearing
          ScrollTrigger.refresh();
          revealEntrance();
          window.removeEventListener(
            "page-transition-complete",
            handleTransition
          );
        };
        window.addEventListener("page-transition-complete", handleTransition);
        return () =>
          window.removeEventListener(
            "page-transition-complete",
            handleTransition
          );
      }
    },
    { scope: sectionRef }
  );

  // 2. Slider Interaction (Run on currentIndex change)
  useGSAP(
    () => {
      if (!sliderRef.current || !sliderRef.current.children.length) return;

      const firstChild = sliderRef.current.children[0];
      const cardWidth = firstChild.offsetWidth + 32;

      gsap.to(sliderRef.current, {
        x: -currentIndex * cardWidth,
        duration: 0.8,
        ease: "power3.out",
      });
    },
    { dependencies: [currentIndex], scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-6 md:px-12 bg-dark-background overflow-hidden"
    >
      {/* Gradient overlay for consistency */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header - EXACT MATCH with Navigation Arrows */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-24">
          <div className="flex-1">
            <p className="text-gray-500 uppercase tracking-widest text-sm mb-4 font-mono">
              ( Client Success Stories )
            </p>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black font-syne text-white uppercase leading-[0.85]">
              Global
              <br />
              <span className="bg-white text-black">Testimonials</span>
            </h2>
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-4">
            <button
              onClick={prevSlide}
              className="w-14 h-14 md:w-20 md:h-20 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all group active:scale-95 text-white"
              aria-label="Previous testimonial"
            >
              <ArrowLeft
                size={24}
                className="group-hover:-translate-x-1 transition-transform"
              />
            </button>
            <button
              onClick={nextSlide}
              className="w-14 h-14 md:w-20 md:h-20 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all group active:scale-95 text-white"
              aria-label="Next testimonial"
            >
              <ArrowLeft
                size={24}
                className="rotate-180 group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>

        {/* Slider Container */}
        <div className="relative overflow-visible">
          <div
            ref={sliderRef}
            className="flex gap-8 transition-transform duration-500 ease-out"
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="testimonial-card group flex-shrink-0 w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-21.333px)] p-10 bg-white/1 border border-white/5 hover:border-white/10 transition-all duration-500 flex flex-col justify-between h-[450px]"
              >
                <div className="relative">
                  <Quote className="w-8 h-8 text-primary/20 mb-6" />
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className="fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <p className="text-lg text-gray-400 leading-relaxed mb-10 group-hover:text-white transition-colors">
                    &ldquo;{testimonial.content.replace(/&apos;/g, "'")}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-8 border-t border-white/5 mt-auto">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 grayscale group-hover:grayscale-0 transition-all duration-500">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-bold font-syne uppercase tracking-wider text-sm">
                      {testimonial.name}
                    </h4>
                    <p className="text-[9px] text-gray-500 font-mono uppercase tracking-[0.2em]">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Simple See All Link */}
        <div className="mt-20 flex justify-center testimonial-card">
          <Link
            href="/testimonials"
            className="group flex items-center gap-4 py-4 px-8 border border-white/10 rounded-full hover:border-primary transition-all duration-300"
          >
            <span className="text-sm font-bold font-syne text-white uppercase tracking-widest group-hover:text-primary">
              View All Stories
            </span>
            <ArrowRight
              size={16}
              className="text-gray-500 group-hover:translate-x-1 group-hover:text-primary transition-all"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
