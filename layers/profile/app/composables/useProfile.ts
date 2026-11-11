import type { EmployeeData } from "./useEmployee";

// How long the cached current user is considered fresh before refetching.
const CACHE_TTL = 60_000;

export default function useProfile() {
  const profileForm = useState("profileData", () => ({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    jobTitle: "",
    nationality: "",
    department: "",
    startDate: "",
    salary: 0,
    currency: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
    },
    credentials: {
      username: "",
      email: "",
      password: "",
      newPassword: "",
    },
    profileImage: "",
  }));

  const resetForm = () => {
    profileForm.value = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      jobTitle: "",
      nationality: "",
      department: "",
      startDate: "",
      salary: 0,
      currency: "",
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
      },
      credentials: {
        username: "",
        email: "",
        password: "",
        newPassword: "",
      },
      profileImage: "",
    };
  };

  const currentUserFetchedAt = useState<number>(
    "currentUserFetchedAt",
    () => 0,
  );

  // Single source of truth for the signed-in user, shared across consumers.
  const {
    data: currentUser,
    status: currentUserStatus,
    error: currentUserError,
    refresh,
  } = useAsyncData<EmployeeData | null>(
    "currentUser",
    async () => {
      const response = await $fetch<{ currentUser: EmployeeData | null }>(
        "/api/getCurrentUser",
        {
          headers: useRequestHeaders(["cookie"]),
        },
      );
      currentUserFetchedAt.value = Date.now();
      return response?.currentUser ?? null;
    },
    {
      default: () => null,
      dedupe: "cancel",
      // Reuse fresh cache instead of refetching on every mount/navigation.
      getCachedData: (key, nuxtApp) => {
        const cached = nuxtApp.payload.data[key] ?? nuxtApp.static.data[key];
        const isFresh =
          cached && Date.now() - currentUserFetchedAt.value < CACHE_TTL;
        return isFresh ? cached : undefined;
      },
    },
  );

  // Immediately reflect a profile change in every consumer of currentUser.
  // Merges into the existing value so fields not present in the form
  // (e.g. role) are preserved instead of being dropped.
  const updateCurrentUser = (profile: Partial<EmployeeData>) => {
    currentUser.value = {
      ...(currentUser.value ?? {}),
      ...profile,
    } as EmployeeData;
  };

  return {
    profileForm,
    resetForm,
    currentUser,
    currentUserStatus,
    currentUserError,
    updateCurrentUser,
    refresh,
  };
}
