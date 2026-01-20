"use client";
import React, { useState, useEffect } from "react";
import GridCommonComponent from "@/components/grid/gridCommonComponent";
import { Input } from "@/components/ui/input";
import { Download, Filter, Search } from "lucide-react";
import { getOrderColumns } from "./orderColumn";
import ActionComponent from "@/components/grid/actionComponent";
import OrderFilterForm from "./OrderFilterForm";
import Image from "next/image";
import { BsFilePdf, BsFileSpreadsheet } from "react-icons/bs";
import Pagination from "@/components/ui/pagination";
import ViewUser from "../buyer/viewUser";
import ActionPopup from "@/components/common/ActionPopup";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrders,
  markOrderFlagged,
  cancelOrderAction,
  updateOrderStatusAction,
  initiateRefundAction,
} from "@/state/order/orderSlice";

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

const options = {
  select: true,
  order: false,
  sortable: true,
};

const OrderPage = () => {
  const dispatch = useDispatch();
  const { orders, totalPages, loading } = useSelector((state) => state.order);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(
        fetchOrders({
          page: currentPage,
          limit: itemsPerPage,
          search: searchTerm,
          ...filters,
        }),
      );
    }, 500);
    return () => clearTimeout(timer);
  }, [dispatch, currentPage, itemsPerPage, searchTerm, filters]);

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const formattedOrders = (orders || []).map((order) => ({
    ...order,
    // Map orderId to object to handle flag rendering without row access in simple cases if needed,
    // but primarily we need to match column expectation.
    // If we use 'render' in column that takes 'value', passing object is good.
    orderId: { value: order.orderNumber, isFlagged: order.isFlagged },
    product: {
      name: order.product?.name || "N/A",
      category: order.category?.name || "N/A",
      profile: order.product?.images?.[0] || "",
    },
    buyer: { name: "N/A", email: "", profile: "" }, // Placeholder
    seller: { name: "N/A", email: "", profile: "" }, // Placeholder
    date_time: order.createdAt,
    amount: order.totalAmount,
    payment_status: order.payments?.[0]?.status?.toLowerCase() || "pending",
    // Map API status to UI status (ongoing = PENDING/active usually)
    status:
      order.status === "PENDING" ? "ongoing" : order.status?.toLowerCase(),
  }));

  // Action Handlers
  const handleFlagOrder = async (row, data) => {
    await dispatch(
      markOrderFlagged({
        orderIds: [row._id],
        reason: data.selectedOptions?.join(", "), // Fixed: Join all selected options
        note: data.note,
      }),
    );
    dispatch(
      fetchOrders({
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm,
        ...filters,
      }),
    );
  };

  const handleCancelOrder = async (row, data) => {
    await dispatch(
      cancelOrderAction({
        orderId: row._id,
        cancellationReason: data.selectedOptions?.join(", "), // Fixed: Join all selected options
        note: data.note,
      }),
    );
    dispatch(
      fetchOrders({
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm,
        ...filters,
      }),
    );
  };

  const handleRefundOrder = async (row, data) => {
    await dispatch(
      initiateRefundAction({
        orderId: row._id,
        ...data,
      }),
    );
    dispatch(
      fetchOrders({
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm,
        ...filters,
      }),
    );
  };

  const orderColumns = getOrderColumns({
    onFlag: handleFlagOrder,
    onCancel: handleCancelOrder,
    onRefund: handleRefundOrder,
  });

  return (
    <div className="w-full md:h-[calc(100vh-9rem)] h-full flex flex-col">
      <div className="flex items-center justify-between mb-4 flex-none">
        <div className="relative mb-2 w-[400px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-dull-text" />
          <Input
            className="pl-10"
            placeholder="Search here..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

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
                component: <OrderFilterForm onApply={handleApplyFilters} />,
              },
            ]}
            icon={<Filter className="w-5 h-5 text-secondary1" />}
            buttonClassName="inline-flex items-center justify-center p-2 border border-border-admin bg-white rounded-md hover:bg-gray-50"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0 no-scrollbar">
        <GridCommonComponent
          data={formattedOrders}
          options={options}
          columns={orderColumns}
          theme={{
            border: "border-gray-300",
            header: {
              bg: "bg-gray-100",
            },
          }}
          bulkActionsConfig={[
            {
              label: "Mark As Complete",
              iconUrl: "/assets/icon/markCompleted.svg",
              type: "popUp",
              component: <ViewUser />,
            },
            {
              label: "Flag Order",
              iconUrl: "/assets/icon/flag.svg",
              type: "modal_component",
              component: (
                <ActionPopup
                  heading="Flag These Orders?"
                  subHeading="Are you sure you want to flag these orders for further review? Flagged Orders will be marked in the system and may require follow-up by the support or moderation team."
                  confirmText="Confirm Flag"
                  confirmColor="bg-[#2E5B20] hover:bg-[#254a1a] text-white"
                  dropdownOptions={[
                    {
                      label: "Suspicious activity",
                      value: "Suspicious activity",
                    },
                    {
                      label: "Payment discrepancy",
                      value: "Payment discrepancy",
                    },
                    { label: "Buyer complaint", value: "Buyer complaint" },
                    {
                      label: "No-show without update",
                      value: "No-show without update",
                    },
                    { label: "Stylist issue", value: "Stylist issue" },
                    { label: "Other", value: "Other" },
                  ]}
                  dropdownLabel="Select a reason for flagging this Order"
                  dropdownPlaceholder="Suspicious activity"
                  textareaLabel="Note"
                  textareaPlaceholder="Add a Note"
                />
              ),
              onApply: (data) => console.log("Flag Order:", row, data),
            },
            {
              label: "Export Selection",
              iconUrl: "/assets/icon/downloadGray.svg",
              children: [
                { header: "Download List" },
                {
                  label: "Download PDF",
                  icon: <BsFilePdf className="w-4 h-4 text-[#7B7B7B]" />,
                  onClick: (rows) => console.log(rows, "Download PDF"),
                },
                {
                  label: "Download CSV",
                  icon: (
                    <BsFileSpreadsheet className="w-4 h-4 text-[#7B7B7B]" />
                  ),
                  onClick: (rows) => console.log(rows, "Download CSV"),
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
    </div>
  );
};

export default OrderPage;
