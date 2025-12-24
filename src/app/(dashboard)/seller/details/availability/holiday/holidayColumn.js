"use client";

import DynamicForm from "@/components/modules/DynamicFormRendering";
import PopupForm from "@/components/ui/popupform";
import {  deleteHolidayConfig, editHolidayConfig } from "./holidayConfig";


export const holidayColumns = [
  {
    key: "date",
    title: "Date",
   
    sortable: false,
    component: {
      type: "date",
      style: {},
      options: {
        format: "M d yyyy",
      },
       style:{
        color: "var(--color-placeholder-color)",
      }
    },
  },
  {
    key: "day",
    title: "Day",
    component:{
      style:{
        color: "var(--color-placeholder-color)",
      }
    },
  },
  {
    key: "reason",
    title: "Occasion/Reason",
    component: {
      style:{
        color: "var(--color-placeholder-color)",
      }
    },
  },
  {
    key: "actions",
    title: "Actions",
    component: {
      type: "action",
      style: {},
      options: {
        actions: [
          {
            label: "Edit Holiday",
            iconUrl: "/assets/icon/editBooking.svg",
            type: "sidebar",
            component: <DynamicForm config={editHolidayConfig} />,
          },
          {
            label: "Delete Holiday",
            iconUrl: "/assets/icon/deleteBarbershop.svg",
            type: "popUp",
            component: (
              <PopupForm
                config={deleteHolidayConfig}
                width="500px"
                onApply={(data) => console.log("Deleted:", data)}
                onCancel={() => console.log("Cancelled")}
              />
            ),
          },
        ],
      },
    },
  },
];
