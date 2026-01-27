"use client";
import React, { useState, useEffect } from "react";
import GridCommonComponent from "@/components/grid/gridCommonComponent";
import { Input } from "@/components/ui/input";
import { Download, Filter, Search } from "lucide-react";
import ActionComponent from "@/components/grid/actionComponent";
import Pagination from "@/components/ui/pagination";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSellers,
  suspendSellerAction,
  resetPasswordLinkAction,
  verifySellerAction,
  reactivateSellerAction,
} from "@/state/seller/sellerSlice";
import { toast } from "sonner";

import { getSellerColumns } from "./sellerColumn";
import SellerFilterForm from "./SellerFilterForm";
import ActionPopup from "@/components/common/ActionPopup";
import { downloadCSV, downloadPDF } from "@/lib/downloadUtils";

const options = {
  select: true,
  order: false,
  sortable: false,
};

const SellerPage = () => {
  const dispatch = useDispatch();
  const { sellers, totalPages } = useSelector((state) => state.seller);

  // Transform data for grid
  const formattedSellers = sellers.map((user) => ({
    _id: user._id || user.id,
    seller: {
      name: user.name,
      email: user.email,
      profile: user.profile,
    },
    phone: user.phone || user.phoneNumber || "N/A",
    createdAt: user.createdAt,
    totalListings: user.totalListings,
    totalOrders: user.totalOrders,
    earnings: user.earnings,
    idStatus: user.idStatus,
    status: user.status,
  }));

  // Handle Suspend Seller
  const handleSuspendSeller = (row, data) => {
    const reason =
      data.selectedOptions[0] === "Other" ? data.note : data.selectedOptions[0];

    dispatch(suspendSellerAction({ id: row._id, data: { reason } }))
      .unwrap()
      .then(() => {
        // Refresh data
        dispatch(
          fetchSellers({
            page: currentPage,
            limit: itemsPerPage,
            ...filterParams,
          }),
        );
      });
  };

  const handleResetPassword = (row) => {
    dispatch(resetPasswordLinkAction(row._id))
      .unwrap()
      .then(() => {
        toast.success("Reset password link sent successfully");
      })
      .catch((err) => {
        toast.error(typeof err === "string" ? err : "Failed to send link");
      });
  };

  const handleVerifySeller = (row, status, data) => {
    const payload = { status };

    dispatch(verifySellerAction({ id: row._id, data: payload }))
      .unwrap()
      .then(() => {
        toast.success(
          `Seller ${status === "APPROVED" ? "Verified" : "Rejected"} Successfully`,
        );
        // Refresh data
        dispatch(
          fetchSellers({
            page: currentPage,
            limit: itemsPerPage,
            ...filterParams,
          }),
        );
      })
      .catch((err) => {
        toast.error(typeof err === "string" ? err : "Action failed");
      });
  };

  const handleReactivateSeller = (row) => {
    dispatch(reactivateSellerAction(row._id))
      .unwrap()
      .then(() => {
        toast.success("Seller Reactivated Successfully");
        // Refresh data
        dispatch(
          fetchSellers({
            page: currentPage,
            limit: itemsPerPage,
            ...filterParams,
          }),
        );
      })
      .catch((err) => {
        toast.error(typeof err === "string" ? err : "Reactivation failed");
      });
  };

  const sellerColumns = getSellerColumns({
    onSuspend: handleSuspendSeller,
    onReset: handleResetPassword,
    onVerify: handleVerifySeller,
    onReactivate: handleReactivateSeller,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filterParams, setFilterParams] = useState({});

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleFilterApply = (filters) => {
    const newParams = {};

    // Status
    if (filters.status && !filters.status.includes("all")) {
      newParams.status =
        filters.status[0].charAt(0).toUpperCase() + filters.status[0].slice(1);
    }

    // ID Status
    if (filters.idStatus && !filters.idStatus.includes("all")) {
      newParams.idStatus =
        filters.idStatus[0].charAt(0).toUpperCase() +
        filters.idStatus[0].slice(1);
    }

    // Join Date
    if (filters.joinDate?.from) newParams.joinFrom = filters.joinDate.from;
    if (filters.joinDate?.to) newParams.joinTo = filters.joinDate.to;

    // Earning
    if (filters.earningAmount?.from)
      newParams.earningFrom = filters.earningAmount.from;
    if (filters.earningAmount?.to)
      newParams.earningTo = filters.earningAmount.to;

    // Orders
    if (filters.orderRange?.from) newParams.orderFrom = filters.orderRange.from;
    if (filters.orderRange?.to) newParams.orderTo = filters.orderRange.to;

    // Listings
    if (filters.listingsRange?.from)
      newParams.listingFrom = filters.listingsRange.from;
    if (filters.listingsRange?.to)
      newParams.listingTo = filters.listingsRange.to;

    setFilterParams(newParams);
    setCurrentPage(1);
  };

  // Filter sellers based on search query
  const filteredSellers = formattedSellers.filter((user) => {
    const query = searchQuery.toLowerCase();
    const name = user.seller?.name?.toLowerCase() || "";
    const email = user.seller?.email?.toLowerCase() || "";
    const phone = user.phone?.toLowerCase() || "";

    return (
      name.includes(query) || email.includes(query) || phone.includes(query)
    );
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(
      fetchSellers({ page: currentPage, limit: itemsPerPage, ...filterParams }),
    );
  }, [dispatch, currentPage, filterParams]);

  // Export columns definition
  const exportColumns = [
    { title: "Name", key: "sellerName" },
    { title: "Email", key: "sellerEmail" },
    { title: "Phone", key: "phone" },
    { title: "Joined Date", key: "createdAt" },
    { title: "Status", key: "status" },
    { title: "Verification", key: "idStatus" },
    { title: "Total Orders", key: "totalOrders" },
    { title: "Earnings", key: "earnings" },
  ];

  const prepareExportData = (data) => {
    return data.map((item) => ({
      ...item,
      sellerName: item.seller?.name || "N/A",
      sellerEmail: item.seller?.email || "N/A",
      createdAt: item.createdAt
        ? new Date(item.createdAt).toLocaleDateString()
        : "N/A",
      earnings: `$${item.earnings || 0}`,
    }));
  };

  const handleDownload = (type, data = filteredSellers) => {
    const exportData = prepareExportData(data);
    if (type === "csv") {
      downloadCSV(exportData, exportColumns, "Sellers_List");
    } else {
      downloadPDF(exportData, exportColumns, "Sellers_List");
    }
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
      onClick: () => handleDownload("pdf"),
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
      onClick: () => handleDownload("csv"),
    },
  ];

  return (
    <div className="w-full  md:h-[calc(100vh-9rem)] h-full flex flex-col">
      <div className="flex items-center justify-between mb-2 gap-2 flex-none">
        <div className="relative w-[400px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            className="pl-10 w-full"
            placeholder="Search here..."
            value={searchQuery}
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

            <ActionComponent
              actions={[
                {
                  type: "sidebar",
                  component: <SellerFilterForm onApply={handleFilterApply} />,
                },
              ]}
              icon={<Filter className="w-4 h-4 text-secondary1" />}
              buttonClassName="inline-flex items-center justify-center p-2 border border-(--border-admin) bg-white rounded-md  hover:bg-gray-50"
            />
          </div>
        </div>
      </div>

      {/* Conditional Rendering */}

      <>
        <div className="flex-1 overflow-y-auto min-h-0 no-scrollbar">
          <GridCommonComponent
            data={filteredSellers}
            options={options}
            columns={sellerColumns.map((col) => {
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
                label: "Suspend Seller",
                iconUrl: "/assets/icon/suspendCustomer.svg",
                type: "modal_component",
                component: (
                  <ActionPopup
                    heading="Suspend Selected Sellers?"
                    subHeading="You are about to suspend selected Sellers. They will lose access to all app features until reactivated."
                    confirmText="Confirm Suspend All"
                    confirmColor="red"
                    dropdownOptions={[
                      {
                        label: "Deactivation requested by the Sellers.",
                        value: "Deactivation requested by the Sellers.",
                      },
                      {
                        label: "Inappropriate behavior",
                        value: "Inappropriate behavior",
                      },
                      {
                        label: "Multiple no-shows",
                        value: "Multiple no-shows",
                      },
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
                    dropdownPlaceholder="Deactivation requested by the Sellers."
                    textareaLabel="Note"
                    textareaPlaceholder="Add a Note"
                  />
                ),
                onApply: async (data, rows) => {
                  const reason =
                    data.selectedOptions[0] === "Other"
                      ? data.note
                      : data.selectedOptions[0];

                  try {
                    await Promise.all(
                      rows.map((row) =>
                        dispatch(
                          suspendSellerAction({
                            id: row._id,
                            data: { reason },
                          }),
                        ).unwrap(),
                      ),
                    );

                    // Refresh data after all suspensions are done
                    dispatch(
                      fetchSellers({
                        page: currentPage,
                        limit: itemsPerPage,
                        ...filterParams,
                      }),
                    );
                  } catch (error) {
                    console.error("Failed to suspend sellers:", error);
                  }
                },
              },

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
                    onClick: (rows) => handleDownload("pdf", rows),
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
                    onClick: (rows) => handleDownload("csv", rows),
                  },
                ],
              },
            ]}
          />
        </div>

        <div className="flex-none mt-2">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </>
    </div>
  );
};

export default SellerPage;
