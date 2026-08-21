import { computed } from "vue";
import useProfile from "../../../profile/app/composables/useProfile";

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
  confirmPassword?: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
  agreeToTerms: boolean;
  isLoading: boolean;
  errorMessage: string;
  isFormValid: boolean;
}

interface Login {
  email: string;
  password: string;
  showPassword: boolean;
  rememberMe: boolean;
  isLoading: boolean;
  errorMessage: string;
  isFormValid: boolean;
}

export default function useUser() {
  const { currentUser, refresh } = useProfile();

  const user = computed<User>(() => ({
    name:
      currentUser.value?.firstName + " " + currentUser.value?.lastName || "",
    avatar: {
      src: currentUser.value?.profileImage || "",
      alt: currentUser.value?.firstName || "",
    },
  }));

  const signup = useState<Signup>("signup", () => ({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
    agreeToTerms: false,
    isLoading: false,
    errorMessage: "",
    isFormValid: false,
  }));

  const login = useState<Login>("login", () => ({
    email: "",
    password: "",
    showPassword: false,
    rememberMe: false,
    isLoading: false,
    errorMessage: "",
    isFormValid: false,
  }));

  return {
    user,
    signup,
    login,
    refresh,
  };
}
