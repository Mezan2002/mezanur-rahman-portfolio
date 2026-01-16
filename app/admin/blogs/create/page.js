"use client";

import BlogForm from "@/components/admin/BlogForm";
import { createBlog } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function CreateBlogPage() {
  const router = useRouter();

  const handleCreate = async (data) => {
    await createBlog(data);
    router.push("/admin/blogs");
  };

  // Pass empty initialData (managed by defaults in BlogForm)
  return (
    <div className="max-w-5xl mx-auto">
      <BlogForm onSubmit={handleCreate} />
    </div>
  );
}
