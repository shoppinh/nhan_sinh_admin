import axiosAdmin from "./axiosAdmin";

const numberValueApi = {
  getListNumberKT: () => {
    const url = "/api/admin/bang-chi-so-nguyen-am";
    return axiosAdmin.get(url);
  },
  getNumberKTByID: (id) => {
    const url = `/api/admin/bang-chi-so-nguyen-am/${id}`;
    return axiosAdmin.get(url);
  },
  putNumberKT: (id, params) => {
    const url = `/api/admin/bang-chi-so-nguyen-am/${id}`;
    return axiosAdmin.put(url, params);
  },
  getListNumberSP: () => {
    const url = "/api/admin/bang-chi-so-full";
    return axiosAdmin.get(url);
  },
  getNumberSPByID: (id) => {
    const url = `/api/admin/bang-chi-so-full/${id}`;
    return axiosAdmin.get(url);
  },
  putNumberSP: (id, params) => {
    const url = `/api/admin/bang-chi-so-full/${id}`;
    return axiosAdmin.put(url, params);
  },
  getListNumberNC: () => {
    const url = "/api/admin/bang-chi-so-phu-am";
    return axiosAdmin.get(url);
  },
  getNumberNCByID: (id) => {
    const url = `/api/admin/bang-chi-so-phu-am/${id}`;
    return axiosAdmin.get(url);
  },
  putNumberNC: (id, params) => {
    const url = `/api/admin/bang-chi-so-phu-am/${id}`;
    return axiosAdmin.put(url, params);
  },
};

export default numberValueApi;
