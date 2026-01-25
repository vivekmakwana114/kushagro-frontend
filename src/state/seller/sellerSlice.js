import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";
import {
  getAllSellers,
  suspendSeller,
  getSellerDetails,
  resetPasswordLink,
  verifySeller,
  reactivateSeller,
  getFraudReportsByUser,
  getFraudReportDetails,
  deleteFraudReport,
  getSellerReviews,
} from "./sellerService";

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

// Get Seller Details
export const getSellerDetailsAction = createAsyncThunk(
  "seller/getDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getSellerDetails(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// Reset Password Link
export const resetPasswordLinkAction = createAsyncThunk(
  "seller/resetPasswordLink",
  async (id, { rejectWithValue }) => {
    try {
      const response = await resetPasswordLink(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// Verify/Reject Seller
export const verifySellerAction = createAsyncThunk(
  "seller/verify",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await verifySeller(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// Reactivate Seller
export const reactivateSellerAction = createAsyncThunk(
  "seller/reactivate",
  async (id, { rejectWithValue }) => {
    try {
      const response = await reactivateSeller(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// Get Fraud Reports By User
export const fetchSellerReports = createAsyncThunk(
  "seller/fetchReports",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getFraudReportsByUser(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// Get Report Details
export const fetchReportDetails = createAsyncThunk(
  "seller/fetchReportDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getFraudReportDetails(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// Delete Fraud Report
export const deleteReportAction = createAsyncThunk(
  "seller/deleteReport",
  async (id, { rejectWithValue }) => {
    try {
      await deleteFraudReport(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// Get Seller Reviews
export const fetchSellerReviews = createAsyncThunk(
  "seller/fetchReviews",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getSellerReviews(id);
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
  sellerDetails: null,
  sellerReports: [],
  currentReport: null,
  sellerReviews: [],
  sellerReviewsStats: null,
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
      })
      // Get Seller Details
      .addCase(getSellerDetailsAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSellerDetailsAction.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Seller Details Response:", action.payload);
        state.sellerDetails = action.payload.data || action.payload;
      })
      .addCase(getSellerDetailsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Reset Password Link
      .addCase(resetPasswordLinkAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPasswordLinkAction.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(resetPasswordLinkAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Verify/Reject Seller
      .addCase(verifySellerAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifySellerAction.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(verifySellerAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Reactivate Seller
      .addCase(reactivateSellerAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(reactivateSellerAction.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(reactivateSellerAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fraud Reports
      .addCase(fetchSellerReports.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSellerReports.fulfilled, (state, action) => {
        state.loading = false;
        state.sellerReports = action.payload.data || action.payload || [];
      })
      .addCase(fetchSellerReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Report Details
      .addCase(fetchReportDetails.fulfilled, (state, action) => {
        state.currentReport = action.payload.data || action.payload;
      })
      // Delete Report
      .addCase(deleteReportAction.fulfilled, (state, action) => {
        state.sellerReports = state.sellerReports.filter(
          (report) =>
            report._id !== action.payload && report.id !== action.payload,
        );
        toast.success("Report deleted successfully");
      })
      // Reviews
      .addCase(fetchSellerReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSellerReviews.fulfilled, (state, action) => {
        state.loading = false;
        const data = action.payload.data || action.payload || {};
        state.sellerReviews = data.reviews || [];
        state.sellerReviewsStats = data.stats || null;
      })
      .addCase(fetchSellerReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSellerErrors } = sellerSlice.actions;
export default sellerSlice.reducer;
