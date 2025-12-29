"use client";
import React, { useState } from "react";
import GridCommonComponent from "@/components/grid/gridCommonComponent";
import { Input } from "@/components/ui/input";
import { Download, Filter, Search } from "lucide-react";
import { getOrderColumns } from "./orderColumn";
import ActionComponent from "@/components/grid/actionComponent";
import OrderFilterForm from "./OrderFilterForm";
import { orderData } from "./orderData";
import {
  orderFilterConfig,
  deleteOrderConfigAll,
  markAsActiveConfig,
  markAsInactiveBulkConfig,
  deleteOrderConfig,
} from "./orderConfig";
import Image from "next/image";
import { BsFilePdf, BsFileSpreadsheet } from "react-icons/bs";
import PopupForm from "@/components/ui/popupform";
import Pagination from "@/components/ui/pagination";
import ViewUser from "../buyer/viewUser";

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

const options = {
  select: true,
  order: false,
  sortable: true,
};

const OrderPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = orderData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(orderData.length / itemsPerPage);

  const orderColumns = getOrderColumns();

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="relative mb-2 w-[400px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-dull-text)]" />
          <Input className="pl-10" placeholder="Search here..." />
        </div>

        <div className="flex gap-2">
          <ActionComponent
            actions={downloadActions}
            buttonClassName="inline-flex items-center justify-center p-2 border border-[var(--border-admin)] bg-white rounded-md hover:bg-gray-50"
            icon={
              <Download className="w-5 h-5 text-[var(--color-secondary1)]" />
            }
          />

          <ActionComponent
            actions={[
              {
                type: "sidebar",
                component: <OrderFilterForm />,
              },
            ]}
            icon={<Filter className="w-5 h-5 text-[var(--color-secondary1)]" />}
            buttonClassName="inline-flex items-center justify-center p-2 border border-[var(--border-admin)] bg-white rounded-md hover:bg-gray-50"
          />
        </div>
      </div>

      <GridCommonComponent
        data={currentData}
        options={options}
        columns={orderColumns.map((col) => {
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
          border: "border-gray-300",
          header: {
            bg: "bg-gray-100",
          },
        }}
        bulkActionsConfig={[
          {
            label: "Mark As Complete",
            iconUrl: "/assets/icon/markCompleted.svg",
            type: "popUp",
            component: <ViewUser />,
          },
          {
            label: "Flag Order",
            iconUrl: "/assets/icon/flag.svg",
            type: "popUp",
            component: <ViewUser />,
          },
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
                icon: <BsFileSpreadsheet className="w-4 h-4 text-[#7B7B7B]" />,
                onClick: (rows) => console.log(rows, "Download CSV"),
              },
            ],
          },
        ]}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default OrderPage;
