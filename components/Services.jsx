"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Layout, MonitorCheck, Palette } from "lucide-react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 1,
    title: "Full-stack Dev",
    description:
      "Architecting robust web applications with cutting-edge technologies like Next.js, Node.js, and scalable cloud solutions.",
    icon: <Code2 size={40} strokeWidth={1} />,
    tags: ["React", "TypeScript", "Node.js", "Cloud"],
  },
  {
    id: 2,
    title: "UI/UX Design",
    description:
      "Designing high-fidelity interfaces that are visually stunning, user-centric, and optimized for seamless digital experiences.",
    icon: <Palette size={40} strokeWidth={1} />,
    tags: ["Figma", "User Flow", "Prototyping", "Branding"],
  },
  {
    id: 3,
    title: "Creative Coding",
    description:
      "Crafting immersive digital interactions with advanced animations (GSAP, Framer Motion) and innovative WebGL-based visuals.",
    icon: <MonitorCheck size={40} strokeWidth={1} />,
    tags: ["GSAP", "Three.js", "WebGL", "Motion"],
  },
  {
    id: 4,
    title: "Digital Products",
    description:
      "Developing scalable SaaS platforms and digital products that transform business goals into powerful, high-impact realities.",
    icon: <Layout size={40} strokeWidth={1} />,
    tags: ["SaaS", "Product MVP", "Conversion", "Scale"],
  },
];

export default function Services() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const runAnimations = () => {
        // Reveal each service card
        gsap.fromTo(
          ".service-card",
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".services-grid",
              start: "top 75%",
            },
          }
        );
      };

      if (window.isPageReady) {
        runAnimations();
      } else {
        window.addEventListener("page-transition-complete", runAnimations);
        return () =>
          window.removeEventListener("page-transition-complete", runAnimations);
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-32 px-6 md:px-12 bg-dark-background relative overflow-hidden"
    >
      {/* Subtle Background Text */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full select-none pointer-events-none opacity-[0.02] overflow-hidden whitespace-nowrap">
        <span className="text-[30vw] font-black font-syne uppercase leading-none tracking-tighter">
          Services Services Services
        </span>
      </div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        {/* Header - EXACT MATCH to Projects section style */}
        <div className="mb-24 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
          <div className="">
            <p className="text-gray-500 uppercase tracking-widest text-sm mb-4 font-mono">
              ( Core Offerings )
            </p>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black font-syne text-white uppercase leading-[0.85]">
              Full Spectrum
              <br />
              <span className="bg-white text-black">Services</span>
            </h2>
          </div>
          <div className="lg:text-right max-w-md">
            <p className="text-xl text-gray-400 font-light leading-relaxed">
              Merging technical excellence with artistic vision to deliver
              high-performance digital worlds.
            </p>
          </div>
        </div>

        {/* Services Grid - Matches About section Swiss Grid pattern */}
        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 overflow-hidden">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="service-card bg-dark-background p-10 flex flex-col justify-between group hover:bg-white/2 transition-all duration-500 min-h-[450px]"
            >
              <div className="space-y-8">
                <div className="flex justify-between items-start">
                  <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:border-primary group-hover:text-black transition-all duration-500">
                    {service.icon}
                  </div>
                  <span className="font-mono text-sm text-gray-500 group-hover:text-white transition-colors">
                    0{index + 1}
                  </span>
                </div>
                <div>
                  <h3 className="text-3xl font-black font-syne text-white uppercase mb-4 tracking-tight group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                    {service.description}
                  </p>
                </div>
              </div>

              <div className="pt-8 mt-auto flex flex-wrap gap-2 opacity-30 group-hover:opacity-100 transition-opacity duration-500">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono uppercase tracking-widest border border-white/10 px-2 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
