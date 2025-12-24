export const addAmenitiesConfig = {
  formCss: {
    maxWidth: "500px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
  },
  fields: [
    { type: "header", label: "Add Amenities" },
    {
      type: "subheader",
      text: "Enhance your salon's appeal by Adding Salon’s  Amenities.",
    },
    { type: "divider" },

    {
      type: "textBlock",
      label: "Add Amenities",
    },
     { type: "input", placeholder: "e.g, Loc Retwist" },
  ],
  footer: {
    cancel: {
      label: "Cancel",
      className:
        "w-full border border-[#02C8DE] text-[#02C8DE] px-4 py-2 rounded",
      onClick: () => console.log("Cancelled"),
    },
    apply: {
      label: "Add Amenities",
      className: "bg-[#02C8DE] text-white px-4 py-2 rounded w-full",
      onClick: (data) => console.log("Added", data),
    },
  },
};

