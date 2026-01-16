import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProducts,
  getProductById,
  updateProductStatus,
} from "./listingServices";
import { toast } from "sonner";

// Async Thunks

// fetch all products we are displaying in listing page grid panel.
export const fetchProducts = createAsyncThunk(
  "listing/fetchProducts",
  async (params, { rejectWithValue }) => {
    try {
      const response = await getProducts(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch products"
      );
    }
  }
);

// this is specific product details form.
export const fetchProductDetails = createAsyncThunk(
  "listing/fetchProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getProductById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch product details"
      );
    }
  }
);

// update product status (active/inactive)
export const updateProductStatusThunk = createAsyncThunk(
  "listing/updateStatus",
  async ({ id, status, params }, { rejectWithValue, dispatch }) => {
    try {
      const response = await updateProductStatus(id, status);
      toast.success("Product status updated successfully");
      dispatch(fetchProducts(params || {})); // Refetch with current params
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
      return rejectWithValue(error.response?.data || "Failed to update status");
    }
  }
);

// slices with initial state.
const listingSlice = createSlice({
  name: "listing",
  initialState: {
    listings: [],
    totalListings: 0,
    totalPages: 0,
    currentPage: 1,
    listingDetails: null,
    loading: false,
    detailsLoading: false,
    error: null,
  },
  reducers: {
    clearListingDetails: (state) => {
      state.listingDetails = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Products
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.listings = action.payload.data || [];
        state.totalListings = action.payload.meta?.totalResults || 0;
        state.totalPages = action.payload.meta?.totalPages || 0;
        state.currentPage = action.payload.meta?.page || 1;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch Product Details
    builder
      .addCase(fetchProductDetails.pending, (state) => {
        state.detailsLoading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.detailsLoading = false;
        state.listingDetails = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.detailsLoading = false;
        state.error = action.payload;
      });

    // Update Product Status
    builder.addCase(updateProductStatusThunk.fulfilled, (state, action) => {
      const index = state.listings.findIndex(
        (item) => item._id === action.payload._id
      );
      if (index !== -1) {
        state.listings[index] = { ...state.listings[index], ...action.payload };
      }
      // Also update details if currently viewing it
      if (
        state.listingDetails &&
        state.listingDetails._id === action.payload._id
      ) {
        state.listingDetails = { ...state.listingDetails, ...action.payload };
      }
    });
  },
});

export const { clearListingDetails } = listingSlice.actions;
export default listingSlice.reducer;
