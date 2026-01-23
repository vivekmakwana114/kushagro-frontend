import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllBuyers,
  suspendCustomer,
  reactivateBuyer as reactivateBuyerService,
  sendResetLink,
} from "./buyerService";

// Fetch all buyers
export const fetchBuyers = createAsyncThunk(
  "buyer/fetchAll",
  async (params, { rejectWithValue }) => {
    try {
      const response = await getAllBuyers(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// Suspend Buyer
export const suspendBuyer = createAsyncThunk(
  "buyer/suspend",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await suspendCustomer(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// Reactivate Buyer
export const reactivateBuyer = createAsyncThunk(
  "buyer/reactivate",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await reactivateBuyerService(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// Send Reset Password Link
export const sendResetPasswordLink = createAsyncThunk(
  "buyer/sendResetLink",
  async (id, { rejectWithValue }) => {
    try {
      const response = await sendResetLink(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// Fetch Buyer Orders
export const fetchBuyerOrders = createAsyncThunk(
  "buyer/fetchOrders",
  async (params, { rejectWithValue }) => {
    try {
      const { getBuyerOrders } = await import("./buyerService");
      const response = await getBuyerOrders(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

const initialState = {
  buyers: [],
  currentBuyer: null,
  totalPages: 1,
  totalResults: 0,
  loading: false,
  error: null,
  success: false,
  // Buyer Orders State
  buyerOrders: [],
  buyerOrdersTotalResults: 0,
  buyerOrdersTotalPages: 1,
  buyerOrdersLoading: false,
  buyerOrdersError: null,
};

const buyerSlice = createSlice({
  name: "buyer",
  initialState,
  reducers: {
    clearBuyerErrors: (state) => {
      state.error = null;
      state.success = false;
      state.buyerOrdersError = null;
    },
    clearCurrentBuyer: (state) => {
      state.currentBuyer = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Buyers
    builder
      .addCase(fetchBuyers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBuyers.fulfilled, (state, action) => {
        state.loading = false;
        const responseData = action.payload.data || action.payload;

        if (Array.isArray(responseData)) {
          state.buyers = responseData;
          state.totalResults = responseData.length;
        } else {
          state.buyers = responseData.results || responseData.users || [];
          state.totalPages = responseData.totalPages || 1;
          state.totalResults = responseData.totalResults || 0;
        }
      })
      .addCase(fetchBuyers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Suspend Buyer
      .addCase(suspendBuyer.fulfilled, (state, action) => {
        const suspendedId = action.meta.arg.id;
        state.buyers = state.buyers.map((buyer) =>
          (buyer._id || buyer.id) === suspendedId
            ? // Update flags to reflect suspension
              { ...buyer, isSuspended: true, status: "suspended" }
            : buyer,
        );
        if (
          state.currentBuyer &&
          (state.currentBuyer._id || state.currentBuyer.id) === suspendedId
        ) {
          state.currentBuyer.isSuspended = true;
          state.currentBuyer.status = "suspended";
        }
      })

      // Reactivate Buyer
      .addCase(reactivateBuyer.fulfilled, (state, action) => {
        const reactivatedId = action.meta.arg.id;
        state.buyers = state.buyers.map((buyer) =>
          (buyer._id || buyer.id) === reactivatedId
            ? { ...buyer, isSuspended: false, status: "active" }
            : buyer,
        );
        if (
          state.currentBuyer &&
          (state.currentBuyer._id || state.currentBuyer.id) === reactivatedId
        ) {
          state.currentBuyer.isSuspended = false;
          state.currentBuyer.status = "active";
        }
      })
      // Fetch Buyer Orders
      .addCase(fetchBuyerOrders.pending, (state) => {
        state.buyerOrdersLoading = true;
        state.buyerOrdersError = null;
      })
      .addCase(fetchBuyerOrders.fulfilled, (state, action) => {
        state.buyerOrdersLoading = false;
        const responseData = action.payload.data || action.payload;

        if (Array.isArray(responseData)) {
          state.buyerOrders = responseData;
          state.buyerOrdersTotalResults = responseData.length;
        } else {
          state.buyerOrders = responseData.results || responseData.orders || [];
          state.buyerOrdersTotalPages = responseData.totalPages || 1;
          state.buyerOrdersTotalResults = responseData.totalResults || 0;
        }
      })
      .addCase(fetchBuyerOrders.rejected, (state, action) => {
        state.buyerOrdersLoading = false;
        state.buyerOrdersError = action.payload;
      });
  },
});

export const { clearBuyerErrors, clearCurrentBuyer } = buyerSlice.actions;
export default buyerSlice.reducer;
