import useToastGlobal from "../../../base/app/composables/useToast";
import { useReceipt } from "../composables/useReceipt";

export function useScan() {
  const { toast } = useToastGlobal();
  const { extractedData, formData, uploadedImage, isProcessing } = useReceipt();

  async function extractReceiptData(
    imageFile: File,
  ): Promise<typeof extractedData.value> {
    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(imageFile);
    });

    const response = await $fetch("/api/expense/scan", {
      method: "POST",
      body: { image: base64 },
    });

    return response;
  }

  async function handleFileUpload(files: FileList | null) {
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.add({ title: "Please upload an image file", color: "error" });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (result && typeof result === "string") {
        uploadedImage.value = result;
      }
    };
    reader.readAsDataURL(file);

    isProcessing.value = true;
    try {
      const extracted = await extractReceiptData(file);
      extractedData.value = extracted;

      formData.value.amount = extracted?.amount || "";
      formData.value.date = extracted.date;
      formData.value.merchantName = extracted.merchantName;
    } catch (error) {
      console.error("Error processing receipt:", error);
      toast.add({
        title: "Error processing receipt. Please try again.",
        color: "error",
      });
    } finally {
      isProcessing.value = false;
    }
  }

  return {
    extractReceiptData,
    handleFileUpload,
  };
}
