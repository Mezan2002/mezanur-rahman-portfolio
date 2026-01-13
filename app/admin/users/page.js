"use client";

import gsap from "gsap";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Mail,
  MoreVertical,
  Search,
  Shield,
  UserPlus,
  XCircle,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const mockUsers = [
  {
    id: 1,
    name: "Mezanur Rahman",
    email: "mezan@example.com",
    role: "Super Admin",
    status: "Active",
    lastLogin: "Just now",
    avatar: "M",
  },
  {
    id: 2,
    name: "Alex Johnson",
    email: "alex@example.com",
    role: "Editor",
    status: "Active",
    lastLogin: "2 hours ago",
    avatar: "A",
  },
  {
    id: 3,
    name: "Sarah Chen",
    email: "sarah@example.com",
    role: "Admin",
    status: "Suspended",
    lastLogin: "3 days ago",
    avatar: "S",
  },
  {
    id: 4,
    name: "Michael Ross",
    email: "michael@example.com",
    role: "Editor",
    status: "Active",
    lastLogin: "5 hours ago",
    avatar: "M",
  },
];

export default function UsersPage() {
  const containerRef = useRef(null);
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div ref={containerRef} className="space-y-8 min-h-screen pb-20">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="animate-in">
          <p className="text-xs font-mono text-primary mb-2 tracking-widest uppercase flex items-center gap-2">
            <span className="w-1 h-1 bg-primary rounded-full"></span>
            Admin Portal / Access Control
          </p>
          <h1 className="text-4xl md:text-5xl font-black font-syne uppercase text-white leading-none mb-4">
            Team Members
          </h1>
          <p className="text-gray-500 font-mono text-sm">
            Manage user roles and system permissions
          </p>
        </div>

        <button className="animate-in group flex items-center gap-3 px-8 py-3 bg-primary text-black font-bold font-syne uppercase tracking-wider rounded-full hover:bg-white hover:scale-105 transition-all shadow-[0_0_20px_rgba(180,255,0,0.3)]">
          <UserPlus size={18} />
          <span>Add New Member</span>
        </button>
      </div>

      {/* Search & Stats Bar */}
      <div className="animate-in flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative group">
          <Search
            className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/5 rounded-full py-4 pl-14 pr-6 text-white placeholder-gray-600 focus:border-primary/30 focus:bg-white/[0.05] outline-none transition-all"
          />
        </div>

        <div className="flex items-center gap-2 px-6 bg-white/[0.03] border border-white/5 rounded-full text-xs font-mono uppercase tracking-widest text-gray-400">
          <div className="flex items-center gap-1.5 px-3 py-2 border-r border-white/5">
            <span className="text-white font-bold">{users.length}</span> Total
          </div>
          <div className="flex items-center gap-1.5 px-3 py-2">
            <span className="text-green-400 font-bold">
              {users.filter((u) => u.status === "Active").length}
            </span>{" "}
            Active
          </div>
        </div>
      </div>

      {/* Users Table / Grid */}
      <div className="animate-in overflow-hidden bg-gradient-to-br from-[#0a0a0a] to-black border border-white/5 rounded-[2rem] relative">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 blur-[100px] pointer-events-none"></div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-8 py-6 text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500">
                  Member
                </th>
                <th className="px-8 py-6 text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500">
                  Role
                </th>
                <th className="px-8 py-6 text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500">
                  Status
                </th>
                <th className="px-8 py-6 text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500">
                  Last Login
                </th>
                <th className="px-8 py-6 text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="group hover:bg-white/[0.02] transition-colors relative"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-white/10 to-white/5 border border-white/10 flex items-center justify-center text-lg font-bold text-white group-hover:scale-110 transition-transform">
                        {user.avatar}
                      </div>
                      <div>
                        <p className="font-bold text-white group-hover:text-primary transition-colors">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500 flex items-center gap-1.5 mt-1">
                          <Mail size={12} />
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono uppercase tracking-widest text-gray-300">
                      <Shield size={12} className="text-primary" />
                      {user.role}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    {user.status === "Active" ? (
                      <span className="inline-flex items-center gap-1.5 text-green-400 text-[10px] font-mono uppercase tracking-widest">
                        <CheckCircle2 size={12} />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-red-400 text-[10px] font-mono uppercase tracking-widest">
                        <XCircle size={12} />
                        Suspended
                      </span>
                    )}
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-xs text-gray-500 font-mono italic">
                      <Clock size={12} />
                      {user.lastLogin}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 text-gray-600 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                      <MoreVertical size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="py-20 text-center">
            <AlertCircle size={40} className="mx-auto text-gray-800 mb-4" />
            <p className="text-gray-500 font-mono text-sm uppercase tracking-widest">
              No members found matching your search
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
