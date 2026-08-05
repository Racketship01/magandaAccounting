export default function useToastGlobal() {
  const toast = useToast();
  return { toast };
}
