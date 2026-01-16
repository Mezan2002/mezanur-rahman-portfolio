"use client";

import ConfirmationModal from "@/components/admin/ConfirmationModal";
import { deleteProject, getProjects } from "@/lib/api";
import gsap from "gsap";
import { Pencil, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function ProjectsPage() {
  const containerRef = useRef(null);
  const [filter, setFilter] = useState("all");
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    id: null,
  });

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await getProjects();
      setProjects(response.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (e, id) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation();
    setDeleteModal({ isOpen: true, id });
  };

  const handleDelete = async () => {
    const id = deleteModal.id;
    if (!id) return;

    try {
      await deleteProject(id);
      setProjects(
        projects.filter((project) => (project._id || project.id) !== id)
      );
      setDeleteModal({ isOpen: false, id: null });
    } catch (err) {
      alert("Failed to delete project: " + err.message);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((p) => {
          // Handle both object and string categories safely
          const catName =
            typeof p.category === "object" ? p.category?.name : p.category;

          return catName && catName.toLowerCase() === filter.toLowerCase();
        });

  useEffect(() => {
    if (!loading && projects.length > 0) {
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
    }
  }, [loading, projects, filter]);

  return (
    <div
      ref={containerRef}
      className="bg-dark-background min-h-screen pb-20 px-6 md:px-12 pt-10"
    >
      <div className="max-w-[1600px] mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-white/10 pb-8">
          <div className="relative">
            <p className="text-xs font-mono text-primary mb-2 tracking-widest uppercase absolute -top-8 left-1">
              Admin Portal
            </p>
            <h1 className="flex overflow-hidden text-[10vw] md:text-[4vw] font-black font-syne text-white uppercase leading-[0.8] tracking-tighter mix-blend-difference mb-4">
              {"PROJECTS".split("").map((c, i) => (
                <span key={i} className="page-title-char inline-block">
                  {c}
                </span>
              ))}
            </h1>
          </div>

          <div className="flex flex-col-reverse items-end md:flex-row gap-6 mb-2 md:mb-4">
            {/* Create Button */}
            <Link
              href="/admin/projects/create"
              className="filter-btn group relative px-6 py-2 bg-primary text-black font-bold font-syne uppercase tracking-wider rounded-full overflow-hidden hover:scale-105 transition-transform flex items-center gap-2"
            >
              <Plus size={16} />
              <span>Create New</span>
            </Link>
          </div>
        </div>

        {/* LIST */}
        <div className="flex flex-col w-full">
          {/* Table Header */}
          <div className="hidden md:flex text-xs text-gray-600 uppercase tracking-widest pb-4 border-b border-white/10">
            <div className="w-1/12">No.</div>
            <div className="w-4/12">Project</div>
            <div className="w-3/12">Services</div>
            <div className="w-2/12">Year</div>
            <div className="w-2/12 text-right">Actions</div>
          </div>

          {projects.length === 0 && !loading ? (
            <div className="py-20 text-center text-gray-500 font-mono">
              No projects found. Create your first one!
            </div>
          ) : null}

          {filteredProjects.map((project, index) => {
            const projectId = project._id || project.id;
            return (
              <Link
                href={`/admin/projects/${projectId}`}
                key={projectId}
                className="project-row group py-6 md:py-8 border-b border-white/10 flex flex-col md:flex-row items-center md:items-baseline relative z-10 transition-colors duration-500 hover:border-white/30"
              >
                <div className="w-full md:w-1/12 mb-4 md:mb-0 relative z-20 pointer-events-none">
                  <span className="font-mono text-xs text-gray-500 group-hover:text-white transition-colors">
                    /{String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Title Column - Image anchored here */}
                <div className="w-full md:w-4/12 mb-4 md:mb-0 relative py-2">
                  {/* Floating Image inside Title Area */}
                  <div className="absolute top-1/2 left-0 md:left-12 -translate-y-1/2 w-[240px] h-[160px] pointer-events-none opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out z-30 rounded-lg overflow-hidden translate-x-4 md:translate-x-12 shadow-2xl origin-left bg-dark-background border border-white/10">
                    {project.image || project.featuredImage ? (
                      <Image
                        src={project.image || project.featuredImage}
                        alt={project.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full bg-white/5 flex items-center justify-center text-gray-700 font-mono text-xs">
                        No Image
                      </div>
                    )}

                    {/* View Badge */}
                    <div className="absolute bottom-3 right-3 bg-white text-black text-[9px] font-bold uppercase px-2 py-0.5 rounded shadow-lg">
                      View
                    </div>
                  </div>

                  <div className="relative z-10">
                    <h3
                      className="text-2xl md:text-3xl font-bold text-white group-hover:text-transparent group-hover:stroke-white transition-all duration-300 font-syne uppercase break-words"
                      style={{ WebkitTextStroke: "1px transparent" }}
                    >
                      <span className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-white/10 transition-all group-hover:blur-[1px]">
                        {project.title}
                      </span>
                    </h3>
                    <span className="text-gray-500 text-xs font-light group-hover:text-white transition-colors delay-75 block mt-1 group-hover:translate-x-2 transition-transform duration-300">
                      {project.subtitle || "No subtitle"}
                    </span>
                  </div>
                </div>

                <div className="w-full md:w-3/12 mb-2 md:mb-0 relative z-20 pointer-events-none">
                  <span className="text-gray-400 uppercase tracking-widest text-sm border px-3 py-1 rounded-full border-white/10 group-hover:border-white/30 transition-colors">
                    {typeof project.category === "object"
                      ? project.category.name
                      : project.category || project.type || "—"}
                  </span>
                </div>

                <div className="w-full md:w-2/12 mb-2 md:mb-0 relative z-20 pointer-events-none">
                  <span className="font-mono text-gray-500 group-hover:text-white transition-colors">
                    {project.year || "—"}
                  </span>
                </div>

                <div className="w-full md:w-2/12 flex justify-end items-center gap-4 relative z-20">
                  {/* Edit Button */}
                  <Link
                    href={`/admin/projects/edit/${projectId}`}
                    onClick={(e) => e.stopPropagation()}
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-all"
                    title="Edit Project"
                  >
                    <Pencil size={16} />
                  </Link>

                  {/* Delete Button */}
                  <button
                    onClick={(e) => confirmDelete(e, projectId)}
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all"
                    title="Delete Project"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        onConfirm={handleDelete}
        title="Delete Project?"
        message="Are you sure you want to delete this project? This action cannot be undone."
      />
    </div>
  );
}
