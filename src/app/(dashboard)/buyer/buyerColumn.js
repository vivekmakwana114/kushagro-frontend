import ActionPopup from "@/components/common/ActionPopup";

export const getBuyerColumns = (
  handleSuspend,
  handleReactivate,
  handleResetLink,
) => [
  {
    key: "buyer",
    title: "Buyers",
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
    key: "joined_on",
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
    key: "total_order",
    title: "Total Order",
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
    key: "total_spent",
    title: "Total Spent",
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
          active: "#097416",
          suspended: "#BC0D10",
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
          if (row.status === "suspended") {
            return [
              {
                label: "View Buyer",
                iconUrl: "/assets/icon/View.svg",
                type: "navigate",
                url: `/buyer/details/overview/?id=${row._id || row.id}`,
              },
              {
                label: "Reactivate Buyer",
                iconUrl: "/assets/icon/reactivateCustomer.svg",
                type: "modal_component",
                component: (
                  <ActionPopup
                    heading="Reactivate Buyer?"
                    subHeading="Are you sure you want to reactivate this Buyer’s account? Once reactivated, Buyer will regain full access to Ksa, including booking appointments and making purchases."
                    confirmText="Confirm Reactivation"
                    confirmColor="text-secondary1"
                  />
                ),
                onApply: (data) => {
                  if (handleReactivate) handleReactivate(row, data);
                },
              },
            ];
          }

          return [
            {
              label: "View Buyer",
              iconUrl: "/assets/icon/View.svg",
              type: "navigate",
              url: `/buyer/details/overview?id=${row._id || row.id}`,
            },
            {
              label: "Suspend Buyer",
              iconUrl: "/assets/icon/suspendCustomer.svg",
              type: "modal_component",
              component: (
                <ActionPopup
                  heading="Suspend Buyer?"
                  subHeading="Are you sure you want to suspend this Buyer’s account? This will prevent Buyer from placing orders, or accessing their profile until reactivated."
                  confirmText="Confirm Suspend"
                  confirmColor="red"
                  dropdownOptions={[
                    {
                      label: "Inappropriate behavior",
                      value: "Inappropriate behavior",
                    },
                    { label: "Multiple no-shows", value: "Multiple no-shows" },
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
              onApply: (data) => {
                if (handleSuspend) handleSuspend(row, data);
              },
            },
            {
              label: "Share Reset Password Link",
              iconUrl: "/assets/icon/lock.svg",
              onClick: () => {
                if (handleResetLink) handleResetLink(row);
                console.log("password Reset link send", row);
              },
            },
          ];
        },
      },
    },
  },
];
