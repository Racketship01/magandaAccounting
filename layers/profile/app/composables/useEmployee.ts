/** @format */

export interface EmployeeData {
  id?: string;
  firstName: string;
  lastName: string;
  role?: "employee" | "admin";
  phone: string;
  nationality: string;
  jobTitle: string;
  department: string;
  startDate: string;
  salary: number;
  currency: string;
  status: "Active" | "Inactive" | "On Leave";
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  credentials: {
    username: string;
    email: string;
    password?: string;
    newPassword?: string;
  };
  profileImage?: string;
}

// How long a cached list is considered fresh before a navigation refetches it.
const CACHE_TTL = 60_000;

export default function useEmployee() {
  const formData = useState<EmployeeData>("employeeFormData", () => ({
    firstName: "",
    lastName: "",
    role: "employee",
    phone: "",
    nationality: "",
    jobTitle: "",
    department: "",
    startDate: "",
    salary: 0,
    currency: "USD",
    status: "Active",
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

  const resetForm = (): any => {
    formData.value = {
      firstName: "",
      lastName: "",
      phone: "",
      nationality: "",
      jobTitle: "",
      department: "",
      startDate: "",
      salary: 0,
      currency: "USD",
      status: "Active",
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

  const employeesFetchedAt = useState<number>("employeesFetchedAt", () => 0);

  // Single source of truth for the employee list, shared across consumers.
  const {
    data: employees,
    status: employeesStatus,
    error: employeesError,
    refresh,
  } = useAsyncData<EmployeeData[]>(
    "employees",
    async () => {
      const response = await $fetch<{ employees: EmployeeData[] }>(
        "/api/getAllEmployee",
        {
          headers: useRequestHeaders(["cookie"]),
        },
      );
      employeesFetchedAt.value = Date.now();
      return response?.employees ?? [];
    },
    {
      default: () => [] as EmployeeData[],
      dedupe: "cancel",
      // Reuse fresh cache instead of refetching on every mount/navigation.
      getCachedData: (key, nuxtApp) => {
        const cached = nuxtApp.payload.data[key] ?? nuxtApp.static.data[key];
        const isFresh =
          cached && Date.now() - employeesFetchedAt.value < CACHE_TTL;
        return isFresh ? cached : undefined;
      },
    },
  );

  const employeeState = useState("employeeState", () => ({
    searchQuery: "",
    selectedDepartment: "",
    selectedEmployee: "",
    selectedStatus: "",
    selectedEmployees: [] as string[],
  }));

  return {
    formData,
    resetForm,
    employees,
    employeesStatus,
    employeesError,
    employeeState,
    refresh,
  };
}
