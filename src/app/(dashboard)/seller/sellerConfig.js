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

export const getSellerConfig = (mode = "create", initialData = {}) => {
  return {
    formCss: {
      maxWidth: "500px",
      margin: "0 auto",
      fontFamily: "Arial, sans-serif",
    },
    fields: [
      {
        type: "header",
        label: mode === "create" ? "Create Barbershop" : "Edit Barbershop",
      },
      {
        type: "subheader",
        text:
          mode === "create"
            ? "Enter your Barbershop's details to create its profile on the CIQ platform."
            : "Update your barbershop details below.",
      },
      { type: "divider" },

      {
        type: "file",
        label: "Barbershop Logo",
        label2: "(Max 2MB)",
        value: initialData.streetLogo || "",
      },

      {
        type: "input",
        label: "Barbershop Name",
        name: "name",
        placeholder: "Barbershop Name",
        value: initialData.name || "",
      },

      {
        type: "input",
        label: "Barbershop Address",
        name: "address",
        placeholder: "Barbershop Address",
        value: initialData.address || "",
      },

      {
        type: "inputPair",
        label1: "City",
        name1: "city",
        placeholder1: "Enter City",
        value1: initialData.city || "",
        label2: "State",
        name2: "state",
        placeholder2: "Enter State",
        value2: initialData.state || "",
      },

      {
        type: "inputGroup",
        columns: 2,
        fields: [
          {
            type: "input",
            label: "Zip Code",
            name: "zip code",
            placeholder: "Zip Code",
          },
          {
            type: "select",
            name: "country",
            label: "Select Country",
            defaultValue: "USA",
            options: [
              { value: "USA", label: "USA", icon: "/assets/flags/USA.svg" },
              {
                value: "India",
                label: "India",
                icon: "/assets/flags/INDIA.svg",
              },
              {
                value: "Germany",
                label: "Germany",
                icon: "/assets/flags/GERMANY.svg",
              },
              {
                value: "Poland",
                label: "Poland",
                icon: "/assets/flags/POLAND.svg",
              },
              { value: "UK", label: "UK", icon: "/assets/flags/UK.svg" },
              {
                value: "Saudi Arabia",
                label: "Saudi",
                icon: "/assets/flags/SAUDI.svg",
              },
              { value: "UAE", label: "UAE", icon: "/assets/flags/UAE.svg" },
            ],
          },
        ],
      },
      {
        type: "inputGroup",
        columns: 2,
        fields: [
          {
            type: "input",
            label: "Map Link",
            name: "map link",
            placeholder: "Map Link",
          },
          {
            type: "select",
            name: "status",
            label: "Select Status",
            defaultValue: "Active",
            options: [
              { value: "Active", label: "Active" },
              { value: "Inactive", label: "Inactive" },
            ],
          },
        ],
      },
      {
        type: "inputPair",
        label1: "Phone",
        name1: "phone",
        placeholder1: "Phone",
        label2: "Email",
        name2: "email",
        placeholder2: "Email",
      },

      {
        type: "inputPair",
        label1: "TikTok",
        name1: "tiktok",
        placeholder1: "Link",
        label2: "Instagram",
        name2: "instagram",
        placeholder2: "Link",
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
        label:
          mode === "create" ? "Create Barbershop" : "Update Barbershoptore",
        className:
          "bg-[var(--color-primary1)] text-white px-4 py-2 rounded w-full",
        onClick: (data) => console.log("Store Saved", data),
      },
    },
  };
};

export const bannerProfileConfig = {
  coverImage: {
    label: "Cover Image",
    key: "coverImage",
    type: "image",
    value: "/icons/bannerImage.svg",
  },
  profileImage: {
    label: "Profile Image",
    key: "profileImage",
    type: "image",
    value: "/icons/bannerProfile.svg",
  },
  storeName: {
    label: "Store Name",
    key: "name",
    type: "text",
    value: "Loc Art Studio",
  },
  aboutStoreHeader: {
    label: "About Salon Header",
    key: "aboutHeader",
    type: "text",
    value: "About the Salon",
  },
  aboutStoreText: {
    label: "About Store Text",
    key: "about",
    type: "text",
    value:
      "We are a premium salon providing professional hair and beauty services with experienced stylists.",
  },
  locationHeader: {
    label: "Location Header",
    key: "locationHeader",
    type: "text",
    value: "Location",
  },
  locationText: {
    label: "Location Text",
    key: "location",
    type: "text",
    value: "2047 Auburn Ave NE, Atlanta, Atlanta, USA 30303",
  },
};

export const reactivateSellerConfig = {
  title: "",
  fields: [
    { type: "header", label: "Reactivate Seller?" },
    {
      type: "subheader",
      text: "Are you sure you want to reactivate this Barbershop's account?",
    },
    {
      type: "subheader",
      text: "Once reactivated, the barbershop will regain full access to Cut In",
    },
    {
      type: "subheader",
      text: "Q, including managing Bookings and processing payments.",
    },
  ],
  footer: {
    cancel: { label: "Cancel" },
    apply: { label: "Confirm Reactivation" },
  },
};

export const markAsInactiveConfig = {
  title: "",
  fields: [
    { type: "header", label: "Mark Barbershop as Inactive?" },
    {
      type: "subheader",
      text: "You are about to mark this barbershop as inactive.",
    },
    {
      type: "subheader",
      text: "Once inactive, this barbershop will not appear in the mobile app for customers to book services",
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

export const markAsActiveConfig = {
  title: "",
  fields: [
    { type: "header", label: "Reactivate Barber?" },
    {
      type: "subheader",
      text: "Are you sure you want to reactivate this Barber's account?",
    },
    {
      type: "subheader",
      text: "Once reactivated, Customer will regain full access to Cut In Q,",
    },
    {
      type: "subheader",
      text: "including Booking Bookings and making payments.",
    },
  ],
  footer: {
    cancel: { label: "Cancel" },
    apply: { label: "Confirm Reactivation" },
  },
};

export const suspendSellerConfig = {
  title: "",
  fields: [
    { type: "header", label: "Suspend Seller?" },
    {
      type: "subheader",
      text: "Are you sure you want to suspend this seller?",
    },
    {
      type: "subheader",
      text: "This action will prevent users from booking services.",
    },
    {
      type: "subheader",
      text: "Existing Bookings will remain unaffected.",
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
    cancel: { label: "Cancel" },
    apply: { label: "Confirm Suspend", color: "red" },
  },
};

export const deleteSellerConfig = {
  title: "",
  fields: [
    { type: "header", label: "Delete Seller?" },
    {
      type: "subheader",
      text: "Are you sure you want to delete this seller? ",
    },
    {
      type: "subheader",
      text: "This action is permanent and will remove it from the directory",
    },
    {
      type: "subheader",
      text: " Existing Bookings at this barbershop will remain unaffected.",
    },
  ],
  footer: {
    cancel: { label: "Cancel" },
    apply: { label: "Delete Seller", color: "red" },
  },
};

export const markAsInactiveBulkConfig = {
  title: "",
  fields: [
    { type: "header", label: "Mark Selected Barbershops Inactive?" },
    {
      type: "subheader",
      text: "You are about to mark this barbershop as inactive.",
    },
    {
      type: "subheader",
      text: "Once inactive, this barbershop will not appear in the mobile app for customers to book services",
    },
    {
      type: "subheader",
      text: "Existing Bookings will remain unaffected",
    },
  ],
  footer: {
    cancel: { label: "Cancel" },
    apply: { label: "Confirm Inactivation" },
  },
};
