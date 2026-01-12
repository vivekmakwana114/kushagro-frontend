"use client";
import ActionPopup from "@/components/common/ActionPopup";
import CategoryForm from "./CategoryForm";

export const getCategoriesColumns = ({ onEdit, onDelete, onStatusChange }) => [
  {
    key: "name",
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
    key: "createdAt",
    title: "Created On",
    sortable: true,
    component: {
      type: "date",
      style: { color: "var(--color-dull-text)", fontWeight: "500" },

      options: {
        format: "dd MM, yyyy",
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
          const isActive = row.status?.toLowerCase() === "active";

          return [
            {
              label: "Edit Category",
              iconUrl: "/assets/icon/editBooking.svg",
              type: "sidebar",
              component: (
                <CategoryForm
                  data={row}
                  onSubmit={(formData) => onEdit(row._id || row.id, formData)}
                />
              ),
            },
            {
              label: isActive ? "Mark As Inactive" : "Mark As Active",
              iconUrl: isActive
                ? "/assets/icon/markInactive.svg"
                : "/assets/icon/markCompleted.svg",
              type: "modal_component",
              component: (
                <ActionPopup
                  heading={isActive ? "Mark As Inactive?" : "Mark As Active?"}
                  subHeading={
                    isActive
                      ? "Are you sure you want to inactivate this category? It will be hidden from the marketplace."
                      : "Are you sure you want to activate this category? It will be visible in the marketplace."
                  }
                  confirmText={
                    isActive ? "Confirm Inactivation" : "Confirm Activation"
                  }
                  confirmColor="text-secondary1"
                />
              ),
              onApply: () =>
                onStatusChange(
                  row._id || row.id,
                  isActive ? "INACTIVE" : "ACTIVE"
                ),
            },
            {
              label: "Delete",
              iconUrl: "/assets/icon/delete.svg",
              type: "modal_component",
              component: isActive ? (
                <ActionPopup
                  heading="Cannot Delete Category"
                  subHeading="This category is active and has listed products. Please mark it as inactive before deleting."
                  confirmText="Okay"
                  confirmColor="text-secondary1"
                  showCancel={false}
                />
              ) : (
                <ActionPopup
                  heading="Delete Category?"
                  subHeading="Are you sure you want to delete this category? This action cannot be undone."
                  confirmText="Delete"
                  confirmColor="red"
                />
              ),
              onApply: () => {
                if (isActive) {
                  return;
                }
                onDelete(row._id || row.id);
              },
            },
          ];
        },
      },
    },
  },
];
