"use client";

import PopupForm from "@/components/ui/popupform";
import DynamicForm from "@/components/modules/DynamicFormRendering";
import {
  bookingDetailsConfig,
  refundDetailsConfig,
} from "./productOrderConfig";
import { editBookingConfig } from "./productOrderConfig";
import ViewUser from "../../viewUser";
import ViewOrderDetails from "@/components/common/ViewOrderDetails";

export const getProductOrderColumns = (handleCancelBooking) => [
  {
    key: "product_order_id",
    title: "Order ID",
    sortable: true,
    component: {
      type: "phone",
      style: {
        color: "var(--color-secondary1)",
        fontWeight: "400",
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
    key: "seller",
    title: "Seller",
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
    title: "Amount Paid",
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
      options: {
        actions: (row) => {
          switch (row.status) {
            case "ongoing":
              return [
                {
                  label: "View Order",
                  iconUrl: "/assets/icon/viewCustomer.svg",
                  type: "sidebar",
                  component: <ViewOrderDetails module="buyer" />,
                },
                // {
                //   label: "Edit Booking",
                //   iconUrl: "/assets/icon/editBooking.svg",
                //   type: "sidebar",
                //   component: <DynamicForm config={editBookingConfig} />,
                // },
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
                  label: "Download Invoice",
                  iconUrl: "/assets/icon/downloadGray.svg",
                  onClick: (data) => console.log("Download invoice:", data),
                },
                {
                  label: "Cancel Order",
                  iconUrl: "/assets/icon/cancel.svg",
                  type: "popUp",
                  // component: <PopupForm config={cancelBookingConfig} />,
                  onClick: (row) => handleCancelBooking(row),
                },
              ];

            case "complete":
              return [
                {
                  label: "View Order",
                  iconUrl: "/assets/icon/viewCustomer.svg",
                  type: "sidebar",
                  component: <ViewOrderDetails module="buyer" />,
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
                  component: <ViewOrderDetails module="buyer" />,
                },
                {
                  label: "Download Invoice",
                  iconUrl: "/assets/icon/downloadGray.svg",
                  onClick: (data) => console.log("Download invoice:", data),
                },
                {
                  label: "Initiate Refund",
                  iconUrl: "/icons/refund.svg",
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
