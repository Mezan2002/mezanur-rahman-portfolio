"use client";

import { getSiteSettings, getSkills } from "@/lib/api";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Circle, Code2, Loader2, Trophy } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const containerRef = useRef(null);
  const [aboutData, setAboutData] = useState(null);
  const [skillsData, setSkillsData] = useState([]);
  console.log("🚀 ~ AboutPage ~ skillsData:", skillsData);
  const [loading, setLoading] = useState(true);

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settingsRes, skillsRes] = await Promise.all([
          getSiteSettings(),
          getSkills(),
        ]);

        console.log("DEBUG: Site Settings Response:", settingsRes);
        console.log("DEBUG: Skills API Response:", skillsRes);

        if (settingsRes.success && settingsRes.data?.aboutPage) {
          console.log("DEBUG: Setting aboutData:", settingsRes.data.aboutPage);
          setAboutData(settingsRes.data.aboutPage);
        } else {
          console.warn("DEBUG: No aboutPage data found");
        }

        if (skillsRes.success && skillsRes.data) {
          console.log("DEBUG: Setting skillsData:", skillsRes.data);
          setSkillsData(skillsRes.data);
        }
      } catch (error) {
        console.error("DEBUG: Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-background flex items-center justify-center">
        <Loader2 className="animate-spin text-white w-10 h-10" />
      </div>
    );
  }

  // Fallback defaults if data missing partially
  const hero = aboutData?.hero || {};
  const intro = aboutData?.introduction || {};
  const skills = aboutData?.skills || {};
  const recognition = aboutData?.recognition || {};
  const experience = aboutData?.experience || {};

  return (
    <main ref={containerRef} className="bg-dark-background min-h-screen">
      {/* 1. EDITORIAL COVER */}
      <section className="cover-container relative h-[70vh] md:h-[85vh] overflow-hidden w-full">
        <div className="absolute inset-0 cover-image scale-110">
          <Image
            src={
              hero.coverImage ||
              "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2000"
            }
            alt="Workspace"
            fill
            className="object-cover brightness-[0.4]"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-dark-background via-dark-background/20 to-transparent"></div>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-10 flex flex-col md:flex-row justify-between items-end">
          <div>
            <h1 className="text-[12vw] md:text-[10vw] font-black font-syne text-white uppercase leading-[0.85] tracking-tighter">
              {hero.firstName || "Mezanur"}
            </h1>
            <h1 className="text-[12vw] md:text-[10vw] font-black font-syne bg-white text-black uppercase leading-[0.85] tracking-tighter ml-12 md:ml-24">
              {hero.lastName || "Rahman"}
            </h1>
          </div>
          <div className="flex flex-col items-end gap-6 mb-4 md:mb-8">
            <div className="flex gap-4 text-white">
              {(hero.roleTags || ["Dev", "Design", "Art"]).map((tag, i) => (
                <span
                  key={i}
                  className="px-4 py-1 border border-white/20 rounded-full text-xs uppercase tracking-widest bg-white/5 backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. BIG INTRO */}
      <section className="py-24 px-6 md:px-12 max-w-[1200px] mx-auto text-center md:text-left">
        <p className="reveal-text text-2xl md:text-5xl font-light text-white leading-relaxed mb-16 whitespace-pre-wrap">
          {intro.introductionText || "Crafting digital experiences..."}
        </p>

        <div className="reveal-text border-t border-white/10 pt-12 flex flex-wrap justify-between gap-12">
          <div className="text-left">
            <span className="block text-4xl md:text-6xl font-bold text-white mb-2">
              {intro.yearsExperience || "04+"}
            </span>
            <span className="text-xs uppercase tracking-[0.2em] text-gray-500">
              Years Exp
            </span>
          </div>
          <div className="text-left">
            <span className="block text-4xl md:text-6xl font-bold text-white mb-2">
              {intro.projectsCount || "25+"}
            </span>
            <span className="text-xs uppercase tracking-[0.2em] text-gray-500">
              Projects
            </span>
          </div>
          <div className="text-left">
            <span className="block text-4xl md:text-6xl font-bold text-white mb-2">
              {intro.clientsCount || "15+"}
            </span>
            <span className="text-xs uppercase tracking-[0.2em] text-gray-500">
              Clients
            </span>
          </div>
          <div className="text-left">
            <span className="block text-4xl md:text-6xl font-bold text-white mb-2">
              {intro.dedication || "100%"}
            </span>
            <span className="text-xs uppercase tracking-[0.2em] text-gray-500">
              Dedication
            </span>
          </div>
        </div>
      </section>

      {/* 3. PREMIUM SKILLS GRID */}
      <section className="py-24 px-6 md:px-12 bg-white/2">
        <div>
          <div className="mb-20 flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
              <h2 className="reveal-text text-5xl md:text-7xl font-black font-syne text-white uppercase tracking-tighter mb-4">
                {skills.title || "Tech Stack"}
              </h2>
              <p className="reveal-text text-gray-400 max-w-md">
                {skills.description ||
                  "A curated arsenal of modern tools and technologies tailored for scalable, high-performance applications."}
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm font-mono text-gray-500 uppercase">
              <Circle className="w-3 h-3 text-green-500 fill-green-500 animate-pulse" />
              Always Learning
            </div>
          </div>

          <div className="skills-grid grid grid-cols-2 md:grid-cols-4 gap-4">
            {skillsData && skillsData.length > 0 ? (
              skillsData.map((skill, index) => {
                console.log({ skill });
                return (
                  <div
                    key={skill._id || skill.name || index}
                    className="skill-card group relative bg-white/3 border border-white/5 p-8 md:p-12 flex flex-col items-center justify-center gap-6 hover:bg-white/6 transition-all duration-500 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                    <div className="text-gray-400 group-hover:text-white transition-colors duration-300 transform group-hover:scale-110">
                      {skill.icon ? (
                        <div className="w-12 h-12 relative flex items-center justify-center">
                          <Image
                            src={skill.icon}
                            alt={skill.name || "Skill Icon"}
                            width={48}
                            height={48}
                            className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                            unoptimized={skill.icon.endsWith(".svg")}
                          />
                        </div>
                      ) : (
                        <Code2 className="w-12 h-12" />
                      )}
                    </div>
                    <span className="text-sm font-bold uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">
                      {skill.name}
                    </span>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full py-10 text-center text-gray-500 font-mono text-xs uppercase tracking-widest">
                {!loading && skillsData.length === 0
                  ? "No skills found in database."
                  : "Syncing Skills Arsenal..."}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. REWARDS & RECOGNITION */}
      <section className="py-40 px-6 md:px-12 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10">
          <div className="mb-16 text-center md:text-left">
            <h2 className="reveal-text text-4xl md:text-6xl font-bold font-syne text-white uppercase tracking-tight">
              {recognition.title || "Recognition"}
            </h2>
          </div>

          <div className="rewards-list flex flex-col border-t border-white/10">
            {console.log("DEBUG: Mapping awards:", recognition.awards)}
            {recognition.awards && recognition.awards.length > 0 ? (
              recognition.awards.map((item, i) => (
                <div
                  key={i}
                  className="reward-item group flex flex-col md:flex-row justify-between items-center py-10 border-b border-white/10 hover:bg-white/2 transition-colors cursor-default px-4 text-white"
                >
                  <div className="flex items-center gap-6 w-full md:w-1/3">
                    <Trophy className="w-6 h-6 text-gray-600 group-hover:text-primary transition-colors" />
                    <span className="text-xl font-bold">{item.title}</span>
                  </div>
                  <div className="w-full md:w-1/3 text-center md:text-left py-2 md:py-0">
                    <span className="text-gray-400 font-mono">
                      {item.organization}
                    </span>
                  </div>
                  <div className="w-full md:w-1/3 flex justify-between items-center">
                    <span className="text-gray-500 group-hover:text-white transition-colors">
                      {item.projectName}
                    </span>
                    <span className="text-xs border border-white/10 px-2 py-1 rounded-full text-gray-600 group-hover:border-white/30 group-hover:text-white transition-all">
                      {item.year}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center text-gray-500 font-mono text-xs">
                {aboutData
                  ? "No awards found in recognition section."
                  : "Loading recognition data..."}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. EXPERIENCE LIST */}
      <section className="py-24 px-6 md:px-12">
        <h2 className="reveal-text text-4xl md:text-5xl font-bold font-syne text-white uppercase mb-16 text-center">
          {experience.title || "Career"}
        </h2>

        <div className="experience-list flex flex-col">
          {console.log("DEBUG: Mapping jobs:", experience.jobs)}
          {experience.jobs && experience.jobs.length > 0 ? (
            experience.jobs.map((job, i) => (
              <div
                key={i}
                className="experience-item group flex flex-col md:flex-row justify-between items-center py-10 border-b border-white/10 hover:border-white transition-colors cursor-pointer text-white"
              >
                <div className="text-center md:text-left mb-4 md:mb-0">
                  <h4 className="text-2xl md:text-3xl font-bold group-hover:pl-4 transition-all duration-300">
                    {job.role}
                  </h4>
                  <span className="text-gray-500 mt-1 block group-hover:pl-4 transition-all duration-300 delay-75">
                    {job.company}
                  </span>
                </div>
                <div className="flex items-center gap-8">
                  <span className="font-mono text-sm text-gray-500">
                    {job.duration}
                  </span>
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-transform duration-300">
                    <ArrowUpRight className="text-white w-5 h-5" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center text-gray-500 font-mono text-xs">
              {aboutData
                ? "No career items found in experience section."
                : "Loading career data..."}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
