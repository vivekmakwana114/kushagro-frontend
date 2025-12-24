export const archiveBuyerConfig = {
  title: "",
  fields: [
    { type: "header", label: "Archive Buyer" },
    {
      type: "subheader",
      text: "Are you sure you want to archive this Client’s account?",
    },
    {
      type: "subheader",
      text: "Archived Clients will no longer appear in the active Client list but their data will remain securely stored in the system.",
    },
    {
      type: "subheader",
      text: "You can restore this account later if needed.",
    },
  ],
  footer: {
    cancel: { label: "Cancel" },
    apply: { label: "Archive Client" },
  },
};

export const reactivateBuyerConfig = {
  title: "",
  fields: [
    { type: "header", label: "Reactivate Buyer?" },
    {
      type: "subheader",
      text:"Are you sure you want to reactivate this Buyer’s account?" ,
    },
    {
      type: "subheader",
      text:"Once reactivated, Buyer will regain full access to kushagro," ,
    },
    {
      type: "subheader",
      text:"including Booking appointments and making purchases." ,
    },
  ],
  footer: {
    cancel: { label: "Cancel" },
    apply: { label: "Confirm Reactivation" },
  },
};


