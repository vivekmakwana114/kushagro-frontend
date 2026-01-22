import { api } from "@/lib/api";

// Get all buyers list with filter
// API: {{base_url}}/v1/users/all?name=akshay&role=BUYER&status=ALL&from=2025-01-01&to=2025-01-31&minSpent=1000&maxSpent=5000&page=1&limit=20

// get All Buyers List
export const getAllBuyers = (params) => {
  let url = "/v1/users/all";
  const searchParams = new URLSearchParams();

  // Always enforce role=BUYER as per requirement
  searchParams.append("role", "BUYER");

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

// Suspend buyer
export const suspendCustomer = (id, data) => {
  return api.post(`/v1/users/${id}/suspend`, data);
};

// Reactivate buyer
export const reactivateBuyer = (id, data) => {
  return api.post(`/v1/users/${id}/reactivate`, data);
};

// Send Reset Password Link
export const sendResetLink = (id) => {
  return api.get(`/v1/users/${id}/reset/link`);
};


export const fetchFraudReportsByBuyer = (id) => {
  return api.get(`/v1/report/user/${id}`);
};