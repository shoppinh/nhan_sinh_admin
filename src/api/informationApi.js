import axiosAdmin from "./axiosAdmin";

const informationApi = {
  getListInfo: () => {
    const url = "/api/admin/information";
    return axiosAdmin.get(url);
  },
  getInfoByID: (id) => {
    const url = `/api/admin/information/${id}`;
    return axiosAdmin.get(url);
  },

  putInfo: (id, params) => {
    const url = `/api/admin/information/${id}`;
    return axiosAdmin.put(url, params);
  },
};

export default informationApi;
