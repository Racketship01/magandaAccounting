interface FormData {
  amount: string;
  date: string;
  merchantName: string;
  currency?: string;
  category?: string;
  description?: string;
}

export const useReceipt = () => {
  const extractedData = useState<FormData>("extractedData", () => ({
    amount: "",
    date: "",
    merchantName: "",
  }));

  const formData = useState<FormData>("formData", () => ({
    amount: "",
    currency: "USD",
    date: "",
    merchantName: "",
    category: "",
    description: "",
  }));

  const uploadedImage = useState<string | null>("uploadedImage", () => null);

  const resetForm = () => {
    uploadedImage.value = null;
    formData.value = {
      amount: "",
      currency: "USD",
      date: "",
      merchantName: "",
      category: "",
      description: "",
    };
    extractedData.value = {
      amount: "",
      date: "",
      merchantName: "",
    };
  };
  return {
    extractedData,
    formData,
    uploadedImage,
    resetForm,
  };
};
