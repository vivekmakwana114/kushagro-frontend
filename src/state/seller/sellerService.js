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
