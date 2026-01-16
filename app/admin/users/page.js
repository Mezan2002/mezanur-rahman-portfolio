"use client";

import ConfirmationModal from "@/components/admin/ConfirmationModal";
import { deleteUser, getUsers } from "@/lib/api";
import gsap from "gsap";
import {
  AlertCircle,
  Clock,
  Edit3,
  Loader2,
  Mail,
  Search,
  Shield,
  Trash2,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function UsersPage() {
  const containerRef = useRef(null);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Fetch users from API
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getUsers();
      if (res.success) {
        setUsers(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Animate on mount
  useEffect(() => {
    if (!loading && users.length > 0) {
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
    }
  }, [loading, users]);

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;

    try {
      await deleteUser(userToDelete._id);
      setUsers(users.filter((u) => u._id !== userToDelete._id));
      setDeleteModalOpen(false);
      setUserToDelete(null);
    } catch (error) {
      console.error("Failed to delete user:", error);
      alert("Failed to delete user. Please try again.");
    }
  };

  // Format role for display (e.g., "super_admin" → "Super Admin")
  const formatRole = (role) => {
    if (!role) return "User";
    return role
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Format date for last login
  const formatLastLogin = (date) => {
    if (!date) return "Never";
    const loginDate = new Date(date);
    const now = new Date();
    const diffMs = now - loginDate;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? "s" : ""} ago`;
    if (diffHours < 24)
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    return loginDate.toLocaleDateString();
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
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

        <Link href="/admin/users/add">
          <button className="animate-in group flex items-center gap-3 px-8 py-3 bg-primary text-black font-bold font-syne uppercase cursor-pointer tracking-wider rounded-full hover:bg-white transition-all shadow-[0_0_20px_rgba(180,255,0,0.3)] hover:shadow-[0_0_30px_rgba(180,255,0,0.5)]">
            <UserPlus size={18} />
            <span>Add New Member</span>
          </button>
        </Link>
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
              {users.filter((u) => u.role !== "suspended").length}
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

        {loading ? (
          <div className="flex items-center justify-center py-32">
            <Loader2 size={40} className="text-primary animate-spin" />
          </div>
        ) : (
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
                    key={user._id}
                    className="group hover:bg-white/[0.02] transition-colors relative"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-white/10 to-white/5 border border-white/10 flex items-center justify-center text-lg font-bold text-white group-hover:scale-110 transition-transform">
                          {user.name?.charAt(0).toUpperCase() || "U"}
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
                        {formatRole(user.role)}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-xs text-gray-500 font-mono italic">
                        <Clock size={12} />
                        {formatLastLogin(user.lastLogin)}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/users/edit/${user._id}`}>
                          <button className="p-2 text-gray-600 hover:text-primary hover:bg-white/5 rounded-lg transition-all group/edit">
                            <Edit3 size={18} />
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(user)}
                          className="p-2 text-gray-600 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all group/delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && filteredUsers.length === 0 && (
          <div className="py-20 text-center">
            <AlertCircle size={40} className="mx-auto text-gray-800 mb-4" />
            <p className="text-gray-500 font-mono text-sm uppercase tracking-widest">
              {users.length === 0
                ? "No team members yet. Add your first member!"
                : "No members found matching your search"}
            </p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setUserToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete User"
        message={`Are you sure you want to delete "${userToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete User"
        confirmButtonClass="bg-red-500 hover:bg-red-600"
      />
    </div>
  );
}
