import axiosAdmin from "./axiosAdmin";

const storiesApi = {
  getListStories: (params) => {
    const url = "/api/admin/success-story";
    return axiosAdmin.get(url, params);
  },
  postStories: (params) => {
    const url = "/api/admin/success-story";
    return axiosAdmin.post(url, params);
  },
  getStoriesById: (idStories, params) => {
    const url = `/api/admin/success-story/${idStories}`;
    return axiosAdmin.get(url, params);
  },
  putStories: (idStories, params) => {
    const url = `/api/admin/success-story/${idStories}`;
    return axiosAdmin.put(url, params);
  },
  deleteStories: (idStories, params) => {
    const url = `/api/admin/success-story/${idStories}`;
    return axiosAdmin.delete(url, params);
  },
};

export default storiesApi;
