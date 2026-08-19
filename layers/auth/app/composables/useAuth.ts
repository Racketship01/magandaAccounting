export default function useAuth() {
  const { loggedIn, user, session, fetch, clear } = useUserSession();

  const logout = async () => {
    await clear();
    await navigateTo("/login");
  };

  const isAuthenticated = computed(
    () => loggedIn.value && session.value?.user?.id !== undefined,
  );
  return {
    loggedIn,
    user: readonly(user),
    session: readonly(session),
    isAuthenticated,
    fetch,
    clear,
    logout,
  };
}
