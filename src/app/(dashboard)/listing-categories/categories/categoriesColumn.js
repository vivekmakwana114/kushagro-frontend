"use client";
import CategoryForm from "./CategoryForm";
import {
  deleteConfig,
  markAsActiveConfig,
  markAsInactiveConfig,
} from "./categoriesConfig";
import PopupForm from "@/components/ui/popupform";

export const getCategoriesColumns = (handleDeleteOffer) => [
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
    },
  },

  {
    key: "created_on",
    title: "Created On",
    sortable: true,
    component: {
      type: "date",
      style: { color: "var(--color-dull-text)", fontWeight: "500" },

      options: {
        format: "dd MM, yyyy", // Example: Jul 15, 2025
      },
    },
  },
  {
    key: "total_listing",
    title: "Total Listings",
    sortable: true,
    component: {
      type: "phone",
      style: {
        color: "var(--color-black)",
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
          active: "#097416",
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
      style: {},
      options: {
        actions: (row) => {
          switch (row.status) {
            case "active":
              return [
                {
                  label: "Edit Category",
                  iconUrl: "/assets/icon/viewCustomer.svg",
                  type: "sidebar",
                  component: <CategoryForm data={row} />,
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
                {
                  label: "Delete",
                  iconUrl: "/assets/icon/delete.svg",
                  type: "popUp",
                  component: (
                    <PopupForm
                      config={deleteConfig}
                      width="500px"
                      onApply={(data) => console.log("Marked as active:", data)}
                    />
                  ),
                },
              ];

            case "inactive":
              return [
                {
                  label: "Edit Category",
                  iconUrl: "/assets/icon/viewCustomer.svg",
                  type: "sidebar",
                  component: <CategoryForm data={row} />,
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
                {
                  label: "Delete",
                  iconUrl: "/assets/icon/delete.svg",
                  type: "popUp",
                  style: {
                    color: "var(--color-red)",
                  },
                  component: (
                    <PopupForm
                      config={deleteConfig}
                      width="500px"
                      onApply={(data) => console.log("deleted:", data)}
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
