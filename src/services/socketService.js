import { io } from "socket.io-client";

const BASE_URL = (process.env.NEXT_PUBLIC_BASE_URL || "https://api-kushagro-dev.onrender.com").replace(/\/+$/, "");
let socket;

export const connectSocket = (token) => {
  if (socket?.connected) return socket;

  socket = io(BASE_URL, {
    auth: {
      token: token,
    },
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

  socket.on("connect", () => {
    console.log("Connected to notification server:", socket.id);
  });

  socket.on("connect_error", (err) => {
    console.error("Socket connection failed:", err.message);
  });

  socket.on("disconnect", (reason) => {
    console.log("Socket disconnected:", reason);
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;

export const subscribeToNotifications = (callback) => {
  if (!socket) return;
  socket.on("notification", callback);
  return () => socket.off("notification", callback);
};

export const subscribeToReadEvents = (onRead, onAllRead) => {
  if (!socket) return;
  socket.on("notification_read", onRead);
  socket.on("all_notifications_read", onAllRead);

  return () => {
    socket.off("notification_read", onRead);
    socket.off("all_notifications_read", onAllRead);
  };
};

export const subscribeToDeleteEvent = (callback) => {
  if (!socket) return;
  socket.on("notification_deleted", callback);
  return () => socket.off("notification_deleted", callback);
}
