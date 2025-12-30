"use client";
import React, { useState } from "react";
import Image from "next/image";

/**
 * InitiateRefundPopup Component
 * A specialized modal for initiating refunds with order summary details.
 */
const InitiateRefundPopup = ({
  isOpen,
  onClose,
  data, // Order data passed from the row
  onConfirm,
  onCancel,
}) => {
  const [refundAmount, setRefundAmount] = useState("$97");

  if (!isOpen) return null;

  const handleCancel = () => {
    if (onCancel) onCancel();
    else onClose();
  };

  const handleConfirm = () => {
    if (onConfirm) onConfirm({ refundAmount });
  };

  return (
    <div className="fixed inset-0 z-1000 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 transition-opacity"
        onClick={handleCancel}
      />

      {/* Modal Content */}
      <div className="relative z-1001 bg-white rounded-lg shadow-xl w-full max-w-[600px] animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6">
          {/* Header */}
          <div className="mb-6 text-left">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Initiate Refund?
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              This Order has been cancelled. Please review the payment details
              below and confirm refund initiation.
            </p>
          </div>

          {/* Order Summary Section */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3 text-left">
              Order Summary
            </h3>
            <div className="grid grid-cols-3 gap-y-4 gap-x-2 text-sm text-left">
              <div>
                <p className="text-gray-500 mb-1">Order ID</p>
                <p className="font-medium text-secondary1">
                  {data?.product_order_id || "#KSA23102456145258"}
                </p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Order on</p>
                <p className="font-medium">
                  {data?.date_time || "15 Jul, 2025"}
                </p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Product</p>
                <p className="font-medium">
                  {data?.product?.name || "Jersey Cow"}
                </p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Seller</p>
                <p className="font-medium">
                  {data?.seller?.name || "Aaliyah Johnson"}
                </p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Status</p>
                <p className="font-medium text-red-500">Cancelled</p>
              </div>
            </div>
          </div>

          {/* Payment Details Section */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3 text-left">
              Payment Details
            </h3>
            <div className="grid grid-cols-3 gap-y-4 gap-x-2 text-sm text-left">
              <div>
                <p className="text-gray-500 mb-1">Amount Paid</p>
                <p className="font-medium text-gray-900">$160.00</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Payment Method</p>
                <p className="font-medium text-gray-900">PayStack</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Refundable Amount</p>
                <p className="font-medium text-red-500">$100.00</p>
              </div>
            </div>
          </div>

          {/* Confirm Refund Amount Input */}
          <div className="mb-8 text-left">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Refund Amount
            </label>
            <input
              type="text"
              value={refundAmount}
              onChange={(e) => setRefundAmount(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              className="flex-1 px-4 py-2.5 bg-white border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              Stay Pending
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 px-4 py-2.5 bg-[#2E5B20] hover:bg-[#254a1a] text-white rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
            >
              Confirm Refund
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitiateRefundPopup;
