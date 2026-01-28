"use client";

import PricingForm from "@/components/admin/PricingForm";
import Toast from "@/components/admin/Toast";
import { getPricing, updatePricing } from "@/lib/api";
import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditPricingPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [plan, setPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Toast State
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "success",
  });

  const showToast = (message, type = "success") => {
    setToast({ isVisible: true, message, type });
  };

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        setIsLoading(true);
        // Fetch all plans and find the matching one
        // This is safer as the single ID endpoint might not exist
        const response = await getPricing();
        const allPlans = response.data || [];
        const planData = allPlans.find((p) => (p._id || p.id) === id);

        if (!planData) {
          throw new Error("Pricing plan not found");
        }

        setPlan(planData);
      } catch (err) {
        console.error("Error fetching pricing plan:", err);
        setError(err.message || "Failed to fetch pricing plan data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlan();
  }, [id]);

  const handleUpdate = async (data) => {
    try {
      await updatePricing(id, data);
      showToast("Pricing plan updated successfully!");

      setTimeout(() => {
        router.push("/admin/pricing");
      }, 2000);
    } catch (err) {
      showToast("Failed to update pricing plan.", "error");
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <p className="text-gray-400 font-mono text-sm">
          Loading pricing plan...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto mt-20">
        <div className="p-8 bg-red-500/10 border border-red-500/20 rounded-3xl">
          <h2 className="text-2xl font-bold text-red-400 mb-2">Error</h2>
          <p className="text-red-300">{error}</p>
          <button
            onClick={() => router.push("/admin/pricing")}
            className="mt-6 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
          >
            Back to Pricing
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Toast
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((prev) => ({ ...prev, isVisible: false }))}
      />
      <PricingForm
        initialData={plan}
        isEditing={true}
        onSubmit={handleUpdate}
      />
    </div>
  );
}
