export const createOfferConfig = {
  formCss: {
    maxWidth: "600px",
    width: "100%",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
  },

  fields: [
    {
      type: "header",
      label: "Create Offer",
    },
    {
      type: "subheader",
      text: "Edit complete category information, pricing, stock status.",
    },
    { type: "divider", name: "divider" },

    { type: "textBlock", label: "Offer Name" },
    { type: "input", placeholder: "CIQFEST", name: "offerName" },

    {
      type: "inputPair",

      label1: "Coupon Code",
      name1: "couponCode",
      placeholder1: "SUM20225",
      label2: "Set Usage Limit",
      name2: "usageLimit",
      placeholder2: "500",
    },
    {
      type: "inputPair",
      label1: "Discount",
      name1: "discount",
      placeholder1: "8%",
      label2: "Max Discount Amount",
      name2: "maxDiscount",
      placeholder2: "$99",
    },
    { type: "dateRange", name: "DateRange", label: "Date Range" },

    {
      type: "inputGroup",
      columns: 2,
      fields: [
        {
          type: "input",
          label: "Min Cart Value",
          name: "cart value",
          placeholder: "3400",
        },
        {
          type: "selectCheckbox",
          name: "status",
          label: "Offer Status",
          defaultValue: "Active",
          options: [
            { value: "Active", label: "Active" },
            { value: "Inactive", label: "Inactive" },
            { value: "Expired", label: "Expired" },
            { value: "Used", label: "Used" },
          ],
        },
      ],
    },
    {
      type: "textarea",
      name: "description",
      label2: "(Max 250 Words)",
      label: "Description",
      placeholder: "Offer Description",
      rows: 5,
    },
  ],
  footer: {
    cancel: {
      label: "Cancel",
      className:
        "w-full border border-[var(--color-primary1)] text-[var(--color-primary1)] px-4 py-2 rounded",
    },
    apply: {
      label: "Create Offer",
      className:
        "bg-[var(--color-primary1)] text-white px-4 py-2 rounded w-full",
    },
  },
};

export const getOfferDetailsConfig = (offerData) => {
  // Custom Date Format (e.g., 25 Mar, 2025)
  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleString("en-GB", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  const fromDate = formatDate(offerData?.DateRange?.from);
  const toDate = formatDate(offerData?.DateRange?.to);

  return {
    formCss: {
      maxWidth: "600px",
      margin: "0 auto",
    },

    fields: [
      { type: "header", label: "View Offer" },
      {
        type: "subheader",
        text: "See all details for this category, including product count and status.",
      },
      { type: "divider" },

      {
        type: "infoGrid",
        columns: 2,
        items: [
          {
            label: "Offer Name",
            value: offerData.offerName || "N/A",
            valueStyle: { color: "var(--color-black)", fontWeight: "500" },
          },
          {
            label: "Coupon Code",
            value: offerData.couponCode || "N/A",
            valueStyle: { color: "var(--color-black)", fontWeight: "500" },
          },

          {
            label: "Usage Status",
            value: "48/100 Usage" || "N/A",
            valueStyle: { color: "var(--color-black)", fontWeight: "500" },
          },

          {
            label: "Discount",
            value: offerData.discount || "N/A",
            valueStyle: { color: "var(--color-black)", fontWeight: "500" },
          },

          {
            label: "Max Discount Amount",
            value: offerData.maxDiscount || "N/A",
            valueStyle: { color: "var(--color-black)", fontWeight: "500" },
          },
          {
            label: "Valid Date Range",
            // value: `${fromDate} - ${toDate}`,
            value: "From 25 Mar,2025 to 25 May 2025",
            valueStyle: { color: "var(--color-black)", fontWeight: "500" },
          },

          {
            label: "Minimum Cart Value",
            value: "$99" || "N/A",
            valueStyle: { color: "var(--color-black)", fontWeight: "500" },
          },
          {
            label: "Status",
            value: offerData.status || "N/A",
            valueStyle: { color: "var(--color-primary1)", fontWeight: "500" },
          },
        ],
      },

      { type: "divider" },

      { type: "sectionHeader", label: "Description" },
      {
        type: "textBlock",
        content: offerData.description || "No description available.",
        css: {
          color: "#374151",
          lineHeight: "1.6",
          whiteSpace: "pre-wrap",
        },
      },
    ],
  };
};

export const editOfferConfig = {
  formCss: {
    maxWidth: "600px",
    width: "100%",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
  },

  fields: [
    {
      type: "header",
      label: "Create Offer",
    },
    {
      type: "subheader",
      text: "Edit complete category information, pricing, stock status.",
    },
    { type: "divider", name: "divider" },

    { type: "textBlock", label: "Offer Name" },
    { type: "input", placeholder: "CIQFEST", name: "offerName" },

    {
      type: "inputPair",

      label1: "Coupon Code",
      name1: "couponCode",
      placeholder1: "SUM20225",
      label2: "Set Usage Limit",
      name2: "usageLimit",
      placeholder2: "500",
    },
    {
      type: "inputPair",
      label1: "Discount",
      name1: "discount",
      placeholder1: "8%",
      label2: "Max Discount Amount",
      name2: "maxDiscount",
      placeholder2: "$99",
    },
    { type: "dateRange", name: "DateRange", label: "Date Range" },

    {
      type: "inputGroup",
      columns: 2,
      fields: [
        {
          type: "input",
          label: "Min Cart Value",
          name: "cart value",
          placeholder: "3400",
        },
        {
          type: "selectCheckbox",
          name: "status",
          label: "Offer Status",
          defaultValue: "Active",
          options: [
            { value: "Active", label: "Active" },
            { value: "Inactive", label: "Inactive" },
            { value: "Expired", label: "Expired" },
            { value: "Used", label: "Used" },
          ],
        },
      ],
    },
    {
      type: "textarea",
      name: "description",
      label2: "(Max 250 Words)",
      label: "Description",
      placeholder: "Offer Description",
      rows: 5,
    },
  ],
  footer: {
    cancel: {
      label: "Cancel",
      className:
        "w-full border border-[var(--color-primary1)] text-[var(--color-primary1)] px-4 py-2 rounded",
    },
    apply: {
      label: "Update Offer",
      className:
        "bg-[var(--color-primary1)] text-white px-4 py-2 rounded w-full",
    },
  },
};

export const DeleteOfferConfig = {
  title: "",
  fields: [
    { type: "header", label: "Delete Offers?" },
    {
      type: "subheader",
      text: "Are you sure you want to delete this selected Offers?",
    },
    {
      type: "subheader",
      text: "This action will notify the Clients and initiate the deletion process.",
    },
    {
      type: "subheader",
      text: "applicable. Once deleted, this offers cannot be undone",
    },
  ],
  footer: {
    cancel: { label: "Cancel" },
    apply: { label: "Delete Offer", color: "red" },
  },
};
export const DeleteOfferConfigAll = {
  title: "",
  fields: [
    { type: "header", label: "Delete Selected Offers?" },
    {
      type: "subheader",
      text: "Are you sure you want to delete this selected Offers?",
    },
    {
      type: "subheader",
      text: "This action will notify the Clients and initiate the deletion process.",
    },
    {
      type: "subheader",
      text: "applicable. Once deleted, this offers cannot be undone",
    },
  ],
  footer: {
    cancel: { label: "Cancel" },
    apply: { label: "Delete Selection", color: "red" },
  },
};

export const cannotDeleteOfferConfig = {
  title: "",
  fields: [
    { type: "header", label: "Cannot Delete Offers" },
    {
      type: "subheader",
      text: "This offer cannot be deleted because there are Offers",
    },
    {
      type: "subheader",
      text: "currently listed under it. Please remove the offers before",
    },
    {
      type: "subheader",
      text: "attempting to delete the offer.",
    },
  ],
  footer: {
    cancel: { label: "Close" },
    apply: { label: "Back To Main Page" },
  },
};
export const cannotDeleteOfferConfigAll = {
  title: "",
  fields: [
    { type: "header", label: "Cannot Delete Selected Offers" },
    {
      type: "subheader",
      text: "This selected offer cannot be deleted because there are Offers",
    },
    {
      type: "subheader",
      text: "currently listed under it. Please remove the offers before",
    },
    {
      type: "subheader",
      text: "attempting to delete the offer.",
    },
  ],
  footer: {
    cancel: { label: "Close" },
    apply: { label: "Back To Main Page" },
  },
};

export const markAsInactiveConfig = {
  title: "",
  fields: [
    { type: "header", label: "Mark Offer as Inactive?" },
    {
      type: "subheader",
      text: "You are about to mark this barber as inactive.",
    },
    {
      type: "subheader",
      text: "Once inactive, this barber will not appear in the mobile app for customers to book services",
    },
    {
      type: "subheader",
      text: "Existing Bookings will remain unaffected",
    },
  ],
  footer: {
    cancel: { label: "Cancel" },
    apply: { label: "Inactive Offer" },
  },
};
export const markAsInactiveConfigAll = {
  title: "",
  fields: [
    { type: "header", label: "Mark Selected Offer as Inactive?" },
    {
      type: "subheader",
      text: "You are about to mark this barber as inactive.",
    },
    {
      type: "subheader",
      text: "Once inactive, this barber will not appear in the mobile app for customers to book services",
    },
    {
      type: "subheader",
      text: "Existing Bookings will remain unaffected",
    },
  ],
  footer: {
    cancel: { label: "Cancel" },
    apply: { label: "Inactive Offer" },
  },
};
