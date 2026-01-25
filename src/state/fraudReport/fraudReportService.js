import { api } from "@/lib/api";

// Get all fraud reports
export const getAllFraudReports = (params) => {
  let url = "/v1/report/";
  if (params) {
    const searchParams = new URLSearchParams(params);
    url += `?${searchParams.toString()}`;
  }
  return api.get(url);
};

// Get fraud reports by user ID
export const getFraudReportsByUserId = (userId) => {
  return api.get(`/v1/report/user/${userId}`);
};

// Get single fraud report by ID
export const getFraudReportById = (id) => {
  return api.get(`/v1/report/${id}`);
};

// Delete fraud report
export const deleteFraudReport = (id) => {
  return api.delete(`/v1/report/${id}`);
};
