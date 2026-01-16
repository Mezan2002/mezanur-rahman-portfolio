"use client";

import ServiceForm from "@/components/admin/ServiceForm";
import { createService } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function CreateServicePage() {
  const router = useRouter();

  const handleCreate = async (data) => {
    await createService(data);
    router.push("/admin/services");
  };

  return (
    <div className="max-w-5xl mx-auto">
      <ServiceForm onSubmit={handleCreate} />
    </div>
  );
}
