"use client";

import TestimonialForm from "@/components/admin/TestimonialForm";
import Toast from "@/components/admin/Toast";
import { getTestimonialById, updateTestimonial } from "@/lib/api";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditTestimonialPage() {
  const router = useRouter();
  const { id } = useParams();
  const [initialData, setInitialData] = useState({});
  const [loading, setLoading] = useState(true);

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
    const fetchTestimonial = async () => {
      try {
        const res = await getTestimonialById(id);
        if (res.success) {
          setInitialData(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch testimonial:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTestimonial();
    }
  }, [id]);

  const handleUpdate = async (data) => {
    try {
      await updateTestimonial(id, data);
      showToast("Testimonial updated successfully!");

      setTimeout(() => {
        router.push("/admin/testimonials");
      }, 2000);
    } catch (error) {
      showToast("Failed to update testimonial.", "error");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
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
      <TestimonialForm
        initialData={initialData}
        isEditing={true}
        onSubmit={handleUpdate}
      />
    </div>
  );
}
