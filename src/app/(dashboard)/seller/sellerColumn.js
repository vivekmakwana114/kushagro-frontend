"use client";

import StarRating from "@/components/ui/starRating";
import PopupForm from "@/components/ui/popupform";
import DynamicForm from "@/components/modules/DynamicFormRendering";
import {
  deleteSellerConfig,
  getSellerConfig,
  markAsActiveConfig,
  markAsInactiveConfig,
  reactivateSellerConfig,
  suspendSellerConfig,
} from "./sellerConfig";
import ViewUser from "../buyer/viewUser";

export const getSellerColumns = () => [
  {
    key: "seller",
    title: "Sellers",
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
      },
    },
  },
  {
    key: "phone",
    title: "Phone",
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
    key: "joined_on",
    title: "Joined On",
    sortable: true,
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
    key: "total_listing",
    title: "Total Listings",
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
    key: "total_order",
    title: "Total Orders",
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
    key: "total_earning",
    title: "Earning",
    sortable: true,
    component: {
      type: "currency",
      style: {},
      sign: "$",
      position: "start",
      style: {
        color: "var(--color-dull-text)",
        fontWeight: "500",
      },
    },
  },

  // {
  //   key: "avg_rating",
  //   title: "Rating",
  //   sortable: true,
  //   render: (value) => (
  //     <div className="text-black-500">
  //       <StarRating value={value} />
  //     </div>
  //   ),
  // },

  {
    key: "id_status",
    title: "ID Status",
    sortable: true,
    component: {
      type: "badge",
      style: {
        borderRadius: "3.15px",
        padding: "8px 12px",
      },
      options: {
        value: {
          verified: "#097416", // green
          pending: "#FFBE00", // gray
          rejected: "#BC0D10", //red
        },
      },
    },
  },
  {
    key: "status",
    title: "Status",
    sortable: true,
    component: {
      type: "badge",
      style: {
        borderRadius: "3.15px",
        padding: "8px 12px",
      },
      options: {
        value: {
          active: "#097416", // green
          inactive: "#9CA3AF", // gray
          suspended: "#BC0D10", //red
        },
      },
    },
  },
  {
    key: "actions",
    title: "Actions",
    sortable: false,
    component: {
      type: "action",
      style: {},
      options: {
        actions: (row) => {
          switch (row.status) {
            case "active":
              return [
                {
                  label: "View Seller",
                  iconUrl: "/assets/icon/ViewCustomer.svg",
                  type: "navigate",
                  url: "/seller/details/profile/",
                },
                {
                  label: "Suspend Seller",
                  iconUrl: "/assets/icon/suspendCustomer.svg",
                  component: (
                    <PopupForm
                      config={suspendSellerConfig}
                      width="500px"
                      onApply={(data) => console.log("Suspended:", data)}
                      onCancel={() => console.log("Cancelled")}
                    />
                  ),
                },
                {
                  label: "Mark as Verfied ID",
                  iconUrl: "/assets/icon/markCompleted.svg",
                  type: "popUp",
                  component: <ViewUser />,
                },
                {
                  label: "Mark as Rejected ID",
                  iconUrl: "/assets/icon/markInactive.svg",
                  type: "popUp",
                  component: <ViewUser />,
                },

                {
                  label: "Share Reset Password Link",
                  iconUrl: "/assets/icon/lock.svg",
                  onClick: (data) =>
                    console.log("password Reset link send", data),
                },
              ];

            case "inactive":
              return [
                {
                  label: "View Seller",
                  iconUrl: "/assets/icon/ViewCustomer.svg",
                  type: "navigate",
                  url: "/seller/details/profile/",
                },
                {
                  label: "Mark as Active",
                  iconUrl: "/assets/icon/reactivateCustomer.svg",
                  component: (
                    <PopupForm
                      config={markAsActiveConfig}
                      width="500px"
                      onApply={(data) => console.log("Activated:", data)}
                      onCancel={() => console.log("Cancelled")}
                    />
                  ),
                },
                {
                  label: "Delete Seller",
                  iconUrl: "/assets/icon/deleteBarbershop.svg",
                  component: (
                    <PopupForm
                      config={deleteSellerConfig}
                      width="500px"
                      onApply={(data) => console.log("Suspended:", data)}
                      onCancel={() => console.log("Cancelled")}
                    />
                  ),
                },
              ];

            case "suspended":
              return [
                {
                  label: "View Seller",
                  iconUrl: "/assets/icon/ViewCustomer.svg",
                  type: "navigate",
                  url: "/seller/details/profile/",
                },

                {
                  label: "Reactivate Seller",
                  iconUrl: "/assets/icon/markCompleted.svg",
                  component: (
                    <PopupForm
                      config={reactivateSellerConfig}
                      width="500px"
                      onApply={(data) => console.log("Reactivated:", data)}
                      onCancel={() => console.log("Cancelled")}
                    />
                  ),
                },
                
              ];

            default:
              return [
                {
                  label: "View Seller",
                  iconUrl: "/assets/icon/ViewCustomer.svg",
                  type: "navigate",
                  url: "/seller/details/profile/",
                },
              ];
          }
        },
      },
    },
  },
];
