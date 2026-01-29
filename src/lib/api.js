import axios from "axios";

const RAW_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const BASE_URL = RAW_BASE_URL.replace(/\/+$/g, "");

// Log API URL to verify correct backend connection
console.log("Using API Base URL:", BASE_URL);

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    // TEMPORARY: Skip Ngrok browser warning page - REMOVE IN PRODUCTION
    "ngrok-skip-browser-warning": "true",
  },
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

// Response interceptor to handle token expiration (401)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (typeof window !== "undefined") {
      // Check if error is 401 (Unauthorized)
      if (error.response && error.response.status === 401) {
        try {
          // Clear auth data
          localStorage.removeItem("auth");
          // Force redirect to auth page
          // Using window.location to ensure full state reset
          if (!window.location.pathname.includes("/auth")) {
            window.location.href = "/auth";
          }
        } catch (e) {
          console.error("Error handling 401 redirect:", e);
        }
      }
    }
    return Promise.reject(error);
  },
);

export default api;
