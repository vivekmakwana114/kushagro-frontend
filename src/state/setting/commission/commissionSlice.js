import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCommissionSettings,
  updateCommissionSettings,
} from "./commissionService";

const initialState = {
  settings: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// Get commission settings
export const getCommission = createAsyncThunk(
  "commission/get",
  async (_, thunkAPI) => {
    try {
      const response = await getCommissionSettings();
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Update commission settings
export const updateCommission = createAsyncThunk(
  "commission/update",
  async (commissionData, thunkAPI) => {
    try {
      const response = await updateCommissionSettings(commissionData);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const commissionSlice = createSlice({
  name: "commission",
  initialState,
  reducers: {
    resetCommissionState: (state) => {
      // Do not reset settings here, only status flags
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Settings
      .addCase(getCommission.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCommission.fulfilled, (state, action) => {
        state.isLoading = false;
        state.settings = action.payload.data || action.payload;
      })
      .addCase(getCommission.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Update Settings
      .addCase(updateCommission.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCommission.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Commission settings updated successfully";
        state.settings = action.payload.data || action.payload; 
      })
      .addCase(updateCommission.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetCommissionState } = commissionSlice.actions;
export default commissionSlice.reducer;
