"use client";
import ActionPopup from "@/components/common/ActionPopup";
import CategoryForm from "./CategoryForm";
import ViewUser from "../../buyer/viewUser";

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
                  label: "mark As Inactive",
                  iconUrl: "/assets/icon/markInactive.svg",
                  type: "modal_component",
                  component: (
                    <ActionPopup
                      heading="Mark As Inactive?"
                      subHeading="Are you sure you want to inactivate this listing? Once inactivated, this listing will be removed from the marketplace and will no longer be visible to buyers."
                      confirmText="Confirm Inactivation"
                      confirmColor="text-secondary1"
                    />
                  ),
                  onApply: (data) =>
                    console.log("Reactivate Buyer:", row, data),
                },
                {
                  label: "Delete",
                  iconUrl: "/assets/icon/delete.svg",
                  type: "modal_component",
                  component: (
                    <ActionPopup
                      heading="Cannot Delete Category"
                      subHeading="Cannot delete category as it's being currently active."
                      confirmText="Close"
                      confirmColor="bg-white hover:bg-[#254a1a] text-secondary1"
                      cancelText={null}
                    />
                  ),
                  onApply: (data) => {},
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
                  component: <ViewUser />,
                },
                {
                  label: "Delete",
                  iconUrl: "/assets/icon/delete.svg",
                  type: "modal_component",
                  component: (
                    <ActionPopup
                      heading="Delete?"
                      subHeading="Are you sure you want to delete this listing? Once deleted, this listing will be removed from the marketplace and will no longer be visible to buyers."
                      confirmText="Confirm Delete"
                      confirmColor="red"
                    />
                  ),
                  onApply: (data) => console.log("Delete:", row, data),
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
