"use client";

import TestimonialForm from "@/components/admin/TestimonialForm";
import { createTestimonial } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function CreateTestimonialPage() {
  const router = useRouter();

  const handleCreate = async (data) => {
    try {
      await createTestimonial(data);
      router.push("/admin/testimonials");
    } catch (error) {
      throw error; // Form handles error display
    }
  };

  return <TestimonialForm onSubmit={handleCreate} />;
}
