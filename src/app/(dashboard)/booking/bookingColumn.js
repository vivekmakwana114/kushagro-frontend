"use client";

import DetailView from "@/components/modules/DetailView";
import ViewUser from "../buyer/viewUser";
import PopupForm from "@/components/ui/popupform";
import {
  bookingDetailsConfig,
  editBookingConfig,
  refundDetailsConfig,
} from "./bookingConfig";
import DynamicForm from "@/components/modules/DynamicFormRendering";

export const getBookingColumns = (handleCancelBooking, role) => [
  {
    key: "booking_id",
    title: "Booking ID",
    sortable: true,
    component: {
      type: "phone",
      style: {
        color: "var(--color-primary1)",
        fontWeight: "500",
      },
    },
  },
  {
    key: "date_time",
    title: "Date & Time",
    sortable: true,
    component: {
      type: "date",
      style: {
        color: "var(--color-placeholder-color)",
        fontWeight: "500",
      },
      options: {
        format: "MM dd yyyy hh:mm a",
      },
    },
  },

  {
    key: "customer",
    title: "Customer",
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
        color: "var(--color-black)",
      },
    },
  },

  {
    key: "barber",
    title: "Barber",
    sortable: true,
    component: {
      type: "phone",
      style: {
        color: "var(--color-primary1)",
        fontWeight: "500",
      },
    },
  },
  {
    key: "service_name",
    title: "Service",
    sortable: true,
    component: {
      type: "phone",
      style: {
        color: "var(--color-placeholder-color)",
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
        color: "var(--color-placeholder-color)",
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
        fontWeight: "500",
      },
      options: {
        value: {
          completed: "#00A78E", // Green
          cancelled: "#EF4444", // Red
          upcoming: "#6C63FF", // indigo
          ongoing: "#6C63FF", // indigo
          refunded: "#7D7D7D", //Gray
          pending: "#D89518", // yellow
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
          // row.status determines which actions to show
          if (row.status === "cancelled") {
            const isBarbershop = role === "barbershop";
            const refundConfig = isBarbershop
              ? {
                  ...refundDetailsConfig,
                  fields: refundDetailsConfig.fields
                    .filter(
                      (field) => field.label !== "Confirm Refund Amount"
                    )
                    .map((field, index) =>
                      index === 0
                        ? { ...field, label: "Raise Refund Request" }
                        : field
                    ),
                  footer: {
                    ...refundDetailsConfig.footer,
                    apply: {
                      ...refundDetailsConfig.footer.apply,
                      label: "Raise Refund Request",
                    },
                  },
                }
              : refundDetailsConfig;

            return [
              {
                label: "View Booking",
                iconUrl: "/assets/icon/viewCustomer.svg",
                type: "sidebar",
                component: <DetailView config={bookingDetailsConfig} />,
              },
              {
                label: "Download Invoice",
                iconUrl: "/assets/icon/downloadGray.svg",
                onClick: (data) => console.log("Download Invoice", data),
              },
              {
                label: isBarbershop
                  ? "Raise Refund Request"
                  : "Initiate Refund",
                iconUrl: "/assets/icon/refund.svg",
                type: "popUp",
                style: {
                  color: "var(--color-red)",
                },
                component: (
                  <PopupForm
                    config={refundConfig}
                    width="600px"
                    onApply={(data) => console.log("Refund confirmed", data)}
                    onCancel={() => console.log("Cancelled")}
                  />
                ),
              },
            ];
          }

          // default actions for other statuses
          return [
            {
              label: "View Booking",
              iconUrl: "/assets/icon/viewCustomer.svg",
              type: "sidebar",
              component: <DetailView config={bookingDetailsConfig} />,
            },
            {
              label: "Edit Booking",
              iconUrl: "/assets/icon/editBooking.svg",
              type: "sidebar",
              component: <DynamicForm config={editBookingConfig} />,
            },
            {
              label: "Mark As Ongoing",
              iconUrl: "/assets/icon/markCompleted.svg",
              type: "popUp",
              component: <ViewUser />,
            },
            {
              label: "Mark As Completed",
              iconUrl: "/assets/icon/markCompleted.svg",
              type: "popUp",
              component: <ViewUser />,
            },
            {
              label: "Download Invoice",
              iconUrl: "/assets/icon/downloadGray.svg",
              onClick: (data) => console.log("Download Invoice", data),
            },
            {
              label: "Cancel Booking",
              iconUrl: "/assets/icon/cancel.svg",
              type: "button",
              onClick: (row) => handleCancelBooking(row),
            },
          ];
        },
      },
    },
  },
];
