"use client";
import { useState } from "react";
import { Download, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import GridCommonComponent from "@/components/grid/gridCommonComponent";
import { BsFilePdf, BsFileSpreadsheet } from "react-icons/bs";
import ActionComponent from "@/components/grid/actionComponent";
import DynamicForm from "@/components/modules/DynamicFormRendering";
import {
  bookingFilterConfig,
  cancelBookingConfig,
  refundDetailsConfig,
} from "./bookingConfig";
import PopupForm from "@/components/ui/popupform";
import Image from "next/image";

import { getBookingColumns } from "./bookingColumn";
import ViewUser from "../buyer/viewUser";
import { bookingData } from "./bookingData";
import Pagination from "@/components/ui/pagination";
import { useSelector } from "react-redux";

const options = {
  select: true,
  order: false,
  sortable: false,
};

const downloadActions = [
  {
    header: "Download List",
  },
  {
    label: "Download PDF",
    icon: <BsFilePdf className="w-4 h-4 text-[var(--color-dull-text)]" />,
    onClick: () => console.log("Download PDF"),
  },
  {
    label: "Download CSV",
    icon: (
      <BsFileSpreadsheet className="w-4 h-4  text-[var(--color-dull-text)]" />
    ),
    onClick: () => console.log("Download CSV"),
  },
];

const BookingPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = bookingData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(bookingData.length / itemsPerPage);
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [showRefundPopup, setShowRefundPopup] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const { role } = useSelector((state) => state?.auth);

  const handleCancelBooking = (row) => {
    setSelectedBooking(row);
    setShowCancelPopup(true);
  };

  const bookingColumns = getBookingColumns(handleCancelBooking, role);

  const isBarbershop = role === "barbershop";
  const refundConfig = isBarbershop
    ? {
        ...refundDetailsConfig,
        fields: refundDetailsConfig.fields
          .filter((field) => field.label !== "Confirm Refund Amount")
          .map((field, index) =>
            index === 0 ? { ...field, label: "Raise Refund Request" } : field
          ),
        footer: {
          ...refundDetailsConfig.footer,
          apply: {
            ...refundDetailsConfig.footer.apply,
            label: "Raise Refund Request",
          },
        },
      }
    : refundDetailsConfig;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-2 mb-4 w-full">
        {/* Search bar */}
        <div className="relative flex-1 min-w-[150px] max-w-[400px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-dull-text)]" />
          <Input
            className="pl-10 h-10 w-full border border-[var(--border-admin)] rounded-md"
            placeholder="Search here..."
          />
        </div>

        {/* Buttons container */}
        <div className="flex items-center gap-2">
          {/* Download */}
          {role !== "barbershop" && (
            <ActionComponent
              actions={downloadActions}
              buttonClassName="flex items-center justify-center w-10 h-10 sm:w-auto sm:px-3 sm:py-2 border border-[var(--color-primary1)] bg-white rounded-md shadow-sm hover:bg-gray-50"
              icon={
                <Download className="w-4 h-4 text-[var(--color-primary1)]" />
              }
            />
          )}

          {/* Filter */}
          <ActionComponent
            actions={[
              {
                type: "sidebar",
                component: <DynamicForm config={bookingFilterConfig} />,
              },
            ]}
            icon={<Filter className="w-4 h-4 text-[var(--color-primary1)]" />}
            buttonClassName="flex items-center justify-center w-10 h-10 sm:w-auto sm:px-3 sm:py-2 border border-[var(--color-primary1)] bg-white rounded-md shadow-sm hover:bg-gray-50"
          />
        </div>
      </div>

      <div className="w-full">
        <GridCommonComponent
          data={currentData}
          options={options}
          // columns={columns}
          columns={bookingColumns?.map((col) => {
            if (col.key === "actions") {
              return {
                ...col,
                component: {
                  ...col.component,
                  options: {
                    ...col.component.options,
                    actions: (row) => col.component.options.actions(row), // pass row dynamically
                  },
                },
              };
            }
            return col;
          })}
          theme={{
            border: "border-[var(--border-admin)]",
            header: {
              bg: "bg-gray-100",
            },
          }}
          bulkActionsConfig={[
            {
              label: "Mark As Pending",
              iconUrl: "/assets/icon/markCompleted.svg",
              type: "popUp",
              component: <ViewUser />,
            },
            {
              label: "Mark As Ongoing",
              iconUrl: "/assets/icon/markCompleted.svg",
              type: "popUp",
              component: <ViewUser />,
            },
            {
              label: "Mark As Completed",
              iconUrl: "/assets/icon/markCompleted.svg",
              type: "popUp",
              component: <ViewUser />,
            },
            ...(role !== "barbershop"
              ? [
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
                ]
              : []),
          ]}
        />
      </div>

      {showCancelPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 shadow-md rounded-md"
          onClick={() => setShowCancelPopup(false)} // click outside closes
        >
          <div onClick={(e) => e.stopPropagation()}>
            {" "}
            {/* prevent closing when clicking inside */}
            <PopupForm
              config={cancelBookingConfig}
              width="600px"
              onApply={(data) => {
                console.log("Booking cancelled", data);
                setShowCancelPopup(false);
                setShowRefundPopup(true);
              }}
              onCancel={() => setShowCancelPopup(false)}
            />
          </div>
        </div>
      )}

      {showRefundPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setShowRefundPopup(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <PopupForm
              config={refundConfig}
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

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default BookingPage;
