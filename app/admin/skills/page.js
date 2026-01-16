"use client";

import ConfirmationModal from "@/components/admin/ConfirmationModal";
import { createSkill, deleteSkill, getSkills } from "@/lib/api";
import gsap from "gsap";
import { Plus, Search, Trash2, Wrench } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function SkillsPage() {
  const containerRef = useRef(null);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });

  // Creation State
  const [isCreating, setIsCreating] = useState(false);
  const [newSkill, setNewSkill] = useState({ name: "", icon: "" });

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const res = await getSkills();
      setSkills(res.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  useEffect(() => {
    if (!loading && skills.length > 0) {
      const ctx = gsap.context(() => {
        gsap.set(".skill-card", { opacity: 0, y: 30 });
        gsap.to(".skill-card", {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: "power3.out",
          clearProps: "all",
        });
      }, containerRef);
      return () => ctx.revert();
    }
  }, [loading, skills]);

  const handleCreateSkill = async (e) => {
    e.preventDefault();
    if (!newSkill.name || !newSkill.icon) return;

    try {
      setIsCreating(true);
      const res = await createSkill(newSkill);
      setSkills([...skills, res.data]);
      setNewSkill({ name: "", icon: "" });
      // Animate the new skill in
      setTimeout(() => {
        gsap.fromTo(
          `.skill-card[data-id="${res.data._id}"]`,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
        );
      }, 100);
    } catch (err) {
      alert("Failed to create skill: " + err.message);
    } finally {
      setIsCreating(false);
    }
  };

  const confirmDelete = (id) => {
    setDeleteModal({ isOpen: true, id });
  };

  const handleDelete = async () => {
    if (!deleteModal.id) return;
    try {
      await deleteSkill(deleteModal.id);
      setSkills(skills.filter((s) => s._id !== deleteModal.id));
      setDeleteModal({ isOpen: false, id: null });
    } catch (err) {
      alert("Failed to delete skill: " + err.message);
    }
  };

  const filteredSkills = skills.filter((skill) =>
    skill.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div ref={containerRef} className="space-y-8 min-h-screen pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 animate-in">
        <div>
          <p className="text-xs font-mono text-primary mb-2 tracking-widest uppercase">
            Admin Portal / Configuration
          </p>
          <h1 className="text-4xl md:text-5xl font-black font-syne uppercase text-white leading-none">
            Tech Stack
          </h1>
        </div>

        <div className="relative group w-full md:w-auto">
          <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
          <div className="relative bg-white/5 border border-white/10 rounded-full flex items-center px-4 py-3 w-full md:w-64 backdrop-blur-md focus-within:border-primary/50 transition-colors">
            <Search size={16} className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Find a skill..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none outline-none text-sm text-white placeholder-gray-500 font-mono w-full"
            />
          </div>
        </div>
      </div>

      {/* Creation Form */}
      <div className="animate-in bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

        <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <Wrench size={32} className="text-primary" />
          </div>

          <form
            onSubmit={handleCreateSkill}
            className="flex-1 w-full flex flex-col md:flex-row gap-4"
          >
            <div className="flex-1 space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-gray-500 ml-1">
                Skill Name
              </label>
              <input
                type="text"
                placeholder="e.g. React.js"
                value={newSkill.name}
                onChange={(e) =>
                  setNewSkill({ ...newSkill, name: e.target.value })
                }
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-all placeholder-gray-700 font-syne font-bold"
              />
            </div>
            <div className="flex-1 space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-gray-500 ml-1">
                Icon URL
              </label>
              <input
                type="text"
                placeholder="https://..."
                value={newSkill.icon}
                onChange={(e) =>
                  setNewSkill({ ...newSkill, icon: e.target.value })
                }
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 outline-none transition-all placeholder-gray-700 font-mono text-sm"
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                disabled={isCreating || !newSkill.name || !newSkill.icon}
                className="h-[50px] px-8 bg-white text-black font-bold font-syne uppercase tracking-wider rounded-xl hover:bg-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
              >
                {isCreating ? "Adding..." : "Add Skill"}
                <Plus size={18} />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Skills Grid */}
      {loading ? (
        <div className="text-center py-20 text-gray-500 font-mono animate-pulse">
          Loading stack...
        </div>
      ) : error ? (
        <div className="text-red-400 font-mono p-8 border border-red-500/20 rounded-3xl bg-red-500/5">
          Error: {error}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredSkills.map((skill) => (
            <div
              key={skill._id || skill.id}
              data-id={skill._id || skill.id}
              className="skill-card group bg-black/40 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:bg-white/5 hover:border-primary/30 transition-all relative overflow-hidden"
            >
              <div className="w-12 h-12 relative grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110">
                {/* Fallback to text if image fails or use generic icon */}
                {skill.icon && skill.icon.startsWith("http") ? (
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-white/10 rounded-full text-xs font-mono">
                    {skill.name[0]}
                  </div>
                )}
              </div>

              <span className="text-sm font-bold font-syne text-gray-400 group-hover:text-white transition-colors text-center">
                {skill.name}
              </span>

              <button
                onClick={() => confirmDelete(skill._id || skill.id)}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-red-500/10 text-red-500 opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition-all transform scale-75 group-hover:scale-100"
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        onConfirm={handleDelete}
        title="Remove Skill?"
        message="Are you sure you want to remove this skill from your stack?"
      />
    </div>
  );
}
