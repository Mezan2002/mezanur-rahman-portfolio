// app/page.js
"use client";

import About from "@/components/About";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <main className="min-h-screen bg-dark-background selection:bg-primary selection:text-white">
      <Hero />
      <About />
      <Services />
      <Skills />
      <Projects />
      <Pricing />
      <Testimonials />
    </main>
  );
}
