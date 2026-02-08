"use client";

import ConfirmationModal from "@/components/admin/ConfirmationModal";
import { deletePricing, getPricing } from "@/lib/api";
import gsap from "gsap";
import { Check, Edit2, Flame, Plus, Search, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function PricingPage() {
  const containerRef = useRef(null);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    id: null,
  });

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const response = await getPricing();
      setPlans(response.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (id) => {
    setDeleteModal({ isOpen: true, id });
  };

  const handleDelete = async () => {
    const id = deleteModal.id;
    if (!id) return;

    try {
      await deletePricing(id);
      setPlans(plans.filter((plan) => plan._id !== id));
      setDeleteModal({ isOpen: false, id: null });
    } catch (err) {
      alert("Failed to delete pricing plan: " + err.message);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  useEffect(() => {
    if (!loading && plans.length > 0) {
      const ctx = gsap.context(() => {
        gsap.set(".pricing-card", { opacity: 0, y: 30 });
        gsap.to(".pricing-card", {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "all",
        });
      }, containerRef);
      return () => ctx.revert();
    }
  }, [loading, plans]);

  const filteredPlans = plans.filter((plan) =>
    plan.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div ref={containerRef} className="space-y-8 min-h-screen">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-xs font-mono text-primary mb-2 tracking-widest uppercase">
            Admin Portal / Content
          </p>
          <h1 className="text-4xl md:text-5xl font-black font-syne uppercase text-white leading-none">
            Pricing Plans
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-white/5 border border-white/10 rounded-full flex items-center px-4 py-3 w-64 backdrop-blur-md focus-within:border-primary/50 transition-colors">
              <Search size={16} className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search plans..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent border-none outline-none text-sm text-white placeholder-gray-500 font-mono w-full"
              />
            </div>
          </div>

          <Link
            href="/admin/pricing/create"
            className="group relative px-6 py-3 bg-white text-black font-bold font-syne uppercase tracking-wider rounded-full overflow-hidden hover:scale-105 transition-transform"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Plus size={18} />
              <span>Create</span>
            </span>
            <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-[550px] bg-white/5 rounded-xl animate-pulse"
            ></div>
          ))}
        </div>
      ) : error ? (
        <div className="text-red-400 font-mono p-8 border border-red-500/20 rounded-3xl bg-red-500/5">
          Error: {error}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {filteredPlans.map((plan) => (
            <div
              key={plan._id || plan.id}
              className={`pricing-card group relative p-10 flex flex-col justify-between transition-all duration-700 h-full ${
                plan.isPopular
                  ? "bg-white/5 border border-primary/30 shadow-[0_0_80px_-20px_rgba(180,255,0,0.15)]"
                  : "bg-white/1 border border-white/5 hover:border-white/10"
              }`}
            >
              {/* Floating Action Buttons - Top Right */}
              <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <Link
                  href={`/admin/pricing/edit/${plan._id || plan.id}`}
                  className="p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white hover:text-black transition-all"
                >
                  <Edit2 size={14} />
                </Link>
                <button
                  onClick={() => confirmDelete(plan._id || plan.id)}
                  className="p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-red-500 hover:border-red-500 transition-all"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              {/* Popular Badge */}
              {/* Popular Badge */}
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1 bg-primary text-black font-black font-syne text-[10px] w-max rounded-full uppercase tracking-widest flex items-center gap-2">
                  <Flame size={12} className="fill-black" />
                  Most Popular
                </div>
              )}

              <div>
                <div className="mb-8">
                  <h3 className="text-xl font-bold font-syne text-gray-500 uppercase tracking-widest mb-2 transition-colors group-hover:text-white">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl lg:text-5xl font-black font-syne text-white">
                      {plan.price === "Custom" ? plan.price : `$${plan.price}`}
                    </span>
                    {plan.billingPeriod && (
                      <span className="text-gray-500 font-mono text-xs uppercase tracking-widest">
                        / {plan.billingPeriod}
                      </span>
                    )}
                  </div>
                  {plan.description && (
                    <p className="text-gray-400 mt-6 leading-relaxed">
                      {plan.description}
                    </p>
                  )}
                </div>

                {plan.features && plan.features.length > 0 && (
                  <div className="space-y-4 pt-8 border-t border-white/5">
                    {plan.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 text-sm text-gray-400 group-hover:text-gray-300 transition-colors"
                      >
                        <div className="shrink-0 w-5 h-5 rounded-full border border-white/10 flex items-center justify-center text-primary">
                          <Check size={12} strokeWidth={3} />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-12">
                <Link
                  href={`/admin/pricing/edit/${plan._id || plan.id}`}
                  className={`block w-full py-5 font-black font-syne uppercase tracking-widest text-sm transition-all duration-500 relative overflow-hidden active:scale-95 text-center ${
                    plan.isPopular
                      ? "bg-primary text-black hover:bg-white"
                      : "bg-white/5 text-white hover:bg-white hover:text-black border border-white/10"
                  }`}
                >
                  <span className="relative z-10">
                    {plan.ctaText || "Get Started"}
                  </span>
                </Link>
              </div>
            </div>
          ))}

          {/* Create New Card */}
          <Link
            href="/admin/pricing/create"
            className="group flex flex-col items-center justify-center min-h-[500px] border-2 border-dashed border-white/10 hover:border-primary/30 hover:bg-primary/5 transition-all duration-500"
          >
            <div className="w-16 h-16 rounded-full border-2 border-white/10 group-hover:border-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Plus
                size={24}
                className="text-gray-600 group-hover:text-primary transition-colors"
              />
            </div>
            <h3 className="text-xl font-bold font-syne text-gray-600 group-hover:text-white uppercase tracking-wide transition-colors mb-2">
              Add New Plan
            </h3>
            <p className="text-sm text-gray-700 group-hover:text-gray-400 transition-colors">
              Create a pricing plan
            </p>
          </Link>
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        onConfirm={handleDelete}
        title="Delete Pricing Plan?"
        message="Are you sure you want to delete this pricing plan? This action cannot be undone."
      />
    </div>
  );
}
