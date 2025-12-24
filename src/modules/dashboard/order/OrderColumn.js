"use client";

export const orderColumns = [
  {
    key: "orderId",
    title: "Order ID",
    sortable: true,
    component: {
      type: "phone",
      style: {
        color: "var(--color-secondary1)",
        fontWeight: "500",
      },
      options: {},
    },
  },
  {
    key: "buyer",
    title: "Buyer",
    isPrimary: true,
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
    key: "seller",
    title: "Seller",
    isPrimary: true,
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
    key: "amount",
    title: "Amount",
    sortable: true,
    component: {
      type: "currency",
      style: {
        color: "var(--color-placeholder-color)",
        fontWeight:"500",
      },
      options: {
        sign: "$",
        position: "start",
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
        color: "var(--color-placeholder-color)",
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
        borderRadius: "0.15rem",
      },
      options: {
        value: {
          complete: "#097416", // green
          ongoing: "#9CA3AF", // gray
          // suspended: "#BC0D10", //red
        },
      },
    },
  },
];

export const paymentColumns = [
  {
    key: "transactionId",
    title: "Transaction ID",
    sortable: true,
    component: {
      type: "phone",
      style: {
        color: "var(--color-secondary1)",
        fontWeight: "500",
      },
      options: {},
    },
  },
   {
    key: "seller",
    title: "Seller",
    isPrimary: true,
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
    key: "method",
    title: "Method",
    sortable: true,
    component: {
      type: "phone",
      style: {
        color: "var(--color-placeholder-color)",
        fontWeight:"500",
      },
      options: {},
    },
  },
  {
    key: "amount",
    title: "Amount",
    sortable: true,
    component: {
      type: "currency",
      style: {
        color: "var(--color-placeholder-color)",
        fontWeight:"500",
      },
      options: {
        sign: "$",
        position: "start",
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
        color: "var(--color-placeholder-color)",
        fontWeight:"500",
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
        borderRadius: "0.15rem",
      },
      options: {
        value: {
          success: "#097416", // green
          pending: "#FFBE00", // gray
          failed: "#BC0D10", //red
        },
      },
    },
  },
]
