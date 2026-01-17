"use client";

import { getServices } from "@/lib/api";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as Icons from "lucide-react";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Services({ data = {} }) {
  const sectionRef = useRef(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch individual services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const res = await getServices();
        if (res.success) {
          // Map API data to component format - icon is now a Lucide icon name
          const mappedServices = res.data.map((service) => ({
            id: service._id,
            title: service.title,
            description: service.description,
            icon: service.icon, // Store icon name from API
            tags: service.tags || [],
          }));
          setServices(mappedServices);
        }
      } catch (error) {
        console.error("Failed to fetch services:", error);
        // Fallback to default services
        setServices([
          {
            id: 1,
            title: "Full-stack Dev",
            description:
              "Architecting robust web applications with cutting-edge technologies.",
            icon: "Zap", // Use default icon name
            tags: ["React", "TypeScript", "Node.js"],
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const getIcon = (iconName) => {
    const Icon = Icons[iconName] || Icons.Zap;
    return (
      <Icon
        size={35}
        strokeWidth={1.2}
        className="transition-all duration-500"
      />
    );
  };

  const titleLines = data?.title?.split(" ") || [
    "Full",
    "Spectrum",
    "Services",
  ];
  const line1 = titleLines.slice(0, 2).join(" ");
  const line2 = titleLines.slice(2).join(" ");

  useGSAP(
    () => {
      if (!loading && services.length > 0) {
        const runAnimations = () => {
          // Set initial states immediately to prevent flicker
          gsap.set(".service-card", { y: 50, opacity: 0 });

          // Reveal each service card
          gsap.to(".service-card", {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".services-grid",
              start: "top 75%",
            },
          });
        };

        if (window.isPageReady) {
          runAnimations();
        } else {
          window.addEventListener("page-transition-complete", runAnimations);
          return () =>
            window.removeEventListener(
              "page-transition-complete",
              runAnimations
            );
        }
      }
    },
    { scope: sectionRef, dependencies: [loading, services] }
  );

  if (loading) {
    return null; // Or skeleton loader
  }

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

      <div className="relative z-10">
        {/* Header - EXACT MATCH to Projects section style */}
        <div className="mb-24 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
          <div className="">
            <p className="text-gray-500 uppercase tracking-widest text-sm mb-4 font-mono">
              {data?.tag || "( Core Offerings )"}
            </p>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black font-syne text-white uppercase leading-[0.85]">
              {line1}
              <br />
              <span className="bg-white text-black">{line2 || "Services"}</span>
            </h2>
          </div>
          <div className="lg:text-right max-w-md">
            <p className="text-xl text-gray-400 font-light leading-relaxed">
              {data?.description ||
                "Merging technical excellence with artistic vision to deliver high-performance digital worlds."}
            </p>
          </div>
        </div>

        {/* Services Grid - Matches About section Swiss Grid pattern */}
        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 overflow-hidden">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="service-card bg-dark-background p-10 flex flex-col justify-between group transition-all duration-500 min-h-[450px]"
            >
              <div className="space-y-8">
                <div className="flex justify-between items-start">
                  <div className="w-16 h-16 rounded-full border border-white/10 group-hover:border-primary flex items-center justify-center text-primary transition-all duration-500">
                    {getIcon(service.icon)}
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

              {service.tags && service.tags.length > 0 && (
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
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
