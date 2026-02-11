import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllOrders,
  getOrderById,
  flagOrder,
  cancelOrder,
  updateOrderStatus,
  initiateRefund,
} from "./orderService";

// Fetch all orders
export const fetchOrders = createAsyncThunk(
  "order/fetchAll",
  async (params, { rejectWithValue }) => {
    try {
      const response = await getAllOrders(params);
      console.log(response.data, "response.data");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// Fetch order by ID
export const fetchOrderById = createAsyncThunk(
  "order/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getOrderById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// Flag order
export const markOrderFlagged = createAsyncThunk(
  "order/flag",
  async (data, { rejectWithValue }) => {
    try {
      const response = await flagOrder(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// Cancel order
export const cancelOrderAction = createAsyncThunk(
  "order/cancel",
  async (data, { rejectWithValue }) => {
    try {
      const response = await cancelOrder(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// Update order status
export const updateOrderStatusAction = createAsyncThunk(
  "order/updateStatus",
  async (data, { rejectWithValue }) => {
    try {
      const response = await updateOrderStatus(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// Initiate refund
export const initiateRefundAction = createAsyncThunk(
  "order/refund",
  async (data, { rejectWithValue }) => {
    try {
      const response = await initiateRefund(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

const initialState = {
  orders: [],
  currentOrder: null,
  totalPages: 1,
  totalResults: 0,
  loading: false,
  error: null,
  success: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrderErrors: (state) => {
      state.error = null;
      state.success = false;
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Orders
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        // Adjust based on actual API response structure
        const responseData = action.payload.data || action.payload;
        if (Array.isArray(responseData)) {
          state.orders = responseData;
          state.totalResults = responseData.length; // Approximate if no metadata
        } else {
          state.orders = responseData.results || responseData.orders || [];
          state.totalPages = responseData.totalPages || 1;
          state.totalResults = responseData.totalResults || 0;
        }
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch Order By ID
    builder
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload.data || action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Generic handler for actions that just succeed (Flag, Cancel, etc.)
    // We can add specific state updates if we want optimistic updates
    [
      markOrderFlagged,
      cancelOrderAction,
      updateOrderStatusAction,
      initiateRefundAction,
    ].forEach((thunk) => {
      builder
        .addCase(thunk.pending, (state) => {
          state.loading = true;
          state.success = false;
          state.error = null;
        })
        .addCase(thunk.fulfilled, (state) => {
          state.loading = false;
          state.success = true;
        })
        .addCase(thunk.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    });
  },
});

export const { clearOrderErrors, clearCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;
