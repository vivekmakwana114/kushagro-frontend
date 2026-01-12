import axios from "axios";

const RAW_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://api-kushagro-dev.onrender.com";
const BASE_URL = RAW_BASE_URL.replace(/\/+$/g, "");

export const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem("auth");
      // console.log("Debug: Raw auth from storage:", raw);
      if (raw) {
        const { tokens } = JSON.parse(raw);
        // console.log("Debug: Parsed tokens:", tokens);
        const token = tokens?.access?.token;
        // console.log("Debug: Extracted token:", token);
        if (token) {
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch (e) {
      console.error("Debug: Error in interceptor:", e);
    }
  }
  return config;
});

export default api;
