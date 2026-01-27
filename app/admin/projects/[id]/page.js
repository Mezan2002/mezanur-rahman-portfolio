"use client";

import ConfirmationModal from "@/components/admin/ConfirmationModal";
import { deleteProject, getProjectById } from "@/lib/api";
import gsap from "gsap";
import parse from "html-react-parser";
import {
  ArrowLeft,
  Calendar,
  Edit3,
  ExternalLink,
  Github,
  Loader2,
  Trash2,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function ProjectPreviewPage() {
  const containerRef = useRef(null);
  const { id } = useParams();
  const router = useRouter();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const res = await getProjectById(id);
        setProject(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProject();
  }, [id]);

  useEffect(() => {
    if (!loading && project) {
      const ctx = gsap.context(() => {
        gsap.from(".animate-enter", {
          y: 30,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
        });
      }, containerRef);
      return () => ctx.revert();
    }
  }, [loading, project]);

  const handleDelete = async () => {
    try {
      await deleteProject(id);
      router.push("/admin/projects");
    } catch (err) {
      alert("Failed to delete project: " + err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">
          Loading Preview...
        </p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="p-12 border border-red-500/20 bg-red-500/5 rounded-3xl text-center">
        <p className="text-red-400 font-mono mb-6 uppercase tracking-widest text-sm">
          Error: {error || "Project Not Found"}
        </p>
        <button
          onClick={() => router.push("/admin/projects")}
          className="px-8 py-3 bg-white text-black font-bold font-syne uppercase text-xs rounded-full"
        >
          Back to Projects
        </button>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="pb-40">
      {/* Top Navigation & Actions */}
      <div className="flex justify-between items-center mb-16 animate-enter sticky top-8 z-50">
        <button
          onClick={() => router.back()}
          className="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors bg-black/50 px-4 py-2 rounded-full backdrop-blur-md border border-white/5"
        >
          <ArrowLeft size={18} />
          <span className="uppercase tracking-widest text-[10px] font-bold">
            Back
          </span>
        </button>

        <div className="flex items-center gap-4">
          <Link
            href={`/admin/projects/edit/${id}`}
            className="flex items-center gap-2 px-6 py-2.5 bg-white text-black font-bold uppercase tracking-wider rounded-full hover:bg-primary transition-all text-[10px]"
          >
            <Edit3 size={14} />
            Edit Project
          </Link>
          <button
            onClick={() => setDeleteModal({ isOpen: true })}
            className="flex items-center gap-2 px-6 py-2.5 bg-red-500/10 text-red-500 border border-red-500/20 font-bold uppercase tracking-wider rounded-full hover:bg-red-500 hover:text-white transition-all text-[10px]"
          >
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="space-y-12 mb-20">
        <div className="animate-enter">
          <div className="flex flex-wrap gap-2 mb-6">
            {(Array.isArray(project.category) ? project.category : []).map(
              (cat, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold font-syne uppercase tracking-wider text-primary"
                >
                  {cat}
                </span>
              ),
            )}
            {!project.category?.length && (
              <p className="text-xs font-mono text-primary tracking-[0.3em] uppercase">
                Project Case Study
              </p>
            )}
          </div>
          <h1 className="text-6xl md:text-8xl font-black font-syne text-white uppercase leading-[0.9] tracking-tighter">
            {project.title}
          </h1>
          {project.subtitle && (
            <p className="text-2xl md:text-3xl font-bold font-syne text-gray-400 uppercase mt-4">
              {project.subtitle}
            </p>
          )}
        </div>

        {/* Featured Image */}
        <div className="relative aspect-video rounded-3xl overflow-hidden animate-enter border border-white/5">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 animate-enter">
        {/* Left: Metadata */}
        <div className="lg:col-span-4 space-y-16">
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest flex items-center gap-2">
                <Users size={12} /> Client
              </span>
              <p className="text-lg font-bold text-white uppercase font-syne">
                {project.clientName || "—"}
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest flex items-center gap-2">
                <Calendar size={12} /> Year
              </span>
              <p className="text-lg font-bold text-white uppercase font-syne">
                {project.year || "—"}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest block">
              Architecture
            </span>
            <div className="flex flex-wrap gap-2">
              {(project.technologies || []).map((tech, i) => {
                const name = typeof tech === "string" ? tech : tech.name;
                const cat = typeof tech === "object" ? tech.category : null;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full group/chip"
                  >
                    <span className="text-[10px] font-bold font-syne text-white uppercase tracking-wider">
                      {name}
                    </span>
                    {cat && (
                      <span className="text-[8px] font-mono uppercase tracking-tighter text-primary px-1 py-0.5 bg-primary/10 rounded">
                        {cat}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Admin Narrative Sections (Sidebar) */}
          <div className="space-y-12">
            {project.technicalChallenges && (
              <div className="relative pl-6 border-l border-white/5">
                <h3 className="text-[10px] text-primary uppercase tracking-widest mb-4 font-mono flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full animate-pulse"></span>
                  Challenges
                </h3>
                <div className="text-gray-400 leading-relaxed whitespace-pre-wrap text-sm font-medium">
                  {project.technicalChallenges}
                </div>
              </div>
            )}

            {project.solutions && (
              <div className="relative pl-6 border-l border-white/5">
                <h3 className="text-[10px] text-primary uppercase tracking-widest mb-4 font-mono flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full animate-pulse"></span>
                  Solutions
                </h3>
                <div className="text-gray-400 leading-relaxed whitespace-pre-wrap text-sm font-medium">
                  {project.solutions}
                </div>
              </div>
            )}

            {project.problemAndSolution && (
              <div className="relative pl-6 border-l border-white/5">
                <h3 className="text-[10px] text-primary uppercase tracking-widest mb-4 font-mono flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full animate-pulse"></span>
                  Overview
                </h3>
                <div className="text-gray-400 leading-relaxed whitespace-pre-wrap text-sm font-medium">
                  {project.problemAndSolution}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4 pt-4">
            <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest block mb-4">
              Direct Links
            </span>
            <div className="flex gap-4">
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:text-white transition-colors font-bold uppercase text-[10px] tracking-widest"
                >
                  <ExternalLink size={16} /> Live Demo
                </a>
              )}
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-bold uppercase text-[10px] tracking-widest"
                >
                  <Github size={16} /> Source Code
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right: Content */}
        <div className="lg:col-span-8">
          <h3 className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.3em] mb-8 pb-4 border-b border-white/5">
            The Story
          </h3>
          <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed font-medium">
            {parse(project.description || "")}
          </div>

          {/* Gallery Preview */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="mt-20 space-y-8">
              <h3 className="text-xs font-mono text-gray-600 uppercase tracking-[0.3em]">
                Project Gallery ({project.gallery.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.gallery.map((img, i) => (
                  <div
                    key={i}
                    className="relative aspect-video rounded-2xl overflow-hidden border border-white/10"
                  >
                    <Image
                      src={img}
                      alt={`Gallery ${i}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false })}
        onConfirm={handleDelete}
        title="Delete Project?"
        message="Are you sure you want to permanently delete this project? This will remove all associated data including the gallery."
      />
    </div>
  );
}
