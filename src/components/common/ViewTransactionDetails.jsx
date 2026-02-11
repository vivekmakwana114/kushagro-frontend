"use client";
import React from "react";
import Header from "@/components/form-elements/Header";

const ViewTransactionDetails = ({ data, formData, onClose }) => {
  const rowData = data || formData || {};

  // Fallback data
  const transactionData = {
    transaction_id: rowData?.transaction_id || "#TRN2316510365165",
    buyer: rowData?.buyer || "Paul Manson",
    seller: rowData?.seller || "Brayan Lara",
    date: rowData?.date
      ? new Date(rowData.date).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "15 Jul, 2025",
    time: "2:00 PM", // Mock time as it's not in the data
    order_id: rowData?.order_id || "#KSA1023102456145258", // Mock Order ID
    method: rowData?.method || "Paystack",
    amount: rowData?.amount
      ? `$${Number(rowData.amount).toFixed(2)}`
      : "$160.00",
    status: rowData?.status || "Paid",
  };

  const statusColor = (status) => {
    const normalizedStatus = status?.toLowerCase();
    if (normalizedStatus === "paid") return "text-secondary1"; // Green
    if (normalizedStatus === "inprocess" || normalizedStatus === "in-process")
      return "text-primary1"; // Primary1
    return "text-black";
  };

  return (
    <div className="p-2 xl:p-0 flex flex-col h-full bg-white w-full">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-6">
        <div className="space-y-1">
          <Header
            type="header"
            label="Transaction Detail"
            css={{ textAlign: "left" }}
          />
          <Header
            type="subheader"
            text="Explore detailed information regarding this transaction."
            css={{ textAlign: "left" }}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 no-scrollbar">
        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-y-6 gap-x-8 mb-4">
          <div className="text-left">
            <p className="text-left text-sm text-dull-text mb-1">
              Transaction ID
            </p>
            <p className="text-base font-medium text-secondary1">
              {transactionData.transaction_id}
            </p>
          </div>
          <div className="text-left">
            <p className="text-left text-sm text-dull-text mb-1">Buyer</p>
            <p className="text-base font-medium text-secondary1">
              {transactionData.buyer}
            </p>
          </div>

          <div className="text-left">
            <p className="text-left text-sm text-dull-text mb-1">Date & Time</p>
            <p className="text-base font-medium text-black">
              {transactionData.date}
            </p>
          </div>
          <div className="text-left">
            <p className="text-left text-sm text-dull-text mb-1">Seller</p>
            <p className="text-base font-medium text-secondary1">
              {transactionData.seller}
            </p>
          </div>

          <div className="text-left">
            <p className="text-left text-sm text-dull-text mb-1">Order ID</p>
            <p className="text-[14px] font-medium text-secondary1">
              {transactionData.order_id}
            </p>
          </div>
          <div className="text-left">
            <p className="text-left text-sm text-dull-text mb-1">
              Payment Method
            </p>
            <p className="text-base font-medium text-black">
              {transactionData.method}
            </p>
          </div>

          <div className="text-left">
            <p className="text-left text-sm text-dull-text mb-1">
              Transaction Amount
            </p>
            <p className="text-base font-medium text-black">
              {transactionData.amount}
            </p>
          </div>
          <div className="text-left">
            <p className="text-left text-sm text-dull-text mb-1">Status</p>
            <p
              className={`text-base font-medium ${statusColor(
                transactionData.status
              )}`}
            >
              {transactionData.status}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTransactionDetails;
