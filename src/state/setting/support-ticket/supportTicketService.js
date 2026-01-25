import { api } from "@/lib/api";

// Get support tickets with filter
export const getSupportTickets = (params) => {
  let url = "/v1/ticket";
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

// Get all support tickets
export const getAllSupportTickets = () => {
  return api.get("/v1/ticket");
};

// Get support ticket by ID
export const getSupportTicketById = (id) => {
  return api.get(`/v1/ticket/${id}`);
};

// Update support ticket status
export const updateSupportTicketStatus = (id, data) => {
  return api.patch(`/v1/ticket/status/${id}`, data);
};

// Delete support ticket
export const deleteSupportTicket = (id) => {
  return api.delete(`/v1/ticket/${id}`);
};
