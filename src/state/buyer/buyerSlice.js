import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllBuyers,
  getBuyerById,
  suspendCustomer,
  reactivateBuyer as reactivateBuyerService,
} from "./buyerService";

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

// Fetch single buyer by ID
export const fetchBuyerById = createAsyncThunk(
  "buyer/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getBuyerById(id);
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
};

const buyerSlice = createSlice({
  name: "buyer",
  initialState,
  reducers: {
    clearBuyerErrors: (state) => {
      state.error = null;
      state.success = false;
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
      // Fetch Buyer By ID
      // .addCase(fetchBuyerById.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(fetchBuyerById.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.currentBuyer = action.payload.data || action.payload; // Adjust based on API structure
      // })
      // .addCase(fetchBuyerById.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload;
      // })
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
      });
  },
});

export const { clearBuyerErrors, clearCurrentBuyer } = buyerSlice.actions;
export default buyerSlice.reducer;
