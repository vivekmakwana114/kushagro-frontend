"use client";
import ViewFraudReport from "@/components/common/ViewFraudReport";

export const getFraudReportColumns = () => [
  {
    key: "reportId",
    title: "Report ID",
    component: {
      type: "phone",
      style: {
        color: "var(--color-secondary1)",
        fontWeight: "500",
      },
    },
  },
  {
    key: "reportBy",
    title: "Report By",
    isObject: true,
    structure: {
      name: "name",
      email: "email",
      profile: "profile",
    },
    component: {
      type: "standard_avatar",
      style: {
        radius: "rounded-full",
      },
    },
  },
  {
    key: "reason",
    title: "Reason",
    mobileStack: true,
    component: {
      type: "phone",
      style: {
        color: "var(--color-dull-text)",
        fontWeight: "500",
      },
    },
  },
  {
    key: "reportOn",
    title: "Report On",
    component: {
      type: "date",
      options: {
        format: "M d yyyy",
      },
      style: {
        color: "var(--color-dull-text)",
        fontWeight: "500",
      },
    },
  },
  {
    key: "actions",
    title: "Actions",
    component: {
      type: "action",
      style: {},
      options: {
        actions: () => {
          return [
            {
              label: "View Report",
              iconUrl: "/assets/icon/View.svg",
              type: "sidebar",
              component: <ViewFraudReport userType="buyer" />,
            },
            {
              label: "Delete Report",
              iconUrl: "/assets/icon/deleteBarbershop.svg",
              // component:
            },
          ];
        },
      },
    },
  },
];
