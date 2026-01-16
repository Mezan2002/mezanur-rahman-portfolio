"use client";

import { getSkills } from "@/lib/api";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const res = await getSkills();
        if (res.success) {
          // Extract skill names from API response
          const skillNames = res.data.map((skill) => skill.name);
          setSkills(skillNames);
        }
      } catch (error) {
        console.error("Failed to fetch skills:", error);
        // Fallback to default skills if API fails
        setSkills([
          "JavaScript",
          "TypeScript",
          "React",
          "Next.js",
          "Node.js",
          "GSAP",
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  if (loading || skills.length === 0) {
    return null; // Or a skeleton loader
  }

  return (
    <section className="py-10 bg-dark-background border-y border-white/5 overflow-hidden relative">
      <div className="relative flex overflow-x-hidden">
        {/* First Marquee */}
        <div className="py-6 animate-marquee-super-slow whitespace-nowrap flex items-center">
          {[...skills, ...skills].map((skill, index) => (
            <div key={index} className="flex items-center group">
              <span
                className="text-[12vw] md:text-[8vw] font-black text-transparent group-hover:text-white transition-all duration-500 uppercase cursor-default font-syne leading-none px-4"
                style={{
                  WebkitTextStroke: "1px rgba(255,255,255,0.2)",
                }}
              >
                {skill}
              </span>
              <Star className="w-8 h-8 md:w-12 md:h-12 text-primary animate-spin-slow opacity-30 mx-4" />
            </div>
          ))}
        </div>

        {/* Second Marquee (Duplicate for loop) */}
        <div className="absolute top-0 py-6 animate-marquee2-super-slow whitespace-nowrap flex items-center">
          {[...skills, ...skills].map((skill, index) => (
            <div key={index} className="flex items-center group">
              <span
                className="text-[12vw] md:text-[8vw] font-black text-transparent group-hover:text-white transition-all duration-500 uppercase cursor-default font-syne leading-none px-4"
                style={{
                  WebkitTextStroke: "1px rgba(255,255,255,0.2)",
                }}
              >
                {skill}
              </span>
              <Star className="w-8 h-8 md:w-12 md:h-12 text-primary animate-spin-slow opacity-30 mx-4" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
