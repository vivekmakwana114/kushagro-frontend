import { api } from "@/lib/api";

// Get all orders by seller ID
export const getOrdersBySellerId = async (id, params) => {
  const queryParams = new URLSearchParams(params).toString();
  return await api.get(`/v1/order/seller/${id}?${queryParams}`);
};

// Get order by ID
export const getOrderById = async (id) => {
  return await api.get(`/v1/order/${id}`);
};

// Flag order
export const flagOrder = async (data) => {
  return await api.patch(`/v1/order/markflag`, data);
};

// Cancel order
export const cancelOrder = async (data) => {
  return await api.patch(`/v1/order/cancel`, data);
};

// Update order status
export const updateOrderStatus = async (data) => {
  return await api.patch(`/v1/order/update`, data);
};
