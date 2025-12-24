"use client";
import PopupForm from "@/components/ui/popupform";
import { rejectSellerConfig } from "./listingConfig";
export const listingColumns = [
  {
    key: "category",
    title: "Category",
    sortable: true,
    component: {
      type: "phone",
      style: {
        color: "var(--color-black)",
        fontWeight: "500",
      },
      options: {},
    },
  },
  {
    key: "currentListings",
    title: "Current Listings",
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
];

export const verificationColumns = [
  {
    key: "seller",
    title: "Seller",
    sortable: true,
    component: {
      type: "phone",
      style: {
        color: "var(--color-black)",
        fontWeight: "500",
      },
      options: {},
    },
  },
  {
    key: "id",
    title: "ID",
    sortable: true,
    component: {
      type: "id_image",
      style: {
        color: "var(--color-secondary1)",
        fontWeight: "500",
      },
      options: {},
    },
  },
  {
    key: "action",
    title: "Action",
    sortable: false,
    component: {
      type: "verification_action",
      props: {
        rejectConfig: rejectSellerConfig,
        PopupComponent: PopupForm,
        onReject: (row) => console.log("Rejected", row),
      },
    },
  },
];
