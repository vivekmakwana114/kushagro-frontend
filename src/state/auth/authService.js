import { api } from "@/lib/api";

// login api
export const login = (credentials) => {
  return api.post(`/v1/auth/login`, credentials);
};

// forgot password api + email api
export const forgotPassword = (email) => {
  return api.post(`/v1/auth/forgot/password`, { email });
};

// Verify OTP
export const verifyOtp = (email, otp) => {
  return api.post(`/v1/auth/verify/otp`, { email, otp });
};

// Reset password using token and new password
export const resetPassword = ({ email, password, otp }) => {
  return api.post(`/v1/auth/password/reset`, { email, password, otp });
};
