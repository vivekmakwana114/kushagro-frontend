"use client";
import ViewSupportTicket from "./ViewSupportTicket";

import ViewUser from "../../buyer/viewUser";

import ActionPopup from "@/components/common/ActionPopup";

export const supportTicketColumns = [
  {
    key: "ticket_id",
    title: "Ticket ID",
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
    key: "subject",
    title: "Subject",
    sortable: true,
    component: {
      type: "phone",
      style: {
        color: "var(--color-dull-text)",
        fontWeight: "500",
      },
    },
  },
  {
    key: "user",
    title: "User",
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
    key: "date_time",
    title: "Raised On",
    sortable: true,
    component: {
      type: "date",
      style: {
        color: "var(--color-dull-text)",
        fontWeight: "500",
      },
      options: {
        format: "dd MM, yyyy",
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
          done: "#097415", // Green
          inprocess: "#FFBE00", // yellow
          open: "#7D7D7D", //Gray
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
          if (row.status === "open") {
            return [
              {
                label: "View Details",
                iconUrl: "/assets/icon/View.svg",
                type: "sidebar",
                component: <ViewSupportTicket />,
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
                type: "modal_component",
                component: (
                  <ActionPopup
                    heading="Delete Support Ticket?"
                    subHeading="Are you sure you want to delete this support ticket? Once deleted, this ticket will be removed from the panel and will no longer be visible to admin."
                    confirmText="Delete Ticket"
                    confirmColor="red"
                  />
                ),
                onApply: (data) => console.log("Delete:", row, data),
              },
            ];
          }

          if (row.status === "inprocess") {
            return [
              {
                label: "View Details",
                iconUrl: "/assets/icon/View.svg",
                type: "sidebar",
                component: <ViewSupportTicket />,
              },
              {
                label: "Mark as In Done",
                iconUrl: "/assets/icon/markCompleted.svg",
                type: "popUp",
                component: <ViewUser />,
              },
              {
                label: "Delete Ticket",
                iconUrl: "/assets/icon/deleteBarbershop.svg",
                type: "modal_component",
                component: (
                  <ActionPopup
                    heading="Delete Support Ticket?"
                    subHeading="Are you sure you want to delete this support ticket? Once deleted, this ticket will be removed from the panel and will no longer be visible to admin."
                    confirmText="Delete Ticket"
                    confirmColor="red"
                  />
                ),
                onApply: (data) => console.log("Delete:", row, data),
              },
            ];
          }

          // default actions for other statuses
          return [
            {
              label: "View Details",
              iconUrl: "/assets/icon/View.svg",
              type: "sidebar",
              component: <ViewSupportTicket />,
            },
            {
              label: "Mark as In Process",
              iconUrl: "/assets/icon/markCompleted.svg",
              type: "popUp",
              component: <ViewUser />,
            },
            {
              label: "Mark as Done",
              iconUrl: "/assets/icon/markCompleted.svg",
              type: "popUp",
              component: <ViewUser />,
            },
            {
                label: "Delete Ticket",
                iconUrl: "/assets/icon/deleteBarbershop.svg",
                type: "modal_component",
                component: (
                  <ActionPopup
                    heading="Delete Support Ticket?"
                    subHeading="Are you sure you want to delete this support ticket? Once deleted, this ticket will be removed from the panel and will no longer be visible to admin."
                    confirmText="Delete Ticket"
                    confirmColor="red"
                  />
                ),
                onApply: (data) => console.log("Delete:", row, data),
              },
          ];
        },
      },
    },
  },
];
