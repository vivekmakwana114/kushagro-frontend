import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllFraudReports as getAllFraudReportsService,
  getFraudReportsByUserId as getFraudReportsByUserIdService,
  getFraudReportById as getFraudReportByIdService,
  deleteFraudReport as deleteFraudReportService,
} from "./fraudReportService";

// Async Thunks

export const fetchAllFraudReports = createAsyncThunk(
  "fraudReport/fetchAll",
  async (params, { rejectWithValue }) => {
    try {
      const response = await getAllFraudReportsService(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const fetchFraudReportsByUser = createAsyncThunk(
  "fraudReport/fetchByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await getFraudReportsByUserIdService(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const fetchFraudReportById = createAsyncThunk(
  "fraudReport/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getFraudReportByIdService(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const deleteFraudReport = createAsyncThunk(
  "fraudReport/delete",
  async (id, { rejectWithValue }) => {
    try {
      await deleteFraudReportService(id);
      return id; // Return id to filter out from state
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

const initialState = {
  reports: [],
  currentReport: null,
  loading: false,
  error: null,
  success: false,
  totalResults: 0,
  totalPages: 1,
};

const fraudReportSlice = createSlice({
  name: "fraudReport",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
      state.success = false;
    },
    clearCurrentReport: (state) => {
      state.currentReport = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchAllFraudReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllFraudReports.fulfilled, (state, action) => {
        state.loading = false;
        const data = action.payload;
        if (Array.isArray(data)) {
          state.reports = data;
        } else {
          state.reports = data.data || data.reports || [];
          state.totalResults = data.totalResults || 0;
          state.totalPages = data.totalPages || 1;
        }
      })
      .addCase(fetchAllFraudReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch By User
      .addCase(fetchFraudReportsByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFraudReportsByUser.fulfilled, (state, action) => {
        state.loading = false;
        const data = action.payload;
        state.reports = Array.isArray(data)
          ? data
          : data.data || data.reports || [];
      })
      .addCase(fetchFraudReportsByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Single
      .addCase(fetchFraudReportById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFraudReportById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentReport = action.payload.data || action.payload;
      })
      .addCase(fetchFraudReportById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete
      .addCase(deleteFraudReport.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.reports = state.reports.filter(
          (report) => (report._id || report.id) !== action.payload,
        );
      })
      .addCase(deleteFraudReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearErrors, clearCurrentReport } = fraudReportSlice.actions;
export default fraudReportSlice.reducer;
