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
import Pagination from "@/components/ui/pagination";
import CategoryPDFDocument from "./CategoryPDFDocument";

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

  /* Removed debounced effect for client-side search */
  useEffect(() => {
    dispatch(fetchProducts({ page, limit: 10, ...filters }));
  }, [page, filters, dispatch]); // Removed search dependency

  const handleFilterApply = (appliedFilters) => {
    // Map UI filters to API params
    const apiFilters = {};

    // Status
    if (appliedFilters.status && appliedFilters.status[0] !== "all") {
      apiFilters.status = appliedFilters.status[0].toUpperCase();
    }

    // Date Range
    if (appliedFilters.dateRange?.from) {
      apiFilters.dateFrom = appliedFilters.dateRange.from;
    }
    if (appliedFilters.dateRange?.to) {
      apiFilters.dateTo = appliedFilters.dateRange.to;
    }

    // Price Range
    if (appliedFilters.priceRange?.from) {
      apiFilters.minPrice = appliedFilters.priceRange.from;
    }
    if (appliedFilters.priceRange?.to) {
      apiFilters.maxPrice = appliedFilters.priceRange.to;
    }

    // Categories
    if (appliedFilters.categories && appliedFilters.categories.length > 0) {
      // Backend currently only supports filtering by one category ID at a time (valid mongo id constraint).
      // Taking the last selected one to replicate single-select behavior if user selected multiple.
      apiFilters.categoryId =
        appliedFilters.categories[appliedFilters.categories.length - 1];
    }

    setFilters(apiFilters);
    setPage(1); // Reset to first page
  };

  const handleStatusUpdate = (row, newStatus) => {
    const params = { page, limit: 10, ...filters }; // Removed search
    dispatch(
      updateProductStatusThunk({ id: row._id, status: newStatus, params }),
    );
  };

  const offerColumns = getOfferColumns(handleStatusUpdate);

  // Transform data for grid
  const transformedData = React.useMemo(() => {
    return listings.map((item) => {
      const missingFields = [];

      // Helper to log missing fields and return N/A
      const validateField = (val, fieldName) => {
        if ((val === null || val === undefined || val === "") && val !== 0) {
          missingFields.push(fieldName);
          return "N/A";
        }
        return val;
      };

      const formattedItem = {
        ...item,
        _id: item.id || item._id, // Handle both id flavors
        product: {
          name: validateField(item.name, "product.name"),
          // Prioritize populated category name, then categoryId (validated)
          category:
            item.category?.name ||
            (typeof item.categoryId === "object"
              ? item?.categoryId?.name
              : item.categoryId) ||
            validateField(null, "category"),
          profile:
            item?.images && item?.images?.length > 0
              ? item?.images?.[0]
              : "/assets/icon/image_not_found.svg",
        },
        seller: {
          // Check sellerId object properties first (as per API response), then user object
          name:
            item?.sellerId?.name ||
            item?.user?.fullName ||
            item?.user?.name ||
            validateField(null, "seller.name"),
          email:
            item?.sellerId?.email ||
            item?.user?.email ||
            validateField(null, "seller.email"),
          profile:
            item?.sellerId?.profile ||
            item?.user?.profilePic ||
            "/assets/icon/no_profile_icon.svg",
        },
        price: validateField(item?.price, "price"),
        status: item?.status || "INACTIVE",
        created_on: validateField(item?.createdAt, "created_on"),
      };

      if (missingFields.length > 0) {
        console.warn(
          `[Missing Data] Listing ID: ${
            formattedItem._id
          } - Missing fields: ${missingFields.join(", ")}`,
          item,
        );
      }

      return formattedItem;
    });
  }, [listings]);

  // Client-side filtering
  const filteredData = React.useMemo(() => {
    if (!search) return transformedData;
    return transformedData.filter((item) =>
      item.product.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [transformedData, search]);

  const handleDownloadPDF = async () => {
    const { pdf } = await import("@react-pdf/renderer");
    const blob = await pdf(
      <CategoryPDFDocument listings={filteredData} />,
    ).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "listing_categories.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadCSV = () => {
    if (!filteredData.length) return;

    const headers = ["Product Name", "Seller", "Price", "Created On", "Status"];
    const csvRows = [headers.join(",")];

    filteredData.forEach((item) => {
      const row = [
        `"${item.product.name}"`,
        `"${item.seller.name}"`,
        item.price,
        `"${new Date(item.created_on).toLocaleDateString()}"`,
        item.status,
      ];
      csvRows.push(row.join(","));
    });

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "listing_categories.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
      onClick: handleDownloadPDF,
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
      onClick: handleDownloadCSV,
    },
  ];

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

      <div className="flex-1 min-h-0 relative">
        {loading && (
          <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-50">
            Data is loading...
          </div>
        )}
        <GridCommonComponent
          data={filteredData}
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
