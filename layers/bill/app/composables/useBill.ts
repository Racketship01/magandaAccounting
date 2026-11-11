export interface Bill {
  id?: string;
  title: string;
  amount: number;
  category: string;
  dueDate: string;
  isRecurring: boolean;
  recurringType?: "monthly" | "quarterly" | "yearly";
  reminderDays: number;
  isPaid: boolean;
  paidDate?: string;
  createdAt: string;
  receiptImage?: string;
  reminderEnabled: boolean;
  currency?: string;
}

// How long a cached list is considered fresh before a navigation refetches it.
const CACHE_TTL = 60_000;

export default function useBill() {
  const billFormData = useState<Bill>("billFormData", () => ({
    title: "",
    amount: 0,
    category: "",
    dueDate: "",
    isRecurring: false,
    recurringType: "monthly",
    reminderDays: 7,
    isPaid: false,
    paidDate: "",
    createdAt: "",
    reminderEnabled: true,
    currency: "USD",
  }));

  const resetForm = () => {
    billFormData.value = {
      title: "",
      amount: 0,
      category: "",
      dueDate: "",
      isRecurring: false,
      recurringType: "monthly",
      reminderDays: 7,
      isPaid: false,
      paidDate: "",
      createdAt: "",
      reminderEnabled: true,
      currency: "USD",
    };
  };

  const bill = useState<Bill | null>("bill", () => null);

  // Timestamp of the last successful fetch, shared across consumers of "bills".
  const billsFetchedAt = useState<number>("billsFetchedAt", () => 0);

  // Single source of truth for the bills list. Every component that calls
  // useBill() shares this same ref (Nuxt caches by key), so no parallel
  // useState copy is needed.
  const {
    data: bills,
    status: billsStatus,
    error: billsError,
    refresh,
  } = useAsyncData<Bill[]>(
    "bills",
    async () => {
      const response = await $fetch<{ bills: Bill[] }>("/api/getBills", {
        headers: useRequestHeaders(["cookie"]),
      });
      billsFetchedAt.value = Date.now();
      return response?.bills ?? [];
    },
    {
      default: () => [] as Bill[],
      dedupe: "cancel",
      // Reuse fresh cache instead of refetching on every mount/navigation.
      getCachedData: (key, nuxtApp) => {
        const cached = nuxtApp.payload.data[key] ?? nuxtApp.static.data[key];
        const isFresh = cached && Date.now() - billsFetchedAt.value < CACHE_TTL;
        return isFresh ? cached : undefined;
      },
    },
  );

  const billState = useState("billState", () => ({
    searchQuery: "",
    selectedCategory: "",
    selectedStatus: "",
  }));

  // Reconcile a single bill from an authoritative server response.
  const upsertBill = (updated: Bill) => {
    const index = bills.value.findIndex((b) => b.id === updated.id);
    if (index !== -1) {
      bills.value[index] = { ...bills.value[index], ...updated };
    } else if (updated.id) {
      bills.value = [updated, ...bills.value];
    }
  };

  const removeBill = (id?: string) => {
    if (!id) return;
    bills.value = bills.value.filter((b) => b.id !== id);
  };

  return {
    bill,
    bills,
    billsStatus,
    billsError,
    billState,
    refresh,
    upsertBill,
    removeBill,
    billFormData,
    resetForm,
  };
}
