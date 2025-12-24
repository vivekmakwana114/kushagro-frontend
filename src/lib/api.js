import axios from "axios";

const RAW_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";
const BASE_URL = RAW_BASE_URL.replace(/\/+$/g, "");

export const api = axios.create({
  baseURL: BASE_URL || undefined,
  withCredentials: true,
});


api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem("auth");
      if (raw) {
        const { tokens } = JSON.parse(raw);
        const token = tokens?.accessToken;
        if (token) {
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch (_) {}
  }
  return config;
});

export default api;