import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../state/auth/authSlice";
import dashboardReducer from "../state/dashboard/dashboardSlice";
import categoriesReducer from "../state/categories/categoriesSlice";
import listingReducer from "../state/listing/listingSlice";
import sellerReducer from "./seller/sellerSlice";
import sellerListingReducer from "./seller/listing/sellerListingSlice";
import profileReducer from "./profile/profileSlice";
import orderReducer from "./order/orderSlice";
import buyerReducer from "./buyer/buyerSlice";
import fraudReportReducer from "./fraudReport/fraudReportSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    categories: categoriesReducer,
    listing: listingReducer,
    sellerListing: sellerListingReducer,
    seller: sellerReducer,
    profile: profileReducer,
    order: orderReducer,
    buyer: buyerReducer,
    fraudReport: fraudReportReducer,
  },
});
