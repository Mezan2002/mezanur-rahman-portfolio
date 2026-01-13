"use client";

import gsap from "gsap";
import {
  ArrowRight,
  Edit3,
  FileText,
  Home,
  Info,
  Mail,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

const contentPages = [
  {
    id: "home",
    title: "Home Page",
    description: "Hero section, taglines, and featured content",
    icon: Home,
    color: "#B4FF00",
    sections: ["Hero", "Featured Work", "CTA"],
    lastEdited: "2 days ago",
  },
  {
    id: "about",
    title: "About Page",
    description: "Bio, experience, and personal information",
    icon: Info,
    color: "#00D9FF",
    sections: ["Bio", "Stats", "Timeline"],
    lastEdited: "1 week ago",
  },
  {
    id: "contact",
    title: "Contact Page",
    description: "Contact form, social links, and location",
    icon: Mail,
    color: "#FF006E",
    sections: ["Form", "Social", "Location"],
    lastEdited: "3 days ago",
  },
  {
    id: "privacy",
    title: "Privacy Policy",
    description: "Legal content and data protection policies",
    icon: Shield,
    color: "#9D4EDD",
    sections: ["Policy", "Data Usage"],
    lastEdited: "2 months ago",
  },
  {
    id: "terms",
    title: "Terms & Conditions",
    description: "Terms of service and usage guidelines",
    icon: FileText,
    color: "#FFB800",
    sections: ["Terms", "Conditions"],
    lastEdited: "2 months ago",
  },
];

export default function ContentPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".animate-in", { opacity: 0, y: 30 });
      gsap.to(".animate-in", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "all",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="space-y-12 min-h-screen pb-20">
      {/* Header */}
      <div className="animate-in">
        <p className="text-xs font-mono text-primary mb-2 tracking-widest uppercase flex items-center gap-2">
          <span className="w-1 h-1 bg-primary rounded-full"></span>
          Admin Portal / Site Management
        </p>
        <h1 className="text-4xl md:text-6xl font-black font-syne uppercase text-white leading-none mb-3">
          Content Pages
        </h1>
        <p className="text-gray-500 font-mono text-sm">
          Manage text and sections across your portfolio
        </p>
      </div>

      {/* Content Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contentPages.map((page, index) => (
          <Link
            href={`/admin/content/${page.id}`}
            key={page.id}
            className="animate-in group relative bg-gradient-to-br from-[#0a0a0a] to-black border border-white/5 rounded-3xl p-8 hover:border-white/20 transition-all duration-300 overflow-hidden cursor-pointer"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            {/* Accent Corner */}
            <div
              className="absolute top-0 right-0 w-24 h-24 opacity-10 group-hover:opacity-20 transition-opacity blur-2xl"
              style={{ backgroundColor: page.color }}
            ></div>

            {/* Icon */}
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center border mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10"
              style={{
                backgroundColor: `${page.color}10`,
                borderColor: `${page.color}30`,
              }}
            >
              <page.icon
                size={24}
                style={{ color: page.color }}
                strokeWidth={2.5}
              />
            </div>

            {/* Content */}
            <div className="relative z-10 space-y-4">
              <div>
                <h3 className="text-xl font-bold font-syne text-white mb-2 group-hover:text-primary transition-colors">
                  {page.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {page.description}
                </p>
              </div>

              {/* Sections */}
              <div className="flex flex-wrap gap-2">
                {page.sections.map((section) => (
                  <span
                    key={section}
                    className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider bg-white/5 border border-white/10 rounded text-gray-400"
                  >
                    {section}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <span className="text-xs text-gray-600 font-mono">
                  {page.lastEdited}
                </span>
                <div className="flex items-center gap-2 text-primary group-hover:gap-3 transition-all">
                  <Edit3 size={14} />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Edit
                  </span>
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            </div>

            {/* Hover Highlight */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none"
              style={{
                background: `radial-gradient(circle at center, ${page.color}, transparent 70%)`,
              }}
            ></div>
          </Link>
        ))}

        {/* Add New Page Card */}
        <div className="animate-in group relative border-2 border-dashed border-white/10 rounded-3xl p-8 hover:border-primary/50 hover:bg-white/[0.02] transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer min-h-[280px]">
          <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/10 transition-all">
            <FileText
              size={24}
              className="text-gray-600 group-hover:text-primary transition-colors"
            />
          </div>
          <h3 className="text-lg font-bold font-syne text-white mb-2 group-hover:text-primary transition-colors">
            Add New Page
          </h3>
          <p className="text-sm text-gray-500 font-mono">
            Create additional content section
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="animate-in grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-1">
                Total Pages
              </p>
              <p className="text-3xl font-black font-syne text-white">
                {contentPages.length}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <FileText size={20} className="text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-1">
                Last Updated
              </p>
              <p className="text-xl font-bold font-syne text-white">
                2 days ago
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Edit3 size={20} className="text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-1">
                Status
              </p>
              <p className="text-xl font-bold font-syne text-green-400 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                All Live
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
