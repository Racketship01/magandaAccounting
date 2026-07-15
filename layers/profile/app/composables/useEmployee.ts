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
    };
  };

  const employees = useState<EmployeeData[]>("employees", () => []);

  // Fetch employees from the backend endpoint and override the employees useState
  useAsyncData("getAllEmployee", async () => {
    const response = await $fetch<{ employees: EmployeeData[] }>("/api/getAllEmployee");
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

  const currentUser = useState<EmployeeData>("currentUser", () => ({
    id: "1",
    firstName: "John",
    lastName: "Doe",
    phone: "+1 (555) 123-4567",
    jobTitle: "Software Engineer",
    department: "Engineering",
    startDate: "2022-03-15",
    salary: 85000,
    currency: "USD",
    status: "Active",
    address: {
      street: "123 Main St",
      city: "San Francisco",
      state: "CA",
      zipCode: "94105",
    },
    credentials: {
      username: "john.doe",
      email: "[EMAIL_ADDRESS]",
    },
    profileImage: "",
  }));

  return { formData, resetForm, employees, employeeState, currentUser };
}
