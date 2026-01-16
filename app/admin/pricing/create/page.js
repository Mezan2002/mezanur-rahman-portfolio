"use client";

import PricingForm from "@/components/admin/PricingForm";
import { createPricing } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function CreatePricingPage() {
  const router = useRouter();

  const handleCreate = async (data) => {
    await createPricing(data);
    router.push("/admin/pricing");
  };

  return (
    <div className="max-w-5xl mx-auto">
      <PricingForm onSubmit={handleCreate} />
    </div>
  );
}
