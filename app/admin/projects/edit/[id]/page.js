"use client";

import ProjectForm from "@/components/admin/ProjectForm";
import Toast from "@/components/admin/Toast";
import { getProjectById, updateProject } from "@/lib/api";
import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditProjectPage() {
  const { id } = useParams();
  const router = useRouter();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    const fetchProject = async () => {
      try {
        setLoading(true);
        const res = await getProjectById(id);
        setProject(res.data);
      } catch (err) {
        console.error("Failed to fetch project:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  const handleUpdate = async (data) => {
    try {
      await updateProject(id, data);
      showToast("Project updated successfully!");

      // Delay redirect to let user see the toast
      setTimeout(() => {
        router.push("/admin/projects");
      }, 2000);
    } catch (err) {
      console.error("Failed to update project:", err);
      showToast("Failed to update project.", "error");
      throw err;
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">
          Loading Project Data...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 border border-red-500/20 bg-red-500/5 rounded-3xl text-center">
        <p className="text-red-400 font-mono mb-4 text-sm">Error: {error}</p>
        <button
          onClick={() => router.push("/admin/projects")}
          className="px-6 py-2 bg-white text-black font-bold font-syne uppercase text-xs rounded-full"
        >
          Back to Projects
        </button>
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
      <ProjectForm
        initialData={project}
        isEditing={true}
        onSubmit={handleUpdate}
      />
    </div>
  );
}
