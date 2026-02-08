"use client";

import {
  getBlogs,
  getMe,
  getPricing,
  getProjects,
  getServices,
  getSkills,
  getTestimonials,
} from "@/lib/api";
import gsap from "gsap";
import {
  ArrowRight,
  Clock,
  Cpu,
  DollarSign,
  FileText,
  Globe,
  Plus,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function AdminDashboard() {
  const containerRef = useRef(null);
  const [time, setTime] = useState("");
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    blogs: 0,
    projects: 0,
    testimonials: 0,
    services: 0,
    pricing: 0,
    skills: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // 1. Fetch User
        const storedUser = localStorage.getItem("user");
        if (storedUser && storedUser !== "undefined") {
          try {
            setUser(JSON.parse(storedUser));
          } catch (e) {
            console.error("Dashboard: Failed to parse stored user", e);
          }
        }

        try {
          const userRes = await getMe();
          if (userRes.success) {
            const userData = userRes.data?.user || userRes.data;
            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData));
          }
        } catch (err) {
          console.warn("Dashboard: Profile sync failed (Backend issue)", err);
          // Don't throw here, allow stats to load anyway
        }

        // 2. Fetch Stats
        const [
          blogsRes,
          projectsRes,
          testimonialsRes,
          servicesRes,
          pricingRes,
          skillsRes,
        ] = await Promise.all([
          getBlogs(),
          getProjects(),
          getTestimonials(),
          getServices(),
          getPricing(),
          getSkills(),
        ]);

        setStats({
          blogs: blogsRes.data?.length || blogsRes.length || 0,
          projects: projectsRes.data?.length || projectsRes.length || 0,
          testimonials:
            testimonialsRes.data?.length || testimonialsRes.length || 0,
          services: servicesRes.data?.length || servicesRes.length || 0,
          pricing: pricingRes.data?.length || pricingRes.length || 0,
          skills: skillsRes.data?.length || skillsRes.length || 0,
        });
      } catch (err) {
        console.error("Dashboard: Data fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Clock Logic
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // GSAP Entrance
  useEffect(() => {
    if (!loading) {
      const ctx = gsap.context(() => {
        gsap.set(".bento-item", { opacity: 0, y: 50 });
        gsap.to(".bento-item", {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "all",
        });

        gsap.to(".pulse-dot", {
          scale: 1.5,
          opacity: 0,
          duration: 1.5,
          repeat: -1,
          ease: "power1.out",
        });
      }, containerRef);
      return () => ctx.revert();
    }
  }, [loading]);

  return (
    <div ref={containerRef} className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
        <div className="bento-item">
          <p className="text-xs font-mono text-primary mb-2 tracking-widest uppercase">
            Admin Portal / Overview
          </p>
          <h1 className="text-4xl md:text-5xl font-black font-syne uppercase text-white leading-none">
            Welcome Back,
            <br />{" "}
            <span className="bg-white text-black px-2">
              {user?.name ? user.name.split(" ")[0] : "Mezanur"}.
            </span>
          </h1>
        </div>
        <div className="bento-item flex items-center gap-4 bg-white/5 border border-white/5 px-6 py-3 rounded-full backdrop-blur-md">
          <Clock size={16} className="text-primary" />
          <span className="font-mono text-sm text-white tracking-widest">
            {time}
          </span>
          <div className="w-px h-4 bg-white/20 mx-2"></div>
          <span className="font-mono text-xs text-green-400 uppercase tracking-widest flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
            System Online
          </span>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-auto gap-4">
        {/* STAT 1: Total Blogs (Large) - Col 1-2 */}
        <div className="bento-item col-span-1 md:col-span-2 row-span-1 bg-dark-background border border-white/5 rounded-3xl p-8 relative overflow-hidden group hover:border-white/10 transition-colors flex flex-col justify-center">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <FileText size={100} />
          </div>
          <div className="relative z-10">
            <div className="text-gray-500 text-xs font-mono uppercase tracking-widest mb-4">
              Total Publications
            </div>
            <div className="text-6xl font-black font-syne text-white mb-2">
              {loading ? "..." : stats.blogs}
            </div>
            <div className="text-xs text-gray-400 font-mono flex items-center gap-2">
              <Link
                href="/admin/blogs"
                className="hover:text-primary transition-colors flex items-center gap-1"
              >
                View all blogs <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>

        {/* ACTION: Quick Write - Col 3 */}
        <Link
          href="/admin/blogs/create"
          className="bento-item col-span-1 md:col-span-1 row-span-1 bg-primary text-black border border-primary rounded-3xl p-8 flex flex-col justify-center items-center gap-4 group hover:bg-white hover:border-white transition-all cursor-pointer shadow-[0_0_20px_rgba(var(--primary-rgb),0.2)]"
        >
          <div className="w-12 h-12 rounded-full border border-black/20 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Plus size={24} />
          </div>
          <span className="font-bold font-syne uppercase tracking-wider text-sm">
            Create Post
          </span>
        </Link>

        {/* STAT 2: Services (Tall) - Col 4 Row 1-2 */}
        <div className="bento-item col-span-1 md:col-span-1 row-span-2 bg-linear-to-b from-[#0a0a0a] to-black border border-white/5 rounded-3xl p-8 flex flex-col justify-between group hover:border-white/10 transition-colors">
          <div>
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 rounded-xl bg-white/5 text-white group-hover:bg-white group-hover:text-black transition-colors">
                <Wrench size={20} />
              </div>
            </div>
            <div className="text-4xl font-black font-syne text-white mb-2">
              {loading ? "..." : stats.services}
            </div>
            <div className="text-gray-500 text-xs font-mono uppercase tracking-widest">
              Total Services
            </div>
          </div>

          <div className="mt-8 h-16 w-full flex items-end gap-1">
            {[40, 60, 30, 80, 50, 90, 70, 40, 60].map((h, i) => (
              <div
                key={i}
                style={{ height: `${h}%` }}
                className="w-full bg-white/10 rounded-sm group-hover:bg-primary/50 transition-colors"
              ></div>
            ))}
          </div>
        </div>

        {/* SYSTEM STATUS - Col 1-2 Row 2 */}
        <div className="bento-item col-span-1 md:col-span-2 row-span-1 bg-[#080808] border border-white/5 rounded-3xl p-6 flex items-center justify-between overflow-hidden relative">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] opacity-50"></div>

          <div className="relative z-10 flex items-center gap-6">
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10 relative">
              <div className="absolute inset-0 rounded-full border border-primary/30 pulse-dot"></div>
              <Cpu size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="text-white font-bold font-syne uppercase text-sm">
                Server Health
              </h3>
              <p className="text-gray-500 text-[10px] font-mono uppercase tracking-wider">
                System Online
              </p>
            </div>
          </div>

          <div className="relative z-10 flex gap-8 pr-4 text-right">
            <div>
              <p className="text-xs text-gray-500 font-mono mb-1 uppercase">
                Projects
              </p>
              <p className="text-lg font-bold text-white">
                {loading ? "..." : stats.projects}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-mono mb-1 uppercase">
                Reviews
              </p>
              <p className="text-lg font-bold text-white">
                {loading ? "..." : stats.testimonials}
              </p>
            </div>
          </div>
        </div>

        {/* QUICK LINK - Col 3 Row 2 */}
        <Link
          href="/admin/pricing"
          className="bento-item col-span-1 md:col-span-1 row-span-1 bg-dark-background border border-white/5 rounded-3xl p-8 relative overflow-hidden group hover:border-white/10 transition-colors flex flex-col justify-center"
        >
          <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-100 transition-opacity">
            <DollarSign size={100} className="text-primary" />
          </div>
          <div className="relative z-10">
            <div className="text-gray-500 text-xs font-mono uppercase tracking-widest mb-2">
              Revenue
            </div>
            <div className="flex items-center justify-between">
              <div className="text-xl font-black font-syne text-white uppercase">
                Pricing
              </div>
              <ArrowRight
                size={20}
                className="text-primary group-hover:translate-x-2 transition-transform"
              />
            </div>
          </div>
        </Link>

        {/* SKILLS WIDGET - Col 1-2 Row 3 */}
        <div className="bento-item col-span-1 md:col-span-2 row-span-1 bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 relative overflow-hidden group hover:border-white/10 transition-colors flex flex-col justify-center">
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                <Globe size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="text-white font-bold font-syne uppercase text-sm">
                  Tech Stack
                </h3>
                <p className="text-gray-500 text-[10px] font-mono uppercase tracking-wider">
                  Configured Skills
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-black font-syne text-white">
                {loading ? "..." : stats.skills}
              </p>
              <Link
                href="/admin/skills"
                className="text-[10px] text-primary uppercase font-mono tracking-widest hover:underline"
              >
                Manage Stack
              </Link>
            </div>
          </div>
        </div>

        <Link
          href="/admin/projects"
          className="bento-item col-span-1 md:col-span-2 row-span-1 bg-dark-background border border-white/5 rounded-3xl p-6 relative group hover:border-white/10 transition-colors overflow-hidden flex flex-col justify-center"
        >
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                <Plus
                  size={20}
                  className="text-white group-hover:text-primary transition-colors"
                />
              </div>
              <div>
                <h3 className="text-white font-bold font-syne uppercase text-sm">
                  Portfolio
                </h3>
                <p className="text-gray-500 text-[10px] font-mono uppercase tracking-wider">
                  Active Projects
                </p>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-black font-syne text-white">
                {loading ? "..." : stats.projects}
              </p>
              <ArrowRight
                size={16}
                className="text-gray-600 group-hover:text-primary group-hover:translate-x-1 transition-all"
              />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
