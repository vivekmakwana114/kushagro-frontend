"use client";
import ViewListingDetails from "@/components/common/ViewListingDetails";
import ActionPopup from "@/components/common/ActionPopup";

export const getListingColumns = (handleUpdateStatus) => [
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
                  iconUrl: "/assets/icon/View.svg",
                  type: "sidebar",
                  component: <ViewListingDetails data={row} />,
                },
                {
                  label: "Mark As Inactive",
                  iconUrl: "/assets/icon/markCompleted.svg",
                  type: "modal_component",
                  component: (
                    <ActionPopup
                      heading="Mark As Inactive?"
                      subHeading="Are you sure you want to mark this listing as inactive? This action will notify the Buyer and initiate a refund process if applicable. Once cancelled, this order cannot be undone."
                      confirmText="Confirm Inactivation"
                      confirmColor="text-secondary1"
                    />
                  ),
                  onApply: () =>
                    handleUpdateStatus(row.id || row._id, "INACTIVE"),
                },
              ];

            case "inactive":
              return [
                {
                  label: "View Listing",
                  iconUrl: "/assets/icon/View.svg",
                  type: "sidebar",
                  component: <ViewListingDetails data={row} />,
                },
                {
                  label: "Mark As Active",
                  iconUrl: "/assets/icon/markCompleted.svg",
                  type: "modal_component",
                  component: (
                    <ActionPopup
                      heading="Mark As Active?"
                      subHeading="Are you sure you want to mark this listing as active? This action will notify the Buyer and initiate a refund process if applicable. Once cancelled, this order cannot be undone."
                      confirmText="Confirm Reactivation"
                      confirmColor="text-secondary1"
                    />
                  ),
                  onApply: () =>
                    handleUpdateStatus(row.id || row._id, "ACTIVE"),
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
