import axiosAdmin from "./axiosAdmin";

const paymentApi = {
  getPaymentInfo: () => {
    const url = "/api/admin/banking-info";
    return axiosAdmin.get(url);
  },

  putPaymentInfo: (idPaymentInfo, params) => {
    const url = `/api/admin/banking-info/${idPaymentInfo}`;
    return axiosAdmin.put(url, params);
  },
};

export default paymentApi;
