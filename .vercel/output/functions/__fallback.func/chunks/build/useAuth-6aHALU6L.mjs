import { u as useUserSession, n as navigateTo } from '../virtual/entry.mjs';
import { computed, readonly } from 'vue';

//#region layers/auth/app/composables/useAuth.ts
function useAuth() {
	const { loggedIn, user, session, fetch, clear } = useUserSession();
	const logout = async () => {
		await clear();
		await navigateTo("/login");
	};
	const isAuthenticated = computed(() => loggedIn.value && session.value?.user?.id !== void 0);
	return {
		loggedIn,
		user: readonly(user),
		session: readonly(session),
		isAuthenticated,
		fetch,
		clear,
		logout
	};
}

export { useAuth as u };
//# sourceMappingURL=useAuth-6aHALU6L.mjs.map
