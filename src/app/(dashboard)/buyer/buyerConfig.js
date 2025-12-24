export const customerFilterConfig = {
  formCss: {
    maxWidth: "500px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
  },
  fields: [
    { type: "header", label: "Advanced Filters" },
    {
      type: "subheader",
      text: "Refine your search results using custom criteria across modules.",
    },
    { type: "divider" },
    { type: "filterBy", text: "Filter By:" },

    {
      type: "checkboxGroup",
      name: "status",
      label: "Status",
      options: [
        { value: "all", label: "All" },
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
        { value: "suspend", label: "Suspended" },
      ],
    },
    {
      type: "checkboxGroup",
      name: "clientType",
      label: "Client Type",
      options: [
        { value: "all", label: "All" },
        { value: "client", label: "Client" },
        { value: "customer", label: "Customer" },
      ],
    },
    { type: "dateRange", name: "joinedDate", label: "Join Date" },
    { type: "numberRange", name: "spendAmount", label: "Spent Amount" },
  ],
  footer: {
    cancel: {
      label: "Cancel",
      className:
        "w-full border border-[var(--color-primary1)] text-[var(--color-primary1)] px-4 py-2 rounded",
      onClick: () => console.log("Cancelled"),
    },
    apply: {
      label: "Apply Filters",
      className: "bg-[var(--color-primary1)] text-white px-4 py-2 rounded w-full",
      onClick: (data) => console.log("Applied Filters", data),
    },
  },
};

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
