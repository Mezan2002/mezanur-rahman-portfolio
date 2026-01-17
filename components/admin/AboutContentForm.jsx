"use client";

import ImageUploader from "@/components/admin/ImageUploader";
import gsap from "gsap";
import { ArrowLeft, Loader2, Plus, Save, Trash2, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const SectionTitle = ({ title, tag }) => (
  <div className="mb-10 border-b border-white/5 pb-5">
    <p className="text-[10px] font-mono text-primary uppercase tracking-[0.4em] mb-2 opacity-70">
      {tag}
    </p>
    <h3 className="text-xl md:text-2xl font-black font-syne text-white uppercase tracking-tight">
      {title}
    </h3>
  </div>
);

const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
}) => (
  <div className="relative group mb-8 w-full min-w-0">
    <label className="text-[10px] font-mono uppercase tracking-widest text-gray-600 mb-2 block group-focus-within:text-primary transition-colors font-bold">
      {label}
    </label>
    {type === "textarea" ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={3}
        className="w-full bg-transparent border-l border-white/10 focus:border-primary/50 pl-5 py-2 text-white placeholder-gray-800 outline-none transition-all resize-none text-base md:text-lg font-medium"
      />
    ) : (
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-transparent border-l border-white/10 focus:border-primary/50 pl-5 py-2 text-white placeholder-gray-800 outline-none transition-all text-base md:text-lg font-medium"
      />
    )}
  </div>
);

export default function AboutContentForm({ initialData = {}, onSubmit }) {
  const containerRef = useRef(null);

  // Form States
  const [formData, setFormData] = useState({
    // 1. Hero
    hero_image: initialData.hero_image || "",
    hero_firstname: initialData.hero_firstname || "Mezanur",
    hero_lastname: initialData.hero_lastname || "Rahman",
    hero_tags: initialData.hero_tags || "Dev, Design, Art",

    // 2. Intro & Stats
    intro_text: initialData.intro_text || "Crafting digital experiences...",
    stat_years: initialData.stat_years || "04+",
    stat_projects: initialData.stat_projects || "25+",
    stat_clients: initialData.stat_clients || "15+",
    stat_dedication: initialData.stat_dedication || "100%",

    // 3. Skills
    skills_title: initialData.skills_title || "Tech Stack",
    skills_desc:
      initialData.skills_desc || "A curated arsenal of modern tools...",
    skills_list:
      initialData.skills_list ||
      "React, NextJS, TypeScript, Tailwind, GSAP, NodeJS, Figma, MongoDB",

    // 4. Recognition (Dynamic Array)
    awards: initialData.awards || [],

    // 5. Experience (Dynamic Array)
    experience: initialData.experience || [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".animate-in",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
          clearProps: "all",
          delay: 0.2,
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // --- Dynamic List Handlers ---

  const handleAddItem = (field, emptyItem) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], emptyItem],
    }));
  };

  const handleRemoveItem = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleItemChange = (field, index, key, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) =>
        i === index ? { ...item, [key]: value } : item
      ),
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      if (onSubmit) {
        await onSubmit(formData);
      }
      setIsSubmitting(false);
    } catch (err) {
      setError(err.message || "Failed to save content");
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen max-w-full px-8 md:px-12">
      {/* Header Actions */}
      <div className="flex justify-between items-center mb-12 animate-in sticky top-8 z-50">
        <Link
          href="/admin/content"
          className="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors bg-black/50 px-4 py-2 rounded-full backdrop-blur-md border border-white/5 hover:border-white/20"
        >
          <div className="p-1 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
            <ArrowLeft size={16} />
          </div>
          <span className="uppercase tracking-widest text-xs font-bold">
            Back
          </span>
        </Link>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex items-center gap-2 px-8 py-3 bg-primary text-black font-bold font-syne uppercase tracking-wider rounded-full hover:bg-white hover:scale-105 transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(180,255,0,0.3)] hover:shadow-[0_0_30px_rgba(180,255,0,0.5)]"
        >
          {isSubmitting ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Save size={18} />
          )}
          <span className="text-xs">
            {isSubmitting ? "Saving..." : "Save Changes"}
          </span>
        </button>
      </div>

      {error && (
        <div className="animate-in mb-10 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-mono flex items-center justify-between">
          <div className="flex items-center gap-3">
            <X size={16} />
            <span>Error: {error}</span>
          </div>
          <button onClick={() => setError(null)} className="hover:text-white">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Editor Layout */}
      <div className="space-y-24 max-w-4xl mx-auto">
        {/* 1. HERO SECTION */}
        <div className="animate-in">
          <SectionTitle tag="Section 01" title="Hero / Cover" />

          <div className="w-full group mb-10">
            <label className="text-[10px] font-mono uppercase tracking-[0.3em] text-gray-600 mb-4 block group-hover:text-primary transition-colors font-bold">
              Cover Image
            </label>
            <div className="overflow-hidden rounded-xl border border-white/5 p-4 group-hover:border-primary/20 transition-colors">
              <ImageUploader
                value={formData.hero_image}
                onChange={(val) =>
                  setFormData((prev) => ({ ...prev, hero_image: val }))
                }
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <InputField
              label="First Name"
              name="hero_firstname"
              placeholder="Mezanur"
              value={formData.hero_firstname}
              onChange={handleChange}
            />
            <InputField
              label="Last Name"
              name="hero_lastname"
              placeholder="Rahman"
              value={formData.hero_lastname}
              onChange={handleChange}
            />
          </div>
          <InputField
            label="Tags (Comma Separated)"
            name="hero_tags"
            placeholder="Dev, Design, Art"
            value={formData.hero_tags}
            onChange={handleChange}
          />
        </div>

        {/* 2. INTRO SECTION */}
        <div className="animate-in">
          <SectionTitle tag="Section 02" title="Intro & Stats" />

          <InputField
            label="Bio / Introduction"
            name="intro_text"
            type="textarea"
            placeholder="Crafting digital experiences..."
            value={formData.intro_text}
            onChange={handleChange}
          />

          <div className="grid grid-cols-2 gap-8 pt-8">
            <div className="space-y-4 border-l border-white/5 pl-4">
              <p className="text-xs font-mono text-gray-500">
                Stat 01 (Years Exp)
              </p>
              <InputField
                label="Value"
                name="stat_years"
                placeholder="04+"
                value={formData.stat_years}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-4 border-l border-white/5 pl-4">
              <p className="text-xs font-mono text-gray-500">
                Stat 02 (Projects)
              </p>
              <InputField
                label="Value"
                name="stat_projects"
                placeholder="25+"
                value={formData.stat_projects}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-4 border-l border-white/5 pl-4">
              <p className="text-xs font-mono text-gray-500">
                Stat 03 (Clients)
              </p>
              <InputField
                label="Value"
                name="stat_clients"
                placeholder="15+"
                value={formData.stat_clients}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-4 border-l border-white/5 pl-4">
              <p className="text-xs font-mono text-gray-500">
                Stat 04 (Dedication)
              </p>
              <InputField
                label="Value"
                name="stat_dedication"
                placeholder="100%"
                value={formData.stat_dedication}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* 3. SKILLS SECTION */}
        <div className="animate-in">
          <SectionTitle tag="Section 03" title="Tech Stack" />

          <InputField
            label="Section Title"
            name="skills_title"
            placeholder="Tech Stack"
            value={formData.skills_title}
            onChange={handleChange}
          />
          <InputField
            label="Section Description"
            name="skills_desc"
            type="textarea"
            placeholder="A curated arsenal..."
            value={formData.skills_desc}
            onChange={handleChange}
          />
          <InputField
            label="Skills List (Comma Separated Names)"
            name="skills_list"
            type="textarea"
            placeholder="React, NextJS, TypeScript..."
            value={formData.skills_list}
            onChange={handleChange}
          />
        </div>

        {/* 4. RECOGNITION (Dynamic) */}
        <div className="animate-in">
          <div className="flex justify-between items-end mb-10 border-b border-white/5 pb-5">
            <div>
              <p className="text-[10px] font-mono text-primary uppercase tracking-[0.4em] mb-2 opacity-70">
                Section 04
              </p>
              <h3 className="text-xl md:text-2xl font-black font-syne text-white uppercase tracking-tight">
                Recognition
              </h3>
            </div>
            <button
              onClick={() =>
                handleAddItem("awards", {
                  title: "",
                  organization: "",
                  projectName: "",
                  year: "",
                })
              }
              className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-primary hover:text-white transition-colors"
              type="button"
            >
              <Plus size={14} />
              Add Item
            </button>
          </div>

          <div className="space-y-12">
            {formData.awards.map((item, i) => (
              <div
                key={i}
                className="relative p-6 bg-white/[0.02] border border-white/5 rounded-2xl group/item"
              >
                <div className="flex justify-between items-center mb-6">
                  <p className="text-xs font-mono text-primary">
                    Award Slot {String(i + 1).padStart(2, "0")}
                  </p>
                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveItem("awards", i)}
                    className="text-red-500 opacity-50 hover:opacity-100 hover:text-red-400 transition-all p-2"
                    type="button"
                    title="Remove Item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    label="Award Title"
                    placeholder="Site of the Day"
                    value={item.title}
                    onChange={(e) =>
                      handleItemChange("awards", i, "title", e.target.value)
                    }
                  />
                  <InputField
                    label="Organization"
                    placeholder="Awwwards"
                    value={item.organization}
                    onChange={(e) =>
                      handleItemChange(
                        "awards",
                        i,
                        "organization",
                        e.target.value
                      )
                    }
                  />
                  <InputField
                    label="Project"
                    placeholder="Portfolio v1"
                    value={item.projectName}
                    onChange={(e) =>
                      handleItemChange(
                        "awards",
                        i,
                        "projectName",
                        e.target.value
                      )
                    }
                  />
                  <InputField
                    label="Year"
                    placeholder="2023"
                    value={item.year}
                    onChange={(e) =>
                      handleItemChange("awards", i, "year", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}

            {formData.awards.length === 0 && (
              <div className="p-8 border border-dashed border-white/10 rounded-xl text-center text-gray-500 text-sm">
                No awards added. Click "Add Item" to start.
              </div>
            )}
          </div>
        </div>

        {/* 5. EXPERIENCE (Dynamic) */}
        <div className="animate-in pb-20">
          <div className="flex justify-between items-end mb-10 border-b border-white/5 pb-5">
            <div>
              <p className="text-[10px] font-mono text-primary uppercase tracking-[0.4em] mb-2 opacity-70">
                Section 05
              </p>
              <h3 className="text-xl md:text-2xl font-black font-syne text-white uppercase tracking-tight">
                Experience
              </h3>
            </div>
            <button
              onClick={() =>
                handleAddItem("experience", {
                  role: "",
                  company: "",
                  duration: "",
                })
              }
              className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-primary hover:text-white transition-colors"
              type="button"
            >
              <Plus size={14} />
              Add Item
            </button>
          </div>

          <div className="space-y-12">
            {formData.experience.map((item, i) => (
              <div
                key={i}
                className="relative p-6 bg-white/[0.02] border border-white/5 rounded-2xl"
              >
                <div className="flex justify-between items-center mb-6">
                  <p className="text-xs font-mono text-primary">
                    Role Slot {String(i + 1).padStart(2, "0")}
                  </p>
                  <button
                    onClick={() => handleRemoveItem("experience", i)}
                    className="text-red-500 opacity-50 hover:opacity-100 hover:text-red-400 transition-all p-2"
                    type="button"
                    title="Remove Item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    label="Role / Title"
                    placeholder="Senior Engineer"
                    value={item.role}
                    onChange={(e) =>
                      handleItemChange("experience", i, "role", e.target.value)
                    }
                  />
                  <InputField
                    label="Company"
                    placeholder="TechCorps"
                    value={item.company}
                    onChange={(e) =>
                      handleItemChange(
                        "experience",
                        i,
                        "company",
                        e.target.value
                      )
                    }
                  />
                  <InputField
                    label="Period / Duration"
                    placeholder="2023 - Present"
                    value={item.duration}
                    onChange={(e) =>
                      handleItemChange(
                        "experience",
                        i,
                        "duration",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            ))}

            {formData.experience.length === 0 && (
              <div className="p-8 border border-dashed border-white/10 rounded-xl text-center text-gray-500 text-sm">
                No experience roles added. Click "Add Item" to start.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
