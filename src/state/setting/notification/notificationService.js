import { api } from "@/lib/api";

// Send push notification
export const sendPushNotification = (data) => {
  return api.post("/v1/notification/send", data);
};
