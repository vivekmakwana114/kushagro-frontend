import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendPushNotification } from "./notificationService";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// Send push notification
export const sendNotification = createAsyncThunk(
  "notification/send",
  async (notificationData, thunkAPI) => {
    try {
      const response = await sendPushNotification(notificationData);
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

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    resetNotificationState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendNotification.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendNotification.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Notification sent successfully";
      })
      .addCase(sendNotification.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetNotificationState } = notificationSlice.actions;
export default notificationSlice.reducer;
