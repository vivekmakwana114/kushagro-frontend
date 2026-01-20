import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../state/auth/authSlice";
import dashboardReducer from "../state/dashboard/dashboardSlice";
import categoriesReducer from "../state/categories/categoriesSlice";
import listingReducer from "../state/listing/listingSlice";
import sellerListingReducer from "./seller/listing/sellerListingSlice";
import profileReducer from "./profile/profileSlice";
import orderReducer from "./order/orderSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    categories: categoriesReducer,
    listing: listingReducer,
    sellerListing: sellerListingReducer,
    profile: profileReducer,
    order: orderReducer,
  },
});
