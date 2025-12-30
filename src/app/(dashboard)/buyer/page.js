"use client";
import React, { useState } from "react";
import GridCommonComponent from "@/components/grid/gridCommonComponent";
import { buyerData } from "./buyerData";
import { getBuyerColumns } from "./buyerColumn";
import { Input } from "@/components/ui/input";
import { Download, Filter, Search } from "lucide-react";
import ActionComponent from "@/components/grid/actionComponent";
import ActionPopup from "@/components/common/ActionPopup";
import Pagination from "@/components/ui/pagination";
import Image from "next/image";
import BuyerFilterForm from "./BuyerFilterForm";

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

const Page = () => {
  const buyerColumns = getBuyerColumns();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexofLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexofLastItem - itemsPerPage;
  const currentData = buyerData.slice(indexOfFirstItem, indexofLastItem);
  const totalPages = Math.ceil(buyerData.length / itemsPerPage);

  return (
    <div className="w-full md:h-[calc(100vh-9rem)] h-full flex flex-col">
      <div className="flex items-center justify-between mb-2 gap-2">
        <div className="relative w-[400px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-dull-text" />
          <Input className="pl-10 w-full" placeholder="Search here..." />
        </div>

        <div className="flex gap-2">
          <ActionComponent
            actions={downloadActions}
            buttonClassName="inline-flex items-center justify-center p-2 border border-secondary1 bg-white rounded-md  hover:bg-gray-50"
            icon={<Download className="w-4 h-4 text-secondary1" />}
          />

          <ActionComponent
            actions={[
              {
                type: "sidebar",
                component: <BuyerFilterForm />,
              },
            ]}
            icon={<Filter className="w-4 h-4 text-secondary1" />}
            buttonClassName="inline-flex items-center justify-center p-2 border border-secondary1 bg-white rounded-md  hover:bg-gray-50"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0 no-scrollbar">
        <GridCommonComponent
          data={currentData}
          options={options}
          columns={buyerColumns.map((col) => {
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
            border: "border-(--border-admin)",
            header: {
              bg: "bg-gray-100",
            },
          }}
          bulkActionsConfig={[
            {
              label: "Suspend Buyers",
              iconUrl: "/assets/icon/suspendCustomer.svg",
              type: "modal_component",
              component: (
                <ActionPopup
                  heading="Suspend Selected Buyers?"
                  subHeading="You are about to suspend 12 Buyers. They will lose access to all app features until reactivated. Please select a common reason for suspension."
                  confirmText="Confirm Suspend All"
                  confirmColor="red"
                  dropdownOptions={[
                    {
                      label: "Deactivation requested by the Buyers.",
                      value: "Deactivation requested by the Buyers.",
                    },
                    {
                      label: "Inappropriate behavior",
                      value: "Inappropriate behavior",
                    },
                    { label: "Multiple no-shows", value: "Multiple no-shows" },
                    {
                      label: "Payment-related issues",
                      value: "Payment-related issues",
                    },
                    {
                      label: "Spam or fake account",
                      value: "Spam or fake account",
                    },
                    { label: "Other", value: "Other" },
                  ]}
                  dropdownLabel="Select Suspension Reason"
                  dropdownPlaceholder="Deactivation requested by the Buyers."
                  textareaLabel="Note"
                  textareaPlaceholder="Add a Note"
                />
              ),
              onApply: (data, rows) =>
                console.log("Bulk Suspended:", rows, data),
            },
            {
              label: "Export Selection",
              iconUrl: "/assets/icon/downloadGray.svg",
              children: [
                { header: "Download List" },
                {
                  label: "Download PDF",
                  // icon: <BsFilePdf className="w-4 h-4 text-dull-text" />,
                  icon: (
                    <Image
                      src="/assets/icon/downloadpdf.svg"
                      alt="downloadpdf"
                      width={16}
                      height={16}
                    />
                  ),
                  onClick: (rows) => console.log(rows, "Download PDF"),
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
                  onClick: (rows) => console.log(rows, "Download CSV"),
                },
              ],
            },
          ]}
        />
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => {
          setCurrentPage(page);
        }}
      />
    </div>
  );
};
export default Page;
