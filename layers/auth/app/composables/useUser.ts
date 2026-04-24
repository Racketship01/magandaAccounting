interface User {
  name: string;
  avatar: {
    src: string;
    alt: string;
  };
}

interface Signup {
  username?: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  isLoading: boolean;
  errorMessage: string;
  isFormValid: boolean;
}

interface Login {
  email: string;
  password: string;
  rememberMe: boolean;
  isLoading: boolean;
  errorMessage: string;
  isFormValid: boolean;
}

export default function useUser() {
  const user = useState<User>("user", () => ({
    name: "John Doe",
    avatar: {
      src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      alt: "John Doe",
    },
  }));

  const signup = useState<Signup>("signup", () => ({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    isLoading: false,
    errorMessage: "",
    isFormValid: false,
  }));

  const login = useState<Login>("login", () => ({
    email: "",
    password: "",
    rememberMe: false,
    isLoading: false,
    errorMessage: "",
    isFormValid: false,
  }));

  return {
    user,
    signup,
    login,
  };
}
