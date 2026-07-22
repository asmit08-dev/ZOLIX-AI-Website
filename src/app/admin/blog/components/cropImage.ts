import type { Area } from "react-easy-crop";

const MAX_OUTPUT_WIDTH = 1600;
const OUTPUT_ASPECT = 16 / 9;

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Image failed to load."));
    image.src = url;
  });
}

export async function getCroppedImageBlob(imageUrl: string, cropArea: Area): Promise<Blob> {
  const image = await loadImage(imageUrl);

  const outputWidth = Math.min(MAX_OUTPUT_WIDTH, cropArea.width);
  const outputHeight = outputWidth / OUTPUT_ASPECT;

  const canvas = document.createElement("canvas");
  canvas.width = outputWidth;
  canvas.height = outputHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not supported.");

  ctx.drawImage(image, cropArea.x, cropArea.y, cropArea.width, cropArea.height, 0, 0, outputWidth, outputHeight);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Could not export the cropped image."));
      },
      "image/jpeg",
      0.92,
    );
  });
}
