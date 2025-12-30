"use client";
import DetailView from "@/components/modules/DetailView";
import ViewTransactionDetails from "@/components/common/ViewTransactionDetails";
import { transactionDetailsConfig } from "./transactionConfig";
import PopupForm from "@/components/ui/popupform";
import ViewUser from "../../buyer/viewUser";

export const transactionColumn = [
  {
    key: "transaction_id",
    title: "Transaction ID",
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
    key: "date",
    title: "Date",
    sortable: true,
    component: {
      type: "date",
      style: {
        color: "var(--color-dull-text)",
        fontWeight: "500",
      },
      options: {
        format: "dd MM, yyyy", // Example: 15 Jul, 2025
      },
    },
  },
  {
    key: "buyer",
    title: "Buyer",
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
    key: "seller",
    title: "Seller",
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
    key: "amount",
    title: "Amount",
    sortable: true,
    component: {
      type: "currency",
      style: {
        color: "var(--color-dull-text)",
        fontWeight: "500",
      },
      sign: "+$",
      position: "start",
    },
  },
  {
    key: "method",
    title: "Method",
    component: {
      type: "phone",
      style: {
        color: "var(--color-secondary1)",
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
          paid: "#16A34A", // green
          inprocess: "#F59E0B", // yellow
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
              component: <ViewTransactionDetails />,
            },
            {
              label: "Download Invoice",
              iconUrl: "/assets/icon/downloadGray.svg",
              onClick: (data) => console.log("Download Invoice", data),
            },
            {
              label: "Mark As Paid",
              iconUrl: "/assets/icon/markInactive.svg",
              type: "popUp",
              component: <ViewUser />,
            },
          ];
        },
      },
    },
  },
];
