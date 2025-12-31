"use client";
import ViewListingDetails from "@/components/common/ViewListingDetails";
import ViewUser from "../buyer/viewUser";
import ActionPopup from "@/components/common/ActionPopup";

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
                  iconUrl: "/assets/icon/View.svg",
                  type: "sidebar",
                  component: <ViewListingDetails data={row} onClose={() => {}} />,
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
                onApply: (data) => console.log("Reactivate Buyer:", row, data),
              },
              ];

            case "inactive":
              return [
                {
                  label: "View Listing",
                  iconUrl: "/assets/icon/View.svg",
                  type: "sidebar",
                  component:  <ViewListingDetails data={row} onClose={() => {}} />,
                },
                {
                  label: "Mark As Active",
                  iconUrl: "/assets/icon/markCompleted.svg",
                  type: "popUp",
                  component: (
                   <ViewUser/>
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
