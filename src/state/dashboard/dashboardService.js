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

export const getTodayAppointments = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await api.get("/dashboard/today-appointments", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; 
  } catch (error) {
    console.error("Error fetching today appointments:", error);
    throw error;
  }
};

export const getTopPerformingStylist = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await api.get("/dashboard/top-stylists?limit=5", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; 
  } catch (error) {
    console.error("Error fetching top performing stylist:", error);
    throw error;
  }
};

export const getTopSellingProducts = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await api.get("/dashboard/top-selling-products?limit=5", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; 
  } catch (error) {
    console.error("Error fetching top selling products:", error);
    throw error;
  }
};

export const getRecentActivities = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await api.get("/dashboard/recent-activities", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching recent activities:", error);
    throw error;
  }
};

export const getBookingOverview = async ({ filter = "year", year, month }) => {
  try {
    const token = localStorage.getItem("accessToken");
    const params = new URLSearchParams();
    if (filter) params.append("filter", filter);
    if (year) params.append("year", year);
    if (filter === "month" && month) params.append("month", month);
    const response = await api.get(`/dashboard/booking-overview/?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching booking overview:", error);
    throw error;
  }
}