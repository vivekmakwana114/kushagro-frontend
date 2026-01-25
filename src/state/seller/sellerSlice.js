import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllSellers, suspendSeller } from "./sellerService";

// Fetch all sellers
export const fetchSellers = createAsyncThunk(
  "seller/fetchAll",
  async (params, { rejectWithValue }) => {
    try {
      const response = await getAllSellers(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// Suspend seller
export const suspendSellerAction = createAsyncThunk(
  "seller/suspend",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await suspendSeller(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

const initialState = {
  sellers: [],
  totalPages: 1,
  totalResults: 0,
  loading: false,
  error: null,
  success: false,
};

const sellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {
    clearSellerErrors: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    // Fetch Sellers
    builder
      .addCase(fetchSellers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellers.fulfilled, (state, action) => {
        state.loading = false;
        const response = action.payload;

        // Check if response has data and meta (standard format)
        if (response.data && Array.isArray(response.data)) {
          state.sellers = response.data;
          state.totalResults =
            response.meta?.totalResults || response.data.length;
          state.totalPages = response.meta?.totalPages || 1;
        }
        // Handle direct array response (fallback)
        else if (Array.isArray(response)) {
          state.sellers = response;
          state.totalResults = response.length;
          state.totalPages = 1;
        }
        // Handle other potential structures
        else {
          state.sellers =
            response.results || response.users || response.data || [];
          state.totalPages = response.totalPages || 1;
          state.totalResults = response.totalResults || 0;
        }
      })
      .addCase(fetchSellers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Suspend Seller
      .addCase(suspendSellerAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(suspendSellerAction.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(suspendSellerAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSellerErrors } = sellerSlice.actions;
export default sellerSlice.reducer;
