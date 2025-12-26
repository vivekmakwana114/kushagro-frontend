export const transactionFilterConfig = {
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
      label: " Transaction Status",
      options: [
        { value: "all", label: "All" },
        { value: "paid", label: "Paid" },
        { value: "inprocess", label: "In-Process" },
        // { value: "failed", label: "Failed" },
      ],
    },
    { type: "dateRange", name: "joinedDate", label: "Date Range" },
    { type: "numberRange", name: "spendAmount", label: "Amount Range" },
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


export const transactionDetailsConfig = {
  formCss: {
    maxWidth: "600px",
    width: "100%",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
  },

  fields: [
    {
      type: "header",
      label: "Transaction Details",
      css: { fontSize: "18px", fontWeight: "bold", marginBottom: "8px" },
    },
    {
      type: "subheader",
      text: "Explore detailed information regarding this transaction.",
      css: { color: "#6B7280", fontSize: "14px", marginBottom: "20px" },
    },

    {
      type: "infoGrid",
      name: "transaction_summary",
      columns: 2,
      items: [
        {
          label: "Transaction ID",
          value: "#TRN2316510365165",
          valueStyle: { color: "var(--color-primary1)" },
        },
        {
          label: "Customer",
          value: "Paul Manson",
          valueStyle: { color: "var(--color-primary1)" },
        },
        { label: "Date & Time", value: "15 Jul, 2025 2:00 PM" , valueStyle: { color: "var(--color-black)" },},
        { label: "Transaction Type", value: "Booking Payment", valueStyle: { color: "var(--color-black)" }, },
        {
          label: "Booking ID",
          value: "#CIQ10231024561A5258",
          valueStyle: { color: "var(--color-primary1)" },
        },
       {
          label: "Payment Method",
          value: "Stripe",
          valueStyle: { color: "var(--color-primary1)" },
        },
        {
          label: "Transaction Amount",
          value: "$160.00",
          valueStyle: { color: "var(--color-black)" },
        },
        {
          label: "Status",
          value: "Completed",
          valueStyle: { color: "var(--color-primary1)" },
        },
      ],
    },
  ],
};

export const markAsInactiveConfig = {
  title: "",
  fields: [
    { type: "header", label: "Mark listing as Inactive?" },
    {
      type: "subheader",
      text: "You are about to mark this listing as inactive.",
    },
    {
      type: "subheader",
      text: "Once inactive, this listing will not appear in the mobile app for customers to book services",
    },
    {
      type: "subheader",
      text: "Existing Bookings will remain unaffected",
    },
  ],
  footer: {
    cancel: { label: "Cancel" },
    apply: { label: "Confirm Inactivation", color: "red" },
  },
};
