"use client";

import PopupForm from "@/components/ui/popupform";
import {
  barberDetailsConfig,
  deleteBarberConfig,
  getBarberConfig,
  markAsActiveConfig,
  markAsInactiveConfig,
  suspendBarberConfig,
} from "./barberConfig";
import DetailView from "@/components/modules/DetailView";
import DynamicForm from "@/components/modules/DynamicFormRendering";

export const getBarberColumns =()=> [
  {
    key: "barber",
    title: "Barber",
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
    key: "barbershop",
    title: "Serving Barbershop",
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
        color: "var(--color-primary1)",
      },
    },
  },
  {
    key: "joined_on",
    title: "Joined On",
    sortable: true,
    component: {
      type: "date",
      style: {},
      options: {
        format: "M d yyyy",
      },
      style: {
        color: "var(--color-placeholder-color)",
        fontWeight: "500",
      },
    },
  },
  {
    key: "total_bookings",
    title: "Total Booking",
    sortable: true,
    component: {
      type: "phone",
      style: {
        color: "var(--color-placeholder-color)",
        fontWeight: "500",
      },
    },
  },
  {
    key: "total_earning",
    title: "Total Earning",
    sortable: true,
    component: {
      type: "currency",
      sign: "$",
      position: "start",
      style: {
        color: "var(--color-placeholder-color)",
        fontWeight: "500",
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
        borderRadius: "0.15rem",
      },
      options: {
        value: {
          active: "#097416", // green
          inactive: "#9CA3AF", // gray
          // suspended: "#BC0D10", //red
        },
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
        actions: (row) => {
          if (row?.status === "active") {
            return [
              {
                label: "View Barber",
                iconUrl: "/assets/icon/viewCustomer.svg",
                type: "sidebar",
                component: <DetailView config={barberDetailsConfig} />,
              },
              {
                label: "Edit Barber",
                iconUrl: "/assets/icon/editBooking.svg",
                type: "sidebar",
                component: (
                  <DynamicForm
                    config={getBarberConfig("edit", {})}
                    onApply={(data) => console.log("Edited store:", data)}
                  />
                ),
              },
              {
                label: "Mark as Inactive",
                iconUrl: "/assets/icon/markInactive.svg",
                type: "popUp",
                component: (
                  <PopupForm
                    config={markAsInactiveConfig}
                    width="500px"
                    onApply={(data) => console.log("Marked inactive:", data)}
                  />
                ),
              },
              {
                label: "Suspend Barber",
                iconUrl: "/assets/icon/suspendCustomer.svg",
                type: "popUp",
                component: (
                  <PopupForm
                    config={suspendBarberConfig}
                    width="500px"
                    onApply={(data) => console.log("Suspended:", data)}
                  />
                ),
              },
              {
                label: "Delete Barber",
                iconUrl: "/assets/icon/deleteBarbershop.svg",
                type: "popUp",
                component: (
                  <PopupForm
                    config={deleteBarberConfig}
                    width="500px"
                    onApply={(data) => console.log("Deleted:", data)}
                  />
                ),
              },
            ];
          }

          if (row?.status === "inactive") {
            return [
              {
                label: "View Barber",
                iconUrl: "/assets/icon/viewCustomer.svg",
                type: "sidebar",
                component: <DetailView config={barberDetailsConfig} />,
              },
              {
                label: "Edit Barber",
                iconUrl: "/assets/icon/editBooking.svg",
                type: "sidebar",
                component: (
                  <DynamicForm
                    config={getBarberConfig("edit", {})}
                    onApply={(data) => console.log("Edited store:", data)}
                  />
                ),
              },
              {
                label: "Mark as Active",
                iconUrl: "/assets/icon/markCompleted.svg",
                type: "popUp",
                component: (
                  <PopupForm
                    config={markAsActiveConfig}
                    width="500px"
                    onApply={(data) => console.log("Reactivated:", data)}
                  />
                ),
              },
              // {
              //   label: "Reactivate Barber",
              //   iconUrl: "/assets/icon/reactivateCustomer.svg",
              //   type: "popUp",
              //   component: (
              //     <PopupForm
              //       config={reactivateBarberConfig}
              //       width="500px"
              //       onApply={(data) => console.log("Reactivated barber:", data)}
              //     />
              //   ),
              // },
              {
                label: "Delete Barber",
                iconUrl: "/assets/icon/deleteBarbershop.svg",
                type: "popUp",
                component: (
                  <PopupForm
                    config={deleteBarberConfig}
                    width="500px"
                    onApply={(data) => console.log("Deleted:", data)}
                  />
                ),
              },
            ];
          }

          return [];
        },
      },
    },
  },
];
