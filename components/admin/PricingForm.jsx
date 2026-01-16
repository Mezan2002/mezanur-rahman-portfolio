"use client";

import gsap from "gsap";
import { ArrowLeft, Check, Loader2, Plus, Save, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function PricingForm({
  initialData = {},
  isEditing = false,
  onSubmit,
}) {
  const containerRef = useRef(null);

  // Form States
  const [name, setName] = useState(initialData.name || "");
  const [price, setPrice] = useState(initialData.price || "");
  const [billingPeriod, setBillingPeriod] = useState(
    initialData.billingPeriod || "month"
  );
  const [description, setDescription] = useState(initialData.description || "");
  const [features, setFeatures] = useState(
    Array.isArray(initialData.features) && initialData.features.length > 0
      ? initialData.features
      : [""]
  );
  const [ctaText, setCtaText] = useState(initialData.ctaText || "Get Started");
  const [isPopular, setIsPopular] = useState(
    initialData.isPopular || initialData.popular || false
  );
  // UI States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Populate form when initialData changes
  useEffect(() => {
    if (Object.keys(initialData).length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setName(initialData.name || "");
      setPrice(initialData.price || "");
      setBillingPeriod(initialData.billingPeriod || "month");
      setDescription(initialData.description || "");
      setFeatures(
        Array.isArray(initialData.features) && initialData.features.length > 0
          ? initialData.features
          : [""]
      );
      setCtaText(initialData.ctaText || "Get Started");
      setIsPopular(initialData.isPopular || initialData.popular || false);
    }
  }, [initialData]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".animate-in", { opacity: 0, y: 20 });
      gsap.to(".animate-in", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "all",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async () => {
    if (!name || !price) {
      setError("Please fill in plan name and price.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const pricingData = {
      name,
      price, // Send as string per user structure
      billingPeriod,
      description,
      features: features.filter((f) => f.trim() !== ""),
      ctaText,
      isPopular,
    };

    try {
      await onSubmit(pricingData);
    } catch (err) {
      setError(err.message || "Failed to save pricing plan");
      setIsSubmitting(false);
    }
  };

  const addFeature = () => {
    setFeatures([...features, ""]);
  };

  const updateFeature = (index, value) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const removeFeature = (index) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  return (
    <div ref={containerRef} className="pb-40 min-h-screen">
      {/* Header Actions */}
      <div className="flex justify-between items-center mb-12 animate-in sticky top-8 z-50">
        <Link
          href="/admin/pricing"
          className="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors bg-black/50 px-4 py-2 rounded-full backdrop-blur-md border border-white/5 hover:border-white/20"
        >
          <div className="p-1 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
            <ArrowLeft size={16} />
          </div>
          <span className="uppercase tracking-widest text-xs font-bold">
            Back
          </span>
        </Link>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !name}
          className="flex items-center gap-2 px-8 py-3 bg-primary text-black font-bold font-syne uppercase tracking-wider rounded-full hover:bg-white hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-[0_0_20px_rgba(180,255,0,0.3)] hover:shadow-[0_0_30px_rgba(180,255,0,0.5)]"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>{isEditing ? "Updating..." : "Saving..."}</span>
            </>
          ) : (
            <>
              <span>{isEditing ? "Update Plan" : "Save Plan"}</span>
              <Save size={18} />
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="animate-in mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm font-mono flex items-center justify-between">
          <span>Error: {error}</span>
          <button onClick={() => setError(null)}>
            <X size={16} />
          </button>
        </div>
      )}

      {/* Editor Layout */}
      <div className="space-y-12">
        {/* Plan Name Input */}
        <div className="animate-in group relative">
          <input
            type="text"
            placeholder="Untitled Plan..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-transparent text-5xl md:text-7xl font-black font-syne text-white placeholder-gray-800 outline-none leading-tight selection:bg-primary/30"
          />
        </div>

        {/* Description Input */}
        <div className="animate-in group relative">
          <textarea
            placeholder="Plan description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-transparent text-xl font-medium text-gray-400 placeholder-gray-800 outline-none resize-none h-20 border-l-2 border-transparent pl-1 focus:border-primary/50 transition-colors"
          />
        </div>

        {/* Metadata Ribbon */}
        <div className="animate-in flex flex-col gap-8">
          {/* Row 1: Price & Billing Period */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8 border-b border-white/5">
            {/* Price */}
            <div className="relative group">
              <input
                type="text"
                placeholder="1,999"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-transparent py-2 text-lg font-bold font-syne text-white placeholder-gray-700 outline-none border-none focus:placeholder-white/20 transition-all"
              />
              <span className="absolute -top-4 left-0 text-[10px] font-mono uppercase tracking-widest text-gray-600 group-focus-within:text-primary transition-colors">
                Price ($)
              </span>
            </div>
          </div>

          {/* Row 2: CTA Text & Popular Toggle */}
          <div className="flex flex-wrap items-center gap-4 md:gap-8 pb-8 border-b border-white/5">
            {/* CTA Text */}
            <div className="flex-1 min-w-[200px] relative group">
              <input
                type="text"
                placeholder="Get Started"
                value={ctaText}
                onChange={(e) => setCtaText(e.target.value)}
                className="w-full bg-transparent py-2 text-lg font-bold font-syne text-white placeholder-gray-700 outline-none border-none focus:placeholder-white/20 transition-all"
              />
              <span className="absolute -top-4 left-0 text-[10px] font-mono uppercase tracking-widest text-gray-600 group-focus-within:text-primary transition-colors">
                CTA Button Text
              </span>
            </div>

            <div className="w-px h-12 bg-white/10 hidden md:block"></div>

            {/* Popular Toggle - Inline */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={isPopular}
                onChange={(e) => setIsPopular(e.target.checked)}
                className="w-5 h-5 rounded border-white/20 bg-white/5 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <label className="text-lg font-bold font-syne text-white cursor-pointer">
                Popular Plan
              </label>
              <span className="text-xs font-mono text-gray-600 ml-2">
                Highlight badge
              </span>
            </div>
          </div>

          {/* Features Section */}
          <div className="pb-8 border-b border-white/5">
            <div className="flex items-center justify-between mb-6">
              <label className="text-xs font-mono uppercase tracking-widest text-gray-600">
                Plan Features
              </label>
              <button
                type="button"
                onClick={addFeature}
                className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 text-primary rounded-full text-xs font-bold uppercase tracking-wider hover:bg-primary/20 transition-colors"
              >
                <Plus size={14} />
                Add Feature
              </button>
            </div>

            <div>
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 p-3 group">
                  <div className="size-5 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                    <Check size={14} />
                  </div>
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => updateFeature(index, e.target.value)}
                    placeholder={`Feature ${index + 1}...`}
                    className="flex-1 bg-transparent py-2 text-base font-medium text-white placeholder-gray-600 outline-none"
                  />
                  {features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-full transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              ))}
              <div className="flex items-center justify-center">
                <button
                  type="button"
                  onClick={addFeature}
                  className="w-full h-full min-h-[50px] flex items-center justify-center gap-2 border border-dashed border-white/20 rounded-xl text-gray-500 hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all text-sm font-bold uppercase tracking-widest"
                >
                  <Plus size={18} />
                  Add Feature
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
