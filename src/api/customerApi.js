import axiosAdmin from "./axiosAdmin";

const customerApi = {
	getListUsers: (params) => {
		const url = "/api/users";
		return axiosAdmin.get(url, params);
	},
	patchMoney: (subApi, params) => {
		const url = `/api/users/${subApi}`;
		return axiosAdmin.patch(url, params);
	},
	getListServiceUserBought: (subApi, params) => {
		const url = `/api/user-service/${subApi}`;
		return axiosAdmin.get(url, params);
	},
	deleteUser: (id, params) => {
		const url = `/api/users/${id}`;
		return axiosAdmin.delete(url, params);
	},
	postAddingSlotVip: (params) => {
		const url = `/api/admin/buy-service-for-user`;
		return axiosAdmin.post(url, params);
	},
};

export default customerApi;
