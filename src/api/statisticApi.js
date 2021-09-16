import axiosAdmin from "./axiosAdmin";

const statisticApi = {
	postSearchFreeStatistic: (params) => {
		const url = "/api/admin/get-search-free-data-by-day";
		return axiosAdmin.post(url, params);
	},
	postSearchVipStatistic: (params) => {
		const url = "/api/admin/get-search-vip-data-by-day";
		return axiosAdmin.post(url, params);
	},
	postDepositStatistic: (params) => {
		const url = "/api/admin/get-money-data-by-day";
		return axiosAdmin.post(url, params);
	},
	postDirectionalStatistic: (params) => {
		const url = "/api/admin/get-gap-truc-tiep-data-by-day";
		return axiosAdmin.post(url, params);
	},
	getTreeUsers: (params) => {
		const url = "/api/admin/get-tree";
		return axiosAdmin.get(url, params);
	},
};

export default statisticApi;
