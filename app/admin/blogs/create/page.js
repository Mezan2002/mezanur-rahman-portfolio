"use client";

import BlogForm from "@/components/admin/BlogForm";
import Toast from "@/components/admin/Toast";
import { createBlog } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateBlogPage() {
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
      await createBlog(data);
      showToast("Blog post created successfully!");

      setTimeout(() => {
        router.push("/admin/blogs");
      }, 2000);
    } catch (err) {
      showToast("Failed to create blog post.", "error");
    }
  };

  // Pass empty initialData (managed by defaults in BlogForm)
  return (
    <div>
      <Toast
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((prev) => ({ ...prev, isVisible: false }))}
      />
      <BlogForm onSubmit={handleCreate} />
    </div>
  );
}
