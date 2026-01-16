"use client";

import TestimonialForm from "@/components/admin/TestimonialForm";
import { getTestimonialById, updateTestimonial } from "@/lib/api";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditTestimonialPage() {
  const router = useRouter();
  const { id } = useParams();
  const [initialData, setInitialData] = useState({});
  const [loading, setLoading] = useState(true);

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
      router.push("/admin/testimonials");
    } catch (error) {
      throw error;
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
    <TestimonialForm
      initialData={initialData}
      isEditing={true}
      onSubmit={handleUpdate}
    />
  );
}
