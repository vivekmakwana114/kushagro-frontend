export const supportTicketFilterConfig = {
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
        { value: "open", label: "Open" },
        { value: "inprocess", label: "In Process" },
        { value: "resolved", label: "Resolved" },
      ],
    },
    { type: "dateRange", name: "dateRange", label: "Date Range" },
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
      className:
        "bg-[var(--color-primary1)] text-white px-4 py-2 rounded w-full",
      onClick: (data) => console.log("Applied Filters", data),
    },
  },
};

// export const supportTicketDetailsConfig = {
//   ...
// };

export const deleteSupportTicketConfig = {
  title: "",
  fields: [
    { type: "header", label: "Delete Ticket?" },
    {
      type: "subheader",
      text: "This action will permanently remove the support ticket. You won't be able to recover it later.",
    },
  ],
  footer: {
    cancel: { label: "Cancel" },
    apply: { label: "Delete Support Ticket", color: "red" },
  },
};
