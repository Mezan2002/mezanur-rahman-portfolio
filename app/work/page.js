"use client";

import { getProjects } from "@/lib/api";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function WorkPage() {
  const containerRef = useRef(null);
  const [filter, setFilter] = useState("all");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await getProjects();
        setProjects(response.data || []);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((p) => {
          const categories = Array.isArray(p.category)
            ? p.category
            : [p.category];
          return categories.some(
            (cat) => cat?.toLowerCase() === filter.toLowerCase(),
          );
        });

  useEffect(() => {
    if (loading) return;

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
        "-=0.5",
      );

      // List Animation
      if (filteredProjects.length > 0) {
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
          },
        );
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [filter, loading, projects, filteredProjects.length]);

  return (
    <main
      ref={containerRef}
      className="bg-dark-background min-h-screen pt-32 pb-20 px-4 sm:px-8 md:px-12"
    >
      <div>
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 border-b border-white/10 pb-12 gap-10">
          <div className="w-full md:w-auto">
            <h1 className="flex flex-wrap overflow-hidden text-[15vw] sm:text-[12vw] md:text-[9vw] font-black font-syne text-white uppercase leading-[0.8] tracking-tighter mix-blend-difference mb-4">
              {"SELECTED".split("").map((c, i) => (
                <span key={i} className="page-title-char inline-block">
                  {c}
                </span>
              ))}
            </h1>
            <h1 className="overflow-hidden text-[15vw] sm:text-[12vw] md:text-[9vw] font-black font-syne bg-white text-black uppercase inline-block leading-[0.8] tracking-tighter mix-blend-difference px-2 sm:px-0">
              {"WORKS".split("").map((c, i) => (
                <span key={i} className="page-title-char inline-block">
                  {c}
                </span>
              ))}
            </h1>
          </div>

          <div className="flex flex-wrap gap-2 md:mb-4">
            {["all", "design", "development"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 sm:px-6 py-2 rounded-full border text-[10px] sm:text-xs uppercase tracking-widest transition-all duration-300 ${
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

        {/* LOADING & ERROR STATES */}
        {loading && (
          <div className="py-40 text-center">
            <div className="inline-block w-12 h-12 border-4 border-white/10 border-t-white rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 font-mono uppercase tracking-[0.2em] animate-pulse">
              Loading Projects...
            </p>
          </div>
        )}

        {error && (
          <div className="py-20 md:py-40 text-center text-red-500 font-mono uppercase tracking-widest text-sm">
            Error: {error}
          </div>
        )}

        {!loading && !error && filteredProjects.length === 0 && (
          <div className="py-20 md:py-40 text-center text-gray-500 font-mono uppercase tracking-widest text-sm">
            No projects found in this category.
          </div>
        )}

        {/* LIST */}
        {!loading && !error && filteredProjects.length > 0 && (
          <div className="flex flex-col w-full">
            {/* Table Header (Desktop Only) */}
            <div className="hidden md:flex gap-5 text-[10px] text-gray-600 uppercase tracking-[0.2em] pb-4 border-b border-white/10">
              <div className="w-1/12">No.</div>
              <div className="w-5/12">Project</div>
              <div className="w-3/12">Services</div>
              <div className="w-2/12">Year</div>
              <div className="w-1/12 text-right">Link</div>
            </div>

            {filteredProjects.map((project, index) => {
              const projectId = project._id || project.id;
              const projectType = Array.isArray(project.category)
                ? project.category.join(", ")
                : project.category || "Development";
              const projectImage = project?.thumbnail;

              return (
                <Link
                  href={`/project/${projectId}`}
                  key={projectId}
                  className="project-row group py-10 lg:py-16 border-b border-white/10 flex flex-col lg:flex-row lg:items-baseline gap-6 lg:gap-5 relative z-10 transition-colors duration-500 hover:border-white/30"
                >
                  {/* TOP ROW (MOBILE) / NO. (DESKTOP) */}
                  <div className="w-full lg:w-1/12 flex justify-between items-center lg:items-start lg:block relative z-20 pointer-events-none">
                    <span className="font-mono text-xs sm:text-sm text-gray-500 group-hover:text-white transition-colors">
                      /{String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="lg:hidden font-mono text-xs text-gray-600">
                      {project.year || "2024"}
                    </span>
                  </div>

                  {/* TITLE AREA */}
                  <div className="w-full lg:w-5/12 relative py-1 lg:py-2">
                    {/* Floating Image Area - Premium Desktop Only */}
                    <div className="absolute top-1/2 left-12 -translate-y-1/2 w-[320px] h-[220px] pointer-events-none opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out z-30 rounded-lg overflow-hidden translate-x-12 shadow-2xl origin-left bg-dark-light border border-white/10 hidden lg:block">
                      {projectImage ? (
                        <Image
                          src={projectImage}
                          alt={project.title}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-700 font-mono text-xs uppercase">
                          No Image
                        </div>
                      )}
                      <div className="absolute bottom-3 right-3 bg-white text-black text-[10px] font-bold uppercase px-3 py-1 rounded shadow-lg">
                        View
                      </div>
                    </div>

                    <div className="relative z-10">
                      <h3
                        className="text-3xl sm:text-4xl lg:text-6xl font-black text-white group-hover:text-transparent group-hover:stroke-white transition-all duration-300 font-syne uppercase leading-tight tracking-tighter"
                        style={{ WebkitTextStroke: "1px transparent" }}
                      >
                        <span className="group-hover:text-transparent lg:group-hover:bg-clip-text lg:group-hover:bg-white/10 transition-all lg:group-hover:blur-[1px] line-clamp-2">
                          {project.title}
                        </span>
                      </h3>
                      <p className="text-gray-500 text-sm sm:text-lg font-light group-hover:text-white delay-75 line-clamp-1 mt-2 transition-transform duration-300">
                        {project.subtitle || "Selected Works"}
                      </p>
                    </div>
                  </div>

                  {/* METADATA: SERVICES */}
                  <div className="w-full lg:w-3/12 relative z-20 pointer-events-none">
                    <span className="text-gray-400 uppercase tracking-[0.2em] text-[10px] sm:text-xs py-1 transition-colors block leading-relaxed">
                      {projectType}
                    </span>
                  </div>

                  {/* YEAR (HIDDEN ON MOBILE TOP ROW HANDLES IT) */}
                  <div className="hidden lg:block lg:w-2/12 relative z-20 pointer-events-none">
                    <span className="font-mono text-gray-500 group-hover:text-white transition-colors">
                      {project.year || "2024"}
                    </span>
                  </div>

                  {/* CTA ICON/BUTTON */}
                  <div className="w-full lg:w-1/12 flex justify-end items-center z-20 pointer-events-none">
                    <div className="w-full lg:w-12 h-14 lg:h-12 rounded-full border border-white/10 flex items-center justify-center gap-3 group-hover:bg-white group-hover:text-black transition-all duration-300 transform lg:group-hover:-rotate-45">
                      <ArrowUpRight className="size-5 lg:size-5" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
