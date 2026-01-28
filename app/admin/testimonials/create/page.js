"use client";

import TestimonialForm from "@/components/admin/TestimonialForm";
import Toast from "@/components/admin/Toast";
import { createTestimonial } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateTestimonialPage() {
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
      await createTestimonial(data);
      showToast("Testimonial created successfully!");

      setTimeout(() => {
        router.push("/admin/testimonials");
      }, 2000);
    } catch (error) {
      showToast("Failed to create testimonial.", "error");
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
      <TestimonialForm onSubmit={handleCreate} />
    </div>
  );
}
