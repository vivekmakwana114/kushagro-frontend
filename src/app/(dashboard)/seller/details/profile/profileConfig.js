export const reactivateBuyerConfig = {
  title: "",
  fields: [
    { type: "header", label: "Reactivate Buyer?" },
    {
      type: "subheader",
      text: "Are you sure you want to reactivate this Buyer’s account?",
    },
    {
      type: "subheader",
      text: "Once reactivated, Buyer will regain full access to kushagro,",
    },
    {
      type: "subheader",
      text: "including Booking appointments and making purchases.",
    },
  ],
  footer: {
    cancel: { label: "Cancel" },
    apply: { label: "Confirm Reactivation" },
  },
};

export const rejectSellerConfig = {
  title: "",
  fields: [
    { type: "header", label: "Reject Seller Verification?" },
    {
      type: "subheader",
      text: "The ID document submitted by this seller will be rejected.",
    },
    {
      type: "subheader",
      text: "Please select a reason so the seller is informed",
    },
    {
      type: "subheader",
      text: "and can upload the correct document.",
    },
    {
      type: "selectCheckbox",
      name: "reject_reason",
      label: "Select Rejection Reason",
      showTextarea: true,
      textareaLabel: "Note",
      textareaName: "note",
      textareaPlaceholder: "Add note if 'Other' selected",

      options: [
        {
          label: "Blurry or unclear ID photo",
          value: "Blurry or unclear ID photo",
        },
        {
          label: "ID does not match seller’s name",
          value: "ID does not match seller’s name",
        },
        { label: "Expired ID document", value: "Expired ID document" },
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
      ],
    },
  ],
  footer: {
    cancel: { label: "Cancel" },
    apply: { label: "Confirm Rejection", color: "red" },
  },
};
