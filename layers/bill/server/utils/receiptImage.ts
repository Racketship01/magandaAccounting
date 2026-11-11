import { put } from "@vercel/blob";

const EXTENSION_BY_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "application/pdf": "pdf",
};

/**
 * Uploads a base64 data URL receipt to Vercel Blob and returns its https URL.
 *
 * Values that are already URLs (or absent) are returned unchanged, so this is
 * safe to call on every create/update. Storing a URL instead of the base64
 * payload keeps the database small and lets the receipt open in a new tab,
 * which browsers refuse to do for `data:` URLs.
 */
export async function persistReceiptImage(
  receiptImage?: string,
): Promise<string | undefined> {
  if (!receiptImage?.startsWith("data:")) {
    return receiptImage;
  }

  const commaIndex = receiptImage.indexOf(",");
  if (commaIndex === -1) {
    return undefined;
  }

  const [mime = ""] = receiptImage.slice(5, commaIndex).split(";");
  const payload = receiptImage.slice(commaIndex + 1);
  const extension = EXTENSION_BY_MIME[mime] ?? "png";

  const blob = await put(
    `receipts/receipt_${Date.now()}.${extension}`,
    Buffer.from(payload, "base64"),
    { access: "public", addRandomSuffix: true },
  );

  return blob.url;
}
