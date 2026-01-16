import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  updateProfile,
  changePassword,
  getUsers,
  uploadImage,
} from "./profileService";

// Update User Profile
export const updateUserProfile = createAsyncThunk(
  "profile/updateUserProfile",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await updateProfile(id, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || {
          message: err.message || "Failed to update profile",
        }
      );
    }
  }
);

// Change User Password
export const changeUserPassword = createAsyncThunk(
  "profile/changeUserPassword",
  async (data, { rejectWithValue }) => {
    try {
      const res = await changePassword(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || {
          message: err.message || "Failed to change password",
        }
      );
    }
  }
);

// Get All Users
export const getAllUsers = createAsyncThunk(
  "profile/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getUsers();
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || {
          message: err.message || "Failed to fetch users",
        }
      );
    }
  }
);

// Upload Profile Image
export const uploadProfileImage = createAsyncThunk(
  "profile/uploadProfileImage",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await uploadImage(formData);
      return res.data; // Assuming this returns { url: "..." } or similar
    } catch (err) {
      return rejectWithValue(
        err.response?.data || {
          message: err.message || "Failed to upload image",
        }
      );
    }
  }
);

const initialState = {
  profile: null,
  users: [],
  status: "idle",
  error: null,
  updateStatus: "idle",
  updateMessage: null,
  passwordStatus: "idle",
  passwordMessage: null,
  uploadStatus: "idle",
  uploadMessage: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfileState: (state) => {
      state.status = "idle";
      state.error = null;
      state.updateStatus = "idle";
      state.updateMessage = null;
      state.passwordStatus = "idle";
      state.passwordMessage = null;
      state.uploadStatus = "idle";
      state.uploadMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Update Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.updateStatus = "loading";
        state.error = null;
        state.updateMessage = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        state.profile = action.payload;
        state.updateMessage = "Profile updated successfully";
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = action.payload?.message || "Failed to update profile";
      })

      // Change Password
      .addCase(changeUserPassword.pending, (state) => {
        state.passwordStatus = "loading";
        state.error = null;
        state.passwordMessage = null;
      })
      .addCase(changeUserPassword.fulfilled, (state, action) => {
        state.passwordStatus = "succeeded";
        state.passwordMessage = "Password changed successfully";
      })
      .addCase(changeUserPassword.rejected, (state, action) => {
        state.passwordStatus = "failed";
        state.error = action.payload?.message || "Failed to change password";
      })

      // Get Users
      .addCase(getAllUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Failed to fetch users";
      })

      // Upload Image
      .addCase(uploadProfileImage.pending, (state) => {
        state.uploadStatus = "loading";
        state.error = null;
      })
      .addCase(uploadProfileImage.fulfilled, (state, action) => {
        state.uploadStatus = "succeeded";
        state.uploadMessage = "Image uploaded successfully";
      })
      .addCase(uploadProfileImage.rejected, (state, action) => {
        state.uploadStatus = "failed";
        state.error = action.payload?.message || "Failed to upload image";
      });
  },
});

export const { clearProfileState } = profileSlice.actions;
export default profileSlice.reducer;
