"use client";

import PopupForm from "@/components/ui/popupform";
import {
  refundDetailsConfig,
  markAsCompleteConfig,
  flagOrderConfig,
} from "./orderHistoryConfig";
import ViewOrderDetails from "@/components/common/ViewOrderDetails";
import DynamicForm from "@/components/modules/DynamicFormRendering";

export const getOrderColumns = (role) => [
  {
    key: "product_order_id",
    title: "Order ID",
    sortable: true,
    component: {
      type: "phone",
      style: {
        color: "var(--color-secondary1)",
        fontWeight: "500",
      },
    },
  },
  {
    key: "product",
    title: "Product",
    isObject: true,
    sortable: true,
    structure: {
      name: "name",
      category: "category",
      profile: "profile",
    },
    component: {
      type: "standard_avatar",
      style: {
        radius: "rounded-md",
      },
    },
  },
  {
    key: "buyer",
    title: "Buyer",
    isObject: true,
    sortable: true,
    structure: {
      name: "name",
      email: "email",
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
    key: "date_time",
    title: "Order Date",
    sortable: true,
    component: {
      type: "date",
      options: {
        format: "dd MM yyyy",
      },
      style: {
        color: "var(--color-dull-text)",
        fontWeight: "500",
      },
    },
  },
  {
    key: "amount",
    title: "Amount",
    sortable: true,
    component: {
      type: "currency",
      sign: "$",
      position: "start",
      style: {
        color: "var(--color-black)",
        fontWeight: "500",
      },
    },
  },
  {
    key: "status",
    title: "Status",
    sortable: true,
    component: {
      type: "badge",
      style: {
        borderRadius: "3.15px",
        padding: "8px 12px",
      },
      options: {
        value: {
          complete: "#2E5B20", // Green
          cancelled: "#EF4444", // Red
          // upcoming: "#6C63FF", // indigo
          ongoing: "#7D7D7D", //Gray
        },
      },
    },
  },
  {
    key: "actions",
    title: "Actions",
    component: {
      type: "action",
      style: {},
      options: {
        actions: (row) => {
          switch (row.status) {
            case "ongoing":
              return [
                {
                  label: "View Order",
                  iconUrl: "/assets/icon/viewCustomer.svg",
                  type: "sidebar",
                  component: <ViewOrderDetails/>,
                },
                {
                  label: "Mark As Complete",
                  iconUrl: "/assets/icon/markCompleted.svg",
                  type: "popUp",
                  component: (
                    <PopupForm
                      config={markAsCompleteConfig}
                      width="500px"
                      onApply={(data) =>
                        console.log("Marked as complete:", data)
                      }
                    />
                  ),
                },
                {
                  label: "Flag Order",
                  iconUrl: "/assets/icon/flag.svg",
                  type: "popUp",
                  component: (
                    <PopupForm
                      config={flagOrderConfig}
                      width="500px"
                      onApply={(data) => console.log("Flagged:", data)}
                    />
                  ),
                },
                {
                  label: "Download Invoice",
                  iconUrl: "/assets/icon/downloadGray.svg",
                  onClick: (data) => console.log("Download invoice:", data),
                },
                {
                  label: "Cancel Order",
                  iconUrl: "/assets/icon/cancel.svg",
                  onClick: (row) => console.log("Cancel Order Clicked", row),
                },
              ];

            case "complete":
              return [
                {
                  label: "View Order",
                  iconUrl: "/assets/icon/viewCustomer.svg",
                  type: "sidebar",
                  component: <ViewOrderDetails module="seller" />,
                },
                {
                  label: "Download Invoice",
                  iconUrl: "/assets/icon/downloadGray.svg",
                  onClick: (data) => console.log("Download invoice:", data),
                },
              ];

            case "cancelled":
              return [
                {
                  label: "View Order",
                  iconUrl: "/assets/icon/viewCustomer.svg",
                  type: "sidebar",
                  component: <ViewOrderDetails module="seller" />,
                },
                {
                  label: "Download Invoice",
                  iconUrl: "/assets/icon/downloadGray.svg",
                  onClick: (data) => console.log("Download invoice:", data),
                },
                {
                  label: "Initiate Refund",
                  iconUrl: "/assets/icon/refund.svg",
                  type: "popUp",
                  style: {
                    color: "#BC0D10",
                  },
                  component: (
                    <PopupForm
                      config={refundDetailsConfig}
                      width="600px"
                      onApply={(data) => console.log("Refund confirmed", data)}
                      onCancel={() => console.log("Cancelled")}
                    />
                  ),
                },
              ];

            default:
              return [];
          }
        },
      },
    },
  },
];
