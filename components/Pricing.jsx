"use client";

import { getPricing } from "@/lib/api";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Flame } from "lucide-react";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Pricing({ data = {} }) {
  const sectionRef = useRef(null);
  const [tiers, setTiers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch pricing from API
  useEffect(() => {
    const fetchPricing = async () => {
      try {
        setLoading(true);
        const res = await getPricing();
        if (res.success) {
          // Map API data to component format
          const mappedTiers = res.data.map((plan) => ({
            id: plan._id,
            name: plan.name,
            // Don't add $ if price is "Custom", otherwise add $ prefix
            price:
              plan.price === "Custom"
                ? plan.price
                : plan.price
                  ? `$${plan.price}`
                  : "Custom",
            description: plan.description,
            features: plan.features || [],
            cta: plan.recommended ? "Recommended" : "Start Project",
            popular: plan.isPopular || false,
          }));
          setTiers(mappedTiers);
        }
      } catch (error) {
        console.error("Failed to fetch pricing:", error);
        // Fallback to default pricing
        setTiers([
          {
            id: "essential",
            name: "Essential",
            price: "$1,499",
            description:
              "Perfect for high-impact landing pages and brand sites.",
            features: [
              "Custom UI/UX Design",
              "Next.js Development",
              "Mobile Responsive",
            ],
            cta: "Start Project",
            popular: false,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPricing();
  }, []);

  const titleLines = data?.title?.split(" ") || ["Transparent", "Investment"];

  useGSAP(
    () => {
      if (!loading && tiers.length > 0) {
        const runAnimations = () => {
          // Set initial states immediately to prevent flicker
          gsap.set(".pricing-card", { y: 60, opacity: 0 });

          // Reveal pricing cards
          gsap.to(".pricing-card", {
            y: 0,
            opacity: 1,
            stagger: 0.2,
            duration: 0.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
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
              runAnimations,
            );
        }
      }
    },
    { scope: sectionRef, dependencies: [loading, tiers] },
  );

  if (loading) {
    return null; // Or skeleton loader
  }

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="py-32 px-6 md:px-12 bg-dark-background relative overflow-hidden"
    >
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-primary/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="relative z-10">
        {/* Header - EXACT MATCH to Projects section style */}
        <div className="mb-24 text-center">
          <p className="text-gray-500 uppercase tracking-widest text-sm mb-4 font-mono">
            {data?.tag || "( Pricing Plans )"}
          </p>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black font-syne text-white uppercase leading-[0.85]">
            {titleLines[0]}
            <br />
            <span className="bg-white text-black">
              {titleLines.slice(1).join(" ") || "Investment"}
            </span>
          </h2>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`pricing-card group relative p-4 lg:p-10 flex flex-col justify-between transition-all duration-700 h-full ${
                tier.popular
                  ? "bg-white/5 border border-primary/30 shadow-[0_0_80px_-20px_rgba(var(--primary-rgb),0.15)]"
                  : "bg-white/1 border border-white/5 hover:border-white/10"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1 bg-primary text-black font-black font-syne text-[10px] w-max rounded-full uppercase tracking-widest flex items-center gap-2">
                  <Flame size={12} className="fill-black" />
                  Most Popular
                </div>
              )}

              <div>
                <div className="mb-8">
                  <h3 className="text-xl font-bold font-syne text-gray-500 uppercase tracking-widest mb-2 transition-colors group-hover:text-white">
                    {tier.name}
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl lg:text-5xl font-black font-syne text-white">
                      {tier.price}
                    </span>
                    {tier.price !== "Custom" && (
                      <span className="text-gray-500 font-mono text-xs uppercase tracking-widest">
                        / project
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 mt-6 leading-relaxed">
                    {tier.description}
                  </p>
                </div>

                <div className="space-y-4 pt-8 border-t border-white/5">
                  {tier.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 text-sm text-gray-400 group-hover:text-gray-300 transition-colors"
                    >
                      <div className="shrink-0 w-5 h-5 rounded-full border border-white/10 flex items-center justify-center text-primary">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-12">
                <button
                  className={`w-full py-3 lg:py-5 font-black font-syne uppercase tracking-widest text-xs lg:text-sm transition-all duration-500 relative overflow-hidden active:scale-95 ${
                    tier.popular
                      ? "bg-primary text-black hover:bg-white"
                      : "bg-white/5 text-white hover:bg-white hover:text-black border border-white/10"
                  }`}
                >
                  <span className="relative z-10">{tier.cta}</span>
                </button>
                <p className="text-[9px] text-gray-600 font-mono uppercase tracking-[0.2em] mt-4 text-center group-hover:text-gray-400 transition-colors">
                  * 50% deposit required upfront
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
