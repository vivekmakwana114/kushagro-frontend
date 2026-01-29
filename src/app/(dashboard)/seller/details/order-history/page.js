"use client";
import GridCommonComponent from "@/components/grid/gridCommonComponent";
import { Input } from "@/components/ui/input";
import { Download, Search } from "lucide-react";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import ActionComponent from "@/components/grid/actionComponent";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { getOrderColumns } from "./orderHistoryColumn";
import {
  fetchSellerOrdersBySellerId,
  flagOrderAction,
  cancelOrderAction,
  updateOrderStatusAction,
  fetchOrderDetails,
} from "@/state/seller/order-history/orderHistorySlice";
import { useSearchParams } from "next/navigation";
import Spinner from "@/components/common/Spinner";
import { pdf } from "@react-pdf/renderer";
import OrderPDFDocument from "@/app/(dashboard)/order/OrderPDFDocument";
import OrderInvoicePDF from "@/app/(dashboard)/order/OrderInvoicePDF";

const extractValue = (val) => {
  if (val === null || val === undefined) return "";
  if (typeof val === "object") {
    if ("value" in val) {
      return extractValue(val.value);
    }
    return val;
  }
  return val;
};

const OrderHistoryPage = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const role = useSelector((state) => state.auth.role);
  const { orders, loading, totalResults, totalPages } = useSelector(
    (state) => state.sellerOrderHistory,
  );

  const { sellerDetails } = useSelector((state) => state.seller);
  const { user } = useSelector((state) => state.auth);
  const sellerId =
    searchParams.get("id") ||
    sellerDetails?.seller?._id ||
    sellerDetails?._id ||
    (role === "Seller" || role === "seller" ? user?._id : null);

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (sellerId) {
      dispatch(
        fetchSellerOrdersBySellerId({
          id: sellerId,
          params: {},
        }),
      );
    }
  }, [dispatch, sellerId]);

  const formattedOrders = useMemo(() => {
    return (orders || []).map((order) => {
      return {
        ...order,
        orderNumber: order.orderNumber || "N/A",
        product: {
          name: extractValue(order.product?.name) || "N/A",
          category:
            extractValue(order.category?.name) ||
            extractValue(order.product?.category) ||
            extractValue(order.category) ||
            "N/A",
          profile:
            extractValue(order.product?.image) ||
            extractValue(order.product?.images?.[0]) ||
            extractValue(order.product?.profile) ||
            "",
        },
        buyer: {
          name: extractValue(order.buyer?.name) || "N/A",
          email: extractValue(order.buyer?.email) || "",
          profile: extractValue(order.buyer?.profile) || "",
        },
        date_time:
          extractValue(order.orderDate) ||
          extractValue(order.createdAt) ||
          extractValue(order.date),
        amount: extractValue(order.totalAmount || order.amount) || 0,
      };
    });
  }, [orders]);

  const filteredOrders = useMemo(() => {
    if (!search) return formattedOrders;
    const lowerSearch = search.toLowerCase();
    return formattedOrders.filter((order) => {
      return (
        order.orderNumber?.toString().toLowerCase().includes(lowerSearch) ||
        order.product.name?.toLowerCase().includes(lowerSearch) ||
        order.buyer.name?.toLowerCase().includes(lowerSearch) ||
        order.status?.toLowerCase().includes(lowerSearch)
      );
    });
  }, [search, formattedOrders]);

  const handleDownloadPDF = async () => {
    const blob = await pdf(
      <OrderPDFDocument orders={filteredOrders} />,
    ).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `orders_${new Date().toISOString().split("T")[0]}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadCSV = () => {
    const headers = [
      "Order ID",
      "Product",
      "Category",
      "Buyer",
      "Order Date",
      "Amount",
      "Status",
    ];

    const rowsData = filteredOrders.map((order) => [
      order.orderNumber,
      order.product?.name,
      order.product?.category,
      order.buyer?.name,
      order.date_time ? new Date(order.date_time).toLocaleDateString() : "",
      order.amount,
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

  const handleFlagOrder = useCallback(
    (row, data) => {
      dispatch(
        flagOrderAction({
          orderIds: [row._id],
          reason: data.reason || data.value,
          note: data.note,
        }),
      ).then(() => {
        if (sellerId) {
          dispatch(
            fetchSellerOrdersBySellerId({
              id: sellerId,
              params: {},
            }),
          );
        }
      });
    },
    [dispatch, sellerId],
  );

  const handleCancelOrder = useCallback(
    (row, data) => {
      dispatch(
        cancelOrderAction({
          orderId: row._id,
          cancellationReason: data.reason || data.value,
          note: data.note,
        }),
      ).then(() => {
        if (sellerId) {
          dispatch(
            fetchSellerOrdersBySellerId({
              id: sellerId,
              params: {},
            }),
          );
        }
      });
    },
    [dispatch, sellerId],
  );

  const handleMarkAsComplete = useCallback(
    (row) => {
      dispatch(
        updateOrderStatusAction({
          orderIds: [row._id],
        }),
      ).then(() => {
        if (sellerId) {
          dispatch(
            fetchSellerOrdersBySellerId({
              id: sellerId,
              params: {},
            }),
          );
        }
      });
    },
    [dispatch, sellerId],
  );

  // Helper for invoice data mapping
  const mapOrderToInvoiceData = (apiData) => {
    const order = apiData || {};
    return {
      orderId: extractValue(order.orderNumber || order.orderId) || "N/A",
      totalAmount: extractValue(order.totalAmount)
        ? `$${extractValue(order.totalAmount)}`
        : "N/A",
      transactionId: extractValue(order.payments?.[0]?.transactionId) || "N/A",
      date: extractValue(order.createdAt || order.date)
        ? new Date(
            extractValue(order.createdAt || order.date),
          ).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : "N/A",
      paymentMethod: extractValue(order.payments?.[0]?.paymentMethod) || "N/A",
      status: extractValue(order.status) || "N/A",
      cancellationReason:
        extractValue(order.cancellationReason || order.cancelReason) || "",
      product: {
        name: extractValue(order.product?.name) || "N/A",
        category:
          extractValue(
            order.product?.category?.name ||
              order.category?.name ||
              order.category,
          ) || "N/A",
        image:
          extractValue(order.product?.images?.[0] || order.product?.image) ||
          "",
        quantity: extractValue(order.quantity)
          ? `${extractValue(order.quantity)} ${extractValue(order.product?.extraFields?.unit) || "Unit"}`
          : "N/A",
        price: extractValue(order.price)
          ? `$${extractValue(order.price)}`
          : "N/A",
        subtotal: extractValue(order.subTotal)
          ? `$${extractValue(order.subTotal)}`
          : "N/A",
      },
      buyer: {
        name: extractValue(order.buyer?.name) || "N/A",
        email: extractValue(order.buyer?.email) || "N/A",
        avatar:
          extractValue(order.buyer?.profile) || "https://picsum.photos/200",
      },
      seller: {
        name: extractValue(order.seller?.name) || "N/A",
        email: extractValue(order.seller?.email) || "N/A",
        avatar:
          extractValue(order.seller?.profile) || "https://picsum.photos/201",
      },
      invoice: {
        invoiceId: extractValue(order.orderNumber || order.orderId) || "N/A",
        itemTotal: extractValue(order.subTotal)
          ? `$${extractValue(order.subTotal)}`
          : "N/A",
        taxes: extractValue(order.tax)
          ? `$${extractValue(order.tax)}`
          : "$0.00",
        platformFee: extractValue(order.platformCharges)
          ? `$${extractValue(order.platformCharges)}`
          : "$0.00",
        totalPayable: extractValue(order.paybleAmount)
          ? `$${extractValue(order.paybleAmount)}`
          : extractValue(order.totalAmount)
            ? `$${extractValue(order.totalAmount)}`
            : "N/A",
        paymentStatus: extractValue(order.payments?.[0]?.status),
      },
    };
  };

  const handleDownloadInvoice = useCallback(
    async (row) => {
      try {
        const orderId = row._id || row.orderId?.value || row.id;
        if (!orderId) {
          toast.error("Order ID not found");
          // console.error("Order ID not found for invoice download");
          return;
        }

        // Fetch full order details to ensure we have all invoice data
        const resultAction = await dispatch(fetchOrderDetails(orderId));
        const response = resultAction.payload;

        let fullOrderData = null;
        if (fetchOrderDetails.fulfilled.match(resultAction)) {
          fullOrderData = response.data || response;
        } else {
          // Fallback to row data if fetch fails or if offline
          console.warn("Using row data fallback for invoice");
          fullOrderData = row;
        }

        const invoiceData = mapOrderToInvoiceData(fullOrderData);

        const blob = await pdf(
          <OrderInvoicePDF order={invoiceData} />,
        ).toBlob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `invoice_${invoiceData.orderId || "order"}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Invoice download error:", error);
      }
    },
    [dispatch],
  );

  // Define columns with handlers
  const columns = useMemo(() => {
    return getOrderColumns(role, {
      onFlag: handleFlagOrder,
      onCancel: handleCancelOrder,
      onMarkComplete: handleMarkAsComplete,
      onDownloadInvoice: handleDownloadInvoice,
    });
  }, [
    role,
    handleFlagOrder,
    handleCancelOrder,
    handleMarkAsComplete,
    handleDownloadInvoice,
  ]);

  const options = {
    select: false,
    order: false,
    sortable: false,
  };

  if (!sellerId) return <div className="p-4">Seller ID not found.</div>;
  if (loading && orders.length === 0) return <Spinner />;

  return (
    <div className="w-full md:h-[calc(100vh-9rem)] h-full flex flex-col">
      <div className="flex items-center justify-between mb-4 flex-none">
        <div className="relative mb-2 w-[400px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-placeholder-color" />
          <Input
            className="pl-10"
            placeholder="Search here..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <ActionComponent
            actions={downloadActions}
            buttonClassName="inline-flex items-center justify-center p-2 border border-(--border-admin) bg-white rounded-md  hover:bg-gray-50"
            icon={<Download className="w-4 h-4 text-secondary1" />}
          />
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <GridCommonComponent
          data={filteredOrders}
          options={options}
          columns={columns}
          totalResults={totalResults}
          totalPages={totalPages}
          theme={{
            border: "border-(--border-admin)",
            header: {
              bg: "bg-gray-100",
            },
          }}
        />
      </div>
    </div>
  );
};

export default OrderHistoryPage;
