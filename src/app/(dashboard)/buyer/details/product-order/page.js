"use client";

import { Download, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import GridCommonComponent from "@/components/grid/gridCommonComponent";
import { getProductOrderColumns } from "./prodctOrderColumn";
import ActionComponent from "@/components/grid/actionComponent";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBuyerOrders,
  flagBuyerOrder,
  cancelBuyerOrder,
  initiateBuyerRefund,
  updateBuyerOrderStatus,
} from "@/state/buyer/buyerSlice";
import { pdf } from "@react-pdf/renderer";
import OrderInvoicePDF from "@/app/(dashboard)/order/OrderInvoicePDF";
import ProductOrderPDFDocument from "./ProductOrderPDFDocument";
import { toast } from "sonner";

export default function Page() {
  const options = { select: false, order: false, sortable: false };
  const searchParams = useSearchParams();
  const buyerId = searchParams.get("id");
  const dispatch = useDispatch();

  const { buyerOrders, buyerOrdersLoading } = useSelector(
    (state) => state.buyer,
  );

  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    if (buyerId) {
      dispatch(fetchBuyerOrders({ id: buyerId, limit: 1000 }));
    }
  }, [dispatch, buyerId]);

  // Handlers for Actions
  const handleFlagOrder = async (row, data) => {
    try {
      await dispatch(
        flagBuyerOrder({
          orderId: row._id || row.id || row.orderId,
          reason: data.dropdownValue,
          note: data.note,
        }),
      ).unwrap();
      toast.success("Order flagged successfully");
    } catch (error) {
      toast.error(error.message || "Failed to flag order");
    }
  };

  const handleCancelOrder = async (row, data) => {
    try {
      await dispatch(
        cancelBuyerOrder({
          orderId: row._id || row.id || row.orderId,
          reason: data.dropdownValue,
          note: data.note,
        }),
      ).unwrap();
      toast.success("Order cancelled successfully");
    } catch (error) {
      toast.error(error.message || "Failed to cancel order");
    }
  };

  const handleInvoiceDownload = async (row) => {
    try {
      const blob = await pdf(<OrderInvoicePDF order={row} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Invoice_${row.orderId || row._id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Invoice downloading...");
    } catch (error) {
      console.error("PDF Download Error:", error);
      toast.error("Failed to download invoice");
    }
  };

  const handleRefund = async (row, data) => {
    try {
      await dispatch(
        initiateBuyerRefund({
          orderId: row._id || row.id || row.orderId,
          ...data,
        }),
      ).unwrap();
      toast.success("Refund initiated successfully");
    } catch (error) {
      toast.error(error.message || "Failed to initiate refund");
    }
  };

  const handleMarkAsComplete = async (row, data) => {
    try {
      await dispatch(
        updateBuyerOrderStatus({
          orderId: row._id || row.id || row.orderId,
        }),
      ).unwrap();
      toast.success("Order marked as complete");
    } catch (error) {
      toast.error(error.message || "Failed to mark order as complete");
    }
  };

  const columns = getProductOrderColumns(
    handleCancelOrder,
    handleFlagOrder,
    handleInvoiceDownload,
    handleRefund,
    handleMarkAsComplete,
  );

  const [searchTerm, setSearchTerm] = useState("");

  // Map backend data to grid format
  const formattedOrders = (buyerOrders || []).map((order) => {
    const rawPaymentStatus =
      order.paymentStatus?.toLowerCase() ||
      order.payments?.[0]?.status?.toLowerCase() ||
      "";
    let paymentStatus = "pending";

    if (["payment success", "paid"].includes(rawPaymentStatus)) {
      paymentStatus = "paid";
    } else if (
      ["refund initiated", "refunded initiated", "processing"].includes(
        rawPaymentStatus,
      )
    ) {
      paymentStatus = "processing";
    } else {
      paymentStatus = rawPaymentStatus || "pending";
    }

    const currentStatus = order.status?.toLowerCase() || "ongoing";

    return {
      ...order,
      product_order_id: order.orderNumber || order.orderId || order._id,
      product: {
        name: order.product?.name || "N/A",
        category: order.product?.category || order.category?.name || "N/A",
        profile: order.product?.image || order.product?.images?.[0] || "",
        quantity: order.quantity || order.product?.quantity || 1,
        price: order.price || order.product?.price || 0,
        subtotal: order.subtotal || order.totalAmount || 0,
      },
      seller: {
        name: order.seller?.name || "N/A",
        email: order.seller?.email || "",
        profile: order.seller?.profile || "",
      },
      invoice: {
        invoiceId: order.invoiceId || order.orderNumber || order._id,
        paymentStatus: paymentStatus,
        itemTotal: order.subtotal || order.totalAmount,
        taxes: order.tax || 0,
        platformFee: order.platformFee || 0,
        totalPayable: order.totalAmount,
      },
      date_time: order.orderDate || order.createdAt,
      amount: order.amount ?? order.totalAmount,
      status: paymentStatus === "processing" ? "cancelled" : currentStatus,
      payment_status: paymentStatus,
    };
  });

  const filteredOrders = formattedOrders.filter((order) => {
    if (!searchTerm) return true;
    const lowerSearch = searchTerm.toLowerCase();

    return (
      order.product_order_id?.toString().toLowerCase().includes(lowerSearch) ||
      order.product?.name?.toLowerCase().includes(lowerSearch) ||
      order.seller?.name?.toLowerCase().includes(lowerSearch) ||
      order.status?.toLowerCase().includes(lowerSearch) ||
      order.payment_status?.toLowerCase().includes(lowerSearch)
    );
  });

  const handleDownloadPDF = async () => {
    try {
      const blob = await pdf(
        <ProductOrderPDFDocument orders={filteredOrders} />,
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `buyer_orders_list_${new Date().toISOString().split("T")[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("PDF List Download Error", error);
      toast.error("Failed to download PDF list");
    }
  };

  const handleDownloadCSV = () => {
    const headers = [
      "Order ID",
      "Product",
      "Seller",
      "Order Date",
      "Amount Paid",
      "Status",
      "Payment Status",
    ];

    const escapeCsvValue = (value) => {
      if (value === null || value === undefined) return "";
      const stringValue = String(value);
      const escaped = stringValue.replace(/"/g, '""');
      return `"${escaped}"`;
    };

    const rowsData = filteredOrders.map((order) => [
      order.product_order_id || "N/A",
      order.product?.name || "N/A",
      order.seller?.name || "N/A",
      order.date_time
        ? new Date(order.date_time).toISOString().split("T")[0]
        : "N/A",
      order.amount || 0,
      order.status || "N/A",
      order.payment_status || "N/A",
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
      `buyer_orders_${new Date().toISOString().split("T")[0]}.csv`,
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
      {/* Top Controls */}
      <div className="flex items-center justify-between mb-2 gap-2 flex-none">
        <div className="relative w-[400px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            className="pl-10 w-full"
            placeholder="Search here..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <ActionComponent
            actions={downloadActions}
            buttonClassName="inline-flex items-center justify-center p-2 border border-[var(--border-admin)] bg-white rounded-md  hover:bg-gray-50"
            icon={<Download className="w-4 h-4 text-secondary1" />}
          />
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 min-h-0">
        <GridCommonComponent
          data={filteredOrders}
          options={options}
          columns={columns}
          loading={buyerOrdersLoading}
          theme={{
            border: "border-gray-300",
            header: { bg: "bg-gray-100" },
          }}
        />
      </div>
    </div>
  );
}
