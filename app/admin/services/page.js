"use client";

import ConfirmationModal from "@/components/admin/ConfirmationModal";
import { deleteService, getServices } from "@/lib/api";
import gsap from "gsap";
import * as Icons from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function ServicesPage() {
  const containerRef = useRef(null);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    id: null,
  });

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await getServices();
      setServices(response.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (id) => {
    setDeleteModal({ isOpen: true, id });
  };

  const handleDelete = async () => {
    const id = deleteModal.id;
    if (!id) return;

    try {
      await deleteService(id);
      setServices(services.filter((service) => service._id !== id));
      setDeleteModal({ isOpen: false, id: null });
    } catch (err) {
      alert("Failed to delete service: " + err.message);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    if (!loading && services.length > 0) {
      const ctx = gsap.context(() => {
        gsap.set(".service-card", { opacity: 0, y: 30 });
        gsap.to(".service-card", {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "all",
        });
      }, containerRef);
      return () => ctx.revert();
    }
  }, [loading, services]);

  const filteredServices = services.filter((service) =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getIcon = (iconName) => {
    const Icon = Icons[iconName] || Icons.Zap;
    return <Icon size={24} strokeWidth={1.5} />;
  };

  return (
    <div ref={containerRef} className="space-y-8 min-h-screen">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-xs font-mono text-primary mb-2 tracking-widest uppercase">
            Admin Portal / Content
          </p>
          <h1 className="text-4xl md:text-5xl font-black font-syne uppercase text-white leading-none">
            Services
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-white/5 border border-white/10 rounded-full flex items-center px-4 py-3 w-64 backdrop-blur-md focus-within:border-primary/50 transition-colors">
              <Icons.Search size={16} className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent border-none outline-none text-sm text-white placeholder-gray-500 font-mono w-full"
              />
            </div>
          </div>

          <Link
            href="/admin/services/create"
            className="group relative px-6 py-3 bg-white text-black font-bold font-syne uppercase tracking-wider rounded-full overflow-hidden hover:scale-105 transition-transform"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Icons.Plus size={18} />
              <span>Create</span>
            </span>
            <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-64 bg-white/5 rounded-3xl animate-pulse"
            ></div>
          ))}
        </div>
      ) : error ? (
        <div className="text-red-400 font-mono p-8 border border-red-500/20 rounded-3xl bg-red-500/5">
          Error: {error}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, index) => (
            <div
              key={service._id || service.id}
              className="service-card bg-white/5 border border-white/5 p-10 flex flex-col justify-between group hover:bg-white/10 transition-all duration-500 min-h-[400px] relative overflow-hidden"
            >
              <div className="space-y-8 relative z-10">
                <div className="flex justify-between items-start">
                  <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:border-primary group-hover:text-black transition-all duration-500 text-2xl font-bold font-syne">
                    {getIcon(service.icon)}
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <span className="font-mono text-sm text-gray-500 group-hover:text-white transition-colors">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Admin Actions - Reveal on Hover */}
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                      <Link
                        href={`/admin/services/edit/${
                          service._id || service.id
                        }`}
                        className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black hover:border-white transition-all"
                        title="Edit Service"
                      >
                        <Icons.Edit2 size={14} />
                      </Link>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          confirmDelete(service._id || service.id);
                        }}
                        className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all"
                        title="Delete Service"
                      >
                        <Icons.Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-3xl font-black font-syne text-white uppercase mb-4 tracking-tight group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors line-clamp-3">
                    {service.description}
                  </p>
                </div>
              </div>

              <div className="pt-8 mt-auto flex flex-wrap gap-2 opacity-50 group-hover:opacity-100 transition-opacity duration-500 relative z-10">
                {(service.tags || service.features || []).map((tag, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-mono uppercase tracking-widest border border-white/10 px-2 py-1 rounded hover:border-primary/50 hover:text-primary transition-colors cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Decorative Background Gradient */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            </div>
          ))}

          {/* Create New Card */}
          <Link
            href="/admin/services/create"
            className="group flex flex-col items-center justify-center min-h-[300px] border-2 border-dashed border-white/10 hover:border-primary/30 hover:bg-primary/5 transition-all duration-500"
          >
            <div className="w-16 h-16 rounded-full border-2 border-white/10 group-hover:border-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Icons.Plus
                size={24}
                className="text-gray-600 group-hover:text-primary transition-colors"
              />
            </div>
            <h3 className="text-xl font-bold font-syne text-gray-600 group-hover:text-white uppercase tracking-wide transition-colors mb-2">
              Add New Service
            </h3>
            <p className="text-sm text-gray-700 group-hover:text-gray-400 transition-colors">
              Create a service offering
            </p>
          </Link>
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        onConfirm={handleDelete}
        title="Delete Service?"
        message="Are you sure you want to delete this service? This action cannot be undone."
      />
    </div>
  );
}
