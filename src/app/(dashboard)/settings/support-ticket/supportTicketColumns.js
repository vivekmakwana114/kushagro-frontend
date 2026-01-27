"use client";
import ViewSupportTicket from "./ViewSupportTicket";

import ViewUser from "../../buyer/viewUser";

import ActionPopup from "@/components/common/ActionPopup";

export const getSupportTicketColumns = ({ onDelete, onStatusUpdate }) => [
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
          const commonActions = [
            {
              label: "View Details",
              iconUrl: "/assets/icon/View.svg",
              type: "sidebar",
              component: <ViewSupportTicket />, // ViewSupportTicket handles its own updates now
            },
          ];

          if (row.status === "open") {
            return [
              ...commonActions,
              {
                label: "Mark as In Process",
                iconUrl: "/assets/icon/markCompleted.svg",

                onClick: () => onStatusUpdate(row._id || row.id, "inprocess"),
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
                onApply: () => onDelete(row._id || row.id),
              },
            ];
          }

          if (row.status === "inprocess") {
            return [
              ...commonActions,
              {
                label: "Mark as Done",
                iconUrl: "/assets/icon/markCompleted.svg",

                onClick: () => onStatusUpdate(row._id || row.id, "done"),
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
                onApply: () => onDelete(row._id || row.id),
              },
            ];
          }

          // default actions for other statuses (e.g. closed)
          return [
            ...commonActions,
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
              onApply: () => onDelete(row._id || row.id),
            },
          ];
        },
      },
    },
  },
];
