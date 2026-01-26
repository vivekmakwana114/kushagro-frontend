import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";
import {
  getOrdersBySellerId,
  getOrderById,
  flagOrder,
  cancelOrder,
  updateOrderStatus,
} from "./orderHistoryService";

// Fetch Seller Orders
export const fetchSellerOrdersBySellerId = createAsyncThunk(
  "sellerOrderHistory/fetchOrders",
  async ({ id, params }, { rejectWithValue }) => {
    try {
      const response = await getOrdersBySellerId(id, params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// Fetch Order Details
export const fetchOrderDetails = createAsyncThunk(
  "sellerOrderHistory/fetchOrderDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getOrderById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// Flag Order
export const flagOrderAction = createAsyncThunk(
  "sellerOrderHistory/flagOrder",
  async (data, { rejectWithValue }) => {
    try {
      const response = await flagOrder(data);
      toast.success("Order flagged successfully");
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to flag order");
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// Cancel Order
export const cancelOrderAction = createAsyncThunk(
  "sellerOrderHistory/cancelOrder",
  async (data, { rejectWithValue }) => {
    try {
      const response = await cancelOrder(data);
      toast.success("Order cancelled successfully");
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to cancel order");
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// Update Order Status
export const updateOrderStatusAction = createAsyncThunk(
  "sellerOrderHistory/updateStatus",
  async (data, { rejectWithValue }) => {
    try {
      const response = await updateOrderStatus(data);
      toast.success("Order status updated successfully");
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

const initialState = {
  orders: [],
  totalPages: 1,
  totalResults: 0,
  loading: false,
  error: null,
  success: false,
  currentOrder: null,
};

const sellerOrderHistorySlice = createSlice({
  name: "sellerOrderHistory",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
      state.success = false;
    },
    resetCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Orders
      .addCase(fetchSellerOrdersBySellerId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerOrdersBySellerId.fulfilled, (state, action) => {
        state.loading = false;
        const response = action.payload;
        // Adjust based on actual API response structure
        if (response.data && Array.isArray(response.data)) {
          state.orders = response.data;
          state.totalPages = response.meta?.totalPages || 1;
          state.totalResults =
            response.meta?.totalResults || response.data.length;
        } else if (Array.isArray(response)) {
          state.orders = response;
          state.totalPages = 1;
          state.totalResults = response.length;
        } else {
          state.orders = response.orders || response.results || [];
          state.totalPages = response.totalPages || 1;
          state.totalResults = response.totalResults || 0;
        }
      })
      .addCase(fetchSellerOrdersBySellerId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Order Details
      .addCase(fetchOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload.data || action.payload;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Flag Order
      .addCase(flagOrderAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(flagOrderAction.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(flagOrderAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Cancel Order
      .addCase(cancelOrderAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(cancelOrderAction.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(cancelOrderAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Order Status
      .addCase(updateOrderStatusAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrderStatusAction.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateOrderStatusAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearErrors, resetCurrentOrder } =
  sellerOrderHistorySlice.actions;
export default sellerOrderHistorySlice.reducer;
