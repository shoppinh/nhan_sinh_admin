import axiosAdmin from "./axiosAdmin";

const blogApi = {
  getListBlog: () => {
    const url = "/api/admin/blog";
    return axiosAdmin.get(url);
  },
  postBlog: (params) => {
    let formData = new FormData();
    const url = "/api/admin/blog";
    for (let i in params) {
      formData.append(i, params[i]);
    }
    return axiosAdmin.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  getBlogById: (id) => {
    const url = `/api/admin/blog/${id}`;
    return axiosAdmin.get(url);
  },
  putBlog: (id, params) => {
    const url = `/api/admin/blog/${id}`;
    let formData = new FormData();
    for (let i in params) {
      formData.append(i, params[i]);
    }
    return axiosAdmin.put(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  deleteBlog: (id, params) => {
    const url = `/api/admin/blog/${id}`;
    return axiosAdmin.delete(url, params);
  },
};

export default blogApi;
