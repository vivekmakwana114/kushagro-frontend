const fallbackGallery = Array.from({ length: 12 }).map((_, i) => ({
  src: `https://picsum.photos/512?random=${Math.floor(Math.random() * 1000)}`,
  alt: `Photo ${i + 1}`,
}));

export const getOrderConfig = (mode = "create", initialData = {}, role) => {
  return {
    formCss: {
      maxWidth: "500px",
      margin: "0 auto",
      fontFamily: "Arial, sans-serif",
    },

    fields: [
      {
        type: "header",
        label: mode === "create" ? "Add Barber" : "Edit Barber",
      },

      {
        type: "subheader",
        text:
          mode === "create"
            ? "Register a new barber and assign them to one or more Services."
            : "Update stylist details below.",
      },

      { type: "divider" },

      {
        type: "file",
        label: "Barber Profile Photo",
        label2: "(Max file size: 2MB)",
        name: "profilePhoto",
        value: initialData.profilePhoto || "",
      },

      {
        type: "input",
        name: "fullName",
        label: "Full Name",
        placeholder: "",
        value: initialData.fullName || "",
      },

      {
        type: "inputPair",
        label1: "Email",
        name1: "email",
        placeholder1: "e.g., john.doe@example.com",
        value1: initialData.email || "",

        label2: "Phone Number",
        name2: "phone",
        placeholder2: "e.g., (555) 123-4567",
        value2: initialData.phone || "",
      },

      {
        type: "selectCheckbox",
        name: "workingDays",
        label: "Select Working Days",
        options: [
          { value: "Mon", label: "Mon" },
          { value: "Tue", label: "Tue" },
          { value: "Wed", label: "Wed" },
          { value: "Thu", label: "Thu" },
          { value: "Fri", label: "Fri" },
          { value: "Sat", label: "Sat" },
          { value: "Sun", label: "Sun" },
        ],
        value: initialData.workingDays || [],
      },

      {
        type: "timeRange",
        name: "timeRange",
        label: "Working Hours",
        value: initialData.timeRange || {},
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

      role === "barbershop" 
        ? {
            type: "select",
            name: "status",
            label: "Select Status",
            defaultValue: "Active",
            options: [
              { value: "Active", label: "Active" },
              { value: "Inactive", label: "Inactive" },
            ],
          }
        : {
            type: "inputGroup",
            columns: 2,
            fields: [
              {
                type: "select",
                label: "Serving BarberShop",
                name: "serving Barbershop",
                placeholder: "Select Serving Barbershop",
                defaultValue: " Royale Salon,Sydne",
                options: [
                  { value: "Royale Salon,Sydne", label: "Royale Salon,Sydne" },
                  {
                    value: "Glamour Lounge,Melbourne",
                    label: "InacGlamour Lounge,Melbournetive",
                  },
                  { value: "Chic Cuts,Brisbane", label: "Chic Cuts,Brisbane" },
                  {
                    value: "Trendy Tresses,Perth",
                    label: "Trendy Tresses,Perth",
                  },
                  {
                    value: "Style Station,Adelaide",
                    label: "Style Station,Adelaide",
                  },
                  {
                    value: "Elegance Spa,Canberra",
                    label: "Elegance Spa,Canberra",
                  },
                  {
                    value: "Elegance Spa,Brisbane",
                    label: "Elegance Spa,Brisbane",
                  },
                  {
                    value: "Chic Hair Studio,Perth",
                    label: "Chic Hair Studio,Perth",
                  },
                  {
                    value: "Trendy Cuts,Adelaide",
                    label: "Trendy Cuts,Adelaide",
                  },
                ],
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
        type: "file",
        label: "Gallery Photos",
        name: "galleryPhoto",
        label2: "(Max 20 files)",
        value: initialData.profilePhoto || "",
      },
      ...(mode === "edit"
        ? [
            {
              type: "thumbnailList",
              label: "Existing Gallery",
              images:
                initialData.gallery && initialData.gallery.length > 0
                  ? initialData.gallery.map((img) => ({
                      src: img,
                      alt: "Gallery Photo",
                    }))
                  : fallbackGallery,

              onChange: (updatedImages) => {
                console.log("Updated gallery:", updatedImages);
              },
            },
          ]
        : []),
    ],

    footer: {
      cancel: {
        label: "Cancel",
        className:
          "w-full border border-[var(--color-primary1)] text-[var(--color-primary1)] px-4 py-2 rounded",
        onClick: () => console.log("Cancelled"),
      },
      apply: {
        label: mode === "create" ? "Add Barber" : "Update Barber",
        className:
          "bg-[var(--color-primary1)] text-white px-4 py-2 rounded w-full",
        onClick: (data) => console.log("Store Saved", data),
      },
    },
  };
};


export const orderHistoryConfig = {
  formCss: {
    maxWidth: "600px",
    width: "100%",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
  },

  fields: [
    {
      type: "header",
      label: "Barber Details",
      css: { fontSize: "18px", fontWeight: "bold", marginBottom: "8px" },
    },
    {
      type: "subheader",
      text: "View and manage barber details.",
      css: { color: "#6B7280", fontSize: "14px", marginBottom: "20px" },
    },

    {
      type: "profileCard",
      name: "profile",
      avatar: "/icons/stylist photo.svg",
      name: "Jimmy Fraz",
      email: "jimmy@selocarl.com",
      phone: {
        label: "Phone Number",
        value: "!555!123-4567",
      },
    },

    {
      type: "infoGrid",
      name: "Details",
      columns: 2,
      items: [
        {
          label: "Joined On",
          value: "07 July, 2025",
          valueStyle: { color: "var(--color-black)" },
        },
        {
          label: "Status",
          value: "Active",
          valueStyle: { color: "var(--color-primary1)" },
        },
        {
          label: "Total Bookings",
          value: "160",
          valueStyle: { color: "var(--color-black)" },
        },

        {
          label: "Total Earning",
          value: "$16,000",
          valueStyle: { color: "var(--color-black)" },
        },
        {
          label: "Working Days",
          value: "Mon, Wed, Thu, Fri",
          valueStyle: { color: "var(--color-black)" },
        },
        {
          label: "Working Hours",
          value: "08:30 AM to 6:30 PM",
          valueStyle: { color: "var(--color-black)" },
        },
      ],
    },

    {
      type: "subheader",
      text: "Social Links",
      css: { color: "var(--color-dull-text)", fontSize: "12px" },
    },

    {
      type: "socialLinks",
      items: [
        {
          icon: "/assets/icon/instagram.svg",
          label: "Instagram",
          url: "https://instagram.com/jimmy",
        },
        {
          icon: "/assets/icon/tiktok.svg",
          label: "Twitter",
          url: "https://twitter.com/jimmy",
        },
      ],
    },

    {
      type: "infoGrid",
      name: "",
      column: 1,
      items: [
        {
          label: "Suspension Reason :",
          value: "Missing essential barber details.",
          valueStyle: { color: "var(--color-black)" },
        },
      ],
    },

    {
      type: "thumbnailList",
      label: "Album Photos",
      images: [
        {
          src: `https://picsum.photos/512?random=${Math.floor(
            Math.random() * 100
          )}`,
          alt: "Photos 1",
          onChange: (updatedImages) =>
            console.log("Updated images:", updatedImages),
        },
        {
          src: `https://picsum.photos/512?random=${Math.floor(
            Math.random() * 100
          )}`,
          alt: "Photos 2",
          onChange: (updatedImages) =>
            console.log("Updated images:", updatedImages),
        },
        {
          src: `https://picsum.photos/512?random=${Math.floor(
            Math.random() * 100
          )}`,
          alt: "Photos 3",
          onChange: (updatedImages) =>
            console.log("Updated images:", updatedImages),
        },
        {
          src: `https://picsum.photos/512?random=${Math.floor(
            Math.random() * 100
          )}`,
          alt: "Photos 4",
          onChange: (updatedImages) =>
            console.log("Updated images:", updatedImages),
        },
        {
          src: `https://picsum.photos/512?random=${Math.floor(
            Math.random() * 100
          )}`,
          alt: "Photos 5",
          onChange: (updatedImages) =>
            console.log("Updated images:", updatedImages),
        },
        {
          src: `https://picsum.photos/512?random=${Math.floor(
            Math.random() * 100
          )}`,
          alt: "Photos 6",
          onChange: (updatedImages) =>
            console.log("Updated images:", updatedImages),
        },
        {
          src: `https://picsum.photos/512?random=${Math.floor(
            Math.random() * 100
          )}`,
          alt: "Photos ",
          onChange: (updatedImages) =>
            console.log("Updated images:", updatedImages),
        },
        {
          src: `https://picsum.photos/512?random=${Math.floor(
            Math.random() * 100
          )}`,
          alt: "Photos 8",
          onChange: (updatedImages) =>
            console.log("Updated images:", updatedImages),
        },
        {
          src: `https://picsum.photos/512?random=${Math.floor(
            Math.random() * 100
          )}`,
          alt: "Photos 9",
          onChange: (updatedImages) =>
            console.log("Updated images:", updatedImages),
        },
        {
          src: `https://picsum.photos/512?random=${Math.floor(
            Math.random() * 100
          )}`,
          alt: "Photos 10",
          onChange: (updatedImages) =>
            console.log("Updated images:", updatedImages),
        },
        {
          src: `https://picsum.photos/512?random=${Math.floor(
            Math.random() * 100
          )}`,
          alt: "Photos 11",
          onChange: (updatedImages) =>
            console.log("Updated images:", updatedImages),
        },
        {
          src: `https://picsum.photos/512?random=${Math.floor(
            Math.random() * 100
          )}`,
          alt: "Photos 12",
          onChange: (updatedImages) =>
            console.log("Updated images:", updatedImages),
        },
      ],
    },
  ],
};

export const markAsInactiveBulkConfig = {
  title: "",
  fields: [
    { type: "header", label: "Mark Selected Barber Inactive?" },
    {
      type: "subheader",
      text: "You are about to mark this barber as inactive.",
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

export const reactivateOrderConfig = {
  title: "",
  fields: [
    { type: "header", label: "Reactivate Order?" },
    {
      type: "subheader",
      text: "Are you sure you want to reactivate this Order?",
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
    { type: "header", label: "Mark Barber as Inactive?" },
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

export const suspendOrderConfig = {
  title: "",
  fields: [
    { type: "header", label: "Suspend Order?" },
    {
      type: "subheader",
      text: "Are you sure you want to suspend this Order?",
    },
    {
      type: "subheader",
      text: "This action will prevent users from booking Bookings.",
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

export const deleteOrderConfig = {
  title: "",
  fields: [
    { type: "header", label: "Delete Order?" },
    {
      type: "subheader",
      text: "Are you sure you want to delete this Order? ",
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
    apply: { label: "Delete Order", color: "red" },
  },
};
export const deleteOrderConfigAll = {
  title: "",
  fields: [
    { type: "header", label: "Delete selected Order?" },
    {
      type: "subheader",
      text: "Are you sure you want to delete this selected barber? ",
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
    apply: { label: "yes, Delete Barber", color: "red" },
  },
};
