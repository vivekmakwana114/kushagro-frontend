"use client";
import React, { useRef, useState, useEffect } from "react";
import { fetchOrderById } from "@/state/order/orderSlice"; // Updated import
import { useDispatch } from "react-redux"; // Added useDispatch
import { toast } from "sonner";
import Image from "next/image";
import Header from "@/components/form-elements/Header";
import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";
import OrderInvoicePDF from "@/app/(dashboard)/order/OrderInvoicePDF";
import { pdf } from "@react-pdf/renderer";

const ViewOrderDetails = ({ orderData, module, onClose, orderId }) => {
  const invoiceRef = useRef(null);
  const dispatch = useDispatch();

  // Mock data for demonstration
  const defaultData = {
    orderId: "#KSA23102456145258",
    totalAmount: "$1600",
    transactionId: "#TXN54218390",
    date: "15 Jul, 2025",
    paymentMethod: "PayStack",
    status: "Cancelled",
    cancellationReason:
      "Customer changed their mind about the product specifications.",
    product: {
      name: "Chana Dal",
      category: "Cereals",
      image: "https://picsum.photos/200",
      quantity: "25 Kg",
      price: "$40/Kg",
      subtotal: "$800.00",
    },
    buyer: {
      name: "Will Jack",
      email: "willjack@email.com",
      avatar: "https://picsum.photos/200",
    },
    seller: {
      name: "DeShawn Miller",
      email: "dees@selocarl.com",
      avatar: "https://picsum.photos/201",
    },
    invoice: {
      invoiceId: "#KSA23102456145258",
      itemTotal: "$800.00",
      taxes: "$2.00",
      platformFee: "$10.00",
      totalPayable: "$812.00",
      paymentStatus: "Refunded",
    },
  };
  const mapOrderToViewData = (apiData) => {
    const order = apiData || {};
    return {
      orderId: order.orderNumber || order.orderId || "N/A",
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
      cancellationReason: order.cancelReason || "",
      product: {
        name: order.product?.name || "N/A",
        category: order.category?.name || order.category || "N/A",
        image: order.product?.images?.[0] || order.product?.image || "",
        quantity: order.quantity
          ? `${order.quantity} ${order.unit || order.product?.extraFields?.unit || "Unit"}`
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
        paymentStatus:
          order.paymentStatus || order.payments?.[0]?.status || "N/A",
      },
    };
  };

  const [fetchedOrder, setFetchedOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (orderId && !orderData) {
        setLoading(true);
        try {
          // Use .unwrap() to get the actual payload from the action
          const response = await dispatch(fetchOrderById(orderId)).unwrap();
          console.log("Order details response:", response);
          if (response.data) {
            setFetchedOrder(mapOrderToViewData(response.data));
          } else {
            // Fallback if data is at root
            setFetchedOrder(mapOrderToViewData(response));
          }
        } catch (error) {
          console.error("Failed to fetch order details:", error);
          toast.error("Failed to fetch order details");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchOrderDetails();
  }, [orderId, orderData]);

  const data = fetchedOrder || orderData || defaultData;

  if (loading) {
    return (
      <div className="p-8 flex justify-center text-gray-500">
        Loading order details...
      </div>
    );
  }

  const handleDownloadInvoice = async () => {
    try {
      if (!data) return;

      const blob = await pdf(<OrderInvoicePDF order={data} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `invoice_${data.orderId || data.invoice?.invoiceId}_${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Invoice downloaded successfully");
    } catch (error) {
      console.error("Download failed", error);
      toast.error("Failed to download invoice");
    }
  };

  return (
    <div className="flex flex-col h-full bg-white overflow-y-auto overflow-x-hidden no-scrollbar">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-1">
          <Header
            type="header"
            label="Order Details"
            css={{ textAlign: "left" }}
          />
          <Header
            type="subheader"
            text="View complete information about this order, including items, delivery, and payment summary."
            css={{ textAlign: "left" }}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-gray-500 gap-2 border-gray-200"
            onClick={handleDownloadInvoice}
          >
            <Download className="w-4 h-4" />
            Download
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-gray-500"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="w-full h-px bg-(--border-admin) mb-4" />

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar">
        <div className="space-y-6 w-full">
          {/* Order Summary Section */}
          <div>
            <h3 className="text-left text-base font-semibold text-black mb-3">
              Order Summary
            </h3>
            <div className="flex flex-col md:grid md:grid-cols-3 gap-3 md:gap-4">
              <div className="flex justify-between items-center md:block">
                <p className="text-sm text-dull-text mb-0 md:mb-1">Order ID</p>
                <p className="text-sm font-medium text-secondary1">
                  {data.orderId}
                </p>
              </div>
              <div className="flex justify-between items-center md:block">
                <p className="text-sm text-dull-text mb-0 md:mb-1">
                  Total Amount
                </p>
                <p className="text-sm font-medium text-black">
                  {data.totalAmount}
                </p>
              </div>
              <div className="flex justify-between items-center md:block">
                <p className="text-sm text-dull-text mb-0 md:mb-1">
                  Transaction ID
                </p>
                <p className="text-sm font-medium text-secondary1">
                  {data.transactionId}
                </p>
              </div>
              <div className="flex justify-between items-center md:block">
                <p className="text-sm text-dull-text mb-0 md:mb-1">Date</p>
                <p className="text-sm font-medium text-black">{data.date}</p>
              </div>
              <div className="flex justify-between items-center md:block">
                <p className="text-sm text-dull-text mb-0 md:mb-1">
                  Payment Method
                </p>
                <p className="text-sm font-medium text-black">
                  {data.paymentMethod}
                </p>
              </div>
              <div className="flex justify-between items-center md:block">
                <p className="text-sm text-dull-text mb-0 md:mb-1">Status</p>
                <p
                  className={`text-sm font-medium ${
                    data.status === "Complete"
                      ? "text-secondary1"
                      : data.status === "Cancelled"
                        ? "text-red-500"
                        : "text-black"
                  }`}
                >
                  {data.status}
                </p>
              </div>
            </div>
          </div>

          {/* Buyer/Seller Information - Side by Side for Order Module */}
          {module === "order" && (
            <div className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-6">
              {/* Buyer Info */}
              <div>
                <p className="text-left text-sm text-dull-text mb-3">Buyer</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 shrink-0 rounded-full overflow-hidden relative bg-gray-100">
                    <Image
                      src={data.buyer.avatar}
                      alt={data.buyer.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-black truncate">
                      {data.buyer.name}
                    </p>
                    <p className="text-xs text-dull-text truncate">
                      {data.buyer.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Seller Info */}
              <div>
                <p className="text-left text-sm text-dull-text mb-3">Seller</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 shrink-0 rounded-full overflow-hidden relative bg-gray-100">
                    <Image
                      src={data.seller.avatar}
                      alt={data.seller.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-black truncate">
                      {data.seller.name}
                    </p>
                    <p className="text-xs text-dull-text truncate">
                      {data.seller.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Product Ordered Section */}
          <div>
            <h3 className="text-left text-base font-semibold text-black mb-3">
              Product Ordered
            </h3>
            <div className="border border-(--border-admin) rounded-lg overflow-hidden">
              {/* Table Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 bg-gray-50 px-4 py-3 border-b border-(--border-admin)">
                <div className="col-span-5 text-sm font-medium text-black">
                  Product Name
                </div>
                <div className="col-span-2 text-sm font-medium text-black text-center">
                  Quantity
                </div>
                <div className="col-span-2 text-sm font-medium text-black text-center">
                  Price
                </div>
                <div className="col-span-3 text-sm font-medium text-black text-right">
                  Subtotal
                </div>
              </div>

              {/* Table Row */}
              <div className="flex flex-col md:grid md:grid-cols-12 gap-4 px-4 py-3 md:items-center">
                <div className="col-span-5 flex items-center gap-3">
                  <div className="w-10 h-10 shrink-0 rounded-md overflow-hidden relative bg-gray-100">
                    <Image
                      src={data.product.image}
                      alt={data.product.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-black truncate">
                      {data.product.name}
                    </p>
                    <p className="text-xs text-dull-text truncate">
                      {data.product.category}
                    </p>
                  </div>
                </div>

                {/* Mobile View for Quantity, Price, Subtotal */}
                <div className="flex flex-col gap-2 md:contents">
                  <div className="flex justify-between items-center md:hidden">
                    <span className="text-sm text-dull-text">Quantity</span>
                    <span className="text-sm text-black">
                      {data.product.quantity}
                    </span>
                  </div>
                  <div className="flex justify-between items-center md:hidden">
                    <span className="text-sm text-dull-text">Price</span>
                    <span className="text-sm text-black">
                      {data.product.price}
                    </span>
                  </div>
                  <div className="flex justify-between items-center md:hidden">
                    <span className="text-sm text-dull-text">Subtotal</span>
                    <div className="text-sm font-medium text-black text-right">
                      {data.product.subtotal}
                    </div>
                  </div>
                </div>

                {/* Desktop View Columns */}
                <div className="hidden md:block col-span-2 text-sm text-black text-center">
                  {data.product.quantity}
                </div>
                <div className="hidden md:block col-span-2 text-sm text-black text-center">
                  {data.product.price}
                </div>
                <div className="hidden md:block col-span-3 text-sm font-medium text-black text-right">
                  {data.product.subtotal}
                </div>
              </div>
            </div>
            {data.status === "Cancelled" && data.cancellationReason && (
              <div className="mt-4 border border-(--border-admin) rounded-lg p-4">
                <div className="flex justify-between items-start md:block">
                  <p className="text-sm text-dull-text mb-0 md:mb-1 shrink-0">
                    Cancellation Reason:
                  </p>
                  <p className="text-sm font-medium text-black text-right md:text-left">
                    {data.cancellationReason}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Invoice Details Section */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-base font-semibold text-black">
                Invoice Details
              </h3>
              <button
                onClick={handleDownloadInvoice}
                className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                title="Download Invoice"
              >
                <Download className="w-4 h-4 text-secondary1" />
              </button>
            </div>

            {/* Invoice Content - This will be printed */}
            <div ref={invoiceRef}>
              <div className="border border-(--border-admin) rounded-lg p-5 bg-white">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-dull-text">Invoice ID</span>
                  <span className="text-sm font-semibold text-secondary1">
                    {data.invoice.invoiceId}
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-dashed border-(--border-admin)">
                    <span className="text-sm text-dull-text">Item Total</span>
                    <span className="text-sm font-semibold text-black">
                      {data.invoice.itemTotal}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-dashed border-(--border-admin)">
                    <span className="text-sm text-dull-text">
                      Taxes(if any)
                    </span>
                    <span className="text-sm font-semibold text-black">
                      {data.invoice.taxes}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-dashed border-(--border-admin)">
                    <span className="text-sm text-dull-text">Platform Fee</span>
                    <span className="text-sm font-semibold text-black">
                      {data.invoice.platformFee}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-dashed border-(--border-admin)">
                    <span className="text-sm text-dull-text">
                      Total Payable Amount
                    </span>
                    <span className="text-sm font-bold text-black">
                      {data.invoice.totalPayable}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-sm text-dull-text">
                      Payment Status
                    </span>
                    <span
                      className={`text-sm font-semibold flex items-center gap-2 ${
                        data.invoice.paymentStatus === "Paid"
                          ? "text-secondary1"
                          : data.invoice.paymentStatus === "Refunded"
                            ? "text-red-500"
                            : "text-black"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center ${
                          data.invoice.paymentStatus === "Paid"
                            ? "bg-green-500"
                            : data.invoice.paymentStatus === "Refunded"
                              ? "bg-red-500"
                              : "bg-gray-500"
                        }`}
                      >
                        <svg
                          width="10"
                          height="8"
                          viewBox="0 0 10 8"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 1L3.5 6.5L1 4"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      {data.invoice.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrderDetails;
