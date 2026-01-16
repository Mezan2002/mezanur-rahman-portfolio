"use client";

import { getUserById, updateUser } from "@/lib/api";
import gsap from "gsap";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Key,
  Loader2,
  Mail,
  Save,
  Shield,
  User,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function EditUserPage() {
  const router = useRouter();
  const { id } = useParams();
  const containerRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "editor",
  });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await getUserById(id);
        if (res.success) {
          setFormData({
            name: res.data.name || "",
            email: res.data.email || "",
            password: "", // Don't prefill password
            role: res.data.role || "editor",
          });
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  // Animate on mount
  useEffect(() => {
    if (!loading) {
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
  }, [loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Only include password if it's been changed
      const payload = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
      };

      if (formData.password) {
        payload.password = formData.password;
      }

      const response = await updateUser(id, payload);

      if (response.success) {
        router.push("/admin/users");
      }
    } catch (err) {
      setError(
        err.message ||
          "Failed to update user. Ensure you have Super Admin privileges."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 size={40} className="text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="space-y-8 min-h-screen pb-20">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="animate-in">
          <p className="text-xs font-mono text-primary mb-2 tracking-widest uppercase flex items-center gap-2">
            <span className="w-1 h-1 bg-primary rounded-full"></span>
            Admin Portal / User Management
          </p>
          <h1 className="text-4xl md:text-5xl font-black font-syne uppercase text-white leading-none mb-4">
            Edit Member
          </h1>
          <p className="text-gray-500 font-mono text-sm">
            Update team member information and permissions
          </p>
        </div>

        <Link
          href="/admin/users"
          className="animate-in group flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 text-white font-bold font-syne uppercase tracking-wider rounded-full hover:bg-white hover:text-black transition-all"
        >
          <ArrowLeft size={18} />
          <span>Back to Team</span>
        </Link>
      </div>

      {/* Main Bento Card */}
      <div className="animate-in bg-dark-background border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden group">
        {/* Decorative background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[30px_30px] opacity-50 pointer-events-none"></div>

        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400 text-xs font-mono uppercase tracking-widest animate-in">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Left Column: Essential Info */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 flex items-center gap-2">
                <User size={12} className="text-primary" /> Full Name
              </label>
              <input
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 px-6 text-white placeholder-gray-700 outline-none focus:border-primary/30 transition-all font-syne text-lg"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 flex items-center gap-2">
                <Mail size={12} className="text-primary" /> Email Address
              </label>
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 px-6 text-white placeholder-gray-700 outline-none focus:border-primary/30 transition-all font-syne text-lg"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 flex items-center gap-2">
                <Key size={12} className="text-primary" /> New Password
                (Optional)
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Leave blank to keep current"
                  className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 px-6 text-white placeholder-gray-700 outline-none focus:border-primary/30 transition-all font-syne text-lg pr-14"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="text-xs text-gray-600 font-mono">
                Only fill this field if you want to change the password
              </p>
            </div>
          </div>

          {/* Right Column: Roles & Controls */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 flex items-center gap-2">
                <Shield size={12} className="text-primary" /> System Role
              </label>
              <div className="relative">
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 px-6 text-white outline-none focus:border-primary/30 transition-all font-syne text-lg appearance-none cursor-pointer"
                >
                  <option value="super_admin" className="bg-black">
                    Super Admin
                  </option>
                  <option value="admin" className="bg-black">
                    Admin
                  </option>
                  <option value="editor" className="bg-black">
                    Editor
                  </option>
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                    <path
                      d="M1 1L6 6L11 1"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-col gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full group flex items-center justify-center gap-3 px-8 py-5 bg-primary text-black font-bold font-syne uppercase tracking-wider rounded-2xl hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_10px_30px_rgba(180,255,0,0.15)]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={24} className="animate-spin" />
                    <span>Updating Member...</span>
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    <span>Save Changes</span>
                  </>
                )}
              </button>

              <p className="text-center text-[10px] font-mono text-gray-600 uppercase tracking-widest">
                Changes will be applied instantly
              </p>
            </div>
          </div>
        </form>
      </div>

      {/* Decorative Footnote */}
      <div className="animate-in flex items-center justify-center gap-4 text-gray-800">
        <div className="h-px w-20 bg-white/5"></div>
        <span className="text-[8px] font-mono uppercase tracking-[0.5em]">
          System V4.2.0 Secured
        </span>
        <div className="h-px w-20 bg-white/5"></div>
      </div>
    </div>
  );
}
