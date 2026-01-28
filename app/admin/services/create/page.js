"use client";

import ServiceForm from "@/components/admin/ServiceForm";
import Toast from "@/components/admin/Toast";
import { createService } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateServicePage() {
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
      await createService(data);
      showToast("Service created successfully!");

      setTimeout(() => {
        router.push("/admin/services");
      }, 2000);
    } catch (err) {
      showToast("Failed to create service.", "error");
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
      <ServiceForm onSubmit={handleCreate} />
    </div>
  );
}
