export const addServiceConfig = {
  formCss: {
    maxWidth: "500px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
  },
  fields: [
    { type: "header", label: "Add New Service" },
    {
      type: "subheader",
      text: "Create a new service for booking and stylist assignment.",
    },
    { type: "divider" },

    {
      type: "textBlock",
      label: "Service Icon",
    },
    {
      type: "file",
      label: "Service Icon",
    },
    {
      type: "textBlock",
      label: "Service Name",
    },
    { type: "input", placeholder: "e.g, Loc Retwist" },
    {
      type: "textBlock",
      label: "Base Price",
    },
    { type: "input", placeholder: "e.g, $160" },

    {
      type: "timeDuration",
      label:"Duration",
      name: "Duration",
      options: [
        { value: "10pts", label: "10pts" },
        { value: "20pts", label: "20pts" },
        { value: "30pts", label: "30pts" },
        { value: "40pts", label: "40pts" },
      ],
    },

    {
      type: "select",
      label:"Select Status",
      name: "Service Status",
      options: [
        { value: "Active", label: "Active" },
        { value: "Inactive", label: "InActive" },
        
      ],
    },

    {
      type: "textarea",
      label: "Description",
      placeholder: "About the Salon",
    },
  ],
  footer: {
    cancel: {
      label: "Cancel",
      className:
        "w-full border border-[#02C8DE] text-[#02C8DE] px-4 py-2 rounded",
      onClick: () => console.log("Cancelled"),
    },
    apply: {
      label: "Add New Service",
      className: "bg-[#02C8DE] text-white px-4 py-2 rounded w-full",
      onClick: (data) => console.log("Badge Added", data),
    },
  },
};

export const cancelServiceConfig = {
  title: "",
  fields: [
    { type: "header", label: "Delete Service?" },
    {
      type: "subheader",
      text: "Are you sure you want to delete this service?",
    },
    {
      type: "subheader",
      text: "This action is permanent and will remove it from bookings.",
    },
    {
      type: "subheader",
      text: "Existing bookings using this service will remain unaffected.",
    },
  ],
  footer: {
    cancel: { label: "Cancel" },
    apply: { label: "Delete Service", color: "red" },
  },
};


export const editServiceConfig = {
  formCss: {
    maxWidth: "500px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
  },
  fields: [
    { type: "header", label: "Edit Service" },
    {
      type: "subheader",
      text: "Create a new service for booking and stylist assignment.",
    },
    { type: "divider" },

    {
      type: "textBlock",
      label: "Service Icon",
    },
    {
      type: "file",
      label: "Service Icon",
    },
    {
      type: "textBlock",
      label: "Service Name",
    },
    { type: "input", placeholder: "e.g, Loc Retwist" },
    {
      type: "textBlock",
      label: "Base Price",
    },
    { type: "input", placeholder: "e.g, $160" },

    {
      type: "timeDuration",
      label:"Duration",
      name: "Duration",
      options: [
        { value: "10pts", label: "10pts" },
        { value: "20pts", label: "20pts" },
        { value: "30pts", label: "30pts" },
        { value: "40pts", label: "40pts" },
      ],
    },

    {
      type: "select",
      label:"Select Status",
      name: "Service Status",
      options: [
        { value: "Active", label: "Active" },
        { value: "Inactive", label: "InActive" },
        
      ],
    },

    {
      type: "textarea",
      label: "Description",
      placeholder: "About the Salon",
    },
  ],
  footer: {
    cancel: {
      label: "Cancel",
      className:
        "w-full border border-[#02C8DE] text-[#02C8DE] px-4 py-2 rounded",
      onClick: () => console.log("Cancelled"),
    },
    apply: {
      label: "Edit Service",
      className: "bg-[#02C8DE] text-white px-4 py-2 rounded w-full",
      onClick: (data) => console.log("Badge Added", data),
    },
  },
};