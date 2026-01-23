import logotest from "../assets/images/logotest.png";
import logotestDark from "../assets/images/logotest-dark.png";

export default function useColor() {
  const colorMode = useColorMode();

  // Color mode composable
  const isDark = computed(() => colorMode.value === "dark");

  // Computed properties
  const currentLogo = computed((isMounted: boolean) => {
    // Always show logotest on initial load/refresh
    if (!isMounted) {
      return logotest;
    }
    return isDark.value ? logotest : logotestDark;
  });

  return {
    colorMode,
    isDark,
    currentLogo,
  };
}
