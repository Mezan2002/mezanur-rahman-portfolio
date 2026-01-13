"use client";

import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const projects = [
  {
    id: "01",
    title: "E-Commerce",
    subtitle: "Redesign",
    type: "Development",
    year: "2024",
    category: "development",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "02",
    title: "Fintech",
    subtitle: "Dashboard",
    type: "SaaS Product",
    year: "2023",
    category: "design",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "03",
    title: "AI Platform",
    subtitle: "Interface",
    type: "Concept",
    year: "2023",
    category: "development",
    image:
      "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "04",
    title: "Real Estate",
    subtitle: "Luxury",
    type: "Web App",
    year: "2022",
    category: "design",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "05",
    title: "Portfolio",
    subtitle: "V1",
    type: "Website",
    year: "2021",
    category: "design",
    image:
      "https://images.unsplash.com/photo-1481480746807-7b9e569365f9?auto=format&fit=crop&q=80&w=1200",
  },
];

export default function WorkPage() {
  const containerRef = useRef(null);
  const [filter, setFilter] = useState("all");

  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Reveal
      const tl = gsap.timeline();
      tl.from(".page-title-char", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.05,
        ease: "power4.out",
        delay: 0.2,
      }).from(
        ".filter-btn",
        {
          y: 20,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.5"
      );

      // List Animation
      gsap.fromTo(
        ".project-row",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.4,
        }
      );
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [filter]);

  return (
    <main
      ref={containerRef}
      className="bg-dark-background min-h-screen pt-32 pb-20 px-6 md:px-12"
    >
      <div className="max-w-[1600px] mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-white/10 pb-8">
          <div>
            <h1 className="flex overflow-hidden text-[12vw] md:text-[9vw] font-black font-syne text-white uppercase leading-[0.8] tracking-tighter mix-blend-difference mb-4">
              {"SELECTED".split("").map((c, i) => (
                <span key={i} className="page-title-char inline-block">
                  {c}
                </span>
              ))}
            </h1>
            <h1 className="overflow-hidden text-[12vw] md:text-[9vw] font-black font-syne bg-white text-black uppercase inline-block leading-[0.8] tracking-tighter mix-blend-difference">
              {"WORKS".split("").map((c, i) => (
                <span key={i} className="page-title-char inline-block">
                  {c}
                </span>
              ))}
            </h1>
          </div>

          <div className="flex gap-2 mb-2 md:mb-4">
            {["all", "design", "development"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`filter-btn px-6 py-2 rounded-full border text-xs uppercase tracking-widest transition-all duration-300 ${
                  filter === cat
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-gray-500 border-white/10 hover:border-white/30 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* LIST */}
        <div className="flex flex-col w-full">
          {/* Table Header */}
          <div className="hidden md:flex text-xs text-gray-600 uppercase tracking-widest pb-4 border-b border-white/10">
            <div className="w-1/12">No.</div>
            <div className="w-5/12">Project</div>
            <div className="w-3/12">Services</div>
            <div className="w-2/12">Year</div>
            <div className="w-1/12 text-right">Link</div>
          </div>

          {filteredProjects.map((project, index) => (
            <Link
              href={`/project/${project.id === "01" ? 1 : project.id}`}
              key={project.id}
              className="project-row group py-10 md:py-16 border-b border-white/10 flex flex-col md:flex-row items-center md:items-baseline relative z-10 transition-colors duration-500 hover:border-white/30"
            >
              <div className="w-full md:w-1/12 mb-4 md:mb-0 relative z-20 pointer-events-none">
                <span className="font-mono text-sm text-gray-500 group-hover:text-white transition-colors">
                  /{project.id}
                </span>
              </div>

              {/* Title Column - Image anchored here */}
              <div className="w-full md:w-5/12 mb-4 md:mb-0 relative py-2">
                {/* Floating Image inside Title Area */}
                <div className="absolute top-1/2 left-0 md:left-12 -translate-y-1/2 w-[320px] h-[220px] pointer-events-none opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out z-30 rounded-lg overflow-hidden translate-x-4 md:translate-x-12 shadow-2xl origin-left">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                  {/* View Badge */}
                  <div className="absolute bottom-3 right-3 bg-white text-black text-[10px] font-bold uppercase px-3 py-1 rounded shadow-lg">
                    View
                  </div>
                </div>

                <div className="relative z-10">
                  <h3
                    className="text-4xl md:text-6xl font-bold text-white group-hover:text-transparent group-hover:stroke-white transition-all duration-300 font-syne uppercase"
                    style={{ WebkitTextStroke: "1px transparent" }}
                  >
                    <span className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-white/10 transition-all group-hover:blur-[1px]">
                      {project.title}
                    </span>
                  </h3>
                  <span className="text-gray-500 text-lg font-light group-hover:text-white transition-colors delay-75 block mt-2 group-hover:translate-x-2 transition-transform duration-300">
                    {project.subtitle}
                  </span>
                </div>
              </div>

              <div className="w-full md:w-3/12 mb-2 md:mb-0 relative z-20 pointer-events-none">
                <span className="text-gray-400 uppercase tracking-widest text-sm border px-3 py-1 rounded-full border-white/10 group-hover:border-white/30 transition-colors">
                  {project.type}
                </span>
              </div>

              <div className="w-full md:w-2/12 mb-2 md:mb-0 relative z-20 pointer-events-none">
                <span className="font-mono text-gray-500 group-hover:text-white transition-colors">
                  {project.year}
                </span>
              </div>

              <div className="w-full md:w-1/12 flex justify-end relative z-20 pointer-events-none">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300 transform group-hover:-rotate-45">
                  <ArrowUpRight size={20} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
