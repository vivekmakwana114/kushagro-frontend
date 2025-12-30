"use client";
import DynamicForm from "@/components/modules/DynamicFormRendering";
import DetailView from "@/components/modules/DetailView";
import {
  editOfferConfig,
  getOfferDetailsConfig,
  markAsActiveConfig,
  markAsInactiveConfig,
} from "./listingConfig";
import PopupForm from "@/components/ui/popupform";
import ViewListingDetails from "@/components/common/ViewListingDetails";

export const getOfferColumns = (handleDeleteOffer) => [
  {
    key: "product",
    title: "Product",
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
    key: "seller",
    title: "Seller",
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
    key: "created_on",
    title: "created_on",
    sortable: true,
    component: {
      type: "date",
      options: {
        format: "dd MM yyyy",
      },
      style: {
        color: "var(--color-dull-text)",
        fontWeight: "500",
      },
    },
  },
  {
    key: "price",
    title: "Price",
    sortable: true,
    component: {
      type: "currency",
      sign: "$",
      position: "start",
      style: {
        color: "var(--color-black)",
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
        borderRadius: "4px",
        padding: "6px 10px",
      },
      options: {
        value: {
          active: "#097416", // green
          inactive: "#7B7B7B", // grey
        },
      },
    },
  },
  {
    key: "actions",
    title: "Actions",
    component: {
      type: "action",
      style: {},
      options: {
        actions: (row) => {
          switch (row.status) {
            case "active":
              return [
                {
                  label: "View Listing",
                  iconUrl: "/assets/icon/viewCustomer.svg",
                  type: "sidebar",
                  component: <ViewListingDetails data={row} onClose={() => {}} />,
                },
                {
                  label: "Mark As InActive",
                  iconUrl: "/assets/icon/markInactive.svg",
                  type: "popUp",
                  component: (
                    <PopupForm
                      config={markAsInactiveConfig}
                      width="500px"
                      onApply={(data) => console.log("Marked as active:", data)}
                    />
                  ),
                },
              ];

            case "inactive":
              return [
                {
                  label: "View Listing",
                  iconUrl: "/assets/icon/viewCustomer.svg",
                  type: "sidebar",
                  component:  <ViewListingDetails data={row} onClose={() => {}} />,
                },
                {
                  label: "Mark As Active",
                  iconUrl: "/assets/icon/markCompleted.svg",
                  type: "popUp",
                  component: (
                    <PopupForm
                      config={markAsActiveConfig}
                      width="500px"
                      onApply={(data) => console.log("Marked as active:", data)}
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
