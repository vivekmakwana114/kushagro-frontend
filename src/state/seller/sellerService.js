import { api } from "@/lib/api";

// Get all sellers list with filter
// API: {{base_url}}/v1/users/seller/?limit=10&page=1

// get All Sellers List
export const getAllSellers = (params) => {
  let url = "/v1/users/seller/";
  const searchParams = new URLSearchParams();

  if (params) {
    Object.keys(params).forEach((key) => {
      if (
        params[key] !== undefined &&
        params[key] !== null &&
        params[key] !== ""
      ) {
        searchParams.append(key, params[key]);
      }
    });
  }

  const queryString = searchParams.toString();
  if (queryString) {
    url += `?${queryString}`;
  }

  return api.get(url);
};

// Suspend seller
export const suspendSeller = (id, data) => {
  return api.post(`/v1/users/${id}/suspend`, data);
};

// Get Seller Details
export const getSellerDetails = (id) => {
  return api.get(`/v1/users/sellerdata/${id}`);
};

// Share Reset Password Link
export const resetPasswordLink = (id) => {
  return api.get(`/v1/users/${id}/reset/link`);
};

// Verify/Reject Seller ID
export const verifySeller = (id, data) => {
  return api.patch(`/v1/dashboard/seller/verify/${id}`, data);
};

// Reactivate Seller
export const reactivateSeller = (id) => {
  return api.post(`/v1/users/${id}/reactivate`);
};

// Get Seller Reviews
export const getSellerReviews = (id) => {
  return api.get(`/v1/rating/seller/${id}`);
};
