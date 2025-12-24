"use client";
import ClientSidebar from "@/components/common/ClientSidebar";
import { buyerSidebarItems } from "@/components/common/SidebarData";
import React from "react";

export default function DetailsPageLayout({ children }) {
  return (
    <div className="flex h-full gap-6 sm:gap-2 relative">
      {/* Desktop: Normal sidebar */}
      <div className="hidden md:block">
        <ClientSidebar
          sidebarItems={buyerSidebarItems}
          sidebarHeader="Buyer"
        />
      </div>

      {/* Mobile: Sliding sidebar (always rendered for proper animation) */}
      <div className="md:hidden">
        <ClientSidebar
          sidebarItems={buyerSidebarItems}
          sidebarHeader="Buyer"
        />
      </div>

      {/* Content area */}
      <div className="flex-1 min-w-0 overflow-x-hidden md:ml-[220px]">
        {children}
      </div>
    </div>
  );
}
