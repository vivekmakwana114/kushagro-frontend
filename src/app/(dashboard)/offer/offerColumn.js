"use client";
import DynamicForm from "@/components/modules/DynamicFormRendering";
import DetailView from "@/components/modules/DetailView";
import {
  editOfferConfig,
  getOfferDetailsConfig,
  markAsInactiveConfig,
} from "./offerConfig";
import PopupForm from "@/components/ui/popupform";

export const getOfferColumns = (handleDeleteOffer) => [
  {
    key: "offerName",
    title: "Offer Name",
    sortable: true,
    component: {
      type: "phone",
      style: {
        color: "var(--color-black)",
        fontWeight: "500",
      },
    },
  },

  {
    key: "couponCode",
    title: "Coupon Code",
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
    key: "discount",
    title: "Discount(%)",
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
    key: "date",
    title: "Validity",
    sortable: true,
    component: {
      type: "date",
      style: { color: "var(--color-placeholder-color)", fontWeight: "500" },

      options: {
        format: "MM dd yyyy - MM dd yyyy", // Example: Jul 15, 2025
      },
    },
  },
  {
    key: "usageStats",
    title: "Usage Stats",
    sortable: true,
    component: {
      type: "phone",
      style: {
        color: "var(--color-placeholder-color)",
        fontWeight: "500",
      },

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
        borderRadius: "4px",
        padding: "6px 10px",
      },
      options: {
        value: {
          used: "var(--color-primary1)",
          active: "#097416",
          expired: "#BC0D10",
          inactive: "#7B7B7B",
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
          if (["inactive", "used", "expired"].includes(row?.status)) {
            return [
              {
                label: "View Offer",
                iconUrl: "/assets/icon/viewCustomer.svg",
                type: "sidebar",
                component: () => (
                  <DetailView config={getOfferDetailsConfig(row)} />
                ),
              },
              {
                label: "Edit Offer",
                iconUrl: "/assets/icon/editBooking.svg",
                type: "sidebar",
                component: <DynamicForm config={editOfferConfig} />,
              },
              {
                label: "Delete Offer",
                iconUrl: "/assets/icon/cancel.svg",
                type: "button",
                onClick: (row) => handleDeleteOffer(row),
              },
            ];
          }
          return [
            {
              label: "View Offer",
              iconUrl: "/assets/icon/viewCustomer.svg",
              type: "sidebar",
              component: () => (
                <DetailView config={getOfferDetailsConfig(row)} />
              ),
            },
            {
              label: "Edit Offer",
              iconUrl: "/assets/icon/editBooking.svg",
              type: "sidebar",
              component: <DynamicForm config={editOfferConfig} />,
            },
            {
              label: "Mark as Inactive",
              iconUrl: "/assets/icon/markInactive.svg",
              type: "popUp",
              component: (
                <PopupForm
                  config={markAsInactiveConfig}
                  width="500px"
                  onApply={(data) => console.log("Marked inactive:", data)}
                />
              ),
            },
            {
              label: "Delete Offer",
              iconUrl: "/assets/icon/cancel.svg",
              type: "button",
              onClick: (row) => handleDeleteOffer(row),
            },
          ];
        },
      },
    },
  },
];
