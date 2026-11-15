export const MAX_IMAGE_BYTES = 2 * 1024 * 1024; // 2 MB

/**
 * Read an image file and downscale it to a small JPEG data URL.
 *
 * Storing a resized (<= `maxSize` px) base64 string keeps the MongoDB
 * documents small and avoids needing a file-storage service.
 */
export function fileToDataUrl(
  file: File,
  maxSize = 512,
  quality = 0.82
): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("Please select an image file (JPG, PNG or WebP)."));
      return;
    }

    if (file.size > MAX_IMAGE_BYTES) {
      reject(new Error("Image must be smaller than 2 MB."));
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
      const width = Math.max(1, Math.round(image.width * scale));
      const height = Math.max(1, Math.round(image.height * scale));

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const context = canvas.getContext("2d");
      if (!context) {
        URL.revokeObjectURL(objectUrl);
        reject(new Error("Could not process the image."));
        return;
      }

      // Flatten transparency so PNGs do not turn black as JPEG.
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, width, height);
      context.drawImage(image, 0, 0, width, height);

      URL.revokeObjectURL(objectUrl);
      resolve(canvas.toDataURL("image/jpeg", quality));
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Could not read the selected image."));
    };

    image.src = objectUrl;
  });
}
