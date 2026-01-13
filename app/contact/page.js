"use client";

import gsap from "gsap";
import { ArrowUpRight, Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function ContactPage() {
  const containerRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    budget: "",
    message: "",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Hero Text Reveal (Matching Home Page)
      tl.fromTo(
        ".hero-text",
        {
          y: 80,
          rotateX: -45,
          opacity: 0,
          filter: "blur(10px)",
        },
        {
          y: 0,
          rotateX: 0,
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.1,
          duration: 1.2,
          ease: "power4.out",
          delay: 0.2,
        }
      );

      // 2. Grid & Content Reveal
      tl.fromTo(
        ".content-reveal",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.6"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main
      ref={containerRef}
      className="bg-dark-background min-h-screen text-white pt-32 pb-20 relative overflow-hidden"
    >
      {/* Background Ambience (Matching Hero) */}
      <div className="absolute top-0 right-0 w-[60vw] h-[60vh] bg-primary/5 rounded-full blur-[120px] pointer-events-none translate-x-1/4 -translate-y-1/4"></div>
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vh] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none -translate-x-1/4 translate-y-1/4"></div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
        {/* HEADER SECTION */}
        <div className="mb-24 flex flex-col items-start leading-[0.9]">
          <div className="overflow-hidden">
            <h1 className="hero-text text-[13vw] md:text-[10vw] font-black font-syne text-white uppercase tracking-tighter mix-blend-difference">
              Let&apos;s
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1
              className="hero-text text-[13vw] md:text-[10vw] font-black font-syne text-transparent uppercase tracking-tighter hover:text-white/10 transition-colors duration-500 cursor-default"
              style={{ WebkitTextStroke: "2px rgba(255, 255, 255, 0.3)" }}
            >
              Create
            </h1>
          </div>
          <div className="overflow-hidden self-end md:-mt-4">
            <h1 className="hero-text text-[13vw] md:text-[10vw] font-black font-syne bg-white text-black px-4 uppercase tracking-tighter transform hover:scale-[1.02] transition-transform duration-500 origin-right">
              Together
            </h1>
          </div>
        </div>

        {/* MAIN GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-px bg-white/10 border border-white/10 content-reveal">
          {/* LEFT COLUMN: Contact Info */}
          <div className="md:col-span-5 bg-dark-background p-8 md:p-16 flex flex-col justify-between group transition-colors relative overflow-hidden">
            <div className="relative z-10">
              <span className="text-sm font-mono text-gray-500 uppercase tracking-widest block mb-8">
                Contact Details
              </span>

              <div className="mb-16">
                <a
                  href="mailto:hello@mezanur.com"
                  className="block text-4xl md:text-5xl font-black font-syne text-white transition-all duration-300 break-all"
                  style={{ WebkitTextStroke: "1px transparent" }}
                >
                  <span className="transition-all">hello@</span>
                  <br />
                  <span className="transition-all">mezanur.com</span>
                </a>
              </div>

              <div className="flex gap-4">
                {[
                  { icon: Github, href: "#" },
                  { icon: Linkedin, href: "#" },
                  { icon: Twitter, href: "#" },
                ].map((Social, i) => (
                  <Link
                    key={i}
                    href={Social.href}
                    className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black hover:scale-110 transition-all duration-300"
                  >
                    <Social.icon strokeWidth={1.5} />
                  </Link>
                ))}
              </div>
            </div>

            {/* Decorative Grid SVG */}
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            ></div>
          </div>

          {/* RIGHT COLUMN: Form */}
          <div className="md:col-span-7 bg-dark-background p-8 md:p-16 group transition-colors relative">
            <span className="text-sm font-mono text-gray-500 uppercase tracking-widest block mb-12">
              Project Inquiry
            </span>

            <form className="flex flex-col gap-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 group/input">
                  <label className="text-xs text-gray-500 uppercase tracking-widest mb-3 block group-focus-within/input:text-white transition-colors">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full bg-white/5 border border-white/10 px-6 py-4 text-white placeholder-gray-700 focus:outline-none focus:border-white focus:bg-white/10 transition-all duration-300"
                  />
                </div>
                <div className="flex-1 group/input">
                  <label className="text-xs text-gray-500 uppercase tracking-widest mb-3 block group-focus-within/input:text-white transition-colors">
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full bg-white/5 border border-white/10 px-6 py-4 text-white placeholder-gray-700 focus:outline-none focus:border-white focus:bg-white/10 transition-all duration-300"
                  />
                </div>
              </div>

              <div className="group/input">
                <label className="text-xs text-gray-500 uppercase tracking-widest mb-3 block group-focus-within/input:text-white transition-colors">
                  Budget Range
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 px-6 py-4 text-white focus:outline-none focus:border-white focus:bg-white/10 transition-all duration-300 appearance-none cursor-pointer"
                >
                  <option value="" className="bg-dark-background text-gray-500">
                    Select a range
                  </option>
                  <option value="<5k" className="bg-dark-background text-white">
                    Less than $5k
                  </option>
                  <option
                    value="5k-10k"
                    className="bg-dark-background text-white"
                  >
                    $5k - $10k
                  </option>
                  <option
                    value="10k-20k"
                    className="bg-dark-background text-white"
                  >
                    $10k - $20k
                  </option>
                  <option
                    value=">20k"
                    className="bg-dark-background text-white"
                  >
                    More than $20k
                  </option>
                </select>
              </div>

              <div className="group/input">
                <label className="text-xs text-gray-500 uppercase tracking-widest mb-3 block group-focus-within/input:text-white transition-colors">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell me about your project..."
                  className="w-full bg-white/5 border border-white/10 px-6 py-4 text-white placeholder-gray-700 focus:outline-none focus:border-white focus:bg-white/10 transition-all duration-300 resize-none"
                ></textarea>
              </div>

              <div className="pt-4">
                <button className="w-full md:w-auto px-10 py-5 bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors flex items-center justify-center gap-3 group/btn">
                  Send Message
                  <ArrowUpRight className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
