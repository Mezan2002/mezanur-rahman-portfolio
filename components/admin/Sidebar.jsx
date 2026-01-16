"use client";

import gsap from "gsap";
import {
  Briefcase,
  ChevronRight,
  Disc,
  DollarSign,
  FileText,
  LayoutDashboard,
  LogOut,
  Settings,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const sidebarLinks = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Blogs", href: "/admin/blogs", icon: FileText },
  { name: "Projects", href: "/admin/projects", icon: Briefcase },
  { name: "Services", href: "/admin/services", icon: Wrench },
  { name: "Pricing", href: "/admin/pricing", icon: DollarSign },
  { name: "Categories", href: "/admin/categories", icon: Disc },
  { name: "Content", href: "/admin/content", icon: LayoutDashboard },
  { name: "Testimonials", href: "/admin/testimonials", icon: FileText },
  // { name: "Users", href: "/admin/users", icon: Users },
  { name: "Skills", href: "/admin/skills", icon: Wrench },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const modalRef = useRef(null);
  const triggerRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    localStorage.removeItem("isAdmin");
    router.push("/admin/login");
  };

  useEffect(() => {
    const fetchUser = async () => {
      // 1. Try localStorage first for immediate display
      const storedUser = localStorage.getItem("user");
      if (storedUser && storedUser !== "undefined") {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error("Failed to parse stored user", e);
        }
      }

      // 2. Fetch fresh data from API to ensure synchronization
      // FIXME: Backend bug: /users/me is being treated as an ID, causing Cast to ObjectId failed.
      // Re-enable this once backend route order is fixed (move /me before /:id).
      /*
      try {
        const response = await getMe();
        if (response.success) {
          const userData = response.data?.user || response.data;
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
          console.log("👤 Sidebar: user data:", userData);
        }
      } catch (err) {
        console.error("Sidebar: Profile sync failed", err);
      }
      */
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (isUserModalOpen) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, y: 10, scale: 0.95, pointerEvents: "none" },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          pointerEvents: "all",
          duration: 0.3,
          ease: "power2.out",
        }
      );
    } else {
      gsap.to(modalRef.current, {
        opacity: 0,
        y: 10,
        scale: 0.95,
        pointerEvents: "none",
        duration: 0.2,
        ease: "power2.in",
      });
    }
  }, [isUserModalOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        !triggerRef.current.contains(event.target)
      ) {
        setIsUserModalOpen(false);
      }
    };

    if (isUserModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isUserModalOpen]);

  return (
    <aside className="w-64 bg-black/40 backdrop-blur-xl border-r border-white/5 h-screen fixed left-0 top-0 flex flex-col z-50 transition-all duration-300">
      {/* Brand */}
      <div className="h-24 flex items-center px-8 border-b border-white/5 relative overflow-hidden group">
        <div className="absolute inset-0 bg-linear-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <h1 className="text-lg font-black font-syne uppercase tracking-widest text-white relative z-10">
          Mezanure<span className="text-primary">.</span>
          <span className="block text-[9px] font-mono text-gray-500 tracking-[0.3em] font-normal mt-1">
            CONTROL CENTER
          </span>
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-10 px-4 flex flex-col gap-2 overflow-y-auto custom-scrollbar">
        <p className="px-4 text-[9px] font-mono text-gray-600 uppercase tracking-widest mb-4">
          Main Menu
        </p>

        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`group flex items-center justify-between px-4 py-5 transition-all duration-300 relative overflow-hidden ${
                isActive
                  ? "bg-white/10 text-white"
                  : "text-gray-500 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-4 relative z-10">
                <link.icon
                  size={18}
                  className={`transition-colors duration-300 ${
                    isActive ? "text-primary" : "group-hover:text-white"
                  }`}
                  strokeWidth={1.5}
                />
                <span className="uppercase tracking-widest text-xs font-bold font-syne">
                  {link.name}
                </span>
              </div>

              {isActive && (
                <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
              )}

              {!isActive && (
                <ChevronRight
                  size={14}
                  className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                />
              )}

              {isActive && (
                <div className="absolute inset-0 bg-linear-to-r from-primary/10 to-transparent opacity-50"></div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer / User */}
      <div className="p-4 border-t border-white/5 relative">
        {/* User Modal */}
        <div
          ref={modalRef}
          className="absolute bottom-full left-4 right-4 mb-4 bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-50 opacity-0 scale-95 origin-bottom pointer-events-none"
        >
          <div className="p-4 border-b border-white/5 bg-white/2">
            <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">
              Authenticated As
            </p>
            <p className="text-sm font-bold text-white font-syne uppercase">
              {user?.name || "Mezanur Rahman"}
            </p>
          </div>
          <div className="p-2">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                <LogOut size={16} />
              </div>
              <span className="uppercase tracking-widest text-[10px] font-black font-syne">
                Logout
              </span>
            </button>
          </div>
        </div>

        {/* User Trigger */}
        <button
          ref={triggerRef}
          onClick={() => setIsUserModalOpen(!isUserModalOpen)}
          className={`flex items-center gap-3 px-4 py-3 w-full rounded-2xl transition-all duration-300 group ${
            isUserModalOpen ? "bg-white/10" : "hover:bg-white/5"
          }`}
        >
          <div className="w-10 h-10 rounded-full bg-linear-to-tr from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary shadow-[0_0_15px_rgba(180,255,0,0.1)] group-hover:shadow-[0_0_20px_rgba(180,255,0,0.2)] transition-all">
            M
          </div>
          <div className="text-left">
            <p className="text-xs text-white font-bold font-syne uppercase tracking-tight">
              {user?.name
                ? user.name.split(" ")[0] +
                  (user.name.split(" ")[1]
                    ? ` ${user.name.split(" ")[1][0]}.`
                    : "")
                : "Mezanur R."}
            </p>
            <p className="text-[9px] text-gray-500 uppercase tracking-wider font-mono">
              {user?.role
                ? user.role
                    .replace("_", " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())
                : "Super Admin"}
            </p>
          </div>
          <ChevronRight
            size={14}
            className={`ml-auto text-gray-600 transition-transform duration-300 ${
              isUserModalOpen ? "-rotate-90" : ""
            }`}
          />
        </button>
      </div>
    </aside>
  );
}
