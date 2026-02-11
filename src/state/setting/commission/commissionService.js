import { api } from "@/lib/api";

// Get commission settings
export const getCommissionSettings = () => {
  return api.get("/v1/commission");
};

// Update commission settings
export const updateCommissionSettings = (data) => {
  return api.post("/v1/commission", data);
};
