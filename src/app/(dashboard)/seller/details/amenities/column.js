"use client";

import DynamicForm from "@/components/modules/DynamicFormRendering";
import PopupForm from "@/components/ui/popupform";

export const amenities_columns = [
  {
    key: "service_name",
    title: "Service Name",
    isObject: true,
    sortable: true,
    structure: {
      name: "name",
      profile: "profile",
    },
    component: {
      type: "standard_avatar",
      style: {
        radius: "rounded-full",
      },
    },
  },
  {
    key: "duration",
    title: "Duration",
  },
  {
    key: "price",
    title: "Price",
    component: {
      type: "currency",
      style: {},
      sign: "$",
      position: "start",
    },
  },
  {
    key: "status",
    title: "Status",
    component: {
      type: "badge",
      style: {
        borderRadius: "0.15rem",
      },
      options: {
        value: {
          active: "#00A78E",
          completed: "#9CA3AF",
          cancelled: "#EF4444",
        },
      },
    },
  },
  // {
  //   key: "actions",
  //   title: "Actions",
  //   component: {
  //     type: "action",
  //     style: {},
  //     options: {
  //       actions: [
  //         {
  //           label: "Edit Service",
  //           iconUrl: "/icons/editService.svg",
  //           type: "sidebar",
  //           component: <DynamicForm config={editServiceConfig} />,
  //         },
  //         {
  //           label: "Delete Service",
  //           iconUrl: "/icons/deleteService.svg",
  //           type: "popUp",
  //           component: (
  //             <PopupForm
  //               config={cancelServiceConfig}
  //               width="500px"
  //               onApply={(data) => console.log("Deleted:", data)}
  //               onCancel={() => console.log("Cancelled")}
  //             />
  //           ),
  //         },
  //       ],
  //     },
  //   },
  // },
];
