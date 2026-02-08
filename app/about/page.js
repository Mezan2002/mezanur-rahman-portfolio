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
      <section className="cover-container relative h-[60vh] md:h-[85vh] overflow-hidden w-full">
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

        <div className="absolute bottom-0 left-0 w-full p-4 sm:p-8 md:p-12 z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-0">
          <div className="w-full md:w-auto">
            <h1 className="text-[15vw] sm:text-[12vw] lg:text-[10vw] font-black font-syne text-white uppercase leading-[0.85] tracking-tighter">
              {hero.firstName || "Mezanur"}
            </h1>
            <h1 className="text-[15vw] sm:text-[12vw] lg:text-[10vw] font-black font-syne bg-white text-black uppercase leading-[0.85] tracking-tighter ml-6 sm:ml-12 md:ml-24 inline-block px-2 sm:px-0">
              {hero.lastName || "Rahman"}
            </h1>
          </div>
          <div className="flex flex-col items-start md:items-end gap-6 mb-2 md:mb-8">
            <div className="flex flex-wrap gap-2 sm:gap-4 text-white">
              {(hero.roleTags || ["Dev", "Design", "Art"]).map((tag, i) => (
                <span
                  key={i}
                  className="px-3 sm:px-4 py-1 border border-white/20 rounded-full text-[10px] sm:text-xs uppercase tracking-widest bg-white/5 backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. BIG INTRO */}
      <section className="py-16 md:py-32 px-4 sm:px-8 md:px-12 max-w-[1200px] mx-auto text-left">
        <p className="reveal-text text-xl sm:text-3xl md:text-5xl font-light text-white leading-relaxed mb-12 sm:mb-20 whitespace-pre-wrap">
          {intro.introductionText || "Crafting digital experiences..."}
        </p>

        <div className="reveal-text border-t border-white/10 pt-12 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 place-items-center lg:place-items-start">
          <div className="text-left">
            <span className="block text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-1">
              {intro.yearsExperience || "04+"}
            </span>
            <span className="text-[9px] sm:text-xs uppercase tracking-[0.2em] text-gray-500">
              Years Exp
            </span>
          </div>
          <div className="text-left">
            <span className="block text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-1">
              {intro.projectsCount || "25+"}
            </span>
            <span className="text-[9px] sm:text-xs uppercase tracking-[0.2em] text-gray-500">
              Projects
            </span>
          </div>
          <div className="text-left">
            <span className="block text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-1">
              {intro.clientsCount || "15+"}
            </span>
            <span className="text-[9px] sm:text-xs uppercase tracking-[0.2em] text-gray-500">
              Clients
            </span>
          </div>
          <div className="text-left">
            <span className="block text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-1">
              {intro.dedication || "100%"}
            </span>
            <span className="text-[9px] sm:text-xs uppercase tracking-[0.2em] text-gray-500">
              Dedication
            </span>
          </div>
        </div>
      </section>

      {/* 3. PREMIUM SKILLS GRID */}
      <section className="py-20 md:py-32 px-4 sm:px-8 md:px-12 bg-white/2">
        <div>
          <div className="mb-12 md:mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <h2 className="reveal-text text-4xl sm:text-5xl md:text-7xl font-black font-syne text-white uppercase tracking-tighter mb-4">
                {skills.title || "Tech Stack"}
              </h2>
              <p className="reveal-text text-gray-400 max-w-md text-sm sm:text-base">
                {skills.description ||
                  "A curated arsenal of modern tools and technologies tailored for scalable, high-performance applications."}
              </p>
            </div>
            <div className="flex items-center gap-2 text-[10px] sm:text-xs md:text-sm font-mono text-gray-500 uppercase">
              <Circle className="w-2 h-2 sm:w-3 sm:h-3 text-green-500 fill-green-500 animate-pulse" />
              Always Learning
            </div>
          </div>

          <div className="skills-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {skillsData && skillsData.length > 0 ? (
              skillsData.map((skill, index) => {
                return (
                  <div
                    key={skill._id || skill.name || index}
                    className="skill-card group relative bg-white/3 border border-white/5 p-6 sm:p-8 md:p-12 flex flex-col items-center justify-center gap-4 sm:gap-6 hover:bg-white/6 transition-all duration-500 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                    <div className="text-gray-400 group-hover:text-white transition-colors duration-300 transform group-hover:scale-110">
                      {skill.icon ? (
                        <div className="w-10 h-10 sm:w-12 sm:h-12 relative flex items-center justify-center">
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
                        <Code2 className="w-10 h-10 sm:w-12 sm:h-12" />
                      )}
                    </div>
                    <span className="text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors text-center px-2">
                      {skill.name}
                    </span>
                    <div className="absolute top-2 right-2 sm:top-4 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full py-20 text-center text-gray-500 font-mono text-xs uppercase tracking-widest border border-dashed border-white/10 rounded-2xl">
                {!loading && skillsData.length === 0
                  ? "No skills found in database."
                  : "Syncing Skills Arsenal..."}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. REWARDS & RECOGNITION */}
      <section className="py-24 md:py-40 px-4 sm:px-8 md:px-12 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10">
          <div className="mb-12 md:mb-16 text-left">
            <h2 className="reveal-text text-3xl sm:text-4xl md:text-6xl font-bold font-syne text-white uppercase tracking-tight">
              {recognition.title || "Awards & Recognition"}
            </h2>
          </div>

          <div className="rewards-list flex flex-col border-t border-white/10">
            {recognition.awards && recognition.awards.length > 0 ? (
              recognition.awards.map((item, i) => (
                <div
                  key={i}
                  className="reward-item group flex flex-col md:flex-row justify-between items-start md:items-center py-8 md:py-10 border-b border-white/10 hover:bg-white/2 transition-colors cursor-default px-2 md:px-4 text-white gap-4 md:gap-0"
                >
                  <div className="flex items-center gap-4 sm:gap-6 w-full md:w-1/3">
                    <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 group-hover:text-primary transition-colors shrink-0" />
                    <span className="text-lg sm:text-xl font-bold line-clamp-1">
                      {item.title}
                    </span>
                  </div>
                  <div className="w-full md:w-1/3 text-left py-0 md:py-0">
                    <span className="text-sm sm:text-base text-gray-400 font-mono">
                      {item.organization}
                    </span>
                  </div>
                  <div className="w-full md:w-1/3 flex justify-between items-center gap-4">
                    <span className="text-sm sm:text-base text-gray-500 group-hover:text-white transition-colors line-clamp-1">
                      {item.projectName}
                    </span>
                    <span className="text-[10px] border border-white/10 px-2 py-1 rounded-full text-gray-600 group-hover:border-white/30 group-hover:text-white transition-all shrink-0">
                      {item.year}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center text-gray-500 font-mono text-xs uppercase tracking-widest border border-dashed border-white/10 rounded-2xl mt-8">
                {aboutData
                  ? "No awards found in recognition section."
                  : "Loading recognition data..."}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. EXPERIENCE LIST */}
      <section className="py-20 md:py-24 px-4 sm:px-8 md:px-12">
        <h2 className="reveal-text text-3xl sm:text-4xl md:text-5xl font-bold font-syne text-white uppercase mb-12 md:mb-16 text-left md:text-center">
          {experience.title || "Career"}
        </h2>

        <div className="experience-list flex flex-col">
          {experience.jobs && experience.jobs.length > 0 ? (
            experience.jobs.map((job, i) => (
              <div
                key={i}
                className="experience-item group flex flex-col md:flex-row justify-between items-start md:items-center py-8 md:py-10 border-b border-white/10 hover:border-white transition-colors cursor-pointer text-white gap-6 md:gap-0"
              >
                <div className="text-left mb-0 md:mb-0">
                  <h4 className="text-xl sm:text-2xl md:text-3xl font-bold md:group-hover:pl-4 transition-all duration-300">
                    {job.role}
                  </h4>
                  <span className="text-gray-500 mt-1 block md:group-hover:pl-4 transition-all duration-300 delay-75 text-sm sm:text-base">
                    {job.company}
                  </span>
                </div>
                <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-8">
                  <span className="font-mono text-xs sm:text-sm text-gray-500">
                    {job.duration}
                  </span>
                  <div className="w-8 h-8 shrink-0 sm:w-10 sm:h-10 rounded-full border border-white/20 flex items-center justify-center -rotate-45 md:group-hover:rotate-0 transition-transform duration-300">
                    <ArrowUpRight className="text-white w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center text-gray-500 font-mono text-xs uppercase tracking-widest border border-dashed border-white/10 rounded-2xl">
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
