import { create } from "zustand";

export const useNotificationStore = create((set) => ({
  notifications: [],
  unreadCount: 0,

  setNotifications: (notifications) => set((state) => ({
    notifications,
    unreadCount: notifications.filter(n => !n.isRead).length
  })),

  addNotification: (notification) => set((state) => {
    const newNotifications = [notification, ...state.notifications];
    return {
      notifications: newNotifications,
      unreadCount: newNotifications.filter(n => !n.isRead).length
    };
  }),

  markAsRead: (id) => set((state) => {
    const newNotifications = state.notifications.map((n) =>
      (n.id === id || n._id === id) ? { ...n, isRead: true } : n
    );
    return {
      notifications: newNotifications,
      unreadCount: newNotifications.filter(n => !n.isRead).length
    };
  }),

  markAllAsRead: () => set((state) => {
    const newNotifications = state.notifications.map((n) => ({ ...n, isRead: true }));
    return {
      notifications: newNotifications,
      unreadCount: 0
    };
  }),

  removeNotification: (id) => set((state) => {
    const newNotifications = state.notifications.filter(n => n.id !== id && n._id !== id);
    return {
      notifications: newNotifications,
      unreadCount: newNotifications.filter(n => !n.isRead).length
    };
  })
}));
