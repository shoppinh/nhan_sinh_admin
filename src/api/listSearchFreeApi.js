import axiosAdmin from "./axiosAdmin";

const listSearchFreeApi = {
	getListSearchFree: (params) => {
		const url = "/api/searchFree";

		return axiosAdmin.get(url, params);
	},
	patchNoteListSearchFree: (id, params) => {
		const url = `api/searchFree/${id}`;

		return axiosAdmin.patch(url, params);
	},
};

export default listSearchFreeApi;
