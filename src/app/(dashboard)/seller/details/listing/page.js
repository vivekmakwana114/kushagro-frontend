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
import { useSearchParams } from "next/navigation";
import ListingPDFDocument from "./ListingPDFDocument";
import { pdf } from "@react-pdf/renderer";
const options = {
  select: false,
  order: false,
  sortable: false,
};

const ListingPage = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const sellerId = searchParams.get("id"); // Get sellerId from URL

  const { listings, totalListings, totalPages, currentPage, loading } =
    useSelector((state) => state.sellerListing);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (sellerId) {
      dispatch(fetchSellerProducts({ sellerId, params: { page, limit: 10 } }));
    }
  }, [dispatch, sellerId, page]);

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

  // Client-side filtering
  const filteredData = React.useMemo(() => {
    if (!search) return transformedData;
    return transformedData.filter((item) =>
      item.product.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [transformedData, search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleUpdateStatus = (id, status) => {
    if (!id) return;
    dispatch(updateSellerProductStatus({ id, status }))
      .unwrap()
      .then(() => {
        dispatch(
          fetchSellerProducts({
            sellerId,
            params: { page, limit: 10 },
          }),
        );
      })
      .catch((err) => console.error("Failed to update status:", err));
  };

  const handleDownloadPDF = async () => {
   
    const blob = await pdf(
      <ListingPDFDocument listings={filteredData} />,
    ).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "seller_listings.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadCSV = () => {
    if (!filteredData.length) return;

    const headers = [
      "Product Name",
      "Category",
      "Price",
      "Created On",
      "Status",
    ];
    const csvRows = [headers.join(",")];

    filteredData.forEach((item) => {
      const row = [
        `"${item.product.name}"`,
        `"${item.product.category}"`,
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
    link.download = "seller_listings.csv";
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
          data={filteredData}
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
