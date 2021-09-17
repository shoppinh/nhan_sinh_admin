import axiosAdmin from "./axiosAdmin";

const benefitApi = {
  getListBenefit: (params) => {
    const url = "/api/admin/service-info";
    return axiosAdmin.get(url, params);
  },
  getInfoBenefitById: (idBenefit, params) => {
    const url = `/api/admin/service-info/${idBenefit}`;
    return axiosAdmin.get(url, params);
  },
  addBenefit: (params) => {
    const url = "/api/admin/service-info";
    return axiosAdmin.post(url, params);
  },
  patchBenefit: (idBenefit, params) => {
    const url = `/api/admin/service-info/${idBenefit}`;
    return axiosAdmin.patch(url, params);
  },
  deleteBenefit: (idBenefit, params) => {
    const url = `/api/admin/service-info/${idBenefit}`;
    return axiosAdmin.delete(url, params);
  },
};

export default benefitApi;
