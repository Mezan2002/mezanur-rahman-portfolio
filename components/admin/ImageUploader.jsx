"use client";

import { Loader2, Trash2, UploadCloud } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";

export default function ImageUploader({
  value,
  onChange,
  className = "",
  onUploadStart,
  onUploadEnd,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleUpload = useCallback(
    async (file) => {
      if (!file) return;

      // Validate type
      if (!file.type.startsWith("image/")) {
        setError("Please upload an image file");
        return;
      }

      // Validate size (e.g., 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB");
        return;
      }

      try {
        setLoading(true);
        if (onUploadStart) onUploadStart();
        setError(null);

        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Upload failed");
        }

        onChange(data.url);
      } catch (err) {
        console.error("Upload error:", err);
        setError(err.message || "Failed to upload image");
      } finally {
        setLoading(false);
        if (onUploadEnd) onUploadEnd();
      }
    },
    [onChange, onUploadStart, onUploadEnd],
  );

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files?.[0];
      handleUpload(file);
    },
    [handleUpload],
  );

  const onFileSelect = (e) => {
    const file = e.target.files?.[0];
    handleUpload(file);
  };

  const handleRemove = () => {
    onChange("");
    setError(null);
  };

  return (
    <div className={`w-full font-sans ${className}`}>
      {value ? (
        <div className="relative aspect-video w-full rounded-3xl overflow-hidden border border-white/10 bg-black/50 group">
          {String(value).includes("http") ||
          String(value).startsWith("data:") ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={value}
              alt="Blog cover"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <Image
              src={value}
              alt="Uploaded image"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              unoptimized
            />
          )}

          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              onClick={handleRemove}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/80 backdrop-blur-md text-white rounded-full hover:bg-red-500 transition-colors font-bold text-xs uppercase tracking-wider"
            >
              <Trash2 size={16} />
              <span>Remove Image</span>
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={`relative border-2 border-dashed rounded-3xl transition-all h-[250px] flex flex-col items-center justify-center gap-4 text-center cursor-pointer group ${
            isDragging
              ? "border-primary bg-primary/5 scale-[1.02]"
              : "border-white/10 bg-white/2 hover:bg-white/5 hover:border-white/20"
          } ${error ? "border-red-500/50 bg-red-500/5" : ""}`}
        >
          <input
            type="file"
            accept="image/*"
            onChange={onFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            disabled={loading}
          />

          {loading ? (
            <div className="flex flex-col items-center gap-3 text-primary animate-pulse">
              <Loader2 size={40} className="animate-spin" />
              <span className="text-xs font-mono uppercase tracking-widest">
                Uploading to Cloud...
              </span>
            </div>
          ) : (
            <>
              <div
                className={`p-4 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors ${
                  isDragging ? "text-primary" : "text-gray-400"
                }`}
              >
                <UploadCloud size={32} />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-white font-syne tracking-wide">
                  {isDragging
                    ? "Drop it like it's hot!"
                    : "Click or Drag Image Here"}
                </p>
                <p className="text-xs font-mono text-gray-500 uppercase tracking-wider">
                  Supports JPG, PNG, WEBP (Max 5MB)
                </p>
              </div>
            </>
          )}

          {error && (
            <div className="absolute bottom-4 left-0 right-0 px-4">
              <p className="text-xs font-bold text-red-400 bg-red-500/10 py-1 px-3 rounded-full inline-block border border-red-500/20">
                {error}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
