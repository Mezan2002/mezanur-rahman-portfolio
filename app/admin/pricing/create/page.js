"use client";

import PricingForm from "@/components/admin/PricingForm";
import Toast from "@/components/admin/Toast";
import { createPricing } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreatePricingPage() {
  const router = useRouter();

  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "success",
  });

  const showToast = (message, type = "success") => {
    setToast({ isVisible: true, message, type });
  };

  const handleCreate = async (data) => {
    try {
      await createPricing(data);
      showToast("Pricing plan created successfully!");

      setTimeout(() => {
        router.push("/admin/pricing");
      }, 2000);
    } catch (err) {
      showToast("Failed to create pricing plan.", "error");
    }
  };

  return (
    <div>
      <Toast
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((prev) => ({ ...prev, isVisible: false }))}
      />
      <PricingForm onSubmit={handleCreate} />
    </div>
  );
}
