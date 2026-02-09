"use client";

import { getProjects } from "@/lib/api";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Projects({ data = {} }) {
  const containerRef = useRef(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjects();
        if (response.data && response.data.length > 0) {
          setProjects(response.data);
        }
      } catch (err) {
        console.error("Projects: Fetch failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const titleLines = data?.title?.split(" ") || ["Studio", "Archive"];

  useGSAP(
    () => {
      if (loading) return;

      const runAnimations = () => {
        const items = gsap.utils.toArray(".project-grid-item");

        // Set initial states immediately to prevent flicker
        gsap.set(items, { y: 60, opacity: 0 });
        gsap.set(".header-fade-in", { opacity: 0, y: 30 });

        items.forEach((item) => {
          const q = gsap.utils.selector(item);

          // Card Entrance
          gsap.to(item, {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            },
          });

          // Image Parallax (Subtle)
          gsap.to(q(".parallax-img"), {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });

        // Header reveal
        gsap.to(".header-fade-in", {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        });
      };

      if (window.isPageReady) {
        runAnimations();
      } else {
        window.addEventListener("page-transition-complete", runAnimations);
        return () =>
          window.removeEventListener("page-transition-complete", runAnimations);
      }
    },
    { dependencies: [loading], scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      id="work"
      className="bg-dark-background py-40 border-t border-white/5"
    >
      <div className="px-6 md:px-12">
        {/* Minimalist Header */}
        <div className="header-fade-in mb-32 md:mb-48 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-4 lg:w-12 h-px bg-primary/40"></div>
              <p className="text-gray-500 uppercase tracking-[0.4em] lg:text-[10px] text-[9px] font-mono">
                {data?.tag || "Select Works // 2023 - 2026"}
              </p>
            </div>
            <h2 className="text-5xl md:text-9xl font-black font-syne text-white uppercase leading-[0.8] tracking-tighter">
              {titleLines[0]}
              <br />
              <span className="text-primary italic">
                {titleLines.slice(1).join(" ") || "Archive"}
              </span>
            </h2>
          </div>
          <div className="lg:text-right max-w-sm">
            <p className="text-xl text-gray-500 font-light leading-relaxed">
              {data?.description ||
                "Precision-engineered digital products that merge architectural clarity with high-fidelity interaction."}
            </p>
          </div>
        </div>

        {/* Asymmetric Minimalist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 min-h-[400px]">
          {loading ? (
            // Skeleton Loader
            [1, 2].map((i) => (
              <div
                key={i}
                className={`h-[400px] bg-white/5 rounded-sm animate-pulse mb-5 lg:mb-0 ${
                  i % 2 !== 0 ? "" : "md:mt-48"
                }`}
              ></div>
            ))
          ) : projects.length === 0 ? (
            <div className="col-span-full py-20 text-center text-gray-500 font-mono uppercase tracking-widest border border-dashed border-white/10 rounded-2xl">
              No archives found in the database.
            </div>
          ) : (
            projects.map((project, index) => (
              <div
                key={project._id || project.id}
                className={`project-grid-item mb-5 lg:mb-0 group relative ${
                  index % 2 !== 0 ? "md:mt-64" : ""
                }`}
              >
                <Link
                  href={`/project/${project._id || project.id}`}
                  className="relative block w-full overflow-hidden"
                >
                  {/* Image Window */}
                  <div className="relative aspect-4/3 overflow-hidden bg-white/5 grayscale group-hover:grayscale-0 transition-all duration-[1.5s] ease-expo">
                    <div className="parallax-img absolute inset-0 w-full h-[120%] top-[-10%]">
                      <Image
                        src={
                          project.thumbnail ||
                          "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=1600"
                        }
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-[2s] ease-expo opacity-80 group-hover:opacity-100"
                      />
                    </div>

                    {/* Discrete Corner Detail */}
                    <div className="absolute top-4 left-4 lg:top-8 lg:left-8 z-10">
                      <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest bg-black/40 backdrop-blur-md px-3 py-1 border border-white/5 rounded-full">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Hover Action Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 backdrop-blur-[2px]">
                      <div className="w-14 h-14 md:w-20 md:h-20 rounded-full border border-white/20 flex items-center justify-center text-white scale-50 group-hover:scale-100 transition-all duration-700 ease-expo">
                        <ArrowUpRight className="size-6 md:size-8" />
                      </div>
                    </div>
                  </div>

                  {/* Sub-Card Content */}
                  <div className="mt-6 md:mt-10 flex flex-col space-y-4">
                    <div className="lg:flex justify-between items-start">
                      <h3 className="text-2xl sm:text-3xl md:text-5xl font-black font-syne text-white uppercase tracking-tighter group-hover:text-primary transition-colors duration-500 line-clamp-2">
                        {project.title}
                      </h3>
                      <span className="font-mono text-[10px] text-gray-500 italic mt-2 shrink-0">
                        {project.year || "2024"}
                      </span>
                    </div>

                    <div className="h-px w-full bg-white/5 group-hover:bg-primary/20 transition-colors duration-1000"></div>

                    <div className="flex justify-between items-center gap-4">
                      <p className="text-[10px] md:text-xs font-mono text-gray-500 uppercase tracking-widest truncate">
                        {Array.isArray(project.category)
                          ? project.category.join(", ")
                          : project.category ||
                            project.subtitle ||
                            "Digital Product"}
                      </p>
                      <div className="overflow-hidden shrink-0">
                        <span className="block text-[10px] font-mono text-primary uppercase md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-500">
                          Explore Archive
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>

        {/* Foot CTA */}
        <div className="mt-24 md:mt-48 flex flex-col items-center">
          <Link
            href="/work"
            className="group relative flex flex-col items-center gap-6 text-center"
          >
            <span className="text-[10px] md:text-sm font-bold font-syne text-white uppercase tracking-[0.3em] md:tracking-[0.6em] group-hover:text-primary transition-colors">
              Explore All Projects
            </span>
            <div className="w-24 h-px bg-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
