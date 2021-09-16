import axiosAdmin from "./axiosAdmin";

const servicesApi = {
	getListServices: (params) => {
		const url = "/api/services";
		return axiosAdmin.get(url, params);
	},
	getInfoServiceById: (idService, params) => {
		const url = `/api/services/${idService}`;
		return axiosAdmin.get(url, params);
	},
	addService: (params) => {
		const url = "/api/services";
		return axiosAdmin.post(url, params);
	},
	patchService: (idService, params) => {
		const url = `/api/services/${idService}`;
		return axiosAdmin.patch(url, params);
	},
	deleteService: (idService, params) => {
		const url = `/api/services/${idService}`;
		return axiosAdmin.delete(url, params);
	},
};

export default servicesApi;
