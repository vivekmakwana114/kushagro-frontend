export const addHolidayConfig = {
  formCss: {
    maxWidth: "500px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
  },
  fields: [
    { type: "header", label: "Add Holiday" },
    {
      type: "subheader",
      text: "Block specific dates to mark store & stylist unavailability.",
    },
    { type: "divider" },

    {
      type: "date",
      name: "date",
      label: "Date",
    },

    {
      type: "textarea",
      name: "reason",
      label: "Occasion/Reason",
      placeholder: "Occasion/Reason",
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
      label: "Add Holiday",
      className:
        "bg-[var(--color-primary1)] text-white px-4 py-2 rounded w-full",
      onClick: (data) => console.log("Added", data),
    },
  },
};

export const deleteHolidayConfig = {
  title: "",
  fields: [
    { type: "header", label: "Delete Holiday?" },
    {
      type: "subheader",
      text: "Are you certain you want to permanently delete this holiday?",
    },
    {
      type: "subheader",
      text: "This action is irreversible and will erase all associated details.",
    },
  ],
  footer: {
    cancel: { label: "No, Keep it" },
    apply: { label: "Yes, Delete", color: "red" },
  },
};

export const editHolidayConfig = {
  formCss: {
    maxWidth: "500px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
  },
  fields: [
    { type: "header", label: "Edit Holiday" },
    {
      type: "subheader",
      text: "Block specific dates to mark store & stylist unavailability.",
    },
    { type: "divider" },

    {
      type: "date",
      name: "date",
      label: "Date",
    },

    {
      type: "textarea",
      name: "reason",
      label: "Occasion/Reason",
      placeholder: "Occasion/Reason",
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
      label: "Update Holiday",
      className:
        "bg-[var(--color-primary1)] text-white px-4 py-2 rounded w-full",
      onClick: (data) => console.log("Added", data),
    },
  },
};
