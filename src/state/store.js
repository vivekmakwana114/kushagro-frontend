import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../state/auth/authSlice";
import dashboardReducer from "../state/dashboard/dashboardSlice";
import categoriesReducer from "../state/categories/categoriesSlice";
import listingReducer from "../state/listing/listingSlice";
import sellerListingReducer from "./seller/listing/sellerListingSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    categories: categoriesReducer,
    listing: listingReducer,
    sellerListing: sellerListingReducer,
  },
});
