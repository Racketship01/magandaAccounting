import fs from "fs/promises";
import path from "path";

export const useUploadImage = async (image: string) => {
  const base64Data = image.split(",")[1];
  const filename = `receipt_${Date.now()}.png`;
  const uploadDir = path.join(process.cwd(), "public/uploads");

  // Ensure folder exists
  await fs.mkdir(uploadDir, { recursive: true });
  await fs.writeFile(path.join(uploadDir, filename), base64Data, "base64");

  return `/uploads/${filename}`;
};
