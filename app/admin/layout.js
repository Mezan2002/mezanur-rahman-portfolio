"use client";

import AdminSidebar from "@/components/admin/Sidebar";
import "../globals.css"; // Ensure globals are applied

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token && !isLoginPage) {
      router.push("/admin/login");
    } else {
      // Small timeout to avoid cascading render warning in some environments
      const timer = setTimeout(() => setIsAuthChecking(false), 0);
      return () => clearTimeout(timer);
    }
  }, [isLoginPage, router]);

  if (isAuthChecking && !isLoginPage) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
            Authenticating...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-background text-white font-montserrat flex">
      {!isLoginPage && <AdminSidebar />}
      <main
        className={`flex-1 overflow-y-auto h-screen ${
          !isLoginPage ? "ml-64 p-8 md:p-12" : "ml-0 p-0"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
