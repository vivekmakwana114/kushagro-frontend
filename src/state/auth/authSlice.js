import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  login,
  forgotPassword,
  verifyResetToken as verifyTokenApi,
  resetPassword as resetPasswordApi,
} from "./authService";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await login(credentials);
      console.log("response", res);

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: err.message || "Something went wrong" }
      );
    }
  }
);

export const sendForgotPassword = createAsyncThunk(
  "auth/sendForgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const res = await forgotPassword(email);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: err.message || "Something went wrong" }
      );
    }
  }
);

// Verify reset token sent via email
export const verifyResetToken = createAsyncThunk(
  "auth/verifyResetToken",
  async (token, { rejectWithValue }) => {
    try {
      const res = await verifyTokenApi(token);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || {
          message: err.message || "Invalid or expired token",
        }
      );
    }
  }
);

// Perform password reset using token
export const performResetPassword = createAsyncThunk(
  "auth/performResetPassword",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const res = await resetPasswordApi({ token, password });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || {
          message: err.message || "Failed to reset password",
        }
      );
    }
  }
);

const getInitialState = () => {
  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem("auth");
      if (raw) {
        const parsed = JSON.parse(raw);
        return {
          ...{
            user: null,
            tokens: null,
            role: null,
            redirect: null,
            status: "idle",
            error: null,
            forgotPasswordMessage: null,
          },
          ...parsed,
        };
      }
    } catch (_) {}
  }
  return {
    user: null,
    tokens: null,
    role: null,
    redirect: null,
    status: "idle",
    error: null,
    forgotPasswordMessage: null,
    verifyStatus: "idle",
    verifyMessage: null,
    resetStatus: "idle",
    resetMessage: null,
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    setUserRole: (state, action) => {
      state.role = action.payload;
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(
            "auth",
            JSON.stringify({
              user: state.user,
              tokens: state.tokens,
              role: state.role,
            })
          );
        } catch (_) {}
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // login reducers...
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.tokens = action.payload.tokens;
        state.redirect = action.payload.redirect;
        if (typeof window !== "undefined") {
          try {
            localStorage.setItem(
              "auth",
              JSON.stringify({ user: state.user, tokens: state.tokens })
            );
          } catch (_) {}
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Login failed";
        if (typeof window !== "undefined") {
          try {
            localStorage.removeItem("auth");
          } catch (_) {}
        }
      })

      // forgot password reducers
      .addCase(sendForgotPassword.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.forgotPasswordMessage = null;
      })
      .addCase(sendForgotPassword.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.forgotPasswordMessage = action.payload.message;
      })
      .addCase(sendForgotPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Failed to send reset link";
        state.forgotPasswordMessage = null;
      })

      // verify reset token reducers
      .addCase(verifyResetToken.pending, (state) => {
        state.verifyStatus = "loading";
        state.verifyMessage = null;
        state.error = null;
      })
      .addCase(verifyResetToken.fulfilled, (state, action) => {
        state.verifyStatus = "succeeded";
        state.verifyMessage = action.payload.message || "Token verified";
      })
      .addCase(verifyResetToken.rejected, (state, action) => {
        state.verifyStatus = "failed";
        state.error = action.payload?.message || "Invalid or expired token";
      })

      // perform reset password reducers
      .addCase(performResetPassword.pending, (state) => {
        state.resetStatus = "loading";
        state.resetMessage = null;
        state.error = null;
      })
      .addCase(performResetPassword.fulfilled, (state, action) => {
        state.resetStatus = "succeeded";
        state.resetMessage =
          action.payload.message || "Password reset successfully";
      })
      .addCase(performResetPassword.rejected, (state, action) => {
        state.resetStatus = "failed";
        state.error = action.payload?.message || "Failed to reset password";
      });
  },
});

export const { setUserRole } = authSlice.actions;
export default authSlice.reducer;
