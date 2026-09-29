<!-- @format -->

<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { ref } from "vue";
import { useReceipt } from "../composables/useReceipt";
import useToastGlobal from "../../../base/app/composables/useToast";

const { extractedData, formData, uploadedImage, resetForm } = useReceipt();
const isProcessing = ref(false);
const { toast } = useToastGlobal();
const categories = [
  { label: "Food & Dining", value: "food", icon: "i-lucide-utensils" },
  { label: "Transportation", value: "transport", icon: "i-lucide-car" },
  { label: "OfficeSupply", value: "office", icon: "i-lucide-paperclip" },
  { label: "Utilities", value: "utilities", icon: "i-lucide-zap" },
  {
    label: "Healthcare",
    value: "healthcare",
    icon: "i-lucide-heart-handshake",
  },
  { label: "Other", value: "other", icon: "i-lucide-list-check" },
];

const currencies = [
  { label: "USD ($)", value: "USD", symbol: "$" },
  { label: "PHP (₱)", value: "PHP", symbol: "₱" },
  { label: "KRW (₩)", value: "KRW", symbol: "₩" },
];

const getCurrencySymbol = (currency: string) => {
  const currencyObj = currencies.find((c) => c.value === currency);
  return currencyObj?.symbol || "$";
};

// TODO: Implement OCR service-----------------
// SCANNER: Mock OCR function - In production, you'd use a service like Google Vision API, AWS Textract, or Tesseract.js
const extractReceiptData = async (
  imageFile: File,
): Promise<typeof extractedData.value> => {
  // 1. Convert file to base64 Data URL
  const base64 = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(imageFile);
  });

  // 2. Call the server api endpoint
  const response = await $fetch("/api/expense/scan", {
    method: "POST",
    body: { image: base64 },
  });

  // 3. Return the parsed fields
  console.log(response);
  extractedData.value.amount = response.amount;
  extractedData.value.date = response.date;
  extractedData.value.merchantName = response.merchantName;

  return response;
};

const handleFileUpload = async (files: FileList | null) => {
  if (!files || files.length === 0) return;

  const file = files[0];
  if (!file || !file.type.startsWith("image/")) {
    toast.add({ title: "Please upload an image file", color: "error" });
    return;
  }

  // Display uploaded image
  const reader = new FileReader();
  reader.onload = (e) => {
    const result = e.target?.result;
    if (result && typeof result === "string") {
      uploadedImage.value = result;
    }
  };
  reader.readAsDataURL(file);

  // Process with OCR
  isProcessing.value = true;
  try {
    const extracted = await extractReceiptData(file);
    extractedData.value = extracted;

    // Auto-populate form fields
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
};

const handleDrop = (e: DragEvent) => {
  e.preventDefault();
  const files = e.dataTransfer?.files || null;
  handleFileUpload(files);
};

const handleDragOver = (e: DragEvent) => {
  e.preventDefault();
};

const submitExpense = async () => {
  if (
    !formData.value?.amount ||
    !formData.value.date ||
    !formData.value.merchantName ||
    !formData.value.category ||
    !formData.value.description ||
    !formData.value.currency ||
    !uploadedImage.value
  ) {
    toast.add({ title: "Please fill in all required fields", color: "error" });
    return;
  }
  try {
    isProcessing.value = true;

    // Save to server database
    const savedExpense = await $fetch("/api/expense/createExpense", {
      method: "POST",
      body: {
        amount: formData.value.amount,
        date: formData.value.date,
        merchantName: formData.value.merchantName,
        category: formData.value.category,
        description: formData.value.description,
        currency: formData.value.currency, // Holds the raw base64 data url
        image: uploadedImage.value,
      },
    });
    console.log("Saved Expense:", savedExpense);
    toast.add({ title: "Expense added successfully!", color: "success" });

    // Reset scanner states
    resetForm();
  } catch (error) {
    console.error("Failed to save expense:", error);
    toast.add({ title: "Error adding expense!", color: "error" });
  } finally {
    isProcessing.value = false;
  }

  // Reset form
  resetForm();
};
</script>

<template>
  <Card
    title="Receipt Scanner"
    subtitle="Upload Receipt & Extract Data"
    description="Upload a receipt to automatically extract expense details"
    :showStats="false"
    :showScanner="false"
    :showFilters="false"
    :showActions="false"
    contentHeight="scanner"
  >
    <template #content>
      <div class="receipt-scanner__grid">
        <!-- Left Side - Image Upload -->
        <UCard class="receipt-scanner__grid-col">
          <h2 class="receipt-scanner__title">Upload Receipt</h2>

          <!-- Upload Area -->

          <div
            class="receipt-scanner__dropzone"
            :class="{
              'receipt-scanner__dropzone--active': isProcessing,
            }"
            @drop="handleDrop"
            @dragover="handleDragOver"
          >
            <div v-if="!uploadedImage && !isProcessing" class="space-y-4">
              <UIcon
                name="i-lucide-upload-cloud"
                class="receipt-scanner__dropzone--icon"
              />
              <div class="space-y-2">
                <p class="receipt-scanner__dropzone--heading">
                  Drop your receipt here
                </p>
                <p class="receipt-scanner__dropzone--text">
                  or click to browse files
                </p>
              </div>

              <!-- @vue-ignore -->
              <UButton
                color="primary"
                class="mt-4"
                @click="() => ($refs.fileInput as HTMLInputElement)?.click()"
              >
                Choose File
              </UButton>
              <input
                ref="fileInput"
                type="file"
                accept="image/*"
                class="hidden"
                @change="
                  handleFileUpload(($event.target as HTMLInputElement)?.files)
                "
              />
            </div>

            <!-- Processing State -->
            <div v-else-if="isProcessing" class="space-y-4">
              <UIcon
                name="i-lucide-loader-2"
                class="receipt-scanner__dropzone-extract"
              />
              <p class="receipt-scanner__dropzone--heading">
                Processing receipt...
              </p>
              <p class="receipt-scanner__dropzone--text">
                Extracting data automatically
              </p>
            </div>

            <!-- Uploaded Image -->
            <div
              v-else-if="uploadedImage"
              class="receipt-scanner__dropzone--image"
            >
              <img
                :src="uploadedImage"
                alt="Uploaded receipt"
                class="receipt-scanner__image"
              />
              <div class="receipt-scanner__dropzone--image-button">
                <UButton
                  color="neutral"
                  size="lg"
                  variant="outline"
                  @click="resetForm"
                >
                  Upload New
                </UButton>
              </div>
            </div>
          </div>
        </UCard>

        <!-- Right Side - Form Fields -->

        <UCard class="receipt-scanner__form">
          <h2 class="receipt-scanner__form-title">Expense Details</h2>

          <form
            @submit.prevent="submitExpense"
            class="receipt-scanner__form-action"
          >
            <div class="receipt-scanner__form-field">
              <!-- Currency and Amount Fields -->
              <div class="receipt-scanner__form-field--currency">
                <!-- Currency Field -->
                <UFormGroup label="Currency" class="md:col-span-1">
                  <USelect
                    v-model="formData.currency"
                    :items="currencies"
                    placeholder="Select currency"
                    size="lg"
                    class="w-full"
                  />
                </UFormGroup>

                <!-- Amount Field -->
                <UFormGroup label="Amount" required class="md:col-span-2">
                  <UInput
                    v-model="formData.amount"
                    type="number"
                    step="0.01"
                    :placeholder="`0.00`"
                    size="lg"
                    class="w-full"
                  >
                    <template #leading>
                      <span class="text-gray-500 font-medium">
                        {{ getCurrencySymbol(formData.currency) }}
                      </span>
                    </template>
                  </UInput>
                </UFormGroup>
              </div>

              <!-- Date Field -->
              <UFormGroup label="Date *" required>
                <UInput
                  v-model="formData.date"
                  type="date"
                  icon="i-lucide-calendar"
                  size="lg"
                  class="w-full"
                />
              </UFormGroup>

              <!-- Merchant Name Field -->
              <UFormGroup label="Merchant Name *" required>
                <UInput
                  v-model="formData.merchantName"
                  placeholder="Store or business name"
                  icon="i-lucide-store"
                  size="lg"
                  class="w-full"
                />
              </UFormGroup>

              <!-- Category Field -->
              <UFormGroup label="Category">
                <USelect
                  v-model="formData.category"
                  :items="categories"
                  placeholder="Select category"
                  icon="i-lucide-list-check"
                  size="lg"
                  class="w-full"
                />
              </UFormGroup>
            </div>

            <!-- Description Field -->
            <div class="receipt-scanner__form-note--box">
              <h4 class="receipt-scanner__form-subtitle">
                Description (Optional)
              </h4>
              <UFormGroup
                label="Description"
                class="flex-1 min-h-0 flex flex-col"
              >
                <UTextarea
                  v-model="formData.description"
                  placeholder="Additional notes or description"
                  :rows="12"
                  class="w-full flex-1"
                />
              </UFormGroup>
            </div>

            <!-- Submit Button -->
            <div class="flex justify-end flex-shrink-0 pt-4">
              <div class="flex gap-5">
                <UButton
                  label="Reset"
                  type="button"
                  icon="i-lucide-refresh-ccw"
                  variant="outline"
                  @click="resetForm"
                >
                  Reset
                </UButton>
                <UButton
                  label="Submit Expense"
                  type="submit"
                  color="primary"
                  size="lg"
                  :disabled="
                    !formData.amount || !formData.date || !formData.merchantName
                  "
                >
                  Submit Expense
                </UButton>
              </div>
            </div>
          </form>
        </UCard>
      </div>
    </template>

    <template #modals></template>
  </Card>
</template>
