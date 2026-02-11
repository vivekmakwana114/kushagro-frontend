"use client";

import { Provider } from "react-redux";
import { store } from "../state/store";
import AuthGuard from "@/app/(auth)/auth/AuthGuard";

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <AuthGuard>{children}</AuthGuard>
    </Provider>
  );
}
