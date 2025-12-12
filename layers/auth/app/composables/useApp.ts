export default function useApp() {
  const appConfig = useAppConfig();

  return {
    appConfig,
  };
}
