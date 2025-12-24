"use client";

import {
  reactivateCustomerConfig,
  suspendCustomerConfig,
} from "./customerConfig";
import PopupForm from "@/components/ui/popupform";

export const getBuyerColumns = () => [
  {
    key: "buyer",
    title: "Buyers",
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
    key: "phone",
    title: "Phone",
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
    key: "joined_on",
    title: "Joined On",
    sortable: true,
    component: {
      type: "date",
      options: {
        format: "M d yyyy",
      },
      style: {
        color: "var(--color-dull-text)",
        fontWeight: "500",
      },
    },
  },
  {
    key: "total_order",
    title: "Total Order",
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
    key: "total_spent",
    title: "Total Spent",
    sortable: true,
    component: {
      type: "currency",
      style: {},
      sign: "$",
      position: "start",
      style: {
        color: "var(--color-dull-text)",
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
          active: "#097416",
          // inactive: "#9CA3AF",
          suspended: "#BC0D10",
        },
      },
    },
  },
  {
    key: "actions",
    title: "Actions",
    sortable: false,
    component: {
      type: "action",
      style: {},
      options: {
        actions: (row) => {
          if (row.status === "suspended") {
            return [
              {
                label: "View Buyer",
                iconUrl: "/assets/icon/ViewCustomer.svg",
                type: "navigate",
                url: "/buyer/details/overview/",
              },
              {
                label: "Reactivate Buyer",
                iconUrl: "/assets/icon/reactivateCustomer.svg",
                component: (
                  <PopupForm
                    config={reactivateCustomerConfig}
                    width="500px"
                    onApply={(data) => console.log("Suspended:", data)}
                    onCancel={() => console.log("Cancelled")}
                  />
                ),
              },
            ];
          }

          return [
            {
              label: "View Buyer",
              iconUrl: "/assets/icon/ViewCustomer.svg",
              type: "navigate",
              url: "/buyer/details/overview/",
            },
            {
              label: "Suspend Buyer",
              iconUrl: "/assets/icon/suspendCustomer.svg",
              component: (
                <PopupForm
                  config={suspendCustomerConfig}
                  width="500px"
                  onApply={(data) => console.log("Suspended:", data)}
                  onCancel={() => console.log("Cancelled")}
                />
              ),
            },

            {
              label: "Share Reset Password Link",
              iconUrl: "/assets/icon/lock.svg",
              onClick: (data) => console.log("password Reset link send", data),
            },
          ];
        },
      },
    },
  },
];
