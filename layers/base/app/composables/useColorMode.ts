export default function useColor() {
  const colorMode = useColorMode();

  return {
    colorMode,
  };
}
