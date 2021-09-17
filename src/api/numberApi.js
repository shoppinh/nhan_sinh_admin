import axiosAdmin from "./axiosAdmin";

const numberApi = {
  getListNumber: () => {
    const url = "/api/admin/number-meaning";
    return axiosAdmin.get(url);
  },
  getNumberByID: (id) => {
    const url = `/api/admin/number-meaning/${id}`;
    return axiosAdmin.get(url);
  },
  addNumber: (params) => {
    const url = "/api/admin/number-meaning";
    return axiosAdmin.post(url, params);
  },
  putNumber: (idNumber, params) => {
    const url = `/api/admin/number-meaning/${idNumber}`;
    return axiosAdmin.put(url, params);
  },
  deleteNumber: (idNumber) => {
    const url = `/api/admin/number-meaning/${idNumber}`;
    return axiosAdmin.delete(url);
  },
};

export default numberApi;
