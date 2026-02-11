import { api } from "@/lib/api";

export const getDashboardSummary = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    console.log("token", token);
    const response = await api.get("/dashboard/summary", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("response", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard summary:", error);
    console.error("Dashboard 403 details:", {
      status: error?.response?.status,
      data: error?.response?.data,
      headers: error?.response?.headers,
      url: error?.config?.url,
    });
    throw error;
  }
};

export const getDashboardStats = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await api.get("/v1/dashboard/stats", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    throw error;
  }
};

export const getRecentOrders = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await api.get("/v1/dashboard/recent/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRecentPayments = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await api.get("/v1/dashboard/recent/payments", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching recent payments:", error);
    throw error;
  }
};

export const getTopCategories = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await api.get("/v1/dashboard/top/categories", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching top categories:", error);
    throw error;
  }
};

export const getRevenueReport = async (year) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await api.get(`/v1/dashboard/revenue/report?year=${year}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching revenue report:", error);
    throw error;
  }
};

export const getOrderStatusStats = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await api.get("/v1/dashboard/order/status", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPendingSellers = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await api.get("/v1/dashboard/seller/pending", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching pending sellers:", error);
    throw error;
  }
};

export const verifySeller = async (id, data) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await api.patch(`/v1/dashboard/seller/verify/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error verifying seller:", error);
    throw error;
  }
};