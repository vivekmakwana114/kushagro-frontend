export const bookingDetailsConfig = {
  formCss: {
    maxWidth: "600px",
    width: "100%",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
  },

  fields: [
    {
      type: "header",
      label: "Booking Details",
      css: { fontSize: "18px", fontWeight: "bold", marginBottom: "8px" },
    },
    {
      type: "subheader",
      text: "Review booking information with accuracy and ease.",
      css: {
        color: "var(--color-dull-text)",
        fontSize: "14px",
        marginBottom: "20px",
      },
    },

    // Order Summary Section
    {
      type: "sectionHeader",
      label: "Booking Summary",
      css: { fontWeight: "600", fontSize: "16px", marginBottom: "12px" },
    },
    {
      type: "infoGrid",
      name: "booking_summary",
      columns: 2,
      items: [
        {
          label: "Booking ID",
          value: "#CIQ10231024561A5258",
          valueStyle: { color: "var(--color-primary1)" },
        },
        { label: "Date & Time", value: "15 Jul, 2025 2:00 PM" },
        { label: "Services", value: "Hair Loc#111" },
        { label: "Booked On", value: "10 Jul,2025" },
        { label: "Stylist", value: "Aaliyah Johnson" },
        {
          label: "Status",
          value: "Completed",
          valueStyle: { color: "var(--color-primary1)" },
        },
      ],
    },

    {
      type: "sectionHeader",
      label: "Payment Details",
      css: { fontWeight: "600", fontSize: "16px", marginBottom: "12px" },
    },
    {
      type: "infoGrid",
      name: "payment_summary",
      columns: 2,
      items: [
        {
          label: "Amount Paid",
          value: "$160.00",
          valueStyle: { color: "var(--color-black)" },
        },
        {
          label: "Status",
          value: "Paid",
          valueStyle: { color: "var(--color-primary1)" },
        },
      ],
    },

    // Invoice Details
    {
      type: "sectionHeader",
      label: "Invoice Details",
      css: {
        fontWeight: "600",
        fontSize: "16px",
        marginTop: "24px",
        marginBottom: "12px",
      },
      action: {
        icon: "download",
        color: "var(--color-primary1)",
        title: "Download Invoice",
        onClick: () => console.log("Downloading invoice..."),
      },
    },
    {
      type: "invoiceSummary",
      name: "invoice",
      invoiceId: "#CIQ10231024561A5258",
      items: [
        { label: "Service Charges", value: "$120.00" },
        { label: "Platform Fee", value: "$2.00" },
        { label: "Total", value: "$1602.00" },
        {
          label: "Coupon Code Discount",
          value: "- $2.00",
          color: "var(--color-red)",
        },
        {
          label: "Total Payable Amount",
          value: "$1600.00",
          bold: true,
          valueStyle: { color: "#000000" },
        },
      ],
    },
  ],
};

export const bookingFilterConfig = {
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
        { value: "upcoming", label: "Upcoming" },
        { value: "cancelled", label: "Cancelled" },
        { value: "completed", label: "Completed" },
      ],
    },
    { type: "dateRange", name: "DateRange", label: "Date Range" },
    { type: "numberRange", name: "AmountRange", label: "Amount Range" },

    {
      type: "timeRange",
      name: "timeRange",
      label: "Time Range",
    },

    {
      type: "selectCheckbox",
      name: "stylist",
      label: "Select Barber",
      options: [
        { value: "AaliyahJohnson", label: "Aaliyah Johnson" },
        { value: "BennyCarter", label: "Benny Carter" },
        { value: "ChloeKim", label: "Chloe Kim" },
        { value: "DavidLee", label: "David Lee" },
        { value: "EvaMartinez", label: "Eva Martinez" },
      ],
    },
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

export const editBookingConfig = {
  formCss: {
    maxWidth: "500px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
  },
  fields: [
    { type: "header", label: "Edit Booking" },
    {
      type: "subheader",
      text: "Update booking details to reflect the latest information.",
    },
    { type: "divider" },
    { type: "Booking ID", text: "Booking ID" },

    {
      type: "date",
      name: "booking_date",
      label: "Booking Date",
    },
    {
      type: "time",
      name: "booking_time",
      label: "Booking Time",
    },

    {
      type: "selectCheckbox",
      name: "stylist",
      label: "Select Stylist",
      options: [
        { value: "AaliyahJohnson", label: "Aaliyah Johnson" },
        { value: "BennyCarter", label: "Benny Carter" },
        { value: "ChloeKim", label: "Chloe Kim" },
        { value: "DavidLee", label: "David Lee" },
        { value: "EvaMartinez", label: "Eva Martinez" },
      ],
    },
    {
      type: "selectCheckbox",
      name: "booking_status",
      label: "Booking Status",
      options: [
        { value: "Upcoming", label: "Upcoming" },
        { value: "Ongoing", label: "Ongoing" },
        { value: "Completed", label: "Completed" },
        { value: "Cancelled", label: "Cancelled" },
      ],
    },
  ],
  footer: {
    cancel: {
      label: "Cancel",
      className:
        "w-full border border-[var(--color-primary1)] text-[var(--color-primary1)] px-4 py-2 rounded",
      onClick: () => console.log("Cancelled"),
    },
    apply: {
      label: "Update Booking  ",
      className:
        "bg-[var(--color-primary1)] text-white px-4 py-2 rounded w-full",
      onClick: (data) => console.log("Applied Filters", data),
    },
  },
};

export const cancelBookingConfig = {
  title: "",
  fields: [
    { type: "header", label: "Cancel Booking?" },
    {
      type: "subheader",
      text: "Are you sure you want to cancel this Booking?",
    },
    {
      type: "subheader",
      text: "This action will notify the Customer and initiate a refund process if",
    },
    {
      type: "subheader",
      text: "applicable. Once cancelled, this order cannot be undone",
    },
    {
      type: "selectCheckbox",
      name: "suspend_reason",
      label: "Cancellation Reason",
      showTextarea: true,
      textareaLabel: "Note",
      textareaName: "note",
      textareaPlaceholder: "Add note if 'Other' selected",

      options: [
        { label: "Barber Not Available", value: "Barber Not Available" },
        { label: "Incorrect Booking", value: "Incorrect Booking" },
        { label: "Payment issue", value: "Payment issue" },
        { label: "Other", value: "Other" },
      ],
    },
  ],
  footer: {
    cancel: { label: "Cancel" },
    apply: { label: "Cancel Booking", color: "red" },
  },
};

export const refundDetailsConfig = {
  formCss: {
    maxWidth: "600px",
    width: "100%",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
  },

  fields: [
    {
      type: "header",
      label: "Initiate Refund?",
      css: { fontSize: "18px", fontWeight: "bold", marginBottom: "8px" },
    },
    {
      type: "subheader",
      text: "This booking has been cancelled.",
      css: { color: "#6B7280", fontSize: "14px", marginBottom: "20px" },
    },
    {
      type: "subheader",
      text: "Please review the payment details below and confirm refund initiation.",
      css: { color: "#6B7280", fontSize: "14px", marginBottom: "20px" },
    },

    // Order Summary Section
    {
      type: "sectionHeader",
      label: "Booking Summary",
      css: { fontWeight: "600", fontSize: "16px", marginBottom: "12px" },
    },

    {
      type: "textBlock",
      label: "Booking Summary",
    },
    {
      type: "infoGrid",
      name: "booking_summary",

      items: [
        {
          label: "Booking ID",
          value: "#CIQ10231024561A5258",
          valueStyle: { color: "var(--color-primary1)" },
        },
        { label: "Date & Time", value: "15 Jul, 2025 2:00 PM" },
        // { label: "Services", value: "Hair Loc#111" },
        { label: "Booked On", value: "10 Jul,2025" },
        {
          label: "Stylist",
          value: "Aaliyah Johnson",
          valueStyle: { color: "var(--color-primary1)" },
        },
        {
          label: "Status",
          value: "Completed",
          // valueStyle: { color: "var(--color-red)" },
        },
      ],
    },

    {
      type: "textBlock",
      label: "Payment Details",
    },
    {
      type: "infoGrid",
      name: "payment_summary",

      items: [
        {
          label: "Amount Paid",
          value: "$160.00",
          valueStyle: { color: "#000000" },
        },
        {
          label: "Payment Method",
          value: "Stripe",
          valueStyle: { color: "#000000" },
        },
        {
          label: "Refundable Amount",
          value: "$100.00",
          valueStyle: { color: "#BC0D10" },
        },
      ],
    },

    { type: "input", placeholder: "$97", label: "Confirm Refund Amount" },
  ],
  footer: {
    cancel: { label: "Cancel" },
    apply: { label: "Confirm Refund" },
  },
};
