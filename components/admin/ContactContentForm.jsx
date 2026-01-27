"use client";

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
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-transparent border-l border-white/10 focus:border-primary/50 pl-5 py-2 text-white placeholder-gray-800 outline-none transition-all text-base md:text-lg font-medium"
    />
  </div>
);

export default function ContactContentForm({ initialData = {}, onSubmit }) {
  const containerRef = useRef(null);

  const [formData, setFormData] = useState({
    emailjs_service_id: initialData.emailjs_service_id || "",
    emailjs_template_id: initialData.emailjs_template_id || "",
    emailjs_public_key: initialData.emailjs_public_key || "",

    contact_email: initialData.contact_email || "",
    social_github: initialData.social_github || "",
    social_linkedin: initialData.social_linkedin || "",
    social_twitter: initialData.social_twitter || "",
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
        },
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
        {/* 1. EMAILJS CREDENTIALS */}
        <div className="animate-in">
          <SectionTitle tag="Section 01" title="EmailJS Configuration" />

          <InputField
            label="Service ID"
            name="emailjs_service_id"
            placeholder="service_..."
            value={formData.emailjs_service_id}
            onChange={handleChange}
          />
          <InputField
            label="Template ID"
            name="emailjs_template_id"
            placeholder="template_..."
            value={formData.emailjs_template_id}
            onChange={handleChange}
          />
          <InputField
            label="Public Key"
            name="emailjs_public_key"
            placeholder="Search API Key..."
            value={formData.emailjs_public_key}
            onChange={handleChange}
          />
        </div>

        {/* 2. CONTACT LINKS */}
        <div className="animate-in">
          <SectionTitle tag="Section 02" title="Contact Info & Links" />

          <InputField
            label="Contact Email"
            name="contact_email"
            placeholder="hello@example.com"
            value={formData.contact_email}
            onChange={handleChange}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="GitHub Link"
              name="social_github"
              placeholder="https://github.com/..."
              value={formData.social_github}
              onChange={handleChange}
            />
            <InputField
              label="LinkedIn Link"
              name="social_linkedin"
              placeholder="https://linkedin.com/..."
              value={formData.social_linkedin}
              onChange={handleChange}
            />
            <InputField
              label="Twitter Link"
              name="social_twitter"
              placeholder="https://twitter.com/..."
              value={formData.social_twitter}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
