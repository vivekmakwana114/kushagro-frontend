"use client";
import ActionPopup from "@/components/common/ActionPopup";

export const getSellerColumns = ({
  onSuspend,
  onReset,
  onVerify,
  onReactivate,
}) => [
  {
    key: "seller",
    title: "Sellers",
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
    key: "phone",
    title: "Phone",
    sortable: true,
    component: {
      type: "phone",
      style: {
        color: "var(--color-secondary1)",
        fontWeight: "500",
      },
    },
  },
  {
    key: "createdAt",
    title: "Joined On",
    sortable: true,
    component: {
      type: "date",
      options: {
        format: "M d yyyy",
      },
      style: {
        color: "var(--color-dull-text)",
        fontWeight: "500",
      },
    },
  },
  {
    key: "totalListings",
    title: "Total Listings",
    sortable: true,
    component: {
      type: "phone",
      style: {
        color: "var(--color-dull-text)",
        fontWeight: "500",
      },
    },
  },
  {
    key: "totalOrders",
    title: "Total Orders",
    sortable: true,
    component: {
      type: "phone",
      style: {
        color: "var(--color-dull-text)",
        fontWeight: "500",
      },
    },
  },

  {
    key: "earnings",
    title: "Earning",
    sortable: true,
    component: {
      type: "currency",
      style: {},
      sign: "$",
      position: "start",
      style: {
        color: "var(--color-dull-text)",
        fontWeight: "500",
      },
    },
  },

  {
    key: "idStatus",
    title: "ID Status",
    sortable: true,
    component: {
      type: "badge",
      style: {
        borderRadius: "3.15px",
        padding: "8px 12px",
      },
      options: {
        value: {
          verified: "#097416", // green
          pending: "#FFBE00", // yellow
          rejected: "#BC0D10", //red
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
        borderRadius: "3.15px",
        padding: "8px 12px",
      },
      options: {
        value: {
          active: "#097416", // green
          inactive: "#9CA3AF", // gray
          suspended: "#BC0D10", //red
        },
      },
    },
  },
  {
    key: "actions",
    title: "Actions",
    sortable: false,
    component: {
      type: "action",
      style: {},
      options: {
        actions: (row) => {
          switch (row.status) {
            case "Active":
              return [
                {
                  label: "View Seller",
                  iconUrl: "/assets/icon/View.svg",
                  type: "navigate",
                  url: `/seller/details/profile?id=${row._id}`,
                },
                {
                  label: "Suspend Seller",
                  iconUrl: "/assets/icon/suspendCustomer.svg",
                  type: "modal_component",
                  component: (
                    <ActionPopup
                      heading="Suspend Seller?"
                      subHeading="Are you sure you want to suspend this Seller’s account? This will prevent Seller from placing orders, or accessing their profile until reactivated."
                      confirmText="Confirm Suspend"
                      confirmColor="red"
                      dropdownOptions={[
                        {
                          label: "Inappropriate behavior",
                          value: "Inappropriate behavior",
                        },
                        {
                          label: "Multiple no-shows",
                          value: "Multiple no-shows",
                        },
                        {
                          label: "Payment-related issues",
                          value: "Payment-related issues",
                        },
                        {
                          label: "Spam or fake account",
                          value: "Spam or fake account",
                        },
                        { label: "Buyer request", value: "Buyer request" },
                        {
                          label: "Missing essential Buyer details.",
                          value: "Missing essential Buyer details.",
                        },
                        { label: "Other", value: "Other" },
                      ]}
                      dropdownLabel="Select Suspension Reason"
                      dropdownPlaceholder="Select Suspension Reason"
                      textareaLabel="Note"
                      textareaPlaceholder="Add a Note"
                    />
                  ),
                  onApply: (data) => onSuspend(row, data),
                },
                {
                  label: "Mark as Verified ID",
                  iconUrl: "/assets/icon/markCompleted.svg",
                  onClick: () => onVerify(row, "APPROVED"),
                },
                {
                  label: "Mark as Rejected ID",
                  iconUrl: "/assets/icon/markInactive.svg",
                  onClick: () => onVerify(row, "REJECTED"),
                },

                {
                  label: "Share Reset Password Link",
                  iconUrl: "/assets/icon/lock.svg",
                  onClick: (data) => onReset(row),
                },
              ];

            case "Inactive":
              return [
                {
                  label: "View Seller",
                  iconUrl: "/assets/icon/View.svg",
                  type: "navigate",
                  url: `/seller/details/profile?id=${row._id}`,
                },
                {
                  label: "Mark as Active",
                  iconUrl: "/assets/icon/reactivateCustomer.svg",
                  onClick: () => onVerify(row, "APPROVED"),
                },
                {
                  label: "Delete Seller",
                  iconUrl: "/assets/icon/deleteBarbershop.svg",
                  onClick: () => onDelete(row),
                },
              ];

            case "Suspended":
              return [
                {
                  label: "View Seller",
                  iconUrl: "/assets/icon/View.svg",
                  type: "navigate",
                  url: `/seller/details/profile?id=${row._id}`,
                },

                {
                  label: "Reactivate Seller",
                  iconUrl: "/assets/icon/reactivateCustomer.svg",
                  type: "modal_component",
                  component: (
                    <ActionPopup
                      heading="Reactivate Seller?"
                      subHeading="Are you sure you want to reactivate this Seller’s account? Once reactivated, Seller will regain full access to Ksa, including booking appointments and making purchases."
                      confirmText="Confirm Reactivation"
                      confirmColor="text-secondary1"
                    />
                  ),
                  onApply: (data) => onReactivate(row),
                },
              ];

            default:
              return [
                {
                  label: "View Seller",
                  iconUrl: "/assets/icon/View.svg",
                  type: "navigate",
                  url: `/seller/details/profile?id=${row._id}`,
                },
              ];
          }
        },
      },
    },
  },
];
