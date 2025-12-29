"use client";

import { Download, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import GridCommonComponent from "@/components/grid/gridCommonComponent";
import { getProductOrderColumns } from "./prodctOrderColumn";
import ActionComponent from "@/components/grid/actionComponent";
import DynamicForm from "@/components/modules/registry";
import { BsFilePdf, BsFileSpreadsheet } from "react-icons/bs";

import {
  bookingFilterConfig,
  cancelBookingConfig,
  refundDetailsConfig,
} from "./productOrderConfig";
import PopupForm from "@/components/ui/popupform";
import { useState } from "react";
import productOrderData from "./productOrderData";
import Image from "next/image";

export default function Page() {
  const options = { select: false, order: false, sortable: false };

  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [showRefundPopup, setShowRefundPopup] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleCancelBooking = (row) => {
    setSelectedBooking(row);
    setShowCancelPopup(true);
  };

  const columns = getProductOrderColumns(handleCancelBooking);

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
  return (
    <div className="w-full md:h-[calc(100vh-9rem)] h-full flex flex-col">
      {/* Top Controls */}

      <div className="flex items-center justify-between mb-2 gap-2 flex-none">
        <div className="relative w-[400px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input className="pl-10 w-full" placeholder="Search here..." />
        </div>

        <div className="flex gap-2">
          <ActionComponent
            actions={downloadActions}
            buttonClassName="inline-flex items-center justify-center p-2 border border-[var(--border-admin)] bg-white rounded-md  hover:bg-gray-50"
            icon={
              <Download className="w-4 h-4 text-secondary1" />
            }
          />
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 min-h-0">
        <GridCommonComponent
          data={productOrderData}
          options={options}
          // columns={getBookingColumns()}
          columns={columns}
          theme={{
            border: "border-gray-300",
            header: { bg: "bg-gray-100" },
          }}
        />
      </div>

      {/* Cancel Booking Popup */}
      {showCancelPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setShowCancelPopup(false)} // click outside to close
        >
          <div onClick={(e) => e.stopPropagation()}>
            <PopupForm
              config={cancelBookingConfig}
              width="600px"
              onApply={(data) => {
                console.log("Booking cancelled", data);
                setShowCancelPopup(false);
                setShowRefundPopup(true); // trigger refund popup next
              }}
              onCancel={() => setShowCancelPopup(false)}
            />
          </div>
        </div>
      )}

      {/* Refund Popup */}
      {showRefundPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setShowRefundPopup(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <PopupForm
              config={refundDetailsConfig}
              width="600px"
              onApply={(data) => {
                console.log("Refund confirmed", data);
                setShowRefundPopup(false);
              }}
              onCancel={() => setShowRefundPopup(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
