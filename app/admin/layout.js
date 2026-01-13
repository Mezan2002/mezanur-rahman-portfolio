"use client";

import AdminSidebar from "@/components/admin/Sidebar";
import "../globals.css"; // Ensure globals are applied

import { usePathname } from "next/navigation";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

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
