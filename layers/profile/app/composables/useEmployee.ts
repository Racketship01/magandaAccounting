export interface EmployeeData {
  id?: string;
  firstName: string;
  lastName: string;
  role?: "employee" | "admin";
  phone: string;
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
  };
  profileImage?: string;
}

export default function useEmployee() {
  const formData = useState<EmployeeData>("formData", () => ({
    firstName: "",
    lastName: "",
    role: "employee",
    phone: "",
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

  const employees = useState<EmployeeData[]>("employees", () => []);

  // Fetch employees from the backend endpoint and override the employees useState
  const { refresh } = useAsyncData("getAllEmployee", async () => {
    const response = await $fetch<{ employees: EmployeeData[] }>(
      "/api/getAllEmployee",
      {
        headers: useRequestHeaders(["cookie"]),
      },
    );
    if (response?.employees) {
      employees.value = response.employees;
    }
    return response;
  });

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
    employeeState,
    refresh,
  };
}
