"use client";
import React, { useState } from "react";
import GridCommonComponent from "@/components/grid/gridCommonComponent";
import { sellerData } from "./sellerData";
import { Input } from "@/components/ui/input";
import { Download, Filter, Search } from "lucide-react";
import ActionComponent from "@/components/grid/actionComponent";
import DynamicForm from "@/components/modules/registry";
import PopupForm from "@/components/ui/popupform";
import Pagination from "@/components/ui/pagination";
import Image from "next/image";
import { bookingFilterConfig, suspendSellerConfig } from "./sellerConfig";
import { getSellerColumns } from "./sellerColumn";

const options = {
  select: true,
  order: false,
  sortable: false,
};

const SellerPage = () => {
  const sellerColumns = getSellerColumns();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = sellerData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sellerData.length / itemsPerPage);

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
    <div className="w-full  md:h-[calc(100vh-9rem)] h-full">
      <div className="flex items-center justify-between mb-2 gap-2">
        <div className="relative w-[400px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input className="pl-10 w-full" placeholder="Search here..." />
        </div>

        <div className="flex items-center justify-between mb-2 gap-2">
          <div className="flex gap-2">
            <ActionComponent
              actions={downloadActions}
              buttonClassName="inline-flex items-center justify-center p-2 border border-[var(--border-admin)] bg-white rounded-md  hover:bg-gray-50"
              icon={
                <Download className="w-4 h-4 text-[var(--color-secondary1)]" />
              }
            />

            <ActionComponent
              actions={[
                {
                  type: "sidebar",
                  component: <DynamicForm config={bookingFilterConfig} />,
                },
              ]}
              icon={
                <Filter className="w-4 h-4 text-[var(--color-secondary1)]" />
              }
              buttonClassName="inline-flex items-center justify-center p-2 border border-[var(--border-admin)] bg-white rounded-md  hover:bg-gray-50"
            />
          </div>
        </div>
      </div>

      {/* Conditional Rendering */}

      <>
        <GridCommonComponent
          data={currentData}
          options={options}
          columns={sellerColumns.map((col) => {
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
              label: "Suspend Seller",
              iconUrl: "/assets/icon/suspendCustomer.svg",
              component: (
                <PopupForm
                  config={suspendSellerConfig}
                  width="500px"
                  onApply={(data) => console.log("Suspended:", data)}
                  onCancel={() => console.log("Cancelled")}
                />
              ),
            },

            {
              label: "Export Selection",
              iconUrl: "/assets/icon/downloadGray.svg",
              children: [
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
              ],
            },
          ]}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </>
    </div>
  );
};

export default SellerPage;
