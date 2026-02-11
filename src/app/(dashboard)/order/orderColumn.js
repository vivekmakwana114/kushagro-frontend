"use client";

import PopupForm from "@/components/ui/popupform";
import ViewOrderDetails from "@/components/common/ViewOrderDetails";
import ViewUser from "../buyer/viewUser";
import ActionPopup from "@/components/common/ActionPopup";
import InitiateRefundPopup from "@/components/common/InitiateRefundPopup";
import { toast } from "sonner";
import Image from "next/image";

export const getOrderColumns = ({
  onFlag,
  onCancel,
  onRefund,
  onMarkComplete,
  onDownloadInvoice,
}) => [
  {
    key: "orderId",
    title: "Order ID",
    isPrimary: true,
    sortable: true,
    component: {
      style: {
        text: "text-secondary1 font-semibold text-xs sm:text-sm",
      },
    },
    // val is the primitive order id, row gives us isFlagged boolean
    render: (val, row) => {
      const displayValue =
        val !== undefined && val !== null ? String(val) : "N/A";

      console.log(row, "row");

      return (
        <div className="flex items-center gap-2">
          <span>{displayValue}</span>
          {row?.isFlagged && (
            <Image
              src="/assets/icon/flag_red.svg"
              alt="Flagged"
              width={16}
              height={16}
            />
          )}
        </div>
      );
    },
  },
  {
    key: "product",
    title: "Product",
    isPrimary: true,
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
    isPrimary: true,
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
    key: "seller",
    title: "Seller",
    isPrimary: true,
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
    title: "Date",
    sortable: true,
    component: {
      type: "date",
      style: {
        color: "var(--color-dull-text)",
        fontWeight: "500",
      },
      options: {
        format: "dd MM, yyyy",
      },
    },
  },
  {
    key: "amount",
    title: "Amount",
    sortable: true,
    component: {
      type: "currency",
      style: {
        color: "var(--color-dull-text)",
        fontWeight: "500",
      },
      options: {
        sign: "$",
        position: "start",
      },
    },
  },

  {
    key: "payment_status",
    title: "Payment",
    sortable: true,
    component: {
      type: "badge",
      style: {
        borderRadius: "0.15rem",
      },
      options: {
        value: {
          paid: "#097416", // green
          refunded: "#9CA3AF", // gray
          pending: "#FFBE00", //yellow
          processing: "#2563EB", // blue
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
        borderRadius: "0.15rem",
      },
      options: {
        value: {
          complete: "#097416", // green
          ongoing: "#9CA3AF", // gray
          cancelled: "#BC0D10", //red
        },
      },
    },
  },

  {
    key: "actions",
    title: "Actions",
    component: {
      type: "action",
      options: {
        actions: (row) => {
          // Logic for Cancel Ability
          const canCancel =
            row.payment_status === "pending" && row.status === "ongoing";

          switch (row.status) {
            case "ongoing":
              return [
                {
                  label: "View Order",
                  iconUrl: "/assets/icon/View.svg",
                  type: "sidebar",
                  component: (
                    <ViewOrderDetails module="order" orderId={row._id} />
                  ),
                },
                // {
                //   label: "Mark As Complete",
                //   iconUrl: "/assets/icon/markCompleted.svg",
                //   onClick: () => {
                //     if (row.payment_status === "paid") {
                //       onMarkComplete && onMarkComplete(row);
                //     } else {
                //       toast.error(
                //         "Payment pending. Cannot mark order as complete.",
                //       );
                //     }
                //   },
                // },
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
                        {
                          label: "Buyer complaint",
                          value: "Buyer complaint",
                        },
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
                  onApply: (data) => onFlag && onFlag(row, data),
                },
                {
                  label: "Download Invoice",
                  iconUrl: "/assets/icon/downloadGray.svg",
                  onClick: () => onDownloadInvoice && onDownloadInvoice(row),
                },
                canCancel
                  ? {
                      label: "Cancel Order",
                      iconUrl: "/assets/icon/cancel.svg",
                      type: "modal_component",
                      component: (
                        <ActionPopup
                          heading="Cancel Product Order?"
                          subHeading="Are you sure you want to cancel this order? This action will notify the Buyer. Once cancelled, this order cannot be undone."
                          confirmText="Cancel Order"
                          confirmColor="red"
                          dropdownOptions={[
                            { label: "Out of stock", value: "Out of stock" },
                            {
                              label: "Incorrect address",
                              value: "Incorrect address",
                            },
                            {
                              label: "Payment issue",
                              value: "Payment issue",
                            },
                            { label: "Other", value: "Other" },
                          ]}
                          dropdownLabel="Cancellation Reason"
                          dropdownPlaceholder="Inappropriate behavior"
                          textareaLabel="Note"
                          textareaPlaceholder="Add a Note"
                        />
                      ),
                      onApply: (data) => onCancel && onCancel(row, data),
                    }
                  : {
                      label: "Cancel Order",
                      iconUrl: "/assets/icon/cancel.svg",
                      onClick: () =>
                        toast.error(
                          "Cannot cancel order as the order is already completed",
                        ),
                    },
              ];

            case "complete":
              return [
                {
                  label: "View Order",
                  iconUrl: "/assets/icon/View.svg",
                  type: "sidebar",
                  component: (
                    <ViewOrderDetails module="order" orderId={row._id} />
                  ),
                },
                {
                  label: "Download Invoice",
                  iconUrl: "/assets/icon/downloadGray.svg",
                  onClick: () => onDownloadInvoice && onDownloadInvoice(row),
                },
              ];

            case "cancelled":
              return [
                {
                  label: "View Order",
                  iconUrl: "/assets/icon/View.svg",
                  type: "sidebar",
                  component: (
                    <ViewOrderDetails module="order" orderId={row._id} />
                  ),
                },
                {
                  label: "Download Invoice",
                  iconUrl: "/assets/icon/downloadGray.svg",
                  onClick: () => onDownloadInvoice && onDownloadInvoice(row),
                },
                // {
                //   label: "Initiate Refund",
                //   iconUrl: "/assets/icon/refund.svg",
                //   type: "modal_component",
                //   style: {
                //     color: "#BC0D10",
                //   },
                //   component: <InitiateRefundPopup />,
                //   onApply: (data) => onRefund && onRefund(row, data),
                // }
                /*
                row.payment_status === "paid"
                  ? {
                      label: "Initiate Refund",
                      iconUrl: "/assets/icon/refund.svg",
                      type: "modal_component",
                      style: {
                        color: "#BC0D10",
                      },
                      component: <InitiateRefundPopup />,
                      onApply: (data) => onRefund && onRefund(row, data),
                    }
                  : {
                      label: "Initiate Refund",
                      iconUrl: "/assets/icon/refund.svg",
                      style: {
                        color: "#BC0D10",
                        opacity: 0.5,
                        cursor: "not-allowed",
                      },
                      onClick: () => {
                        if (row.payment_status === "processing") {
                          toast.info("Refund is already being processed.");
                        } else if (row.payment_status === "refunded") {
                          toast.info("Order is already refunded.");
                        } else {
                          toast.error(
                            "Payment pending, cannot initiate refund.",
                          );
                        }
                      },
                    },
                  */
              ];

            default:
              return [];
          }
        },
      },
    },
  },
];
