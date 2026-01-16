"use client";

import ProjectForm from "@/components/admin/ProjectForm";
import { createProject } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function CreateProjectPage() {
  const router = useRouter();

  const handleCreate = async (data) => {
    await createProject(data);
    router.push("/admin/projects");
  };

  return (
    <div className="max-w-5xl mx-auto">
      <ProjectForm onSubmit={handleCreate} />
    </div>
  );
}
