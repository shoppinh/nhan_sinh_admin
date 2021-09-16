import axiosAdmin from "./axiosAdmin";

const directMeetingApi = {
	getListDirectMeet: (params) => {
		const url = "/api/admin/gap-truc-tiep";
		return axiosAdmin.get(url, params);
	},
	postNewDirectMeeting: (params) => {
		const url = "/api/users/tao-lich-gap-truc-tiep";
		return axiosAdmin.post(url, params);
	},
	patchEditNote: (id, params) => {
		const url = `/api/admin/note-gap-truc-tiep/${id}`;
		return axiosAdmin.patch(url, params);
	},
	getListCoacher: (params) => {
		const url = "/api/admin/get-all-coacher";
		return axiosAdmin.get(url, params);
	},
	deleteCoaching: (idService, params) => {
		const url = `/api/admin/gap-truc-tiep/${idService}`;
		return axiosAdmin.delete(url, params);
	},
	patchEditStatus: (id, params) => {
		const url = `/api/admin/gap-truc-tiep/${id}`;
		return axiosAdmin.patch(url, params);
	},
};

export default directMeetingApi;
