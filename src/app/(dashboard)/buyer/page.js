"use client";
import React, { useState, useEffect } from "react";
import GridCommonComponent from "@/components/grid/gridCommonComponent";
import { getBuyerColumns } from "./buyerColumn";
import { Input } from "@/components/ui/input";
import { Download, Filter, Search } from "lucide-react";
import ActionComponent from "@/components/grid/actionComponent";
import ActionPopup from "@/components/common/ActionPopup";
import Pagination from "@/components/ui/pagination";
import Image from "next/image";
import BuyerFilterForm from "./BuyerFilterForm";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBuyers,
  suspendBuyer,
  reactivateBuyer,
  sendResetPasswordLink,
} from "@/state/buyer/buyerSlice";
import BuyerPDFDocument from "./BuyerPDFDocument";
import { pdf } from "@react-pdf/renderer";
import { toast } from "sonner";

const options = {
  select: true,
  order: false,
  sortable: false,
};

const Page = () => {
  const dispatch = useDispatch();
  const { buyers, totalPages, loading } = useSelector((state) => state.buyer);

  // Handlers for Suspend/Reactivate
  const constructReason = (data) => {
    let reasons = [];
    if (data.selectedOptions) {
      reasons = [...data.selectedOptions];
    }
    const otherIndex = reasons.indexOf("Other");
    if (otherIndex > -1) {
      reasons.splice(otherIndex, 1);
      if (data.note) reasons.push(data.note);
    }
    return reasons.join(", ");
  };

  const handleSuspend = async (row, data) => {
    // Check if buyer is already suspended
    if (row.isSuspended || row.status === "suspended") {
      toast.error("Buyer is already suspended");
      return;
    }

    const reason = constructReason(data);
    if (!reason) {
      toast.error("Please provide a reason for suspension");
      return;
    }

    try {
      await dispatch(
        suspendBuyer({ id: row._id || row.id, data: { reason } }),
      ).unwrap();
      toast.success("Buyer suspended successfully");
      // Refresh or allow state update to reflect change (handled in slice)
    } catch (error) {
      toast.error(error.message || "Failed to suspend buyer");
    }
  };

  const handleReactivate = async (row, data) => {
    const reason = data.note || "Reactivated by admin";

    try {
      await dispatch(
        reactivateBuyer({ id: row._id || row.id, data: { reason } }),
      ).unwrap();
      toast.success("Buyer reactivated successfully");
    } catch (error) {
      toast.error(error.message || "Failed to reactivate buyer");
    }
  };

  const handleResetLink = async (row) => {
    try {
      await dispatch(sendResetPasswordLink(row._id || row.id)).unwrap();
      toast.success("Reset link sent successfully");
    } catch (error) {
      toast.error(error.message || "Failed to send reset link");
    }
  };

  const buyerColumns = getBuyerColumns(
    handleSuspend,
    handleReactivate,
    handleResetLink,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(
        fetchBuyers({
          page: currentPage,
          limit: itemsPerPage,
          ...filters,
        }),
      );
    }, 500);
    return () => clearTimeout(timer);
  }, [dispatch, currentPage, itemsPerPage, filters]);

  const handleApplyFilters = (filterData) => {
    const newFilters = {};

    // Status
    if (filterData.status && !filterData.status.includes("all")) {
      newFilters.status = filterData.status[0].toLowerCase();
    } else {
      newFilters.status = "all";
    }

    // Date Range
    if (filterData.joinDate?.from) {
      newFilters.from = filterData.joinDate.from.toISOString().split("T")[0];
    }
    if (filterData.joinDate?.to) {
      newFilters.to = filterData.joinDate.to.toISOString().split("T")[0];
    }

    // Amount Range
    if (filterData.spendAmount?.from) {
      newFilters.minSpent = filterData.spendAmount.from;
    }
    if (filterData.spendAmount?.to) {
      newFilters.maxSpent = filterData.spendAmount.to;
    }

    setFilters(newFilters);
    setCurrentPage(1);
  };

  // Map backend data to frontend columns
  const formattedData = buyers.map((buyer) => ({
    ...buyer,
    buyer: {
      name: buyer?.name || "N/A",
      email: buyer?.email || "N/A",
      profile: buyer?.profile || "",
    },
    phone: buyer?.phone || "N/A",
    joined_on: buyer?.createdAt || buyer?.joinedAt,
    total_order: buyer?.totalOrders || 0,
    total_spent: buyer?.totalSpent || 0,
    status: buyer?.isSuspended
      ? "suspended"
      : buyer?.isActive
        ? "active"
        : "inactive",
  }));

  // Client-Side Search
  const filteredData = formattedData.filter((buyer) => {
    if (!searchTerm) return true;
    const lowerSearch = searchTerm.toLowerCase();

    return (
      buyer.buyer?.name?.toLowerCase().includes(lowerSearch) ||
      buyer.buyer?.email?.toLowerCase().includes(lowerSearch) ||
      buyer.phone?.toLowerCase().includes(lowerSearch) ||
      buyer.status?.toLowerCase().includes(lowerSearch)
    );
  });

  // Download Handlers
  const handleDownloadPDF = async (rows) => {
    const dataToExport =
      Array.isArray(rows) && rows.length > 0 ? rows : filteredData;

    const blob = await pdf(<BuyerPDFDocument buyers={dataToExport} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `buyers_${new Date().toISOString().split("T")[0]}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadCSV = (rows) => {
    const dataToExport =
      Array.isArray(rows) && rows.length > 0 ? rows : filteredData;

    const headers = [
      "Name",
      "Email",
      "Phone",
      "Joined On",
      "Total Orders",
      "Total Spent",
      "Status",
    ];

    const escapeCsvValue = (value) => {
      if (value === null || value === undefined) return "";
      const stringValue = String(value);
      const escaped = stringValue.replace(/"/g, '""');
      return `"${escaped}"`;
    };

    const rowsData = dataToExport.map((buyer) => [
      buyer.buyer?.name || "N/A",
      buyer.buyer?.email || "N/A",
      `\t${buyer.phone || "N/A"}`,
      buyer.joined_on
        ? `\t${new Date(buyer.joined_on).toISOString().split("T")[0]}`
        : "N/A",
      buyer.total_order || 0,
      buyer.total_spent || 0,
      buyer.status || "N/A",
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        headers.map(escapeCsvValue).join(","),
        ...rowsData.map((row) => row.map(escapeCsvValue).join(",")),
      ].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `buyers_${new Date().toISOString().split("T")[0]}.csv`,
    );
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
      onClick: () => handleDownloadPDF(),
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

      onClick: () => handleDownloadCSV(),
    },
  ];

  // Bulk Suspend Handler
  const handleBulkSuspend = async (data, rows) => {
    const reason = constructReason(data);
    if (!reason) {
      toast.error("Please provide a reason");
      return;
    }

    // Filter out already suspended buyers
    const buyersToSuspend = rows.filter(
      (row) => !row.isSuspended && row.status !== "suspended",
    );

    if (buyersToSuspend.length === 0) {
      toast.error("Selected buyers are already suspended");
      return;
    }

    if (buyersToSuspend.length < rows.length) {
      toast.warning(
        `${rows.length - buyersToSuspend.length} buyer(s) already suspended and will be skipped.`,
      );
    }

    try {
      // Process suspension for all valid rows
      const promises = buyersToSuspend.map((row) =>
        dispatch(
          suspendBuyer({ id: row._id || row.id, data: { reason } }),
        ).unwrap(),
      );

      await Promise.all(promises);
      toast.success("Selected active buyers suspended successfully");
      // when sucess then trigger refresh
      dispatch(
        fetchBuyers({ page: currentPage, limit: itemsPerPage, ...filters }),
      );
    } catch (error) {
      toast.error("Some suspensions failed. Please try again.");
    }
  };

  return (
    <div className="w-full md:h-[calc(100vh-9rem)] h-full flex flex-col">
      <div className="flex items-center justify-between mb-2 gap-2">
        <div className="relative w-[400px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-dull-text" />
          <Input
            className="pl-10 w-full"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <ActionComponent
            actions={downloadActions}
            buttonClassName="inline-flex items-center justify-center p-2 border border-secondary1 bg-white rounded-md  hover:bg-gray-50"
            icon={<Download className="w-4 h-4 text-secondary1" />}
          />

          <ActionComponent
            actions={[
              {
                type: "sidebar",
                component: <BuyerFilterForm onApply={handleApplyFilters} />,
              },
            ]}
            icon={<Filter className="w-4 h-4 text-secondary1" />}
            buttonClassName="inline-flex items-center justify-center p-2 border border-secondary1 bg-white rounded-md  hover:bg-gray-50"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0 no-scrollbar">
        <GridCommonComponent
          data={filteredData}
          options={options}
          columns={buyerColumns.map((col) => {
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
              label: "Suspend Buyers",
              iconUrl: "/assets/icon/suspendCustomer.svg",
              type: "modal_component",
              component: (
                <ActionPopup
                  heading="Suspend Selected Buyers?"
                  subHeading="You are about to suspend selected Buyers. They will lose access to all app features until reactivated. Please select a common reason for suspension."
                  confirmText="Confirm Suspend All"
                  confirmColor="red"
                  dropdownOptions={[
                    {
                      label: "Deactivation requested by the Buyers.",
                      value: "Deactivation requested by the Buyers.",
                    },
                    {
                      label: "Inappropriate behavior",
                      value: "Inappropriate behavior",
                    },
                    { label: "Multiple no-shows", value: "Multiple no-shows" },
                    {
                      label: "Payment-related issues",
                      value: "Payment-related issues",
                    },
                    {
                      label: "Spam or fake account",
                      value: "Spam or fake account",
                    },
                    { label: "Other", value: "Other" },
                  ]}
                  dropdownLabel="Select Suspension Reason"
                  dropdownPlaceholder="Deactivation requested by the Buyers."
                  textareaLabel="Note"
                  textareaPlaceholder="Add a Note"
                />
              ),
              onApply: handleBulkSuspend,
            },
            {
              label: "Export Selection",
              iconUrl: "/assets/icon/downloadGray.svg",
              children: [
                { header: "Download List" },
                {
                  label: "Download PDF",
                  // icon: <BsFilePdf className="w-4 h-4 text-dull-text" />,
                  icon: (
                    <Image
                      src="/assets/icon/downloadpdf.svg"
                      alt="downloadpdf"
                      width={16}
                      height={16}
                    />
                  ),
                  onClick: (rows) => handleDownloadPDF(rows),
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
                  onClick: (rows) => handleDownloadCSV(rows),
                },
              ],
            },
          ]}
        />
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => {
          setCurrentPage(page);
        }}
      />
    </div>
  );
};
export default Page;
