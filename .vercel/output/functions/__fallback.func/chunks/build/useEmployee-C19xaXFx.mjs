import { a as useState, b as useAsyncData, $ as $fetch$1, c as useRequestHeaders } from '../virtual/entry.mjs';

//#region layers/profile/app/composables/useEmployee.ts
function useEmployee() {
	const formData = useState("formData", () => ({
		firstName: "",
		lastName: "",
		role: "employee",
		phone: "",
		nationality: "",
		jobTitle: "",
		department: "",
		startDate: "",
		salary: 0,
		currency: "USD",
		status: "Active",
		address: {
			street: "",
			city: "",
			state: "",
			zipCode: ""
		},
		credentials: {
			username: "",
			email: "",
			password: ""
		},
		profileImage: ""
	}));
	const resetForm = () => {
		formData.value = {
			firstName: "",
			lastName: "",
			phone: "",
			nationality: "",
			jobTitle: "",
			department: "",
			startDate: "",
			salary: 0,
			currency: "USD",
			status: "Active",
			address: {
				street: "",
				city: "",
				state: "",
				zipCode: ""
			},
			credentials: {
				username: "",
				email: "",
				password: ""
			},
			profileImage: ""
		};
	};
	const employees = useState("employees", () => []);
	const { refresh } = useAsyncData("getAllEmployee", async () => {
		const response = await $fetch$1("/api/getAllEmployee", { headers: useRequestHeaders(["cookie"]) });
		if (response?.employees) employees.value = response.employees;
		return response;
	});
	return {
		formData,
		resetForm,
		employees,
		employeeState: useState("employeeState", () => ({
			searchQuery: "",
			selectedDepartment: "",
			selectedEmployee: "",
			selectedStatus: "",
			selectedEmployees: []
		})),
		refresh
	};
}

export { useEmployee as u };
//# sourceMappingURL=useEmployee-C19xaXFx.mjs.map
