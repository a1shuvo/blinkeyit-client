export const baseURL = "http://localhost:8080";

const SummaryApi = {
  register: {
    url: "/api/users/register",
    method: "post",
  },
  login: {
    url: "/api/users/login",
    method: "post",
  },
  forgotPassword: {
    url: "/api/users/forgot-password",
    method: "put",
  },
  verifyForgotPasswordOtp: {
    url: "/api/users/verify-forgot-password-otp",
    method: "put",
  },
  resetPassword: {
    url: "/api/users/reset-password",
    method: "put",
  },
  refreshToken: {
    url: "/api/users/refresh-token",
    method: "post",
  },
  userDetails: {
    url: "/api/users/user-details",
    method: "get",
  },
  logout: {
    url: "/api/users/logout",
    method: "get",
  },
  uploadAvatar: {
    url: "/api/users/upload-avatar",
    method: "put",
  },
  updateUserDetails: {
    url: "/api/users/update-user",
    method: "put",
  },
  addCategory: {
    url: "/api/categories/add",
    method: "post",
  },
  uploadImage: {
    url: "/api/files/upload",
    method: "post",
  },
  getCategories: {
    url: "/api/categories/get",
    method: "get",
  },
  updateCategory: {
    url: "/api/categories/update",
    method: "put",
  },
  deleteCategory: {
    url: "/api/categories/delete",
    method: "delete",
  },
  createSubCategory: {
    url: "/api/sub-categories/create",
    method: "post",
  },
};

export default SummaryApi;
