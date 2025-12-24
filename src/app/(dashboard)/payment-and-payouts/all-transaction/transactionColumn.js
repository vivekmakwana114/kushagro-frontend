"use client";
import DetailView from "@/components/modules/DetailView";
import { transactionDetailsConfig } from "./transactionConfig";

export const transactionColumn = [
  {
    key: "id",
    title: "Transaction ID",
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
    key: "date",
    title: "Date & Time",
    sortable: true,
    component: {
      type: "date",
      style: {
        color: "var(--color-placeholder-color)",
        fontWeight: "500",
      },
      options: {
        format: "dd MM, yyyy hh:mm a", // Example: 15 Jul, 2025
      },
    },
  },
  {
    key: "user",
    title: "Customer",
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
    key: "type",
    title: "Type",
    component: {
      type: "phone",
      style: {
        color: "var(--color-placeholder-color)",
        fontWeight: "500",
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
    key: "amount",
    title: "Amount",
    sortable: true,
    component: {
      type: "currency",
      style: {
        color: "var(--color-primary1)",
        fontWeight: "500",
      },
      sign: "+$",
      position: "start",
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
          paid: "#16A34A", // green
          inprocess: "#F59E0B", // yellow
          // failed: "#DC2626", // red
        },
      },
    },
  },
  {
    key: "actions",
    title: "Action",
    component: {
      type: "action",
      style: {},
      options: {
        actions: (row) => {
          return [
            {
              label: "View Details",
              iconUrl: "/assets/icon/ViewCustomer.svg",
              type: "sidebar",
              component: <DetailView config={transactionDetailsConfig} />,
            },
            {
              label: "Download Invoice",
              iconUrl: "/assets/icon/downloadGray.svg",
              onClick: (data) => console.log("Download Invoice", data),
            },
          ];
        },
      },
    },
  },
];
