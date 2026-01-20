import { api } from "@/lib/api";

// Update profile api
export const updateProfile = (id, data) => {
  return api.patch(`/v1/users/${id}`, data);
};

// Change password api
export const changePassword = (data) => {
  return api.post(`/v1/users/change/password`, data);
};

// Get users api
export const getUsers = () => {
  return api.get(`/v1/users`);
};

// Upload image api
export const uploadImage = (formData) => {
  return api.post(`/v1/images/upload`, formData);
};
