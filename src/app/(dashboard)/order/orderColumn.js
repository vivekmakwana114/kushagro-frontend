"use client";

import PopupForm from "@/components/ui/popupform";
import DetailView from "@/components/modules/DetailView";
import ViewUser from "../buyer/viewUser";

export const getOrderColumns =()=> [
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
    key: "product",
    title: "Product",
    isPrimary: true,
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
    key: "date_time",
    title: "Date",
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
    key: "amount",
    title: "Amount",
    sortable: true,
    component: {
      type: "currency",
      style: {
        color: "var(--color-dull-text)",
        fontWeight:"500",
      },
      options: {
        sign: "$",
        position: "start",
      },
    },
  },
  
    {
      key: "payment_status",
      title: "Payment",
      sortable: true,
      component: {
        type: "badge",
        style: {
          borderRadius: "0.15rem",
        },
        options: {
          value: {
            paid: "#097416", // green
            refunded: "#9CA3AF", // gray
            pending: "#FFBE00", //yellow
          },
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
            cancelled: "#BC0D10", //red
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
                  component: <DetailView config={""} />,
                },
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
                  component: <DetailView config={""} />,
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
                  component: <DetailView config={""} />,
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
                      config={""}
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
