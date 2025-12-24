export const barberProfileEditConfig = {
  formCss: {
    maxWidth: "550px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
  },
  fields: [
    { type: "header", label: "Edit Profile" },
    {
      type: "subheader",
      text: "Manage Your profile and services.",
    },
    { type: "divider" },
    {
      type: "file",
      label: "Profile Photo",
      label2: "(Max file Size 2MB)",
      name: "profilePhoto",
    },

    {
      type: "input",
      name: "fullName",
      label: "Full Name",
      placeholder: "Enter your name",
    },

    {
      type: "inputPair",
      label1: "Email",
      name1: "email",
      placeholder1: "e.g., john.doe@example.com",
      label2: "Phone Number",
      name2: "phone",
      placeholder2: "e.g., (555) 123-4567",
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
    {
      type: "file",
      label: "Gallery Photos",
      label2: "(Max 20 files)",
      name: "galleryPhoto",
      multiple: true,
      maxFiles: 20,
    },
    {
      type: "thumbnailList",
      label: "Existing Gallery",
      name: "gallery",
      images: [],
    },
  ],
  footer: {
    cancel: {
      label: "Cancel",
      className:
        "w-full border border-[var(--color-primary1)] text-[var(--color-primary1)] px-4 py-2 rounded",
    },
    apply: {
      label: "Update Profile",
      className:
        "bg-[var(--color-primary1)] text-white px-4 py-2 rounded w-full",
    },
  },
};
