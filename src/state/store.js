import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../state/auth/authSlice";
import dashboardReducer from "../state/dashboard/dashboardSlice";
import categoriesReducer from "../state/categories/categoriesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    categories:categoriesReducer,
  },
});