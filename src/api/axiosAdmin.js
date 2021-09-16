import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	headers: {
		"content-type": "application/json",
	},

	// convert params from object into a string
	paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
	const token = await localStorage.getItem("token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

axiosClient.interceptors.response.use(
	(response) => {
		if (response && response.data) {
			return response.data;
		}
		return response;
	},
	(error) => {
		// handle error here
		throw Error;
	}
);

export default axiosClient;
