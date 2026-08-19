import logotest from "../assets/images/logotest.png";
import logotestDark from "../assets/images/logotest-dark.png";

export default function useColor() {
  const colorMode = useColorMode();
  const isMounted = ref(false);

  // Color mode composable
  const isDark = computed(() => colorMode.value === "dark");

  // Computed properties
  const currentLogo = computed(() => {
    // Always show logotest on initial load/refresh
    if (!isMounted.value) {
      return logotest;
    }
    return isDark.value ? logotest : logotestDark;
  });

  return {
    colorMode,
    isDark,
    currentLogo,
    isMounted,
  };
}
