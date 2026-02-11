import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getSellerProducts,
  updateProductStatus,
} from "./sellerListingServices";
import { toast } from "sonner";

export const fetchSellerProducts = createAsyncThunk(
  "sellerListing/fetchSellerProducts",
  async ({ sellerId, params }, { rejectWithValue }) => {
    try {
      const response = await getSellerProducts(sellerId, params);
      return response.data;
    } catch (error) {
      console.error("Error in fetchSellerProducts thunk:", error);
      return rejectWithValue(
        error.response?.data || "Failed to fetch seller products"
      );
    }
  }
);

export const updateSellerProductStatus = createAsyncThunk(
  "sellerListing/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await updateProductStatus(id, status);
      toast.success("Product status updated successfully");
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
      return rejectWithValue(error.response?.data || "Failed to update status");
    }
  }
);

const sellerListingSlice = createSlice({
  name: "sellerListing",
  initialState: {
    listings: [],
    totalListings: 0,
    totalPages: 0,
    currentPage: 1,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.listings = action.payload.data || [];
        state.totalListings = action.payload.meta?.totalResults || 0;
        state.totalPages = action.payload.meta?.totalPages || 0;
        state.currentPage = action.payload.meta?.page || 1;
      })
      .addCase(fetchSellerProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateSellerProductStatus.fulfilled, (state, action) => {
        const index = state.listings.findIndex(
          (item) =>
            item.id === action.payload.id || item._id === action.payload.id // Check both id formats
        );
        if (index !== -1) {
          state.listings[index] = {
            ...state.listings[index],
            ...action.payload,
          };
        }
      });
  },
});

export default sellerListingSlice.reducer;
