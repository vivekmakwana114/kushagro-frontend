"use client";
import DetailView from "@/components/modules/DetailView";
import {
  markAsActiveConfig,
  markAsInactiveConfig,
} from "./listingConfig";
import PopupForm from "@/components/ui/popupform";

export const getListingColumns = () => [
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
    key: "created_on",
    title: "Created On",
    sortable: true,
    component: {
      type: "date",
      options: {
        format: "dd MM, yyyy",
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
        borderRadius: "3.15px",
        padding: "8px 12px",
      },
      options: {
        value: {
          active: "#2E5B20", // Green
          inactive: "#7D7D7D", //Gray
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
                  component: <DetailView config={""} />,
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
                  component: <DetailView config={""} />,
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
