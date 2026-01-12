"use client";
import React, { useState, useEffect } from "react";
import GridCommonComponent from "@/components/grid/gridCommonComponent";
import { getOfferColumns } from "./listingColumn";
import { Input } from "@/components/ui/input";
import { Download, Filter, Search } from "lucide-react";
import ActionComponent from "@/components/grid/actionComponent";
import ListingFilterForm from "./ListingFilterForm";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  updateProductStatusThunk,
} from "@/state/listing/listingSlice";
import { useDebounce } from "@/hooks/useDebounce";
import Pagination from "@/components/ui/pagination";

const options = {
  select: false,
  order: false,
  sortable: false,
};

const downloadActions = [
  {
    header: "Download List",
  },
  {
    label: "Download PDF",
    icon: (
      <Image
        src="/assets/icon/downloadpdf.svg"
        alt="downloadpdf"
        width={16}
        height={16}
      />
    ),
    onClick: () => console.log("Download PDF"),
  },
  {
    label: "Download CSV",
    icon: (
      <Image
        src="/assets/icon/downloadcsv.svg"
        alt="downloadcsv"
        width={16}
        height={16}
      />
    ),

    onClick: () => console.log("Download CSV"),
  },
];
const ListingPage = () => {
  const dispatch = useDispatch();
  const { listings, totalListings, totalPages, currentPage, loading } =
    useSelector((state) => state.listing);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(fetchProducts({ page, limit: 10, search, ...filters }));
    }, 500);
    return () => clearTimeout(timer);
  }, [search, page, filters, dispatch]);

  const handleFilterApply = (appliedFilters) => {
    // Map UI filters to API params
    const apiFilters = {};
    if (appliedFilters.status && appliedFilters.status[0] !== "all") {
      apiFilters.status = appliedFilters.status[0].toUpperCase();
    }
    // Add other filter mappings as needed

    setFilters(apiFilters);
    setPage(1); // Reset to first page
  };

  const handleStatusUpdate = (row, newStatus) => {
    dispatch(updateProductStatusThunk({ id: row._id, status: newStatus }));
  };

  const offerColumns = getOfferColumns(handleStatusUpdate);

  // Transform data for grid
  const formattedListings = listings.map((item) => ({
    ...item,
    _id: item.id || item._id, // Handle both id flavors
    product: {
      name: item.name,
      category: item.category?.name || item.categoryId || "N/A",
      profile:
        item?.images && item?.images?.length > 0
          ? item?.images?.[0]
          : "https://picsum.photos/200",
    },
    seller: {
      name: item?.user?.fullName || item.user?.name || item?.sellerId || "N/A",
      email: item.user?.email || "N/A",
      profile: item.user?.profilePic || "https://picsum.photos/200",
    },
    price: item.price,
    status: item.status,
    created_on: item.createdAt || "N/A",
  }));

  return (
    <div className="w-full md:h-[calc(100vh-9rem)] h-full flex flex-col">
      <div className="flex items-center justify-between gap-2 mb-4 w-full flex-none">
        <div className="relative flex-1 min-w-[150px] max-w-[400px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-dull-text" />
          <Input
            className="pl-10 h-10 w-full border border-(--border-admin) rounded-md"
            placeholder="Search here..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex gap-2">
            <ActionComponent
              actions={downloadActions}
              buttonClassName="inline-flex items-center justify-center p-2 border border-border-admin bg-white rounded-md hover:bg-gray-50"
              icon={<Download className="w-5 h-5 text-secondary1" />}
            />

            <ActionComponent
              actions={[
                {
                  type: "sidebar",
                  component: (
                    <ListingFilterForm
                      onApply={handleFilterApply}
                      onCancel={() => {}}
                    />
                  ),
                },
              ]}
              icon={<Filter className="w-5 h-5 text-secondary1" />}
              buttonClassName="inline-flex items-center justify-center p-2 border border-border-admin bg-white rounded-md hover:bg-gray-50"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <GridCommonComponent
          data={formattedListings}
          loading={loading}
          options={options}
          columns={offerColumns?.map((col) => {
            if (col.key === "actions") {
              return {
                ...col,
                component: {
                  ...col.component,
                  options: {
                    ...col.component.options,
                    actions: (row) => col.component.options.actions(row),
                  },
                },
              };
            }
            return col;
          })}
          theme={{
            border: "var(--border-admin)",
            header: {
              bg: "bg-[var(--color-background)]",
            },
          }}
        />
      </div>

      <div className="flex-none mt-2">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setPage(page)}
        />
      </div>
    </div>
  );
};

export default ListingPage;
