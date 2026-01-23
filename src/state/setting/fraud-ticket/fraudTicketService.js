import { api } from "@/lib/api";

// Get all fraud reports
export const getAllFraudReports = () => {
  return api.get("/v1/report/");
};

// Get fraud report by ID
export const getFraudReportById = (id) => {
  return api.get(`/v1/report/${id}`);
};

// Delete fraud report
export const deleteFraudReport = (id) => {
  return api.delete(`/v1/report/${id}`);
};
