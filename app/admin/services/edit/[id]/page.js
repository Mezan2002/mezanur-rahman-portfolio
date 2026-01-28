"use client";

import ServiceForm from "@/components/admin/ServiceForm";
import Toast from "@/components/admin/Toast";
import { getServiceById, getServices, updateService } from "@/lib/api";
import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditServicePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [service, setService] = useState(null);
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
    const fetchService = async () => {
      try {
        setLoading(true);
        // Try fetching by ID first
        try {
          const res = await getServiceById(id);
          if (res.data) {
            setService(res.data);
            return;
          }
        } catch (err) {
          // If fetch by ID fails (e.g. 404 or not implemented properly on backend yet), fall back to getting all services
          console.warn("Direct fetch failed, trying fallback...", err);
        }

        // Fallback: Fetch all and find
        const resAll = await getServices();
        const found = resAll.data.find((s) => (s._id || s.id) === id);

        if (found) {
          setService(found);
        } else {
          setError("Service not found");
        }
      } catch (err) {
        setError(err.message || "Failed to fetch service");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchService();
    }
  }, [id]);

  const handleUpdate = async (data) => {
    try {
      await updateService(id, data);
      showToast("Service updated successfully!");

      setTimeout(() => {
        router.push("/admin/services");
      }, 2000);
    } catch (err) {
      showToast("Failed to update service.", "error");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Error: {error}
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
      <ServiceForm
        initialData={service}
        isEditing={true}
        onSubmit={handleUpdate}
      />
    </div>
  );
}
