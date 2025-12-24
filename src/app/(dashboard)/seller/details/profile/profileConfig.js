export const getStoreFormConfig = (mode = "create", initialData = {}, role) => {
  const fields = [
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
      placeholder: "Barbershop Name",
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
          defaultValue: "Australia",
          options: [
            {
              value: "Australia",
              label: "Australia",
              icon: "/assets/flags/AUSTRALIA.svg",
            },
            { value: "USA", label: "USA", icon: "/assets/flags/USA.svg" },
            { value: "India", label: "India", icon: "/assets/flags/INDIA.svg" },
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
    role === "barbershop"
      ? {
          type: "input",
          label: "Map Link",
          name: "map link",
          placeholder: "Map Link",
        }
      : {
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
    role !== "barbershop" && {
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
  ].filter(Boolean);

  return {
    formCss: {
      maxWidth: "500px",
      margin: "0 auto",
      fontFamily: "Arial, sans-serif",
    },
    fields: fields,
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
  profileImage: {
    label: "Profile Image",
    key: "profileImage",
    type: "image",
    value: "/icons/bannerProfile.svg",
  },
  storeName: {
    label: "Shop Name",
    key: "name",
    type: "text",
    value: "Royale Salon, Sydney",
  },
  email: {
    label: "Email",
    key: "email",
    type: "text",
    value: "royalesalon@sydney.com",
  },

  joined_date: {
    label: "Joined On",
    key: "joined_on",
    type: "text",
    value: "25 July, 2025",
  },
  phoneHeader: {
    label: "Phone Number",
    key: "phoneHeader",
    type: "text",
    value: "Phone Number",
  },
  phone: {
    label: "Phone Number",
    key: "about",
    type: "text",
    value: "+1-682-19-4444",
  },
  status: {
    label: "Status",
    key: "status",
    type: "badge",
    value: "active",
    style: {
      borderRadius: "3.15px",
      padding: "8px 12px",
    },
    colors: {
      active: "#097416",
      suspended: "var(--color-red)",
      inactive: "var(--color-placeholder-color)",
    },
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
    value: "39 Harbour Bridge, Sydney, NSW, Australia 2000",
  },
};
