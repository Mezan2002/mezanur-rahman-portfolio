"use client";

import gsap from "gsap";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// Mock data for different pages
const pageContent = {
  home: {
    title: "Home Page Content",
    fields: [
      {
        id: "hero_line1",
        label: "Hero Line 1",
        type: "text",
        value: "Creative",
      },
      {
        id: "hero_line2",
        label: "Hero Line 2",
        type: "text",
        value: "Developer",
      },
      {
        id: "hero_line3",
        label: "Hero Line 3",
        type: "text",
        value: "& Designer",
      },
      {
        id: "tagline",
        label: "Tagline",
        type: "textarea",
        value:
          "Crafting digital experiences at the intersection of art and engineering.",
      },
      {
        id: "cta_text",
        label: "CTA Button Text",
        type: "text",
        value: "View My Work",
      },
    ],
  },
  about: {
    title: "About Page Content",
    fields: [
      {
        id: "intro",
        label: "Introduction Paragraph",
        type: "textarea",
        value:
          "Crafting digital experiences that exist at the intersection of Art and Engineering. I build products that are not just functional, but memorable.",
      },
      { id: "years_active", label: "Years Active", type: "text", value: "04+" },
      {
        id: "projects_completed",
        label: "Projects Completed",
        type: "text",
        value: "25+",
      },
      {
        id: "happy_clients",
        label: "Happy Clients",
        type: "text",
        value: "10+",
      },
      {
        id: "bio",
        label: "Extended Bio",
        type: "textarea",
        value: "With a passion for creating seamless user experiences...",
      },
    ],
  },
  contact: {
    title: "Contact Page Content",
    fields: [
      {
        id: "heading",
        label: "Page Heading",
        type: "text",
        value: "Let's Work Together",
      },
      {
        id: "subheading",
        label: "Subheading",
        type: "textarea",
        value:
          "I'm always open to discussing new projects, creative ideas, or opportunities.",
      },
      {
        id: "email",
        label: "Email Address",
        type: "text",
        value: "hello@yourdomain.com",
      },
      {
        id: "phone",
        label: "Phone Number",
        type: "text",
        value: "+1 (555) 123-4567",
      },
      {
        id: "location",
        label: "Location",
        type: "text",
        value: "San Francisco, CA",
      },
    ],
  },
  privacy: {
    title: "Privacy Policy Content",
    fields: [
      {
        id: "introduction",
        label: "Introduction",
        type: "textarea",
        value:
          "This Privacy Policy describes how we collect, use, and protect your information.",
      },
      {
        id: "data_collection",
        label: "Data Collection Policy",
        type: "textarea",
        value: "We collect information that you provide directly to us...",
      },
      {
        id: "data_usage",
        label: "Data Usage Policy",
        type: "textarea",
        value:
          "We use the information we collect to provide and improve our services...",
      },
      {
        id: "last_updated",
        label: "Last Updated Date",
        type: "text",
        value: "January 2026",
      },
    ],
  },
  terms: {
    title: "Terms & Conditions Content",
    fields: [
      {
        id: "introduction",
        label: "Introduction",
        type: "textarea",
        value:
          "By accessing this website, you agree to be bound by these terms.",
      },
      {
        id: "usage_terms",
        label: "Usage Terms",
        type: "textarea",
        value: "You may use our website for lawful purposes only...",
      },
      {
        id: "limitations",
        label: "Limitations of Liability",
        type: "textarea",
        value:
          "We shall not be held liable for any indirect or consequential damages...",
      },
      {
        id: "last_updated",
        label: "Last Updated Date",
        type: "text",
        value: "January 2026",
      },
    ],
  },
};

export default function ContentEditorPage({ params }) {
  const containerRef = useRef(null);
  const pathname = usePathname();
  const [isSaving, setIsSaving] = useState(false);

  // Extract pageId from pathname to avoid params promise issues in Client Components
  const pageId = pathname.split("/").pop() || "";
  const content = pageContent[pageId];

  // Use a ref to track if we've initialized form data for the current pageId
  const lastInitializedId = useRef(null);

  // Initialize form data from content
  const getInitialData = () => {
    const data = {};
    if (content) {
      content.fields.forEach((field) => {
        data[field.id] = field.value;
      });
    }
    return data;
  };

  const [formData, setFormData] = useState(getInitialData);

  // Update form data when pageId or content changes
  useEffect(() => {
    if (content && lastInitializedId.current !== pageId) {
      const newData = {};
      content.fields.forEach((field) => {
        newData[field.id] = field.value;
      });
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData(newData);
      lastInitializedId.current = pageId;
    }
  }, [pageId, content]);

  // GSAP Animation
  useEffect(() => {
    if (!content) return;

    const ctx = gsap.context(() => {
      gsap.set(".animate-in", { opacity: 0, y: 20 });
      gsap.to(".animate-in", {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        clearProps: "all",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [content]);

  const handleChange = (fieldId, value) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleSave = () => {
    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
      alert("Content saved successfully!");
    }, 1500);
  };

  // Show error state if page not found
  if (!content) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-black font-syne text-white mb-4">
            Page Not Found
          </h1>
          <p className="text-gray-500 mb-2">
            The content page &quot;{pageId}&quot; does not exist.
          </p>
          <p className="text-xs text-gray-600 mb-8 font-mono">
            Available pages: home, about, contact, privacy, terms
          </p>
          <Link
            href="/admin/content"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-black font-bold uppercase tracking-wider rounded-full hover:bg-white transition-all"
          >
            <ArrowLeft size={18} />
            Back to Content
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="max-w-4xl mx-auto pb-20 min-h-screen">
      {/* Header */}
      <div className="animate-in flex items-center justify-between mb-12 sticky top-8 z-50">
        <Link
          href="/admin/content"
          className="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors bg-black/50 px-4 py-2 rounded-full backdrop-blur-md border border-white/5 hover:border-white/20"
        >
          <div className="p-1 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
            <ArrowLeft size={16} />
          </div>
          <span className="uppercase tracking-widest text-xs font-bold">
            Back to Content
          </span>
        </Link>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-8 py-3 bg-primary text-black font-bold font-syne uppercase tracking-wider rounded-full hover:bg-white hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-[0_0_20px_rgba(180,255,0,0.3)] hover:shadow-[0_0_30px_rgba(180,255,0,0.5)]"
        >
          {isSaving ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save size={18} />
              <span>Save Changes</span>
            </>
          )}
        </button>
      </div>

      {/* Page Title */}
      <div className="animate-in mb-12">
        <p className="text-xs font-mono text-primary mb-2 tracking-widest uppercase flex items-center gap-2">
          <span className="w-1 h-1 bg-primary rounded-full"></span>
          Content Editor / {pageId}
        </p>
        <h1 className="text-4xl md:text-6xl font-black font-syne uppercase text-white leading-none">
          {content.title}
        </h1>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {content.fields.map((field, index) => (
          <div
            key={field.id}
            className="animate-in bg-linear-to-br from-[#0a0a0a] to-black border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <label className="block text-xs font-mono uppercase tracking-widest text-gray-400 mb-4 items-center gap-2">
              <span className="w-1 h-1 bg-primary/50 rounded-full"></span>
              {field.label}
            </label>

            {field.type === "textarea" ? (
              <textarea
                value={formData[field.id] || ""}
                onChange={(e) => handleChange(field.id, e.target.value)}
                rows={4}
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-gray-600 focus:border-primary/50 focus:bg-black/60 outline-none transition-all resize-none leading-relaxed"
                placeholder={`Enter ${field.label.toLowerCase()}...`}
              />
            ) : (
              <input
                type="text"
                value={formData[field.id] || ""}
                onChange={(e) => handleChange(field.id, e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-gray-600 focus:border-primary/50 focus:bg-black/60 outline-none transition-all"
                placeholder={`Enter ${field.label.toLowerCase()}...`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Preview Notice */}
      <div className="animate-in mt-12 bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6">
        <p className="text-sm text-blue-400 font-mono">
          <span className="font-bold">Preview:</span> Changes will be reflected
          on the live site after saving. Make sure to review before publishing.
        </p>
      </div>
    </div>
  );
}
