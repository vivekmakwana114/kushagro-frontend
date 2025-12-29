

export const reactivateCustomerConfig = {
  title: "",
  fields: [
    { type: "header", label: "Reactivate Customer?" },
    {
      type: "subheader",
      text:"Are you sure you want to reactivate this Customer’s account?" ,
    },
    {
      type: "subheader",
      text:"Once reactivated, Customer will regain full access to Cut In Q," ,
    },
    {
      type: "subheader",
      text:"including Booking Bookings and making purchases." ,
    },
  ],
  footer: {
    cancel: { label: "Cancel" },
    apply: { label: "Confirm Reactivation" },
  },
};

export const suspendCustomerConfig = {
  title: "",
  fields: [
    { type: "header", label: "Suspend Customer?" },
    {
      type: "subheader",
      text: "Are you sure you want to suspend this Customer’s account? ",
    },
    {
      type: "subheader",
      text: "This will prevent Customer from Booking Bookings, placing orders,",
    },
    {
      type: "subheader",
      text: "or accessing their Cut In Q profile until reactivated.",
    },
    {
      type: "selectCheckbox",
      name: "suspend_reason",
      label: "Select Reason",
      showTextarea: true,
      textareaLabel: "Note",
      textareaName: "note",
      textareaPlaceholder: "Add note if 'Other' selected",

      options: [
        { label: "Inappropriate behavior", value: "Inappropriate  behavior" },
        { label: "Multiple no-shows", value: "Multiple no-shows" },
        { label: "Payment-related issues", value: "Payment-related issues" },
        { label: "Spam or fake account", value: "Spam or fake account" },
        { label: "Customer request", value: "Customer request" },
        {
          label: "Missing essential Customer details.",
          value: "Missing essential Customer details.",
        },
        { label: "Other", value: "Other" },
      ],
    },
  ],
  footer: {
    cancel: { label: "Cancel"},
    apply: { label: "Confirm Suspend" ,color:"red"},
  },
};

export const suspendCustomerConfigAll = {
  title: "",
  fields: [
    { type: "header", label: "Suspend Selected Customers?" },
    {
      type: "subheader",
      text: "You are about to suspend 12 Customers.",
    },
    {
      type: "subheader",
      text: " They will lose access to all app features until reactivated.",
    },
    {
      type: "subheader",
      text: "Please select a common reason for suspension.",
    },
    {
      type: "selectCheckbox",
      name: "suspend_reason",
      label: "Select Suspension Reason",
      showTextarea: true,
      textareaLabel: "Note",
      textareaName: "note",
      textareaPlaceholder: "Add note if 'Other' selected",

      options: [
        { label: "Inappropriate behavior", value: "Inappropriate  behavior" },
        { label: "Multiple no-shows", value: "Multiple no-shows" },
        { label: "Payment-related issues", value: "Payment-related issues" },
        { label: "Spam or fake account", value: "Spam or fake account" },
        { label: "Customer request", value: "Customer request" },
        {
          label: "Missing essential Customer details.",
          value: "Missing essential Customer details.",
        },
        { label: "Other", value: "Other" },
      ],
    },
  ],
  footer: {
    cancel: { label: "Cancel" },
    apply: { label: "Confirm Suspend All" , color: "red" },
  },
};
