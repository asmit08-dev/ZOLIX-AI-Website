"use client";

import { useCallback, useState } from "react";
import Cropper, { type Area, type Point } from "react-easy-crop";
import { LoaderCircle, X } from "lucide-react";
import { getCroppedImageBlob } from "./cropImage";

type Props = {
  imageUrl: string;
  onApply: (blob: Blob) => void;
  onSkip: () => void;
  onError: (message: string) => void;
};

export function CropModal({ imageUrl, onApply, onSkip, onError }: Props) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);
  const [applying, setApplying] = useState(false);

  const handleCropComplete = useCallback((_area: Area, areaPixels: Area) => {
    setCroppedArea(areaPixels);
  }, []);

  async function handleApply() {
    if (!croppedArea) return;
    setApplying(true);
    try {
      const blob = await getCroppedImageBlob(imageUrl, croppedArea);
      onApply(blob);
    } catch {
      onError("Can't crop this image (blocked by the source site) — using it as-is.");
    } finally {
      setApplying(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-zolix-dark/60 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-5 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-bold text-zolix-dark">Crop cover image</h3>
          <button type="button" onClick={onSkip} className="text-zolix-dark/40 hover:text-zolix-dark" aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="relative h-80 w-full overflow-hidden rounded-xl bg-zolix-dark/5">
          <Cropper
            image={imageUrl}
            crop={crop}
            zoom={zoom}
            aspect={16 / 9}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={handleCropComplete}
          />
        </div>

        <label className="mt-4 flex items-center gap-3 text-xs font-bold text-zolix-dark/60">
          Zoom
          <input
            type="range"
            min={1}
            max={3}
            step={0.01}
            value={zoom}
            onChange={(event) => setZoom(Number(event.target.value))}
            className="flex-1 accent-zolix-orange"
          />
        </label>

        <div className="mt-5 flex justify-end gap-3">
          <button
            type="button"
            onClick={onSkip}
            disabled={applying}
            className="rounded-lg px-4 py-2 text-sm font-bold text-zolix-dark/60 transition hover:bg-zolix-beige/70 disabled:opacity-50"
          >
            Skip
          </button>
          <button
            type="button"
            onClick={handleApply}
            disabled={applying || !croppedArea}
            className="inline-flex items-center gap-2 rounded-lg bg-zolix-orange px-4 py-2 text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {applying && <LoaderCircle size={14} className="animate-spin" />}
            Apply crop
          </button>
        </div>
      </div>
    </div>
  );
}
