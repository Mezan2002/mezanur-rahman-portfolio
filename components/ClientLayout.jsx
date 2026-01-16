"use client";

import NoiseOverlay from "@/components/NoiseOverlay";
import Preloader from "@/components/Preloader";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { usePathname } from "next/navigation";
import NativeSmoothScroll from "./NativeSmoothScroll";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    // Admin Route: Clean layout, no global site components
    return <>{children}</>;
  }

  // Site Route: Full Portfolio UI
  return (
    <>
      <Preloader />
      <NoiseOverlay />
      <main>
        <NativeSmoothScroll>
          <Navbar />
          {children}
          <Footer />
        </NativeSmoothScroll>
      </main>
    </>
  );
}
