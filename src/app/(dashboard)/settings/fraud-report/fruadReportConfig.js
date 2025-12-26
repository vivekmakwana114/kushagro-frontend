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

export const supportTicketDetailsConfig = {
  formCss: {
    maxWidth: "600px",
    width: "100%",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
  },
  title: "Support Ticket Details",
  titleCss: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "4px",
  },
  fields: [
    {
      type: "subheader",
      text: "View complete information and status of submitted query.",
      css: { marginBottom: "20px" },
    },
    { type: "divider" },
    {
      type: "keyValue",
      label: "Subject",
      value: "Not Getting Log Out",
      css: { marginBottom: "16px" },
      valueStyle: { fontWeight: "300", color: "var(--color-dull-text)" },
    },
    {
      type: "dropdown",
      label: "Status",
      name: "status",
      options: [
        { value: "open", label: "Open" },
        { value: "inprocess", label: "In Process" },
        { value: "resolved", label: "Resolved" },
      ],
      value: "open",
      css: { marginBottom: "16px" },
    },
    {
      type: "textBlock",
      label: "Description",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      css: {
        marginBottom: "16px",
        color: "var(--color-dull-text)",
        lineHeight: "1.6",
      },
      labelStyle: { fontWeight: "600", marginBottom: "8px", display: "block" },
    },
    {
      type: "image",
      src: "/assets/images/support_ticket_image.svg",
      alt: "Issue Screenshot",
      enableZoom: true,
      css: { marginBottom: "24px", justifyContent: "flex-start" },
      imageStyle: {
        maxWidth: "150px",
        borderRadius: "8px",
        cursor: "pointer",
        border: "1px solid #eee",
      },
    },
    {
      type: "sectionHeader",
      label: "Customer Details",
      css: {
        fontWeight: "300",
        fontSize: "10px",
        marginBottom: "12px",
        color: "#111",
      },
    },
    {
      type: "profileCard",
      variant: "bordered",
      name: "Jimmy Fraz",
      email: "jimmyf@gmail.com",
      avatar: "/icons/stylist photo.svg",
      phone: { label: "Phone", value: "(+81)000 0000" },
      dateInfo: { label: "Ticket Raised on", value: "22 Feb, 2024" },
      css: { marginBottom: "8px" },
    },
  ],
  footer: {
    close: {
      label: "Close",
      className:
        "w-full border border-[var(--color-primary1)] text-[var(--color-primary1)] px-4 py-2 rounded hover:bg-gray-50 transition-colors",
    },
    actions: [
      {
        label: "Update Ticket",
        onClick: (data) => console.log("Update Ticket", data),
        className:
          "w-full bg-[var(--color-primary1)] text-white px-4 py-2 rounded hover:bg-[var(--color-primary1)] transition-colors",
      },
    ],
  },
};

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
