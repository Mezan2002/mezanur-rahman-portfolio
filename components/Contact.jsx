"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-reveal", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        },
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="contact"
      className="py-24 px-4 bg-dark-background"
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-[10vw] font-black leading-none text-white mb-8 contact-reveal">
          LET'S TALK
        </h2>

        <div className="flex flex-col items-center gap-8 contact-reveal">
          <a
            href="mailto:contact@mezanur.com"
            className="text-2xl md:text-4xl text-gray-400 hover:text-white transition-colors border-b border-gray-700 hover:border-white pb-2"
          >
            hello@mezanur.com
          </a>

          <div className="flex gap-6 mt-8">
            <a
              href="#"
              className="p-4 rounded-full bg-white/5 hover:bg-primary hover:text-white transition-all duration-300"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="p-4 rounded-full bg-white/5 hover:bg-primary hover:text-white transition-all duration-300"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="p-4 rounded-full bg-white/5 hover:bg-primary hover:text-white transition-all duration-300"
            >
              <Twitter className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="p-4 rounded-full bg-white/5 hover:bg-primary hover:text-white transition-all duration-300"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>

          <p className="mt-12 text-gray-600 max-w-sm contact-reveal">
            Available for freelance projects and remote full-time positions.
          </p>
        </div>
      </div>
    </section>
  );
}
