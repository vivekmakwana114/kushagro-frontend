"use client";

import { toast } from "sonner";
import ActionPopup from "@/components/common/ActionPopup";

export const listingColumns = [
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
      options: {},
    },
  },
  {
    key: "currentListings",
    title: "Current Listings",
    sortable: true,
    component: {
      type: "phone",
      style: {
        color: "var(--color-secondary1)",
        fontWeight: "500",
      },
      options: {},
    },
  },
];

export const verificationColumns = [
  {
    key: "seller",
    title: "Seller",
    sortable: true,
    component: {
      type: "phone",
      style: {
        color: "var(--color-black)",
        fontWeight: "500",
      },
      options: {},
    },
  },
  {
    key: "id",
    title: "ID",
    sortable: true,
    component: {
      type: "id_image",
      style: {
        color: "var(--color-secondary1)",
        fontWeight: "500",
      },
      options: {},
    },
  },
  {
    key: "action",
    title: "Action",
    sortable: false,
    component: {
      type: "action",
      options: {
        direct: true,
        actions: (row) => [
          {
            iconUrl: "/assets/icon/check.svg",
            className:
              "w-8 h-8 flex items-center justify-center rounded bg-[#DCFCE7] text-[#16A34A] hover:bg-[#d1fae5] transition-colors",
            onClick: () => {
              toast.success(
                `${row?.seller?.name || "Seller"} verified successfully!`
              );
            },
          },
          {
            iconUrl: "/assets/icon/cross.svg",
            className:
              "w-8 h-8 flex items-center justify-center rounded bg-[#FEE2E2] text-[#DC2626] hover:bg-[#fecaca] transition-colors",
            type: "modal_component",
            component: (
              <ActionPopup
                heading="Reject Seller Verification?"
                subHeading="The ID document submitted by this seller will be rejected. Please select a reason so the seller is informed and can upload the correct document. The seller will be notified and asked to upload a valid ID again."
                confirmText="Reject ID"
                confirmColor="red"
                dropdownLabel="Select Rejection Reason"
                dropdownPlaceholder="Select Reason"
                dropdownOptions={[
                  {
                    label: "Blurry or unclear ID photo",
                    value: "Blurry or unclear ID photo",
                  },
                  {
                    label: "ID does not match seller’s name",
                    value: "ID does not match seller’s name",
                  },
                  {
                    label: "Expired ID document",
                    value: "Expired ID document",
                  },
                  {
                    label: "Wrong document type uploaded",
                    value: "Wrong document type uploaded",
                  },
                  {
                    label: "Incomplete ID (front/back missing)",
                    value: "Incomplete ID (front/back missing)",
                  },
                  {
                    label: "Suspected tampering or invalid ID",
                    value: "Suspected tampering or invalid ID",
                  },
                  { label: "Other", value: "Other" },
                ]}
              />
            ),
            onApply: (data) => {
              console.log("Rejected", row, data);
              toast.error(`${row?.seller?.name || "Seller"} rejected.`);
            },
          },
        ],
      },
    },
  },
];
