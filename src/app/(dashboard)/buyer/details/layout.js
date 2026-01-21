"use client";
import ClientSidebar from "@/components/common/ClientSidebar";
import { buyerSidebarItems } from "@/components/common/SidebarData";
import React, { useMemo } from "react";
import { useSearchParams } from "next/navigation";

export default function DetailsPageLayout({ children }) {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const sidebarItems = useMemo(() => {
    if (!id) return buyerSidebarItems;
    return buyerSidebarItems.map((item) => ({
      ...item,
      url: `${item.url}?id=${id}`,
    }));
  }, [id]);

  return (
    <div className="flex h-full gap-6 sm:gap-2 relative">
      {/* Desktop: Normal sidebar */}
      <div className="hidden md:block">
        <ClientSidebar sidebarItems={sidebarItems} sidebarHeader="Buyer" />
      </div>

      {/* Mobile: Sliding sidebar (always rendered for proper animation) */}
      <div className="md:hidden">
        <ClientSidebar sidebarItems={sidebarItems} sidebarHeader="Buyer" />
      </div>

      {/* Content area */}
      <div className="flex-1 min-w-0 overflow-x-hidden md:ml-[220px]">
        {children}
      </div>
    </div>
  );
}
