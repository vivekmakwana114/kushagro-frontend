"use client";
import ClientSidebar from "@/components/common/ClientSidebar";
import { listingSidebarItems, settingSidebarItems } from "@/components/common/SidebarData";
import React from "react";

export default function MyStorePageLayout({ children }) {
  return (
    <div className="flex h-full relative">
      {/* Desktop: Normal sidebar */}
      <div className="hidden md:block">
        <ClientSidebar
          sidebarItems={listingSidebarItems}
          sidebarHeader="Listing & Categories"
        />
      </div>

      {/* Mobile: Sliding sidebar (always rendered for proper animation) */}
      <div className="md:hidden">
        <ClientSidebar
          sidebarItems={listingSidebarItems}
          sidebarHeader="Listing & Categories"
        />
      </div>

      {/* Content area */}
      <div className="flex-1 min-w-0 overflow-x-hidden md:ml-[220px]">
        {children}
      </div>
    </div>
  );
}
