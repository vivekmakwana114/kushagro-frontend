"use client";
import ClientSidebar from "@/components/common/ClientSidebar";
import { settingSidebarItems } from "@/components/common/SidebarData";
import React from "react";

export default function MyStorePageLayout({ children }) {
  return (
    <div className="flex h-full relative">
      {/* Desktop: Normal sidebar */}
      <div className="hidden md:block">
        <ClientSidebar
          sidebarItems={settingSidebarItems}
          sidebarHeader="Settings"
        />
      </div>

      {/* Mobile: Sliding sidebar (always rendered for proper animation) */}
      <div className="md:hidden">
        <ClientSidebar
          sidebarItems={settingSidebarItems}
          sidebarHeader="Settings"
        />
      </div>

      {/* Content area */}
      <div className="flex-1 min-w-0 overflow-x-hidden md:ml-[220px] no-scrollbar">
        {children}
      </div>
    </div>
  );
}
