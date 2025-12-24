"use client";
import GridCommonComponent from "@/components/grid/gridCommonComponent";
import React from "react";
import { supportData } from "./supportData";
import { supportTicketColumns } from "./supportTicketColumns";
import ActionComponent from "@/components/grid/actionComponent";
import { Filter } from "lucide-react";
import {
  deleteSupportTicketConfig,
  supportTicketFilterConfig,
} from "./supportTicketConfig";
import ViewUser from "../../buyer/viewUser";
import PopupForm from "@/components/ui/popupform";
import DynamicForm from "@/components/modules/DynamicFormRendering";

const options = {
  select: true,
  order: false,
  sortable: false,
};
const supportTicketPage = () => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-end gap-2 mb-4 w-full">
        <div className="flex items-center gap-2">
          <ActionComponent
            actions={[
              {
                type: "sidebar",
                component: <DynamicForm config={supportTicketFilterConfig} />,
              },
            ]}
            icon={<Filter className="w-4 h-4 text-[var(--color-primary1)]" />}
            buttonClassName="flex items-center justify-center w-10 h-10 sm:w-auto sm:px-3 sm:py-2 border border-[var(--color-primary1)] bg-white rounded-md shadow-sm hover:bg-gray-50"
          />
        </div>
      </div>
      <GridCommonComponent
        data={supportData}
        options={options}
        columns={supportTicketColumns}
        theme={{
          border: "border-gray-300",
          header: {
            bg: "bg-gray-100",
          },
        }}
        bulkActionsConfig={[
          {
            label: "Mark as In Process",
            iconUrl: "/assets/icon/markCompleted.svg",
            type: "popUp",
            component: <ViewUser />,
          },
          {
            label: "Mark as Resolved",
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
  );
};

export default supportTicketPage;
