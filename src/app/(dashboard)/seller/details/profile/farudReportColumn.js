"use client";

import DynamicForm from "@/components/modules/DynamicFormRendering";
import PopupForm from "@/components/ui/popupform";
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
    component: {
      type: "phone",
      style: {
        color: "var(--color-dull-text)",
        fontWeight: "500",
      },
    },
  },
  {
    key: "report_on",
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
              iconUrl: "/assets/icon/ViewCustomer.svg",
              type: "sidebar",
              component: <ViewFraudReport userType="seller" />,
            },
            {
              label: "Delete Report",
              iconUrl: "/assets/icon/deleteBarbershop.svg",
              // component: (
              //   <PopupForm
              //     config={""}
              //     width="500px"
              //     onApply={(data) => console.log("Suspended Buyer:", data)}
              //     onCancel={() => console.log("Closed")}
              //   />
              // ),
            },
          ];
        },
      },
    },
  },
];
