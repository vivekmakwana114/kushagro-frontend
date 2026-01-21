import { api } from "@/lib/api";

// provided by Gyana
// Base URL = https://measurelessly-logical-roselyn.ngrok-free.dev

// Get all orders
export const getAllOrders = (params) => {
  let url = "/v1/order/allorders";
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

// Get order by ID
export const getOrderById = (id) => {
  return api.get(`https://measurelessly-logical-roselyn.ngrok-free.dev/v1/order/${id}`);
};

// Flag order
export const flagOrder = (data) => {
  return api.patch("/v1/order/markflag", data);
};

// Cancel order
export const cancelOrder = (data) => {
  return api.patch("/v1/order/cancel", data);
};

// Update order status
export const updateOrderStatus = (data) => {
  return api.patch("/v1/order/update", data);
};

// Initiate refund
export const initiateRefund = (data) => {
  return api.post("/v1/payment/refund/buyer", data);
};
