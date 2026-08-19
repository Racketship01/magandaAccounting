export default function useProfile() {
  const profileForm = useState("profileData", () => ({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    jobTitle: "",
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
      },
      profileImage: "",
    };
  };

  const currentUser = useState<EmployeeData | null>("currentUser", () => null);

  const { refresh } = useAsyncData("getCurrentUser", async () => {
    const response = await $fetch<{ currentUser: EmployeeData }>(
      "/api/getCurrentUser",
      {
        headers: useRequestHeaders(["cookie"]),
      },
    );
    if (response?.currentUser) {
      currentUser.value = {
        ...response.currentUser,
      };
    }

    return response;
  });

  return {
    profileForm,
    resetForm,
    currentUser,
    refresh,
  };
}
