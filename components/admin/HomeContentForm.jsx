"use client";

import ImageUploader from "@/components/admin/ImageUploader";
import gsap from "gsap";
import { ArrowLeft, Loader2, Save, X } from "lucide-react";
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

export default function HomeContentForm({ initialData = {}, onSubmit }) {
  const containerRef = useRef(null);

  // Form States
  const [formData, setFormData] = useState({
    // Hero
    hero_line1: initialData.hero_line1 || "Creative",
    hero_line2: initialData.hero_line2 || "Developer",
    hero_line3: initialData.hero_line3 || "& Designer",
    hero_icon: initialData.hero_icon || "",

    // About
    about_title_line1: initialData.about_title_line1 || "About",
    about_title_line2: initialData.about_title_line2 || "Me.",
    about_availability: initialData.about_availability || "Currently Available",
    about_intro_text:
      initialData.about_intro_text ||
      "I am a Creative Developer dedicated to building stable, high-performance digital products...",
    about_location_node: initialData.about_location_node || "Dhaka, Bangladesh",
    about_location_desc:
      initialData.about_location_desc ||
      "Operating at the intersection of technology and design...",

    // About Pillars
    about_pillar1_title: initialData.about_pillar1_title || "Engineering",
    about_pillar1_label: initialData.about_pillar1_label || "Architect",
    about_pillar1_icon: initialData.about_pillar1_icon || "Code2",
    about_pillar1_desc:
      initialData.about_pillar1_desc ||
      "Building robust, type-safe full-stack applications with Next.js and Cloud infrastructure.",

    about_pillar2_title: initialData.about_pillar2_title || "Interaction",
    about_pillar2_label: initialData.about_pillar2_label || "Cinematic",
    about_pillar2_icon: initialData.about_pillar2_icon || "Layers",
    about_pillar2_desc:
      initialData.about_pillar2_desc ||
      "Crafting fluid user experiences with GSAP and Framer Motion.",

    about_pillar3_title: initialData.about_pillar3_title || "Performance",
    about_pillar3_label: initialData.about_pillar3_label || "Optimized",
    about_pillar3_icon: initialData.about_pillar3_icon || "Compass",
    about_pillar3_desc:
      initialData.about_pillar3_desc ||
      "Optimization is a philosophy. I target 100/100 Lighthouse scores.",

    about_tech_stack: initialData.about_tech_stack || "NEXT.JS // TS // GSAP",
    about_version: initialData.about_version || "FINAL_V1.0",

    // Services
    services_tag: initialData.services_tag || "( Core Offerings )",
    services_title_line1: initialData.services_title_line1 || "Full Spectrum",
    services_title_line2: initialData.services_title_line2 || "Services",
    services_desc:
      initialData.services_desc ||
      "Merging technical excellence with artistic vision to deliver high-performance digital worlds.",

    // Projects
    projects_tag: initialData.projects_tag || "Select Works // 2023 - 2026",
    projects_title_line1: initialData.projects_title_line1 || "Studio",
    projects_title_line2: initialData.projects_title_line2 || "Archive",
    projects_desc:
      initialData.projects_desc ||
      "Precision-engineered digital products that merge architectural clarity with high-fidelity interaction.",

    // Pricing
    pricing_tag: initialData.pricing_tag || "( Pricing Plans )",
    pricing_title_line1: initialData.pricing_title_line1 || "Transparent",
    pricing_title_line2: initialData.pricing_title_line2 || "Investment",

    // Testimonials
    testimonials_tag:
      initialData.testimonials_tag || "( Client Success Stories )",
    testimonials_title_line1: initialData.testimonials_title_line1 || "Global",
    testimonials_title_line2:
      initialData.testimonials_title_line2 || "Testimonials",

    // CTA
    cta_tag: initialData.cta_tag || "Final_Sequence",
    cta_title_line1: initialData.cta_title_line1 || "Let'S",
    cta_title_line2: initialData.cta_title_line2 || "Connect.",
    cta_linkedin: initialData.cta_linkedin || "#",
    cta_github: initialData.cta_github || "#",
    cta_email: initialData.cta_email || "hello@mezan.dev",
    cta_availability: initialData.cta_availability || "Open for Project",
    cta_location_status:
      initialData.cta_location_status || "Currently based in Dhaka [UTC+6].",
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
          delay: 0.2, // Small delay to allow parent animation to lead
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      setError(err.message || "Failed to save home content");
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen max-w-full px-8 md:px-12">
      {/* Header Actions (BlogForm Style Sticky) */}
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

      {/* Editor Layout - Strict Vertical Stacking */}
      <div className="space-y-24 max-w-4xl mx-auto">
        {/* HERO SECTION */}
        <div className="animate-in">
          <SectionTitle tag="Sequence 01" title="Hero / Narrative" />

          <div className="space-y-3 mb-10">
            <input
              type="text"
              name="hero_line1"
              placeholder="Title Line 1"
              value={formData.hero_line1}
              onChange={handleChange}
              className="w-full bg-transparent text-3xl sm:text-5xl font-black font-syne text-white placeholder-gray-900 outline-none leading-tight selection:bg-primary/30 uppercase tracking-tighter border-b border-white/5 pb-2"
            />
            <input
              type="text"
              name="hero_line2"
              placeholder="Title Line 2"
              value={formData.hero_line2}
              onChange={handleChange}
              className="w-full bg-transparent text-3xl sm:text-5xl font-black font-syne text-primary placeholder-primary/10 outline-none leading-tight selection:bg-primary/30 uppercase tracking-tighter border-b border-white/5 pb-2"
            />
            <input
              type="text"
              name="hero_line3"
              placeholder="Title Line 3"
              value={formData.hero_line3}
              onChange={handleChange}
              className="w-full bg-transparent text-3xl sm:text-5xl font-black font-syne text-white/20 placeholder-white/10 outline-none leading-tight selection:bg-primary/30 uppercase tracking-tighter border-b border-white/5 pb-2"
            />
          </div>

          <div className="w-full group">
            <label className="text-[10px] font-mono uppercase tracking-[0.3em] text-gray-600 mb-4 block group-hover:text-primary transition-colors font-bold">
              Hero Cinema Banner
            </label>
            <div className="overflow-hidden rounded-xl border border-white/5 p-4 group-hover:border-primary/20 transition-colors">
              <ImageUploader
                value={formData.hero_icon}
                onChange={(val) =>
                  setFormData((prev) => ({ ...prev, hero_icon: val }))
                }
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* ABOUT SECTION */}
        <div className="animate-in">
          <SectionTitle tag="Sequence 02" title="About / Core Identity" />

          <div className="space-y-12">
            {/* Title Staking */}
            <div className="space-y-4">
              <InputField
                label="About Title Line 1"
                name="about_title_line1"
                placeholder="About"
                value={formData.about_title_line1}
                onChange={handleChange}
              />
              <div className="relative group mb-8 w-full min-w-0">
                <label className="text-[10px] font-mono uppercase tracking-widest text-gray-600 mb-2 block font-bold transition-colors group-focus-within:text-primary">
                  About Title Line 2 (Highlighted)
                </label>
                <input
                  type="text"
                  name="about_title_line2"
                  value={formData.about_title_line2}
                  onChange={handleChange}
                  placeholder="Me."
                  className="bg-primary inline text-black text-xl sm:text-2xl font-black font-syne outline-none px-4 py-3 rounded-lg"
                />
              </div>
            </div>

            <InputField
              label="Intro Narrative"
              name="about_intro_text"
              type="textarea"
              placeholder="I am a Creative Developer..."
              value={formData.about_intro_text}
              onChange={handleChange}
            />

            <InputField
              label="Availability Status"
              name="about_availability"
              placeholder="Currently Available"
              value={formData.about_availability}
              onChange={handleChange}
            />

            <InputField
              label="Location Node"
              name="about_location_node"
              placeholder="Dhaka, Bangladesh"
              value={formData.about_location_node}
              onChange={handleChange}
            />

            <InputField
              label="Location Philosophy"
              name="about_location_desc"
              type="textarea"
              placeholder="Operating at the intersection..."
              value={formData.about_location_desc}
              onChange={handleChange}
            />

            {/* Pillars - Stacked */}
            <div className="space-y-16 pt-10 border-t border-white/5">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="group relative border-l-2 border-white/5 hover:border-primary/50 pl-6 transition-colors"
                >
                  <p className="text-[10px] font-mono text-gray-600 uppercase mb-4 font-bold tracking-widest group-hover:text-primary transition-colors">
                    Pillar 0{i} - {formData[`about_pillar${i}_label`]}
                  </p>
                  <InputField
                    label="Icon Name (Lucide)"
                    name={`about_pillar${i}_icon`}
                    placeholder="Code2"
                    value={formData[`about_pillar${i}_icon`]}
                    onChange={handleChange}
                  />
                  <InputField
                    label="Label"
                    name={`about_pillar${i}_label`}
                    placeholder="Architect"
                    value={formData[`about_pillar${i}_label`]}
                    onChange={handleChange}
                  />
                  <InputField
                    label="Title"
                    name={`about_pillar${i}_title`}
                    placeholder="Engineering"
                    value={formData[`about_pillar${i}_title`]}
                    onChange={handleChange}
                  />
                  <InputField
                    label="Core Description"
                    name={`about_pillar${i}_desc`}
                    type="textarea"
                    placeholder="Building robust..."
                    value={formData[`about_pillar${i}_desc`]}
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>

            <div className="space-y-8 pt-10 border-t border-white/5">
              <InputField
                label="Technical Stack Display"
                name="about_tech_stack"
                placeholder="NEXT.JS // TS // GSAP"
                value={formData.about_tech_stack}
                onChange={handleChange}
              />
              <InputField
                label="System Version"
                name="about_version"
                placeholder="FINAL_V1.0"
                value={formData.about_version}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* SERVICES SECTION */}
        <div className="animate-in">
          <SectionTitle tag="Sequence 03" title="Services / Capabilities" />
          <div className="space-y-10">
            <InputField
              label="Service Tagline"
              name="services_tag"
              placeholder="( Core Offerings )"
              value={formData.services_tag}
              onChange={handleChange}
            />
            <InputField
              label="Service Title Part 1"
              name="services_title_line1"
              placeholder="Full Spectrum"
              value={formData.services_title_line1}
              onChange={handleChange}
            />
            <InputField
              label="Service Title Part 2"
              name="services_title_line2"
              placeholder="Services"
              value={formData.services_title_line2}
              onChange={handleChange}
            />
            <InputField
              label="Capability Description"
              name="services_desc"
              type="textarea"
              placeholder="Merging technical excellence..."
              value={formData.services_desc}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* PROJECTS SECTION */}
        <div className="animate-in">
          <SectionTitle tag="Sequence 04" title="Projects / The Archive" />
          <div className="space-y-10">
            <InputField
              label="Archive Tagline"
              name="projects_tag"
              placeholder="Select Works // 2023 - 2026"
              value={formData.projects_tag}
              onChange={handleChange}
            />
            <InputField
              label="Header 01"
              name="projects_title_line1"
              placeholder="Studio"
              value={formData.projects_title_line1}
              onChange={handleChange}
            />
            <InputField
              label="Header 02"
              name="projects_title_line2"
              placeholder="Archive"
              value={formData.projects_title_line2}
              onChange={handleChange}
            />
            <InputField
              label="Portfolio Philosophy"
              name="projects_desc"
              type="textarea"
              placeholder="Precision-engineered digital products..."
              value={formData.projects_desc}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* PRICING SECTION */}
        <div className="animate-in">
          <SectionTitle tag="Sequence 05" title="Pricing / Investment" />
          <div className="space-y-10">
            <InputField
              label="Pricing Tag"
              name="pricing_tag"
              placeholder="( Pricing Plans )"
              value={formData.pricing_tag}
              onChange={handleChange}
            />
            <InputField
              label="Title Part 1"
              name="pricing_title_line1"
              placeholder="Transparent"
              value={formData.pricing_title_line1}
              onChange={handleChange}
            />
            <InputField
              label="Title Part 2"
              name="pricing_title_line2"
              placeholder="Investment"
              value={formData.pricing_title_line2}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* TESTIMONIALS SECTION */}
        <div className="animate-in">
          <SectionTitle tag="Sequence 06" title="Testimonials / Impact" />
          <div className="space-y-10">
            <InputField
              label="Feedback Tag"
              name="testimonials_tag"
              placeholder="( Client Success Stories )"
              value={formData.testimonials_tag}
              onChange={handleChange}
            />
            <InputField
              label="Title Part 1"
              name="testimonials_title_line1"
              placeholder="Global"
              value={formData.testimonials_title_line1}
              onChange={handleChange}
            />
            <InputField
              label="Title Part 2"
              name="testimonials_title_line2"
              placeholder="Testimonials"
              value={formData.testimonials_title_line2}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* CTA SECTION */}
        <div className="animate-in border-t border-white/5 pt-20">
          <SectionTitle tag="Sequence 07" title="Final Connect / Sequence" />

          <div className="space-y-12">
            <InputField
              label="Action Tag"
              name="cta_tag"
              placeholder="Final_Sequence"
              value={formData.cta_tag}
              onChange={handleChange}
            />

            <div className="space-y-4">
              <input
                type="text"
                name="cta_title_line1"
                value={formData.cta_title_line1}
                onChange={handleChange}
                placeholder="Let'S"
                className="w-full bg-transparent text-5xl sm:text-7xl font-black font-syne text-white outline-none leading-none tracking-tighter uppercase border-b border-white/5 pb-2"
              />
              <input
                type="text"
                name="cta_title_line2"
                value={formData.cta_title_line2}
                onChange={handleChange}
                placeholder="Connect."
                className="w-full bg-transparent text-5xl sm:text-7xl font-black font-syne text-white/20 outline-none leading-none tracking-tighter uppercase border-b border-white/5 pb-2"
              />
            </div>

            <div className="space-y-8">
              <InputField
                label="LinkedIn Link"
                name="cta_linkedin"
                placeholder="https://linkedin.com/in/..."
                value={formData.cta_linkedin}
                onChange={handleChange}
              />
              <InputField
                label="GitHub Link"
                name="cta_github"
                placeholder="https://github.com/..."
                value={formData.cta_github}
                onChange={handleChange}
              />
              <InputField
                label="Direct E-mail"
                name="cta_email"
                placeholder="hello@mezan.dev"
                value={formData.cta_email}
                onChange={handleChange}
              />
              <InputField
                label="Project Availability"
                name="cta_availability"
                placeholder="Open for Project"
                value={formData.cta_availability}
                onChange={handleChange}
              />
              <InputField
                label="Footer Location Status"
                name="cta_location_status"
                placeholder="Currently based in Dhaka..."
                value={formData.cta_location_status}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
