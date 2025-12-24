"use client";
import React, { useState } from "react";
import GridCommonComponent from "@/components/grid/gridCommonComponent";
import { Input } from "@/components/ui/input";
import { Download, Filter, Search } from "lucide-react";
import { getBarberColumns } from "./barberColumn";
import ActionComponent from "@/components/grid/actionComponent";
import DynamicForm from "@/components/modules/DynamicFormRendering";
import { barberData } from "./barberData";
import {
  barberFilterConfig,
  deleteBarberConfigAll,
  getBarberConfig,
  markAsActiveConfig,
  markAsInactiveBulkConfig,
} from "./barberConfig";
import Image from "next/image";
import { BsFilePdf, BsFileSpreadsheet } from "react-icons/bs";
import PopupForm from "@/components/ui/popupform";
import Pagination from "@/components/ui/pagination";

const downloadActions = [
  { header: "Download List" },
  {
    label: "Download PDF",
    icon: (
      <BsFilePdf className="w-4 h-4 text-[var(--color-placeholder-color)] font-bold" />
    ),
    onClick: () => console.log("Download PDF"),
  },
  {
    label: "Download CSV",
    icon: (
      <BsFileSpreadsheet className="w-4 h-4 text-[var(--color-placeholder-color)] font-bold" />
    ),
    onClick: () => console.log("Download CSV"),
  },
];

const options = {
  select: true,
  order: false,
  sortable: true,
};

const BarberPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = barberData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(barberData.length / itemsPerPage);
  const hasBarbers = barberData.length > 0;

  const barberColumns = getBarberColumns();

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
            icon={<Download className="w-5 h-5 text-[var(--color-primary1)]" />}
          />

          <ActionComponent
            actions={[
              {
                type: "sidebar",
                component: <DynamicForm config={barberFilterConfig} />,
              },
            ]}
            icon={<Filter className="w-5 h-5 text-[var(--color-primary1)]" />}
            buttonClassName="inline-flex items-center justify-center p-2 border border-[var(--border-admin)] bg-white rounded-md hover:bg-gray-50"
          />

          <ActionComponent
            actions={[
              {
                type: "sidebar",
                component: (
                  <DynamicForm
                    config={getBarberConfig("create", {})}
                    onApply={(data) => console.log("Added barber:", data)}
                  />
                ),
              },
            ]}
            icon={
              <Image
                src="/icons/plusbutton.svg"
                alt="Add Barber"
                width={18}
                height={18}
              />
            }
            text="Add Barber"
            buttonClassName="inline-flex items-center gap-2 bg-[var(--color-primary1)] text-white px-4 py-2 rounded-md hover:bg-primary1/80 cursor-pointer"
          />
        </div>
      </div>

      <GridCommonComponent
        data={currentData}
        options={options}
        columns={barberColumns.map((col) => {
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
            label: "Mark as Active",
            iconUrl: "/assets/icon/reactivateCustomer.svg",
            component: (
              <PopupForm
                config={markAsActiveConfig}
                width="500px"
                onApply={(data) => console.log("Activated:", data)}
                onCancel={() => console.log("Cancelled")}
              />
            ),
          },
          {
            label: "Mark as Inactive",
            iconUrl: "/assets/icon/markInactive.svg",
            type: "popUp",
            component: (
              <PopupForm
                config={markAsInactiveBulkConfig}
                width="500px"
                onApply={(data) => console.log("Activated:", data)}
                onCancel={() => console.log("Cancelled")}
              />
            ),
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
          {
            label: "Delete Barber",
            iconUrl: "/assets/icon/deleteBarbershop.svg",
            component: (
              <PopupForm
                config={deleteBarberConfigAll}
                width="500px"
                onApply={(data) => console.log("Deleted:", data)}
                onCancel={() => console.log("Cancelled")}
              />
            ),
          },
        ]}
      />

      {hasBarbers && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
};

export default BarberPage;
