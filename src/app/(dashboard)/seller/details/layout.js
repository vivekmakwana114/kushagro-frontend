"use client";
import ClientSidebar from "@/components/common/ClientSidebar";
import { sellerSidebarItems } from "@/components/common/SidebarData";
import { useSearchParams } from "next/navigation";
import React, { useMemo } from "react";

export default function MyStorePageLayout({ children }) {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const sidebarItems = useMemo(() => {
    if (!id) return sellerSidebarItems;
    return sellerSidebarItems.map((item) => ({
      ...item,
      url: `${item.url}?id=${id}`,
    }));
  }, [id]);

  return (
    <div className="flex h-full relative">
      {/* Desktop: Normal sidebar */}
      <div className="hidden md:block">
        <ClientSidebar sidebarItems={sidebarItems} sidebarHeader="Seller" />
      </div>

      {/* Mobile: Sliding sidebar (always rendered for proper animation) */}
      <div className="md:hidden">
        <ClientSidebar sidebarItems={sidebarItems} sidebarHeader="Seller" />
      </div>

      {/* Content area */}
      <div className="flex-1 min-w-0 overflow-x-hidden md:ml-[220px]">
        {children}
      </div>
    </div>
  );
}
