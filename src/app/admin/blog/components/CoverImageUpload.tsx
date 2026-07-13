"use client";

import { useRef, useState, type DragEvent } from "react";
import { ImagePlus, LoaderCircle, RefreshCw, X } from "lucide-react";

type CoverImage = { url: string; alt: string };

type Props = {
  value: CoverImage;
  onChange: (value: CoverImage) => void;
  token: string;
};

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

export function CoverImageUpload({ value, onChange, token }: Props) {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [manualUrl, setManualUrl] = useState(false);
  const [loadedUrl, setLoadedUrl] = useState("");
  const imageLoaded = loadedUrl === value.url;
  const dragDepth = useRef(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function upload(file: File) {
    setError("");
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setError("Only JPEG, PNG, WebP, and GIF images are supported.");
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setError("Images must be 5MB or smaller.");
      return;
    }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/blog-images", { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: formData });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Image upload failed.");
      onChange({ ...value, url: data.url as string });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Image upload failed.");
    } finally {
      setUploading(false);
    }
  }

  function handleDragEnter(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    dragDepth.current += 1;
    if (event.dataTransfer.types.includes("Files")) setDragActive(true);
  }

  function handleDragLeave(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    dragDepth.current = Math.max(0, dragDepth.current - 1);
    if (dragDepth.current === 0) setDragActive(false);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    dragDepth.current = 0;
    setDragActive(false);
    const file = Array.from(event.dataTransfer.files).find((candidate) => ALLOWED_IMAGE_TYPES.includes(candidate.type));
    if (file) void upload(file);
  }

  return (
    <div>
      <div
        onDragEnter={handleDragEnter}
        onDragOver={(event) => event.preventDefault()}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !value.url && !uploading && fileInputRef.current?.click()}
        className={`group relative flex min-h-44 w-full items-center justify-center overflow-hidden rounded-2xl border-2 transition-all duration-200 ${
          dragActive
            ? "scale-[1.01] border-dashed border-zolix-orange bg-zolix-orange/10"
            : value.url
              ? "border-zolix-dark/10 bg-zolix-beige/40"
              : "border-dashed border-zolix-dark/15 bg-zolix-beige/40"
        } ${!value.url ? "cursor-pointer hover:border-zolix-orange/50 hover:bg-zolix-beige/70" : ""}`}
      >
        {value.url ? (
          <>
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <LoaderCircle size={22} className="animate-spin text-zolix-orange" />
              </div>
            )}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value.url}
              alt=""
              onLoad={() => setLoadedUrl(value.url)}
              onError={() => setLoadedUrl(value.url)}
              className={`h-44 w-full object-cover transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            />
            <div className="absolute inset-0 flex items-center justify-center gap-2 bg-zolix-dark/0 opacity-0 transition-all duration-200 group-hover:bg-zolix-dark/50 group-hover:opacity-100">
              <button
                type="button"
                onClick={(event) => { event.stopPropagation(); fileInputRef.current?.click(); }}
                className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-xs font-bold text-zolix-dark transition hover:bg-zolix-beige"
              >
                <RefreshCw size={13} /> Replace
              </button>
              <button
                type="button"
                onClick={(event) => { event.stopPropagation(); onChange({ ...value, url: "" }); }}
                className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-50"
              >
                <X size={13} /> Remove
              </button>
            </div>
          </>
        ) : (
          <div className="pointer-events-none flex flex-col items-center gap-2 px-4 py-8 text-center">
            {uploading ? (
              <LoaderCircle size={26} className="animate-spin text-zolix-orange" />
            ) : (
              <ImagePlus size={26} className={`transition-colors ${dragActive ? "text-zolix-orange" : "text-zolix-dark/30"}`} />
            )}
            <p className="text-sm font-bold text-zolix-dark/70">{uploading ? "Uploading…" : dragActive ? "Drop it here" : "Drag and drop a cover image"}</p>
            {!uploading && <p className="text-xs text-zolix-dark/40">or click to browse · JPEG, PNG, WebP, GIF · up to 5MB</p>}
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={ALLOWED_IMAGE_TYPES.join(",")}
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) void upload(file);
          event.target.value = "";
        }}
      />

      {error && <p className="mt-2 text-xs font-bold text-red-600">{error}</p>}

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <label className="text-xs font-bold text-zolix-dark/70">
          Alt text
          <input
            value={value.alt}
            onChange={(event) => onChange({ ...value, alt: event.target.value })}
            placeholder="Describe the image"
            className="mt-1 w-full rounded-lg border border-zolix-dark/15 px-3 py-2 text-sm font-normal outline-none focus:border-zolix-orange"
          />
        </label>
        <div className="flex items-end pb-1">
          <button type="button" onClick={() => setManualUrl((prev) => !prev)} className="text-xs font-bold text-zolix-dark/40 underline decoration-dotted underline-offset-2 hover:text-zolix-orange">
            {manualUrl ? "Hide URL field" : "Or paste an image URL instead"}
          </button>
        </div>
        {manualUrl && (
          <label className="text-xs font-bold text-zolix-dark/70 sm:col-span-2">
            Image URL
            <input
              value={value.url}
              onChange={(event) => onChange({ ...value, url: event.target.value })}
              placeholder="https://…"
              className="mt-1 w-full rounded-lg border border-zolix-dark/15 px-3 py-2 text-sm font-normal outline-none focus:border-zolix-orange"
            />
          </label>
        )}
      </div>
    </div>
  );
}
