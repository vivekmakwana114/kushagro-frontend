"use client";
import React, { useEffect, useState } from "react";
import GridCommonComponent from "@/components/grid/gridCommonComponent";
import { Input } from "@/components/ui/input";
import { Download, Search } from "lucide-react";
import ActionComponent from "@/components/grid/actionComponent";
import Image from "next/image";
import { getListingColumns } from "./listingColumn";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSellerProducts,
  updateSellerProductStatus,
} from "@/state/seller/listing/sellerListingSlice";
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
    useSelector((state) => state.sellerListing);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Hardcoded for testing as requested
  const sellerId = "6965ed01ff1c8e0042fde18d";

  useEffect(() => {
    console.log("ListingPage mounted via useEffect. SellerID:", sellerId);
    console.log("Dispatching fetchSellerProducts with params:", {
      page,
      limit: 10,
      search,
    });
    dispatch(
      fetchSellerProducts({ sellerId, params: { page, limit: 10, search } })
    )
      .then((res) => console.log("Dispatch result:", res))
      .catch((err) => console.error("Dispatch error:", err));
  }, [dispatch, sellerId, page, search]);

  // Transform data for the grid
  const transformedData = React.useMemo(() => {
    return listings.map((item) => ({
      ...item,
      product: {
        name: item.name,
        category:
          typeof item.categoryId === "object"
            ? item.categoryId.name
            : item.categoryId,
        profile: item.images?.[0] || "",
      },
      created_on: item.createdAt,
      status: item.status?.toLowerCase() || "inactive",
    }));
  }, [listings]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to page 1 on search
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleUpdateStatus = (id, status) => {
    if (!id) return;
    dispatch(updateSellerProductStatus({ id, status }))
      .unwrap()
      .then(() => {
        dispatch(fetchSellerProducts({ sellerId, params: { page, limit: 10, search } }));
      })
      .catch((err) => console.error("Failed to update status:", err));
  };

  return (
    <div className="w-full md:h-[calc(100vh-9rem)] h-full flex flex-col">
      <div className="flex items-center justify-between mb-4 flex-none">
        <div className="relative mb-2 w-[400px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            className="pl-10"
            placeholder="Search here..."
            value={search}
            onChange={handleSearch}
          />
        </div>
        <div className="flex items-center justify-between mb-2 gap-2">
          <div className="flex gap-2">
            <ActionComponent
              actions={downloadActions}
              buttonClassName="inline-flex items-center justify-center p-2 border border-(--border-admin) bg-white rounded-md  hover:bg-gray-50"
              icon={<Download className="w-4 h-4 text-secondary1" />}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <GridCommonComponent
          data={transformedData}
          options={options}
          columns={getListingColumns(handleUpdateStatus).map((col) => {
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
            border: "border-(--border-admin)",
            header: {
              bg: "bg-gray-100",
            },
          }}
          bulkActionsConfig={[
            {
              label: "Export Selection",
              iconUrl: "/assets/icon/downloadGray.svg",
              children: [
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
              ],
            },
          ]}
        />
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default ListingPage;
