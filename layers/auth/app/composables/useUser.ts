interface User {
  name: string;
  avatar: {
    src: string;
    alt: string;
  };
}

interface Auth {
  email: string;
  password: string;
  isAuthenticated: boolean;
}

export default function useUser() {
  const user = useState<User>("user", () => ({
    name: "John Doe",
    avatar: {
      src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      alt: "John Doe",
    },
  }));

  return {
    user,
  };
}
