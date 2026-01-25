"use client";

import ViewOrderDetails from "@/components/common/ViewOrderDetails";
import ActionPopup from "@/components/common/ActionPopup";
import InitiateRefundPopup from "@/components/common/InitiateRefundPopup";
import ViewUser from "@/app/(dashboard)/buyer/viewUser";

export const getOrderColumns = (role) => [
  {
    key: "product_order_id",
    title: "Order ID",
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
    key: "buyer",
    title: "Buyer",
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
    key: "date_time",
    title: "Order Date",
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
    key: "amount",
    title: "Amount",
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
          complete: "#2E5B20", // Green
          cancelled: "#EF4444", // Red
          // upcoming: "#6C63FF", // indigo
          ongoing: "#7D7D7D", //Gray
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
            case "ongoing":
              return [
                {
                  label: "View Order",
                  iconUrl: "/assets/icon/View.svg",
                  type: "sidebar",
                  component: (
                    <ViewOrderDetails module="seller" orderId={row._id} />
                  ),
                },
                {
                  label: "Mark As Complete",
                  iconUrl: "/assets/icon/markCompleted.svg",
                  type: "popUp",
                  component: <ViewUser />,
                },
                {
                  label: "Flag Order",
                  iconUrl: "/assets/icon/flag.svg",
                  type: "modal_component",
                  component: (
                    <ActionPopup
                      heading="Flag This Order?"
                      subHeading="Are you sure you want to flag this order for further review? Flagged Orders will be marked in the system and may require follow-up by the support or moderation team."
                      confirmText="Confirm Flag"
                      confirmColor="bg-[#2E5B20] hover:bg-[#254a1a] text-white"
                      dropdownOptions={[
                        {
                          label: "Suspicious activity",
                          value: "Suspicious activity",
                        },
                        {
                          label: "Payment discrepancy",
                          value: "Payment discrepancy",
                        },
                        { label: "Buyer complaint", value: "Buyer complaint" },
                        {
                          label: "No-show without update",
                          value: "No-show without update",
                        },
                        { label: "Stylist issue", value: "Stylist issue" },
                        { label: "Other", value: "Other" },
                      ]}
                      dropdownLabel="Select a reason for flagging this Order"
                      dropdownPlaceholder="Suspicious activity"
                      textareaLabel="Note"
                      textareaPlaceholder="Add a Note"
                    />
                  ),
                  onApply: (data) => console.log("Flag Order:", row, data),
                },
                {
                  label: "Download Invoice",
                  iconUrl: "/assets/icon/downloadGray.svg",
                  onClick: (data) => console.log("Download invoice:", data),
                },
                {
                  label: "Cancel Order",
                  iconUrl: "/assets/icon/cancel.svg",
                  type: "modal_component",
                  component: (
                    <ActionPopup
                      heading="Cancel Product Order?"
                      subHeading="Are you sure you want to cancel this order? This action will notify the Buyer and initiate a refund process if applicable. Once cancelled, this order cannot be undone."
                      confirmText="Cancel Order"
                      confirmColor="red"
                      dropdownOptions={[
                        { label: "Out of stock", value: "Out of stock" },
                        {
                          label: "Incorrect address",
                          value: "Incorrect address",
                        },
                        { label: "Payment issue", value: "Payment issue" },
                        { label: "Other", value: "Other" },
                      ]}
                      dropdownLabel="Cancellation Reason"
                      dropdownPlaceholder="Inappropriate behavior"
                      textareaLabel="Note"
                      textareaPlaceholder="Add a Note"
                    />
                  ),
                  onApply: (data) => console.log("Cancel Order:", row, data),
                },
              ];

            case "complete":
              return [
                {
                  label: "View Order",
                  iconUrl: "/assets/icon/View.svg",
                  type: "sidebar",
                  component: (
                    <ViewOrderDetails module="seller" orderId={row._id} />
                  ),
                },
                {
                  label: "Download Invoice",
                  iconUrl: "/assets/icon/downloadGray.svg",
                  onClick: (data) => console.log("Download invoice:", data),
                },
              ];

            case "cancelled":
              return [
                {
                  label: "View Order",
                  iconUrl: "/assets/icon/View.svg",
                  type: "sidebar",
                  component: (
                    <ViewOrderDetails module="seller" orderId={row._id} />
                  ),
                },
                {
                  label: "Download Invoice",
                  iconUrl: "/assets/icon/downloadGray.svg",
                  onClick: (data) => console.log("Download invoice:", data),
                },
                {
                  label: "Initiate Refund",
                  iconUrl: "/assets/icon/refund.svg",
                  type: "modal_component",
                  style: {
                    color: "#BC0D10",
                  },
                  component: <InitiateRefundPopup />,
                  onApply: (data) =>
                    console.log("Refund Initiated:", row, data),
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
