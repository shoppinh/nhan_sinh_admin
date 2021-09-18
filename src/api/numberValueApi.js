import axiosAdmin from "./axiosAdmin";

const numberValueApi = {
  getListNumberKT: () => {
    const url = "/api/admin//noi-cam-sau-sac";
    return axiosAdmin.get(url);
  },
  getNumberKTByID: (id) => {
    const url = `/api/admin//noi-cam-sau-sac/${id}`;
    return axiosAdmin.get(url);
  },
  putNumberKT: (id, params) => {
    const url = `/api/admin//noi-cam-sau-sac/${id}`;
    return axiosAdmin.put(url, params);
  },
  getListNumberSP: () => {
    const url = "/api/admin/hinh-anh-tuong-tac";
    return axiosAdmin.get(url);
  },
  getNumberSPByID: (id) => {
    const url = `/api/admin/hinh-anh-tuong-tac/${id}`;
    return axiosAdmin.get(url);
  },
  putNumberSP: (id, params) => {
    const url = `/api/admin/hinh-anh-tuong-tac/${id}`;
    return axiosAdmin.put(url, params);
  },
  getListNumberNC: () => {
    const url = "/api/admin/gia-tri-mang-lai";
    return axiosAdmin.get(url);
  },
  getNumberNCByID: (id) => {
    const url = `/api/admin/gia-tri-mang-lai/${id}`;
    return axiosAdmin.get(url);
  },
  putNumberNC: (id, params) => {
    const url = `/api/admin/gia-tri-mang-lai/${id}`;
    return axiosAdmin.put(url, params);
  },
};

export default numberValueApi;
