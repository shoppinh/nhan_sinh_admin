import axiosAdmin from "./axiosAdmin";

const userApi = {
	// post phone and password, received a token, save in local storage
	signIn: (params) => {
		const url = "/api/admin/signin";
		return axiosAdmin.post(url, params);
	},
	getNotify: (params) => {
		const url = "/api/admin/check-notify-3-days";
		return axiosAdmin.get(url, params);
	},

	getMe: async (params) => {
		// TODO: call api to get current user

		// -> chỗ này để get thông tin người dùng và lưu vào store redux
		return setTimeout(() => {
			const currentUser = {
				id: "123",
				name: "quang ha",
				email: "test@gmail.com",
			};
		});
	},
};

export default userApi;
