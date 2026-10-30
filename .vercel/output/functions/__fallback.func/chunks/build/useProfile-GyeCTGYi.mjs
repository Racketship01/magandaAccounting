import { a as useState, b as useAsyncData, $ as $fetch$1, c as useRequestHeaders } from '../virtual/entry.mjs';

//#region layers/profile/app/composables/useProfile.ts
function useProfile() {
	const profileForm = useState("profileData", () => ({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		jobTitle: "",
		nationality: "",
		department: "",
		startDate: "",
		salary: 0,
		currency: "",
		address: {
			street: "",
			city: "",
			state: "",
			zipCode: ""
		},
		credentials: {
			username: "",
			email: "",
			password: "",
			newPassword: ""
		},
		profileImage: ""
	}));
	const resetForm = () => {
		profileForm.value = {
			firstName: "",
			lastName: "",
			email: "",
			phone: "",
			jobTitle: "",
			nationality: "",
			department: "",
			startDate: "",
			salary: 0,
			currency: "",
			address: {
				street: "",
				city: "",
				state: "",
				zipCode: ""
			},
			credentials: {
				username: "",
				email: "",
				password: "",
				newPassword: ""
			},
			profileImage: ""
		};
	};
	const currentUser = useState("currentUser", () => null);
	const { refresh } = useAsyncData("getCurrentUser", async () => {
		const response = await $fetch$1("/api/getCurrentUser", { headers: useRequestHeaders(["cookie"]) });
		if (response?.currentUser) currentUser.value = { ...response.currentUser };
		return response;
	});
	return {
		profileForm,
		resetForm,
		currentUser,
		refresh
	};
}

export { useProfile as u };
//# sourceMappingURL=useProfile-GyeCTGYi.mjs.map
