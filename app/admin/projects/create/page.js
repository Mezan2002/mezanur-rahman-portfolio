"use client";

import ProjectForm from "@/components/admin/ProjectForm";
import Toast from "@/components/admin/Toast";
import { createProject } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateProjectPage() {
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
      await createProject(data);
      showToast("Project created successfully!");

      // Delay redirect to let user see the toast
      setTimeout(() => {
        router.push("/admin/projects");
      }, 2000);
    } catch (err) {
      console.error("Failed to create project:", err);
      showToast("Failed to create project.", "error");
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
      <ProjectForm onSubmit={handleCreate} />
    </div>
  );
}
