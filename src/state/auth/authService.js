import { api } from "@/lib/api";

export const login = (credentials) => {
  return api.post(`/auth/login`, credentials);
};

export const forgotPassword = (email) => {
  return api.post(`/auth/forgot-password`, { email });
};

// Verify reset token sent via email
export const verifyResetToken = (token) => {
  return api.get(`/auth/verify-reset-token/${token}`);
};

// Reset password using token and new password
export const resetPassword = ({ token, password }) => {
  return api.post(`/auth/reset-password`, { token, password });
};