"use client";
import React, { useState } from "react";
import PortfolioCard from "@/components/common/PortfolioCard";

import Image from "next/image";

import { useRouter } from "next/navigation";
import PopupForm from "@/components/ui/popupform";
import {
  reactivateBuyerConfig,
  reactivateCustomerConfig,
} from "./overviewConfig";
import GridCommonComponent from "@/components/grid/gridCommonComponent";
import { fraudReportData } from "./fraudReportData";
import { getFraudReportColumns } from "./farudReportColumn";

const ClientDetails = () => {
  const router = useRouter();
  const [isReactivateOpen, setIsReactivateOpen] = useState(false);

  const options = {
    select: false,
    order: false,
    sortable: false,
  };

  const client = {
    image: "/CustomerImage.svg",
    name: "Michael Smith",
    email: "mike.s@ksa.com",
    phone: "(+81)000 0000",
    status: "Suspended",
    joined: "22 Feb, 2024",
    suspensionReason: "Spam or fake account",
  };

  const OverviewData = [
    {
      color: "bg-primary1",
      head: "Product Orders",
      total: "08",
      countIcon: "",
      upCount: "8.06",
      MainIcon: (
        <Image
          src="/assets/card/overview_booking.svg"
          width={20}
          height={20}
          alt="Booking"
        />
      ),
      description: "01 New Order this month.",
    },
    {
      color: "bg-secondary1",
      head: "Total Spent",
      total: "$1189.56",
      countIcon: "",
      upCount: "8.06",
      MainIcon: (
        <Image
          src="/assets/card/overview_revenue.svg"
          width={20}
          height={20}
          alt="Revenue"
        />
      ),
      description: "$189 Spent this month",
    },
  ];

  const handleBack = () => router.back();

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-4">
        {/* Back arrow */}
        <div
          className="p-2 rounded-md hover:bg-gray-100 cursor-pointer"
          onClick={handleBack}
        >
          <Image
            src="/icons/backArrow.svg"
            alt="back button"
            width={20}
            height={20}
          />
        </div>
      </div>

      <div className="mb-4">
        <PortfolioCard data={OverviewData} />
      </div>

      <div className="border border-[#E4E4E6] rounded-lg p-6 bg-[#FFFFFF] mb-4">
        {/* header */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h2 className="text-lg font-semibold">Buyer Details</h2>
        </div>

        {/* Profile */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="rounded-md  mb-3">
            <Image
              src={client.image}
              alt={client.name}
              width={200}
              height={250}
              className="object-cover  rounded"
            />
          </div>
          <h3 className="text-lg  font-semibold">{client.name}</h3>
          <p className="text-[var(--color-dull-text)] text-sm">
            {client.email}
          </p>
        </div>

        {/* Information of Client */}
        <div className="grid grid-cols-3  text-sm text-center border-t border-b py-4">
          <div>
            <p className="text-[var(--color-dull-text)] mb-1">phone</p>
            <p className="font-medium">{client.phone}</p>
          </div>

          <div>
            <p className="text-[var(--color-dull-text)] mb-1">Status</p>
            {client.status === "Active" ? (
              <span className="bg-red-100 text-red-600 px-3 py-1 rounded-md text-xs font-medium">
                Suspended
              </span>
            ) : (
              <span className="bg-green-100 text-green-600 px-3 py-1 rounded-md text-xs font-medium">
                Active
              </span>
            )}
          </div>
          <div>
            <p className="text-[var(--color-dull-text)] mb-1">joined locart</p>
            <p className="font-medium">{client.joined}</p>
          </div>
        </div>
      </div>

      {/* Fraud Report Grid */}
      <div className="border border-[#E4E4E6] rounded-lg p-6 bg-[#FFFFFF] mb-4">
        <h2 className="text-lg font-semibold mb-4">Fraud Report</h2>
        <div className="mt-6 mb-6">
          <GridCommonComponent
            data={fraudReportData}
            options={options}
            columns={getFraudReportColumns().map((col) => {
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
              border: "border-none",
              header: {
                bg: "bg-gray-100",
              },
            }}
          />
        </div>
      </div>

      {/* Suspension Reason */}
      {client.suspensionReason && (
        <div className="border border-[#E4E4E6] rounded-lg p-6 bg-[#FFFFFF] mb-4">
          <div className="rounded-md bg-gray-50 text-sm">
            <p className="text-[var(--color-dull-text)] mb-1">
              Suspension Reason:
            </p>
            <p className="font-medium">{client.suspensionReason}</p>
          </div>
        </div>
      )}

      {/* Reactivate & share password reset link buttons */}
      <div className="flex gap-2 justify-end mt-2">
        <button
          className="flex items-center gap-2 p-2 border border-[var(--border-admin)] rounded-md bg-white hover:bg-gray-100 text-[var(--color-dull-text)]"
          onClick={() => setIsReactivateOpen(true)}
        >
          <Image
            src="/assets/icon/reactivateCustomer.svg"
            alt="Reactivate Customer"
            width={14}
            height={14}
          />
          <span className="hidden sm:inline">Reactivate Buyer</span>
        </button>

        <button
          className="flex items-center gap-2 p-2 border border-[var(--border-admin)] rounded-md bg-white hover:bg-gray-100 text-[var(--color-dull-text)]"
          onClick={() => console.log("Reset Password for:", client.name)}
        >
          <Image
            src="/assets/icon/lock.svg"
            alt="Reset Password"
            width={14}
            height={14}
          />
          <span className="hidden sm:inline">Share Reset Password Link</span>
        </button>

        {isReactivateOpen && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black opacity-60"
              onClick={() => setIsReactivateOpen(false)}
            ></div>
            <div
              className="relative bg-white rounded-lg shadow-xl mx-4 my-8 overflow-auto z-[1001]"
              style={{
                maxWidth: "90vw",
                maxHeight: "90vh",
                width: "500px",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <PopupForm
                  config={reactivateBuyerConfig}
                  width="500px"
                  onApply={(data) => {
                    console.log("Reactivated:", data);
                    setIsReactivateOpen(false);
                  }}
                  onCancel={() => setIsReactivateOpen(false)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientDetails;
