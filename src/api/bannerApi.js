import axiosClient from './axiosAdmin';

const bannerApi = {
  getBanner: () => {
    const url = 'api/admin/banner';
    return axiosClient.get(url);
  },
  getBannerById: (id) => {
    const url = `api/admin/banner/${id}`;

    return axiosClient.get(url);
  },
  portBanner: (data) => {
    const url = 'api/admin/banner';
    return axiosClient.post(url, data);
  },
  deleteBanner: (id) => {
    const url = `api/admin/banner/${id}`;
    return axiosClient.delete(url);
  },
  updateBanner: (data, id) => {
    const url = `api/admin/banner/${id}`;
    return axiosClient.put(url, data);
  },
};
export default bannerApi;
