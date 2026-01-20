import { api } from "@/lib/api";

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
  return api.get(`/v1/order/${id}`);
};

// Flag order
// Payload: { orderIds: ["id1", "id2"], reason: "string", note: "string" }
export const flagOrder = (data) => {
  return api.patch("/v1/order/markflag", data);
};

// Cancel order
// Payload: { orderId: "id", cancellationReason: "string", note: "string" }
export const cancelOrder = (data) => {
  return api.patch("/v1/order/cancel", data);
};

// Update order status
// Payload: { orderIds: ["id"]/*, status? */ } (Based on API doc provided, payload only shows orderIds, check if status is needed or inferred)
// Assuming API doc implied status update logic is internal or missing params in doc sample, but adhering to user sample:
// { "orderIds": ["..."] }
export const updateOrderStatus = (data) => {
  return api.patch("/v1/order/update", data);
};

// Initiate refund
// Payload: { orderId: "id" }
export const initiateRefund = (data) => {
  return api.post("/v1/payment/refund/buyer", data);
};
