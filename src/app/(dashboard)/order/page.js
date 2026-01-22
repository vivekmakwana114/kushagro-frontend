"use client";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import GridCommonComponent from "@/components/grid/gridCommonComponent";
import { Input } from "@/components/ui/input";
import { Download, Filter, Search } from "lucide-react";
import { getOrderColumns } from "./orderColumn";
import ActionComponent from "@/components/grid/actionComponent";
import OrderFilterForm from "./OrderFilterForm";
import Image from "next/image";
import { BsFilePdf, BsFileSpreadsheet } from "react-icons/bs";
import Pagination from "@/components/ui/pagination";
import ActionPopup from "@/components/common/ActionPopup";
import InitiateRefundPopup from "@/components/common/InitiateRefundPopup";
import Link from "next/link";
import OrderPDFDocument from "./OrderPDFDocument";
import OrderInvoicePDF from "./OrderInvoicePDF";
import { pdf } from "@react-pdf/renderer";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrders,
  markOrderFlagged,
  cancelOrderAction,
  updateOrderStatusAction,
  initiateRefundAction,
  fetchOrderById,
} from "@/state/order/orderSlice";

const options = {
  select: true,
  order: false,
  sortable: true,
};

const normalizePaymentStatus = (order) => {
  const raw = (
    order.paymentStatus ||
    order.payments?.[0]?.status ||
    ""
  ).toString().toLowerCase();

  if (["payment success", "paid", "success"].includes(raw)) return "paid";
  if (["refund initiated", "refunded initiated", "refunded"].includes(raw))
    return "refunded";
  if (["processing"].includes(raw)) return "processing";
  return "pending";
};

const normalizeStatus = (status) => {
  const raw = (status || "").toString().toLowerCase();
  if (["complete", "completed", "done"].includes(raw)) return "complete";
  if (["cancelled", "canceled"].includes(raw)) return "cancelled";
  return "ongoing";
};

const OrderPage = () => {
  const dispatch = useDispatch();
  const { orders, totalPages, loading } = useSelector((state) => state.order);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});
  const [refundPopupData, setRefundPopupData] = useState(null);
  const [isRefundPopupOpen, setIsRefundPopupOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(
        fetchOrders({
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

    // Order Status
    if (filterData.orderStatus && !filterData.orderStatus.includes("all")) {
      newFilters.orderStatus = filterData.orderStatus[0];
    }

    // Payment Status
    if (filterData.paymentStatus && !filterData.paymentStatus.includes("all")) {
      newFilters.paymentStatus = filterData.paymentStatus[0];
    }

    // Date Range
    if (filterData.dateRange?.from) {
      newFilters.fromDate = filterData.dateRange.from.toISOString();
    }
    if (filterData.dateRange?.to) {
      newFilters.toDate = filterData.dateRange.to.toISOString();
    }

    // Amount Range
    if (filterData.amountRange?.from) {
      newFilters.amountFrom = filterData.amountRange.from;
    }
    if (filterData.amountRange?.to) {
      newFilters.amountTo = filterData.amountRange.to;
    }

    setFilters(newFilters);
    setCurrentPage(1);
  };

  const formattedOrders = (orders || []).map((order) => {
    const paymentStatus = normalizePaymentStatus(order);
    const status = normalizeStatus(order.status);
    const orderIdValue = order.orderId || order.orderNumber || order._id ||  "";
    const isFlagged =
      order.isFlagged ??
      order.flagged ??
      order.flag ??
      order.is_flagged ??
      false;

    return {
      ...order,
      // keep orderId as a primitive value for the grid
      orderId:
        orderIdValue !== undefined && orderIdValue !== null
          ? String(orderIdValue)
          : "N/A",
      // expose flag state at row level
      isFlagged: Boolean(isFlagged),
      product: {
        name: order.product?.name || "N/A",
        category:
          order.category?.name || order.product?.category || order.category || "N/A",
        profile:
          order.product?.image ||
          order.product?.images?.[0] ||
          order.product?.profile ||
          "",
      },
      buyer: {
        name: order.buyer?.name || "N/A",
        email: order.buyer?.email || "",
        profile: order.buyer?.profile || "",
      },
      seller: {
        name: order.seller?.name || "N/A",
        email: order.seller?.email || "",
        profile: order.seller?.profile || "",
      },
      date_time: order.createdAt || order.date,
      amount: order.totalAmount ?? order.amount ?? 0,
      payment_status: paymentStatus,
      status: status,
    };
  });

  // Client-Side Filtering
  const filteredOrders = formattedOrders.filter((order) => {
    if (!searchTerm) return true;
    const lowerSearch = searchTerm.toLowerCase();
    const orderIdValue =
      order.orderId?.value ||
      order.orderNumber ||
      order.orderId ||
      order._id ||
      "";

    // Check relevant fields
    const orderIdMatch = orderIdValue
      ?.toString()
      ?.toLowerCase()
      .includes(lowerSearch);
    const productNameMatch = order.product?.name
      ?.toLowerCase()
      .includes(lowerSearch);
    const buyerNameMatch = order.buyer?.name
      ?.toLowerCase()
      .includes(lowerSearch);
    const sellerNameMatch = order.seller?.name
      ?.toLowerCase()
      .includes(lowerSearch);
    const statusMatch = order.status?.toString().toLowerCase().includes(lowerSearch);

    return (
      orderIdMatch ||
      productNameMatch ||
      buyerNameMatch ||
      sellerNameMatch ||
      statusMatch
    );
  });

  // Action Handlers
  const handleFlagOrder = async (row, data) => {
    await dispatch(
      markOrderFlagged({
        orderIds: [row._id],
        reason: data.selectedOptions?.join(", "), // will select all the options
        note: data.note,
      }),
    );
    dispatch(
      fetchOrders({
        page: currentPage,
        limit: itemsPerPage,
        ...filters,
      }),
    );
  };

  const handleCancelOrder = async (row, data) => {
    // Instead of canceling directly, open the Refund Popup for confirmation
    setRefundPopupData({ row, ...data });
    setIsRefundPopupOpen(true);
  };

  const handleConfirmCancel = async () => {
    if (!refundPopupData) return;

    await dispatch(
      cancelOrderAction({
        orderId: refundPopupData.row._id,
        cancellationReason:
          refundPopupData.selectedOptions?.join(", ") || "Refund Initiated",
        note: refundPopupData.note,
      }),
    );

    setIsRefundPopupOpen(false);
    setRefundPopupData(null);

    dispatch(
      fetchOrders({
        page: currentPage,
        limit: itemsPerPage,
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
        ...filters,
      }),
    );
  };

  const handleMarkComplete = async (row) => {
    try {
      await dispatch(
        updateOrderStatusAction({
          orderIds: [row._id],
        }),
      ).unwrap();
      toast.success("Order marked as complete");
      dispatch(
        fetchOrders({
          page: currentPage,
          limit: itemsPerPage,
          ...filters,
        }),
      );
    } catch (error) {
      console.error("Failed to mark complete:", error);
      toast.error(error || "Failed to mark order as complete");
    }
  };

  const handleBulkFlagOrder = async (data, rows) => {
    await dispatch(
      markOrderFlagged({
        orderIds: rows.map((r) => r._id),
        reason: data.selectedOptions?.join(", "),
        note: data.note,
      }),
    );
    dispatch(
      fetchOrders({
        page: currentPage,
        limit: itemsPerPage,
        ...filters,
      }),
    );
  };

  const handleBulkMarkComplete = async (rows) => {
    const validRows = rows.filter(
      (r) => r.payment_status?.toLowerCase() === "paid",
    );

    if (validRows.length === 0) {
      toast.error("Payment is pending. Cannot mark as complete.");
      return;
    }

    try {
      await dispatch(
        updateOrderStatusAction({
          orderIds: validRows.map((r) => r._id),
        }),
      ).unwrap();

      const skippedCount = rows.length - validRows.length;
      if (skippedCount > 0) {
        toast.success(
          `Marked ${validRows.length} orders as complete. ${skippedCount} unpaid orders skipped.`,
        );
      } else {
        toast.success("Orders marked as complete");
      }

      dispatch(
        fetchOrders({
          page: currentPage,
          limit: itemsPerPage,
          search: searchTerm,
          ...filters,
        }),
      );
    } catch (error) {
      console.error("Bulk update failed:", error);
      toast.error("Failed to mark orders as complete");
    }
  };

  // Download Handlers
  const handleDownloadPDF = async (rows) => {
    const dataToExport =
      Array.isArray(rows) && rows.length > 0 ? rows : filteredOrders;

    const blob = await pdf(<OrderPDFDocument orders={dataToExport} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `orders_${new Date().toISOString().split("T")[0]}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadCSV = (rows) => {
    const dataToExport =
      Array.isArray(rows) && rows.length > 0 ? rows : filteredOrders;

    const headers = [
      "Order ID",
      "Product",
      "Category",
      "Buyer",
      "Seller",
      "Date",
      "Amount",
      "Payment Status",
      "Status",
    ];

    const rowsData = dataToExport.map((order) => [
      order.orderId || order.orderNumber,
      order.product?.name,
      order.product?.category,
      order.buyer?.name,
      order.seller?.name,
      order.date_time ? new Date(order.date_time).toLocaleDateString() : "",
      order.amount || order.totalAmount,
      order.payment_status,
      order.status,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rowsData.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `orders_${new Date().toISOString().split("T")[0]}.csv`,
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

  // Helper for invoice data mapping
  const mapOrderToInvoiceData = (apiData) => {
    const order = apiData || {};
    return {
      orderId: order.orderNumber || "N/A",
      totalAmount: order.totalAmount ? `$${order.totalAmount}` : "N/A",
      transactionId: order.payments?.[0]?.transactionId || "N/A",
      date: order.createdAt
        ? new Date(order.createdAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : "N/A",
      paymentMethod: order.payments?.[0]?.paymentMethod || "N/A",
      status: order.status || "N/A",
      cancellationReason: order.cancelReason || "", // Added missing field
      product: {
        name: order.product?.name || "N/A",
        category: order.category?.name || "N/A",
        image: order.product?.images?.[0] || "",
        quantity: order.quantity
          ? `${order.quantity} ${order.product?.extraFields?.unit || "Unit"}`
          : "N/A",
        price: order.price ? `$${order.price}` : "N/A",
        subtotal: order.subTotal ? `$${order.subTotal}` : "N/A",
      },
      buyer: {
        name: order.buyer?.name || "N/A",
        email: order.buyer?.email || "N/A",
        avatar: order.buyer?.profile || "https://picsum.photos/200",
      },
      seller: {
        name: order.seller?.name || "N/A",
        email: order.seller?.email || "N/A",
        avatar: order.seller?.profile || "https://picsum.photos/201",
      },
      invoice: {
        invoiceId: order.orderNumber || "N/A",
        itemTotal: order.subTotal ? `$${order.subTotal}` : "N/A",
        taxes: order.tax ? `$${order.tax}` : "$0.00",
        platformFee: order.platformCharges
          ? `$${order.platformCharges}`
          : "$0.00",
        totalPayable: order.paybleAmount
          ? `$${order.paybleAmount}`
          : order.totalAmount
            ? `$${order.totalAmount}`
            : "N/A",
        paymentStatus: order.payments?.[0]?.status || "N/A",
      },
    };
  };

  const handleDownloadInvoice = async (row) => {
    try {
      const orderId = row._id || row.id;
      if (!orderId) {
        toast.error("Order ID not found");
        return;
      }

      const resultAction = await dispatch(fetchOrderById(orderId));
      const response = resultAction.payload;

      let fullOrderData = null;
      if (fetchOrderById.fulfilled.match(resultAction)) {
        // Success case
        fullOrderData = response.data || response;
      } else {
        // Error case
        toast.error(response?.message || "Failed to fetch order details");
        return;
      }

      if (!fullOrderData) {
        toast.error("Failed to fetch order details for invoice");
        return;
      }

      const invoiceData = mapOrderToInvoiceData(fullOrderData);

      const blob = await pdf(<OrderInvoicePDF order={invoiceData} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `invoice_${invoiceData.orderId || "order"}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Invoice downloaded successfully");
    } catch (error) {
      console.error("Invoice download error:", error);
      toast.error("Failed to download invoice");
    }
  };

  const orderColumns = getOrderColumns({
    onFlag: handleFlagOrder,
    onCancel: handleCancelOrder,
    onRefund: handleRefundOrder,
    onMarkComplete: handleMarkComplete,
    onDownloadInvoice: handleDownloadInvoice,
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

      <div className="flex-1 overflow-hidden min-h-0 no-scrollbar">
        <GridCommonComponent
          data={filteredOrders}
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
              onClick: (rows) => handleBulkMarkComplete(rows),
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
              onApply: (data, rows) => handleBulkFlagOrder(data, rows),
            },
            {
              label: "Export Selection",
              iconUrl: "/assets/icon/downloadGray.svg",
              children: [
                { header: "Download List" },
                {
                  label: "Download PDF",
                  icon: <BsFilePdf className="w-4 h-4 text-[#7B7B7B]" />,
                  onClick: handleDownloadPDF,
                },
                {
                  label: "Download CSV",
                  icon: (
                    <BsFileSpreadsheet className="w-4 h-4 text-[#7B7B7B]" />
                  ),
                  onClick: handleDownloadCSV,
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
      <InitiateRefundPopup
        isOpen={isRefundPopupOpen}
        onClose={() => setIsRefundPopupOpen(false)}
        data={refundPopupData?.row}
        onConfirm={handleConfirmCancel}
        onCancel={() => setIsRefundPopupOpen(false)}
      />
    </div>
  );
};

export default OrderPage;
