import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteFraudReport,
  getAllFraudReports,
  getFraudReportById,
} from "./fraudTicketService";

const initialState = {
  fraudReports: [],
  currentReport: null,
  isLoading: false,
  error: null,
  isSuccess: false,
};

// Fetch all fraud reports
export const fetchFraudReports = createAsyncThunk(
  "fraudTicket/fetchFraudReports",
  async (_, thunkAPI) => {
    try {
      const response = await getAllFraudReports();
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);

// Fetch fraud report by ID
export const fetchFraudReportById = createAsyncThunk(
  "fraudTicket/fetchFraudReportById",
  async (id, thunkAPI) => {
    try {
      const response = await getFraudReportById(id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);

// Delete fraud report
export const deleteReport = createAsyncThunk(
  "fraudTicket/deleteReport",
  async (id, thunkAPI) => {
    try {
      const response = await deleteFraudReport(id);
      return { id, ...response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);

const fraudTicketSlice = createSlice({
  name: "fraudTicket",
  initialState,
  reducers: {
    resetState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.isSuccess = false;
      state.currentReport = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Fraud Reports
      .addCase(fetchFraudReports.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFraudReports.fulfilled, (state, action) => {
        state.isLoading = false;
        state.fraudReports = action.payload;
        state.isSuccess = true;
      })
      .addCase(fetchFraudReports.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch Fraud Report By ID
      .addCase(fetchFraudReportById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFraudReportById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentReport = action.payload;
        state.isSuccess = true;
      })
      .addCase(fetchFraudReportById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete Fraud Report
      .addCase(deleteReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.fraudReports = state.fraudReports.filter(
          (report) => report._id !== action.meta.arg,
        );
      })
      .addCase(deleteReport.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetState } = fraudTicketSlice.actions;
export default fraudTicketSlice.reducer;
