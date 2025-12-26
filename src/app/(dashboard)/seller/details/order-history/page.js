"use client";
import GridCommonComponent from "@/components/grid/gridCommonComponent";
import { Input } from "@/components/ui/input";
import { Download, Search } from "lucide-react";
import React from "react";
import ActionComponent from "@/components/grid/actionComponent";
import DynamicForm from "@/components/modules/DynamicFormRendering";
import { orderData } from "./orderHistoryData";
import {
  deleteOrderConfigAll,
  getOrderConfig,
  markAsActiveConfig,
  markAsInactiveBulkConfig,
} from "./orderHistoryConfig";
import Image from "next/image";
import { BsFilePdf, BsFileSpreadsheet } from "react-icons/bs";
import PopupForm from "@/components/ui/popupform";
import { useSelector } from "react-redux";
import { getOrderColumns } from "./orderHistoryColumn";
import { deleteBarberConfigAll } from "@/app/(dashboard)/order/orderConfig";

const options = {
  select: false,
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

const OrderHistoryPage = () => {
  const role = useSelector((state) => state.auth.role);
  return (
    <div className="w-full md:h-[calc(100vh-9rem)] h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="relative mb-2 w-[400px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input className="pl-10" placeholder="Search here..." />
        </div>
        <div className="flex gap-2">
          <ActionComponent
            actions={downloadActions}
            buttonClassName="inline-flex items-center justify-center p-2 border border-[var(--border-admin)] bg-white rounded-md  hover:bg-gray-50"
            icon={
              <Download className="w-4 h-4 text-[var(--color-secondary1)]" />
            }
          />
        </div>
      </div>

      <div className="w-full">
        <GridCommonComponent
          data={orderData}
          options={options}
          // columns={barberColumns}
          columns={getOrderColumns(role).map((col) => {
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
            ...(role !== "barbershop" ? [{
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
            }] : []),
            
            {
              label: "Delete Barbershop",
              iconUrl: "/assets/icon/deleteBarbershop.svg",
              component: (
                <PopupForm
                  config={deleteOrderConfigAll}
                  width="500px"
                  onApply={(data) => console.log("Suspended:", data)}
                  onCancel={() => console.log("Cancelled")}
                />
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default OrderHistoryPage;
