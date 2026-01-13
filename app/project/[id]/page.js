"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

// Mock Data (In a real app, fetch this)
const projects = {
  1: {
    title: "E-Commerce Redesign",
    category: "Design / Development",
    year: "2025",
    client: "Moda Corp",
    description:
      "A complete overhaul of the navigation structure and checkout flow, resulting in a 40% increase in conversion rates. We utilized Next.js for server-side rendering and Shopify Storefront API for backend management.",
    images: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=1600",
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1556742059-8476321f4df7?auto=format&fit=crop&q=80&w=800",
    ],
    tech: ["Next.js", "Tailwind CSS", "GSAP", "Shopify API"],
  },
  2: {
    title: "Fintech Dashboard",
    category: "SaaS Product",
    year: "2024",
    client: "FinanceFlow",
    description:
      "Real-time data visualization dashboard for crypto traders. Implemented complex D3.js charts and WebSockets for live price updates with sub-millisecond latency.",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600",
      "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1611974765270-ca12586343bb?auto=format&fit=crop&q=80&w=800",
    ],
    tech: ["React", "D3.js", "Socket.io", "Node.js"],
  },
  // Defaults for others
  default: {
    title: "Project Title",
    category: "Web Development",
    year: "2024",
    client: "Client Name",
    description:
      "This is a placeholder description for the project. It highlights the main challenges, the solutions implemented, and the impact of the work delivered.",
    images: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1600",
      "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=800",
    ],
    tech: ["Tech A", "Tech B", "Tech C"],
  },
};

export default function ProjectDetails() {
  const { id } = useParams();
  const project = projects[id] || projects.default;
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(".reveal-text", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.2,
      }).from(
        ".reveal-image",
        {
          scale: 1.1,
          opacity: 0,
          duration: 1.5,
          ease: "power3.out",
        },
        "-=0.8"
      );

      // Parallax images
      gsap.utils.toArray(".parallax-image").forEach((img) => {
        gsap.to(img, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: img.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [id]);

  return (
    <main
      ref={containerRef}
      className="bg-dark-background min-h-screen text-white pt-32 pb-20"
    >
      {/* Navigation */}
      <div className="fixed top-24 left-8 z-40">
        <Link
          href="/work"
          className="flex items-center gap-2 text-white hover:text-gray-400 transition-colors uppercase tracking-widest text-sm font-bold"
        >
          <ArrowLeft size={20} /> Back to Work
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-20">
          <div className="overflow-hidden">
            <h1 className="reveal-text text-[10vw] font-black font-syne uppercase leading-[0.9] mb-8">
              {project.title}
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-t border-white/20 pt-8 reveal-text">
            <div>
              <span className="block text-gray-500 text-sm uppercase tracking-widest mb-1">
                Client
              </span>
              <span className="text-xl font-medium">{project.client}</span>
            </div>
            <div>
              <span className="block text-gray-500 text-sm uppercase tracking-widest mb-1">
                Year
              </span>
              <span className="text-xl font-medium">{project.year}</span>
            </div>
            <div>
              <span className="block text-gray-500 text-sm uppercase tracking-widest mb-1">
                Role
              </span>
              <span className="text-xl font-medium">{project.category}</span>
            </div>
            <div>
              <span className="block text-gray-500 text-sm uppercase tracking-widest mb-1">
                Links
              </span>
              <div className="flex gap-4">
                <a href="#" className="hover:text-gray-400 transition-colors">
                  <ExternalLink />
                </a>
                <a href="#" className="hover:text-gray-400 transition-colors">
                  <Github />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-24 reveal-image">
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32">
          <div className="md:col-span-4">
            <h3 className="text-sm text-gray-500 uppercase tracking-widest mb-6">
              The Challenge
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Every project begins with a unique set of obstacles. For this
              client, the primary goal was to modernize their digital presence
              while maintaining core brand values.
            </p>

            <h3 className="text-sm text-gray-500 uppercase tracking-widest mb-4 mt-12">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 border border-white/20 rounded-full text-sm hover:bg-white hover:text-black transition-colors cursor-default"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="md:col-span-8">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
              {project.description}
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              We approached this by breaking down the user journey into distinct
              phases. By simplifying the navigation and enhancing the visual
              hierarchy, we were able to guide users more naturally towards
              conversion points.
            </p>
          </div>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
            <Image
              src={project.images[1]}
              alt="Detail 1"
              fill
              className="parallax-image object-cover scale-[1.2]"
            />
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg mt-0 md:mt-32">
            <Image
              src={project.images[2]}
              alt="Detail 2"
              fill
              className="parallax-image object-cover scale-[1.2]"
            />
          </div>
        </div>

        {/* Next Project */}
        <div className="border-t border-white/10 pt-20 pb-10 flex justify-between items-center group cursor-pointer">
          <div>
            <span className="text-sm text-gray-500 uppercase tracking-widest mb-2 block">
              Next Project
            </span>
            <div className="relative inline-block">
              <span className="absolute inset-0 bg-white w-0 group-hover:w-full transition-all duration-500 ease-out"></span>
              <span className="relative z-10 text-4xl md:text-6xl font-black font-syne uppercase text-white mix-blend-exclusion px-2">
                Fintech Dashboard
              </span>
            </div>
          </div>
          <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
            <ArrowLeft className="rotate-180" size={32} />
          </div>
        </div>
      </div>
    </main>
  );
}
