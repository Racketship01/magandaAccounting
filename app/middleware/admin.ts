export default defineNuxtRouteMiddleware((_to, _from) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated.value) {
    return navigateTo("/login");
  }

  if (user.value?.role !== "admin") {
    return navigateTo("/dashboard");
  }
});
