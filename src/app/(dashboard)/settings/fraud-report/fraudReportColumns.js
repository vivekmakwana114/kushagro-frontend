"use client";

import DetailView from "@/components/modules/DetailView";

import PopupForm from "@/components/ui/popupform";
import ViewUser from "../../buyer/viewUser";
import {
  deleteSupportTicketConfig,
  supportTicketDetailsConfig,
} from "./fruadReportConfig";
import ViewFraudReport from "@/components/common/ViewFraudReport";

export const fraudReportColumns = [
  {
    key: "report_id",
    title: "Report ID",
    sortable: true,
    component: {
      type: "phone",
      style: {
        color: "var(--color-secondary1)",
        fontWeight: "500",
      },
    },
  },
  {
    key: "reported_user",
    title: "Reported User",
    isObject: true,
    sortable: true,
    structure: {
      name: "name",
      email: "email",
      profile: "profile",
    },
    component: {
      type: "standard_avatar",
      style: {
        radius: "rounded-full",
        color: "var(--color-black)",
      },
    },
  },
  {
    key: "reported_by",
    title: "Reported By",
    isObject: true,
    sortable: true,
    structure: {
      name: "name",
      email: "email",
      profile: "profile",
    },
    component: {
      type: "standard_avatar",
      style: {
        radius: "rounded-full",
        color: "var(--color-black)",
      },
    },
  },
  {
    key: "reason",
    title: "Reason",
    sortable: true,
    component: {
      type: "phone",
      style: {
        color: "var(--color-dull-text)",
        fontWeight: "500",
      },
    },
  },
  {
    key: "reported_on",
    title: "Reported On",
    sortable: true,
    component: {
      type: "date",
      style: {
        color: "var(--color-dull-text)",
        fontWeight: "500",
      },
      options: {
        format: "dd MM, yyyy",
      },
    },
  },

  {
    key: "actions",
    title: "Actions",
    component: {
      type: "action",
      options: {
        actions: (row) => {
          // default actions for other statuses
          return [
            {
              label: "View Report",
              iconUrl: "/assets/icon/viewCustomer.svg",
              type: "sidebar",
              component: <ViewFraudReport userType="seller" />,
            },
            {
              label: "Delete Report",
              iconUrl: "/assets/icon/deleteBarbershop.svg",
              type: "popUp",
              component: (
                <PopupForm
                  config={deleteSupportTicketConfig}
                  width="600px"
                  onApply={(data) => console.log("Ticket Deleted", data)}
                  onCancel={() => console.log("Cancelled")}
                />
              ),
            },
          ];
        },
      },
    },
  },
];
