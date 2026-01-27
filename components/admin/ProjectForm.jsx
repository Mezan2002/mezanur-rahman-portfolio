"use client";

import ImageUploader from "@/components/admin/ImageUploader";
import TiptapEditor from "@/components/admin/TiptapEditor";
import gsap from "gsap";
import { ArrowLeft, Loader2, Plus, Save, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function ProjectForm({
  initialData = {},
  isEditing = false,
  onSubmit,
}) {
  const containerRef = useRef(null);

  // Form States
  const [title, setTitle] = useState(initialData.title || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [featuredImage, setFeaturedImage] = useState(
    initialData.thumbnail || "",
  );
  // New: Gallery State for multiple images
  const [gallery, setGallery] = useState(
    initialData.gallery || initialData.images || [],
  );
  const [subtitle, setSubtitle] = useState(initialData.subtitle || "");
  const [year, setYear] = useState(
    initialData.year || new Date().getFullYear().toString(),
  );
  const [category, setCategory] = useState(
    Array.isArray(initialData.category)
      ? initialData.category.join(", ")
      : initialData.category || "",
  );
  const [technologies, setTechnologies] = useState(
    Array.isArray(initialData.technologies)
      ? initialData.technologies
          .map((t) =>
            typeof t === "string"
              ? t
              : t.category
                ? `${t.name}:${t.category}`
                : t.name,
          )
          .join(", ")
      : initialData.technologies || "",
  );
  const [clientName, setClientName] = useState(initialData.clientName || "");
  const [projectUrl, setProjectUrl] = useState(initialData.projectUrl || "");
  const [githubUrl, setGithubUrl] = useState(initialData.githubUrl || "");
  const [status, setStatus] = useState(initialData.status || "draft");
  const [featured, setFeatured] = useState(initialData.featured || false);

  // New Narrative States
  const [technicalChallenges, setTechnicalChallenges] = useState(
    initialData.technicalChallenges || "",
  );
  const [solutions, setSolutions] = useState(initialData.solutions || "");
  const [problemAndSolution, setProblemAndSolution] = useState(
    initialData.problemAndSolution || "",
  );

  // UI States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Populate form when initialData changes
  useEffect(() => {
    if (Object.keys(initialData).length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setFeaturedImage(
        initialData.thumbnail ||
          initialData.image ||
          initialData.featuredImage ||
          "",
      );
      setCategory(
        Array.isArray(initialData.category)
          ? initialData.category.join(", ")
          : initialData.category || "",
      );
      setTechnologies(
        Array.isArray(initialData.technologies)
          ? initialData.technologies
              .map((t) =>
                typeof t === "string"
                  ? t
                  : t.category
                    ? `${t.name}:${t.category}`
                    : t.name,
              )
              .join(", ")
          : initialData.technologies || "",
      );
      setClientName(initialData.clientName || "");
      setProjectUrl(initialData.liveLink || initialData.projectUrl || "");
      setGithubUrl(initialData.githubLink || initialData.githubUrl || "");
      setStatus(initialData.status || "draft");
      setFeatured(initialData.featured || false);
      setSubtitle(initialData.subtitle || "");
      setYear(initialData.year || "");
      // Initialize gallery
      setGallery(initialData.gallery || initialData.images || []);

      // Narrative fields
      setTechnicalChallenges(initialData.technicalChallenges || "");
      setSolutions(initialData.solutions || "");
      setProblemAndSolution(initialData.problemAndSolution || "");
    }
  }, [initialData]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".animate-in", { opacity: 0, y: 20 });
      gsap.to(".animate-in", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "all",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async () => {
    if (!title || !description) {
      setError("Please fill in title and description.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    // Format Technologies as Array of Objects (Supports name:category)
    const technologiesArray = technologies
      ? technologies
          .split(",")
          .map((item) => {
            const parts = item.split(":").map((s) => s.trim());
            return {
              name: parts[0],
              category: parts[1] || "Development",
            };
          })
          .filter((t) => t.name)
      : [];

    // Format Category as Array of Strings
    const categoriesArray = category
      ? category
          .split(",")
          .map((cat) => cat.trim())
          .filter(Boolean)
      : [];

    const projectData = {
      title,
      subtitle,
      year,
      description,
      thumbnail: featuredImage,
      gallery,
      category: categoriesArray,
      technologies: technologiesArray,
      clientName,
      liveLink: projectUrl,
      githubLink: githubUrl,
      technicalChallenges,
      solutions,
      problemAndSolution,
      status,
      featured,
    };

    try {
      await onSubmit(projectData);
    } catch (err) {
      setError(err.message || "Failed to save project");
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={containerRef} className="pb-40 min-h-screen">
      {/* Header Actions */}
      <div className="flex justify-between items-center mb-12 animate-in sticky top-8 z-50">
        <Link
          href="/admin/projects"
          className="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors bg-black/50 px-4 py-2 rounded-full backdrop-blur-md border border-white/5 hover:border-white/20"
        >
          <div className="p-1 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
            <ArrowLeft size={16} />
          </div>
          <span className="uppercase tracking-widest text-xs font-bold">
            Back
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !title}
            className="flex items-center gap-2 px-8 py-3 bg-primary text-black font-bold font-syne uppercase tracking-wider rounded-full hover:bg-white hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-[0_0_20px_rgba(180,255,0,0.3)] hover:shadow-[0_0_30px_rgba(180,255,0,0.5)]"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>{isEditing ? "Updating..." : "Saving..."}</span>
              </>
            ) : (
              <>
                <span>{isEditing ? "Update Project" : "Save Project"}</span>
                <Save size={18} />
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="animate-in mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm font-mono flex items-center justify-between">
          <span>Error: {error}</span>
          <button onClick={() => setError(null)}>
            <X size={16} />
          </button>
        </div>
      )}

      {/* Editor Layout */}
      <div className="space-y-12">
        {/* Title Input */}
        <div className="animate-in group relative">
          <input
            type="text"
            placeholder="Untitled Project..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-transparent text-5xl md:text-7xl font-black font-syne text-white placeholder-gray-800 outline-none leading-tight selection:bg-primary/30"
          />
        </div>

        {/* Subtitle Input */}
        <div className="animate-in group relative">
          <input
            type="text"
            placeholder="Project Subtitle..."
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full bg-transparent text-2xl md:text-3xl font-bold font-syne text-gray-400 placeholder-gray-800 outline-none leading-tight focus:text-white transition-colors"
          />
        </div>

        {/* Description - Rich Text Editor */}
        <div className="animate-in relative mx-8 md:mx-12 pt-5 md:pt-8">
          <div className="absolute -left-12 top-0 h-full w-px bg-linear-to-b from-primary/50 to-transparent hidden xl:block"></div>
          <label className="flex text-xs font-mono uppercase tracking-widest text-primary mb-6 items-center gap-2">
            <span className="w-1 h-1 bg-primary rounded-full"></span>
            Project Description
          </label>
          <div className="prose prose-invert prose-lg max-w-none">
            <TiptapEditor content={description} onChange={setDescription} />
          </div>
        </div>

        {/* Technical Challenges */}
        <div className="animate-in relative group/field pb-8 border-b border-white/5">
          <label className="flex text-[10px] font-mono uppercase tracking-[0.2em] text-gray-600 mb-4 items-center gap-2 group-focus-within/field:text-primary transition-colors">
            Technical Challenges
          </label>
          <textarea
            value={technicalChallenges}
            onChange={(e) => setTechnicalChallenges(e.target.value)}
            placeholder="What were the core hurdles?"
            className="w-full bg-transparent p-0 text-xl font-bold font-syne text-white placeholder-gray-800 outline-none border-none focus:placeholder-white/10 transition-all min-h-[100px] resize-y whitespace-pre-wrap"
          />
        </div>

        {/* Solutions Implemented */}
        <div className="animate-in relative group/field pb-8 border-b border-white/5">
          <label className="flex text-[10px] font-mono uppercase tracking-[0.2em] text-gray-600 mb-4 items-center gap-2 group-focus-within/field:text-primary transition-colors">
            Solutions Implemented
          </label>
          <textarea
            value={solutions}
            onChange={(e) => setSolutions(e.target.value)}
            placeholder="How did you solve them?"
            className="w-full bg-transparent p-0 text-xl font-bold font-syne text-white placeholder-gray-800 outline-none border-none focus:placeholder-white/10 transition-all min-h-[100px] resize-y whitespace-pre-wrap"
          />
        </div>

        {/* Problem and Solution Overview */}
        <div className="animate-in relative group/field pb-8 border-b border-white/5">
          <label className="flex text-[10px] font-mono uppercase tracking-[0.2em] text-gray-600 mb-4 items-center gap-2 group-focus-within/field:text-primary transition-colors">
            Problem and Solution Overview
          </label>
          <textarea
            value={problemAndSolution}
            onChange={(e) => setProblemAndSolution(e.target.value)}
            placeholder="A quick summary of the journey..."
            className="w-full bg-transparent p-0 text-xl font-bold font-syne text-white placeholder-gray-800 outline-none border-none focus:placeholder-white/10 transition-all min-h-[100px] resize-y whitespace-pre-wrap"
          />
        </div>

        {/* Metadata Ribbon */}
        <div className="animate-in flex flex-col gap-8">
          {/* Row 1: Category, Year, Client */}
          <div className="flex flex-wrap items-center gap-4 md:gap-8 pb-8 border-b border-white/5">
            {/* Category */}
            <div className="flex-1 min-w-[200px] relative group">
              <input
                type="text"
                placeholder="Design, Development..."
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-transparent py-2 text-lg font-bold font-syne text-white placeholder-gray-700 outline-none border-none focus:placeholder-white/20 transition-all uppercase"
              />
              <span className="absolute -top-4 left-0 text-[10px] font-mono uppercase tracking-widest text-gray-600 group-focus-within:text-primary transition-colors">
                Categories
              </span>
            </div>

            <div className="w-px h-12 bg-white/10 hidden md:block"></div>

            <div className="flex-1 min-w-[200px] relative group">
              <input
                type="text"
                placeholder="2024"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full bg-transparent py-2 text-lg font-bold font-syne text-white placeholder-gray-700 outline-none border-none focus:placeholder-white/20 transition-all uppercase"
              />
              <span className="absolute -top-4 left-0 text-[10px] font-mono uppercase tracking-widest text-gray-600 group-focus-within:text-primary transition-colors">
                Year
              </span>
            </div>

            <div className="w-px h-12 bg-white/10 hidden md:block"></div>

            {/* Client Name */}
            <div className="flex-1 min-w-[200px] relative group">
              <input
                type="text"
                placeholder="Client name..."
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full bg-transparent py-2 text-lg font-bold font-syne text-white placeholder-gray-700 outline-none border-none focus:placeholder-white/20 transition-all uppercase"
              />
              <span className="absolute -top-4 left-0 text-[10px] font-mono uppercase tracking-widest text-gray-600 group-focus-within:text-primary transition-colors">
                Client
              </span>
            </div>
          </div>

          {/* Row 2: Technologies */}
          <div className="pb-8 border-b border-white/5">
            <div className="relative group/tech">
              <textarea
                placeholder="React:Frontend, Node.js:Backend, GSAP:Animation..."
                value={technologies}
                onChange={(e) => setTechnologies(e.target.value)}
                className="w-full bg-transparent p-0 text-xl font-bold font-syne text-white placeholder-gray-800 outline-none border-none focus:placeholder-white/10 transition-all min-h-[60px] resize-none uppercase"
              />
              <span className="absolute -top-4 left-0 text-[10px] font-mono uppercase tracking-widest text-gray-600 group-focus-within/tech:text-primary transition-colors">
                Tech Stack
              </span>

              {/* Visual Chips for Tech Stack */}
              <div className="flex flex-wrap gap-2 mt-4">
                {technologies.split(",").map((item, i) => {
                  const parts = item.split(":").map((s) => s.trim());
                  if (!parts[0]) return null;
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full group/chip hover:border-primary/30 transition-colors"
                    >
                      <span className="text-xs font-bold font-syne text-white">
                        {parts[0]}
                      </span>
                      {parts[1] && (
                        <span className="text-[9px] font-mono uppercase tracking-tighter text-primary px-1.5 py-0.5 bg-primary/10 rounded">
                          {parts[1]}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Row 3: URLs */}
          <div className="flex flex-wrap items-center gap-4 md:gap-8 pb-8 border-b border-white/5">
            {/* Live URL */}
            <div className="flex-1 min-w-[250px] relative group">
              <input
                type="url"
                placeholder="https://example.com"
                value={projectUrl}
                onChange={(e) => setProjectUrl(e.target.value)}
                className="w-full bg-transparent py-2 text-lg font-bold font-syne text-white placeholder-gray-700 outline-none border-none focus:placeholder-white/20 transition-all"
              />
              <span className="absolute -top-4 left-0 text-[10px] font-mono uppercase tracking-widest text-gray-600 group-focus-within:text-primary transition-colors">
                Live URL
              </span>
            </div>

            <div className="w-px h-12 bg-white/10 hidden md:block"></div>

            {/* GitHub URL */}
            <div className="flex-1 min-w-[250px] relative group">
              <input
                type="url"
                placeholder="https://github.com/..."
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className="w-full bg-transparent py-2 text-lg font-bold font-syne text-white placeholder-gray-700 outline-none border-none focus:placeholder-white/20 transition-all"
              />
              <span className="absolute -top-4 left-0 text-[10px] font-mono uppercase tracking-widest text-gray-600 group-focus-within:text-primary transition-colors">
                GitHub Repository
              </span>
            </div>
          </div>

          {/* Featured Toggle - Inline */}
          <div className="flex items-center gap-3 pb-8 border-b border-white/5">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="w-5 h-5 rounded border-white/20 bg-white/5 text-primary focus:ring-2 focus:ring-primary/20"
            />
            <label className="text-lg font-bold font-syne text-white cursor-pointer">
              Featured Project
            </label>
            <span className="text-xs font-mono text-gray-600 ml-2">
              Highlight on homepage
            </span>
          </div>

          {/* Featured Image (Banner) */}
          <div className="w-full group">
            <label className="text-xs font-mono uppercase tracking-widest text-gray-600 mb-4 block group-hover:text-primary transition-colors">
              Banner Image (Thumbnail)
            </label>
            <div className="overflow-hidden rounded-none border-b border-white/5 pb-8 group-hover:border-primary/20 transition-colors">
              <ImageUploader
                value={featuredImage}
                onChange={setFeaturedImage}
                className="w-full aspect-21/9"
              />
            </div>
          </div>

          {/* Project Gallery */}
          <div className="w-full group pt-8 border-t border-white/5">
            <label className="text-xs font-mono uppercase tracking-widest text-gray-600 mb-6 block group-hover:text-primary transition-colors">
              Project Gallery
            </label>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {gallery.map((imgUrl, idx) => (
                <div
                  key={idx}
                  className="relative aspect-video group/img bg-white/5 rounded-xl overflow-hidden border border-white/10"
                >
                  <Image
                    src={imgUrl}
                    alt={`Gallery ${idx}`}
                    width={1000}
                    height={1000}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() =>
                      setGallery(gallery.filter((_, i) => i !== idx))
                    }
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity transform hover:scale-110"
                    type="button"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}

              {/* Add New Image to Gallery */}
              <div className="aspect-video relative rounded-xl overflow-hidden border border-dashed border-white/10 hover:border-primary/50 transition-colors bg-white/5 group/upload">
                <ImageUploader
                  value="" // Always empty to allow new uploads
                  onChange={(newUrl) => {
                    if (newUrl) setGallery([...gallery, newUrl]);
                  }}
                  className="w-full h-full opacity-0 absolute inset-0 z-10 cursor-pointer"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 group-hover/upload:text-primary pointer-events-none">
                  <div className="mb-2 p-2 rounded-full bg-white/5 group-hover/upload:bg-primary/10 transition-colors">
                    <Plus size={20} />
                  </div>
                  <span className="text-xs font-bold font-syne uppercase tracking-wider">
                    Add Image
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
