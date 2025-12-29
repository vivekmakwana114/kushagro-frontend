"use client";
import GridCommonComponent from "@/components/grid/gridCommonComponent";
import React, { useState } from "react";
import { fraudData } from "./fraudData";
import { fraudReportColumns } from "./fraudReportColumns";
import ActionComponent from "@/components/grid/actionComponent";
import { Filter, Search } from "lucide-react";
import {
  deleteSupportTicketConfig,
  supportTicketFilterConfig,
} from "./fruadReportConfig";
import ViewUser from "../../buyer/viewUser";
import PopupForm from "@/components/ui/popupform";
import DynamicForm from "@/components/modules/DynamicFormRendering";
import { Input } from "@/components/ui/input";
import Pagination from "@/components/ui/pagination";

const options = {
  select: true,
  order: false,
  sortable: false,
};
const FraudReportPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexofLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexofLastItem - itemsPerPage;
  const currentData = fraudData.slice(indexOfFirstItem, indexofLastItem);
  const totalPages = Math.ceil(fraudData.length / itemsPerPage);
  return (
    <div className="w-full md:h-[calc(100vh-9rem)] h-full flex flex-col">
      <div className="flex items-center justify-between gap-2 mb-4 w-full flex-none">
        <div className="relative flex-1 min-w-[150px] max-w-[400px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-dull-text" />
          <Input
            className="pl-10 h-10 w-full border border-(--border-admin) rounded-md"
            placeholder="Search here..."
          />
        </div>
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar">
        <GridCommonComponent
          data={currentData}
          options={options}
          columns={fraudReportColumns}
          theme={{
            border: "border-gray-300",
            header: {
              bg: "bg-gray-100",
            },
          }}
          bulkActionsConfig={[
            {
              label: "Mark as In Done",
              iconUrl: "/assets/icon/markCompleted.svg",
              type: "popUp",
              component: <ViewUser />,
            },
            {
              label: "Mark as In Process",
              iconUrl: "/assets/icon/markCompleted.svg",
              type: "popUp",
              component: <ViewUser />,
            },
            {
              label: "Delete Ticket",
              iconUrl: "/assets/icon/deleteBarbershop.svg",
              type: "popUp",
              component: (
                <PopupForm
                  config={deleteSupportTicketConfig}
                  width="600px"
                  onApply={(data) => console.log("Ticket Deleted", data)}
                  onCancel={() => console.log("Cancelled")}
                />
              ),
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

export default FraudReportPage;
