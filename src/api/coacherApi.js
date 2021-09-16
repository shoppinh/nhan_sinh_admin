import axiosAdmin from "./axiosAdmin";

const coacherApi = {
	getListCoacher: (params) => {
		const url = "/api/admin/get-all-coacher";
		return axiosAdmin.get(url, params);
	},
	postAddCoacher: (params) => {
		const url = "/api/admin/add-coacher";
		return axiosAdmin.post(url, params);
	},
	getCoacherById: (idCoacher, params) => {
		const url = `/api/admin/coacher/${idCoacher}`;
		return axiosAdmin.get(url, params);
	},
	patchChangeCoacherInfo: (idCoacher, params) => {
		const url = `/api/admin/coacher/${idCoacher}`;
		return axiosAdmin.patch(url, params);
	},
	deleteCoacher: (idCoacher, params) => {
		const url = `/api/admin/coacher/${idCoacher}`;
		return axiosAdmin.delete(url, params);
	},
};

export default coacherApi;
