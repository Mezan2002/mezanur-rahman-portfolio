// app/page.js
"use client";

import About from "@/components/About";
import CTA from "@/components/CTA";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import Testimonials from "@/components/Testimonials";
import { getSiteSettings } from "@/lib/api";
import { useEffect, useState } from "react";

export default function Home() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await getSiteSettings();
        if (response.success) {
          setSettings(response.data);
        }
      } catch (error) {
        console.error("Error fetching site settings:", error);
      }
    };
    fetchSettings();
  }, []);

  return (
    <main className="min-h-screen bg-dark-background selection:bg-primary selection:text-white">
      <Hero data={settings?.hero} />
      <About data={settings?.about} />
      <Services data={settings?.services} />
      <Skills />
      <Projects data={settings?.projects} />
      <Pricing data={settings?.pricing} />
      <Testimonials data={settings?.testimonials} />
      <CTA data={settings?.cta} />
    </main>
  );
}
