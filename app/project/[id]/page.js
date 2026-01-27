"use client";

import { getProjectById } from "@/lib/api";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import parse from "html-react-parser";
import { ArrowLeft, ExternalLink, Github, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectDetails() {
  const { id } = useParams();
  const containerRef = useRef(null);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch project data
  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const response = await getProjectById(id);
        setProject(response.data);
      } catch (err) {
        console.error("Failed to fetch project:", err);
        setError(err.message || "Failed to load project");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  useEffect(() => {
    if (!project || loading) return;

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
        "-=0.8",
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

      // Gallery Reveal Animation
      gsap.utils.toArray(".gallery-item").forEach((item, i) => {
        gsap.from(item, {
          y: 60,
          opacity: 0,
          scale: 0.95,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top bottom-=10%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [project, loading]);

  // Loading state
  if (loading) {
    return (
      <main className="bg-dark-background min-h-screen text-white pt-32 pb-20 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 size={48} className="animate-spin text-primary" />
          <p className="text-gray-400 font-mono">Loading project...</p>
        </div>
      </main>
    );
  }

  // Error state
  if (error || !project) {
    return (
      <main className="bg-dark-background min-h-screen text-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <Link
            href="/work"
            className="flex items-center gap-2 text-white hover:text-gray-400 transition-colors uppercase tracking-widest text-sm font-bold mb-8"
          >
            <ArrowLeft size={20} /> Back to Work
          </Link>
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
            <p className="text-gray-400 mb-8">
              {error || "This project doesn't exist."}
            </p>
            <Link
              href="/work"
              className="px-6 py-3 bg-primary text-black font-bold rounded-full hover:scale-105 transition-transform inline-block"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Prepare data with fallbacks
  const thumbnail =
    project.thumbnail ||
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1600";
  const gallery = project.gallery || [];
  const technologies = project.technologies || [];
  const categoryArray = Array.isArray(project.category) ? project.category : [];

  return (
    <main
      ref={containerRef}
      className="bg-dark-background min-h-screen text-white pt-32 pb-20"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-4 mb-16 reveal-text">
          <Link
            href="/work"
            className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-gray-500 hover:text-white transition-colors"
          >
            Work
          </Link>
          <span className="text-[10px] text-white/20">/</span>
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-primary">
            {project.title}
          </span>
        </div>
        {/* Header */}
        <div className="mb-20">
          <div className="overflow-hidden">
            <h1 className="reveal-text text-[10vw] font-black font-syne uppercase leading-[0.9] mb-8 text-white">
              {project.title}
            </h1>
          </div>

          {/* Subtitle */}
          {project.subtitle && (
            <p className="reveal-text text-2xl text-gray-400 mb-8 font-medium">
              {project.subtitle}
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-t border-white/20 pt-8 reveal-text">
            <div>
              <span className="block text-gray-600 text-xs uppercase tracking-widest mb-2 font-mono">
                Client
              </span>
              <span className="text-lg font-semibold text-white">
                {project.clientName || "—"}
              </span>
            </div>
            <div>
              <span className="block text-gray-600 text-xs uppercase tracking-widest mb-2 font-mono">
                Year
              </span>
              <span className="text-lg font-semibold text-white">
                {project.year || "—"}
              </span>
            </div>
            <div>
              <span className="block text-gray-600 text-[10px] uppercase tracking-widest mb-4 font-mono">
                Category
              </span>
              <div className="flex flex-wrap gap-2">
                {categoryArray.map((cat, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold font-syne uppercase tracking-wider text-primary"
                  >
                    {cat}
                  </span>
                ))}
                {categoryArray.length === 0 && (
                  <span className="text-lg font-semibold text-white">—</span>
                )}
              </div>
            </div>
            <div>
              <span className="block text-gray-600 text-xs uppercase tracking-widest mb-2 font-mono">
                Links
              </span>
              <div className="flex gap-4">
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-primary transition-colors"
                    title="View Live Project"
                  >
                    <ExternalLink size={22} />
                  </a>
                )}
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-primary transition-colors"
                    title="View on GitHub"
                  >
                    <Github size={22} />
                  </a>
                )}
                {!project.liveLink && !project.githubLink && (
                  <span className="text-gray-600">—</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Hero Image (Thumbnail) */}
        <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-24 reveal-image border border-white/10">
          <Image
            src={thumbnail}
            alt={project.title}
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32">
          {/* Left Column: Narrative & Architecture */}
          <div className="md:col-span-4 space-y-20">
            {/* Perspective Intro */}
            <div className="reveal-text">
              <h3 className="text-[10px] text-gray-400 uppercase tracking-widest mb-6 font-mono flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary/40 rounded-full"></span>
                Perspective
              </h3>
              <p className="text-gray-300 leading-relaxed text-xl font-bold font-syne uppercase tracking-tight">
                {project.subtitle}
              </p>
            </div>

            {/* Smart Technology Stack */}
            {technologies.length > 0 && (
              <div className="reveal-text">
                <h3 className="text-[10px] text-gray-400 uppercase tracking-widest mb-6 font-mono flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-white/10 rounded-full"></span>
                  Architecture
                </h3>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech, idx) => {
                    const name = typeof tech === "string" ? tech : tech.name;
                    const cat = typeof tech === "object" ? tech.category : null;
                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full hover:border-primary/30 transition-all group/chip"
                      >
                        <span className="text-xs font-bold font-syne text-white uppercase tracking-wider">
                          {name}
                        </span>
                        {cat && (
                          <span className="text-[8px] font-mono uppercase tracking-tighter text-primary px-1.5 py-0.5 bg-primary/10 rounded group-hover/chip:bg-primary group-hover/chip:text-black transition-colors">
                            {cat}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Technical Challenges */}
            {project.technicalChallenges && (
              <div className="reveal-text relative pl-6 border-l border-white/5">
                <h3 className="text-[10px] text-primary uppercase tracking-widest mb-4 font-mono flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full animate-pulse"></span>
                  Challenges
                </h3>
                <div className="text-gray-400 leading-relaxed whitespace-pre-wrap text-base font-medium">
                  {project.technicalChallenges}
                </div>
              </div>
            )}

            {/* Solutions */}
            {project.solutions && (
              <div className="reveal-text relative pl-6 border-l border-white/5">
                <h3 className="text-[10px] text-primary uppercase tracking-widest mb-4 font-mono flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full animate-pulse"></span>
                  Solutions
                </h3>
                <div className="text-gray-400 leading-relaxed whitespace-pre-wrap text-base font-medium">
                  {project.solutions}
                </div>
              </div>
            )}

            {/* Overview */}
            {project.problemAndSolution && (
              <div className="reveal-text relative pl-6 border-l border-white/5">
                <h3 className="text-[10px] text-primary uppercase tracking-widest mb-4 font-mono flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full animate-pulse"></span>
                  Overview
                </h3>
                <div className="text-gray-400 leading-relaxed whitespace-pre-wrap text-base font-medium">
                  {project.problemAndSolution}
                </div>
              </div>
            )}
          </div>
          {/* Right Column: In-depth Description */}
          <div className="md:col-span-8">
            <div className="prose prose-invert prose-lg max-w-none prose-p:text-gray-300 prose-p:leading-relaxed prose-p:text-lg prose-headings:font-syne prose-headings:font-bold prose-headings:text-white prose-a:text-primary hover:prose-a:text-white prose-blockquote:border-primary prose-blockquote:bg-white/5 prose-blockquote:p-4 prose-blockquote:rounded-r-lg prose-code:text-primary prose-code:bg-white/10 prose-code:px-2 prose-code:rounded prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10 reveal-text">
              {parse(project.description || "")}
            </div>
          </div>
        </div>

        {/* Gallery */}
        {gallery.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6 md:gap-8 mb-32 w-full">
            {gallery.map((image, idx) => {
              // Create an asymmetrical editorial layout pattern
              let colSpan = "md:col-span-3"; // Default: half width
              let aspectRatio = "aspect-[4/3]";

              if (idx % 3 === 0) {
                colSpan = "md:col-span-4"; // Wider
                aspectRatio = "aspect-video";
              } else if (idx % 3 === 1) {
                colSpan = "md:col-span-2"; // Narrower
                aspectRatio = "aspect-square";
              } else {
                colSpan = "md:col-span-6"; // Full width
                aspectRatio = "aspect-[21/9]";
              }

              return (
                <div
                  key={idx}
                  className={`gallery-item group relative ${aspectRatio} ${colSpan} w-full overflow-hidden bg-white/5 border border-white/5 hover:border-white/20 transition-all duration-700 rounded-2xl`}
                >
                  {/* Image with Premium Zoom and Grayscale Transition */}
                  <Image
                    src={image}
                    alt={`${project.title} - Gallery ${idx + 1}`}
                    fill
                    className="parallax-image object-cover transition-transform duration-1000 ease-out group-hover:scale-105 grayscale-[0.3] group-hover:grayscale-0"
                    unoptimized
                  />

                  {/* Subtle Overlay for Depth */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 pointer-events-none"></div>

                  {/* Glassmorphic View Indicator */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-90 group-hover:scale-100">
                    <div className="px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full shadow-2xl flex items-center gap-2">
                      <ExternalLink size={14} className="text-white" />
                      <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-white">
                        Full View
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Navigation: Minimal Breadcrumb Exit */}
        <div className="mt-40 border-t border-white/5 pt-24 pb-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <Link href="/work" className="group flex flex-col gap-2">
            <span className="text-[10px] font-mono text-gray-600 uppercase tracking-[0.2em] group-hover:text-primary transition-colors">
              Continue Exploration
            </span>
            <div className="flex items-center gap-4">
              <h2 className="text-4xl md:text-6xl font-black font-syne text-white uppercase leading-none tracking-tighter group-hover:translate-x-2 transition-transform duration-500">
                Back to Index
              </h2>
              <ArrowLeft
                size={32}
                className="rotate-180 text-white group-hover:translate-x-4 transition-transform duration-500"
              />
            </div>
          </Link>

          <div className="flex flex-col items-end gap-2 text-right">
            <span className="text-[10px] font-mono text-gray-700 uppercase tracking-widest">
              © 2026 Archive
            </span>
            <span className="text-[10px] font-mono text-gray-700 uppercase tracking-[0.3em] font-bold">
              Mezanur Rahman
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
