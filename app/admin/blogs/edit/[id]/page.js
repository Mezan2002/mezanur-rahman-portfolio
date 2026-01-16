"use client";

import BlogForm from "@/components/admin/BlogForm";
import { getBlogById, getBlogs, updateBlog } from "@/lib/api";
import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        // Try fetching specifically by ID first
        let res = await getBlogById(id).catch(() => ({ data: null }));
        let blogData = res.data;

        // Fallback: If not found, look in all blogs
        if (!blogData) {
          const allBlogsRes = await getBlogs();
          const allBlogs = allBlogsRes.data || [];
          blogData = allBlogs.find((b) => (b._id || b.id) === id);
        }

        if (!blogData) {
          throw new Error("Blog post not found");
        }

        setBlog(blogData);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError(err.message || "Failed to fetch blog data");
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleUpdate = async (data) => {
    await updateBlog(id, data);
    router.push("/admin/blogs");
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">
          Loading post data...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-red-500">
        <p>Error: {error}</p>
        <button
          onClick={() => router.push("/admin/blogs")}
          className="mt-4 text-white underline"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <BlogForm initialData={blog} isEditing={true} onSubmit={handleUpdate} />
    </div>
  );
}
