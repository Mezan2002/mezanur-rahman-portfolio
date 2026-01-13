"use client";

import {
  ChevronRight,
  Disc,
  FileText,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarLinks = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Blogs", href: "/admin/blogs", icon: FileText },
  { name: "Categories", href: "/admin/categories", icon: Disc },
  { name: "Content", href: "/admin/content", icon: LayoutDashboard },
  { name: "Testimonials", href: "/admin/testimonials", icon: FileText },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-black/40 backdrop-blur-xl border-r border-white/5 h-screen fixed left-0 top-0 flex flex-col z-50 transition-all duration-300">
      {/* Brand */}
      <div className="h-24 flex items-center px-8 border-b border-white/5 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
              className={`group flex items-center justify-between px-4 py-3 transition-all duration-300 relative overflow-hidden ${
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

              {/* Active Indicator (Glowing Dot or Arrow) */}
              {isActive && (
                <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
              )}

              {/* Hover Line */}
              {!isActive && (
                <ChevronRight
                  size={14}
                  className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                />
              )}

              {/* Background Glow for Active */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-50"></div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer / User */}
      <div className="p-4 border-t border-white/5 bg-black/20">
        <div className="flex items-center gap-3 px-4 py-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-700 to-gray-900 border border-white/10 flex items-center justify-center text-xs font-bold text-white">
            M
          </div>
          <div>
            <p className="text-xs text-white font-bold">Mezanur R.</p>
            <p className="text-[9px] text-gray-500 uppercase tracking-wider">
              Super Admin
            </p>
          </div>
        </div>

        <button className="flex items-center gap-3 px-4 py-2 w-full text-left text-red-400 hover:bg-red-500/10 rounded-lg transition-all group">
          <LogOut
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="uppercase tracking-widest text-[10px] font-bold">
            Disconnect
          </span>
        </button>
      </div>
    </aside>
  );
}
