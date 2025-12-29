"use client";
import React, { useRef } from "react";
import Image from "next/image";
import Header from "@/components/form-elements/Header";
import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";

const ViewOrderDetails = ({ orderData, module = "buyer", onClose }) => {
  const invoiceRef = useRef(null);

  // Mock data for demonstration - in real app, this would come from orderData prop
  const defaultData = {
    orderId: "#KSA23102456145258",
    totalAmount: "$1600",
    transactionId: "#TXN542I8390",
    date: "15 Jul, 2025",
    paymentMethod: "PayStack",
    status: "Complete",
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
      paymentStatus: "Paid",
    },
  };

  const data = orderData || defaultData;

  const handlePrint = () => {
    if (invoiceRef.current) {
      const printWindow = window.open("", "", "width=800,height=600");
      const invoiceContent = invoiceRef.current.innerHTML;

      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Invoice - ${data.invoice.invoiceId}</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                padding: 20px;
                color: #000;
              }
              .invoice-header {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
              }
              .invoice-table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 10px;
              }
              .invoice-row {
                display: flex;
                justify-content: space-between;
                padding: 12px 0;
                border-bottom: 1px solid #e5e7eb;
              }
              .invoice-row:last-child {
                border-bottom: none;
              }
              .invoice-label {
                color: #6b7280;
                font-size: 14px;
              }
              .invoice-value {
                color: #000;
                font-size: 14px;
                font-weight: 500;
              }
              .invoice-total {
                font-weight: 600;
                font-size: 15px;
              }
              .payment-status {
                display: inline-flex;
                align-items: center;
                gap: 4px;
              }
              .status-dot {
                width: 8px;
                height: 8px;
                background-color: #10b981;
                border-radius: 50%;
              }
              @media print {
                body {
                  padding: 0;
                }
              }
            </style>
          </head>
          <body>
            ${invoiceContent}
          </body>
        </html>
      `);

      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white overflow-y-auto overflow-x-hidden no-scrollbar">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-1">
          <Header type="header" label="Order Details" />
          <Header
            type="subheader"
            text="View complete information about this order, including items, delivery, and payment summary."
          />
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-md transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <div className="w-full h-px bg-[var(--border-admin)] mb-4" />

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar">
        <div className="space-y-6 w-full">
          {/* Order Summary Section */}
          <div>
            <h3 className="text-base font-semibold text-black mb-3">
              Order Summary
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-dull-text mb-1">Order ID</p>
                <p className="text-sm font-medium text-secondary1">
                  {data.orderId}
                </p>
              </div>
              <div>
                <p className="text-sm text-dull-text mb-1">Total Amount</p>
                <p className="text-sm font-medium text-black">
                  {data.totalAmount}
                </p>
              </div>
              <div>
                <p className="text-sm text-dull-text mb-1">Transaction ID</p>
                <p className="text-sm font-medium text-black">
                  {data.transactionId}
                </p>
              </div>
              <div>
                <p className="text-sm text-dull-text mb-1">Date</p>
                <p className="text-sm font-medium text-black">{data.date}</p>
              </div>
              <div>
                <p className="text-sm text-dull-text mb-1">Payment Method</p>
                <p className="text-sm font-medium text-black">
                  {data.paymentMethod}
                </p>
              </div>
              <div>
                <p className="text-sm text-dull-text mb-1">Status</p>
                <p className="text-sm font-medium text-secondary1">
                  {data.status}
                </p>
              </div>
            </div>
          </div>

          {/* Buyer/Seller Information */}
          {module === "order" && (
            <>
              {/* Buyer Info */}
              <div>
                <p className="text-sm text-dull-text mb-3">Buyer</p>
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
                <p className="text-sm text-dull-text mb-3">Seller</p>
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
            </>
          )}

          {module === "buyer" && (
            <div>
              <p className="text-sm text-dull-text mb-3">Seller</p>
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
          )}

          {module === "seller" && (
            <div>
              <p className="text-sm text-dull-text mb-3">Buyer</p>
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
          )}

          {/* Product Ordered Section */}
          <div>
            <h3 className="text-base font-semibold text-black mb-3">
              Product Ordered
            </h3>
            <div className="border border-[var(--border-admin)] rounded-lg overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 bg-gray-50 px-4 py-3 border-b border-[var(--border-admin)]">
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
              <div className="grid grid-cols-12 gap-4 px-4 py-3 items-center">
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
                <div className="col-span-2 text-sm text-black text-center">
                  {data.product.quantity}
                </div>
                <div className="col-span-2 text-sm text-black text-center">
                  {data.product.price}
                </div>
                <div className="col-span-3 text-sm font-medium text-black text-right">
                  {data.product.subtotal}
                </div>
              </div>
            </div>
          </div>

          {/* Invoice Details Section */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-base font-semibold text-black">
                Invoice Details
              </h3>
              <button
                onClick={handlePrint}
                className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                title="Download Invoice"
              >
                <Download className="w-4 h-4 text-secondary1" />
              </button>
            </div>

            {/* Invoice Content - This will be printed */}
            <div ref={invoiceRef}>
              <div className="invoice-header">
                <span>Invoice Details</span>
                <span className="text-sm font-normal text-dull-text">
                  Invoice ID
                </span>
                <span className="text-sm font-medium text-black">
                  {data.invoice.invoiceId}
                </span>
              </div>

              <div className="space-y-3">
                <div className="invoice-row">
                  <span className="invoice-label">Item Total</span>
                  <span className="invoice-value">
                    {data.invoice.itemTotal}
                  </span>
                </div>
                <div className="invoice-row">
                  <span className="invoice-label">Taxes(if any)</span>
                  <span className="invoice-value">{data.invoice.taxes}</span>
                </div>
                <div className="invoice-row">
                  <span className="invoice-label">Platform Fee</span>
                  <span className="invoice-value">
                    {data.invoice.platformFee}
                  </span>
                </div>
                <div className="invoice-row">
                  <span className="invoice-label invoice-total">
                    Total Payable Amount
                  </span>
                  <span className="invoice-value invoice-total">
                    {data.invoice.totalPayable}
                  </span>
                </div>
                <div className="invoice-row">
                  <span className="invoice-label">Payment Status</span>
                  <span className="invoice-value payment-status">
                    <span className="status-dot"></span>
                    {data.invoice.paymentStatus}
                  </span>
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
