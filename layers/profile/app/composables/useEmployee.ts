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

  const employees = useState<EmployeeData[]>("employees", () => [
    {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      phone: "+1 (555) 123-4567",
      jobTitle: "Software Engineer",
      department: "Developer",
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
      profileImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: "2",
      firstName: "Sarah",
      lastName: "Johnson",
      phone: "+1 (555) 234-5678",
      jobTitle: "Product Manager",
      department: "Designer",
      startDate: "2021-08-20",
      salary: 95000,
      currency: "USD",
      status: "Active",
      address: {
        street: "456 Oak Ave",
        city: "San Francisco",
        state: "CA",
        zipCode: "94107",
      },
      credentials: {
        username: "sarah.johnson",
        email: "[EMAIL_ADDRESS]",
      },
      profileImage:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: "3",
      firstName: "Michael",
      lastName: "Brown",
      phone: "+1 (555) 345-6789",
      jobTitle: "Designer",
      department: "Designer",
      startDate: "2023-01-10",
      salary: 70000,
      currency: "USD",
      status: "On Leave",
      address: {
        street: "789 Pine St",
        city: "Oakland",
        state: "CA",
        zipCode: "94612",
      },
      credentials: {
        username: "michael.brown",
        email: "[EMAIL_ADDRESS]",
      },
      profileImage:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: "4",
      firstName: "Emma",
      lastName: "Wilson",
      phone: "+1 (555) 456-7890",
      jobTitle: "Marketing Director",
      department: "Marketing",
      startDate: "2020-05-12",
      salary: 110000,
      currency: "USD",
      status: "Active",
      address: {
        street: "321 Elm Street",
        city: "San Francisco",
        state: "CA",
        zipCode: "94103",
      },
      credentials: {
        username: "david.wilson",
        email: "[EMAIL_ADDRESS]",
      },
      profileImage:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: "5",
      firstName: "Alex",
      lastName: "Rodriguez",
      phone: "+1 (555) 567-8901",
      jobTitle: "Senior Developer",
      department: "Developer",
      startDate: "2019-11-08",
      salary: 105000,
      currency: "USD",
      status: "Active",
      address: {
        street: "987 Cedar Lane",
        city: "Berkeley",
        state: "CA",
        zipCode: "94702",
      },
      credentials: {
        username: "jessica.chen",
        email: "[EMAIL_ADDRESS]",
      },
      profileImage:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: "6",
      firstName: "Jessica",
      lastName: "Chen",
      phone: "+1 (555) 678-9012",
      jobTitle: "Accountant",
      department: "Accountant",
      startDate: "2021-02-15",
      salary: 80000,
      currency: "USD",
      status: "Active",
      address: {
        street: "555 Maple Dr",
        city: "Palo Alto",
        state: "CA",
        zipCode: "94301",
      },
      credentials: {
        username: "kevin.chen",
        email: "[EMAIL_ADDRESS]",
      },
      profileImage:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: "7",
      firstName: "Robert",
      lastName: "Taylor",
      phone: "+1 (555) 789-0123",
      jobTitle: "Marketing",
      department: "Marketing",
      startDate: "2022-09-01",
      salary: 75000,
      currency: "USD",
      status: "Inactive",
      address: {
        street: "444 Birch Ave",
        city: "San Jose",
        state: "CA",
        zipCode: "95110",
      },
      credentials: {
        username: "susan.taylor",
        email: "[EMAIL_ADDRESS]",
      },
      profileImage:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: "8",
      firstName: "Lisa",
      lastName: "Anderson",
      phone: "+1 (555) 890-1234",
      jobTitle: "Designer",
      department: "Designer",
      startDate: "2023-06-20",
      salary: 65000,
      currency: "USD",
      status: "Active",
      address: {
        street: "777 Willow St",
        city: "Mountain View",
        state: "CA",
        zipCode: "94041",
      },
      credentials: {
        username: "tom.anderson",
        email: "[EMAIL_ADDRESS]",
      },
      profileImage:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    },
  ]);

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
