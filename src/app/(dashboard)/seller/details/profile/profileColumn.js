"use client";

export const hoursColumns = [
  {
    key: "day",
    title: "Day",
    isObject: false,
    component: {
      type: "",
      style: {
        radius: "rounded-full",
      },
    },
  },

  {
    key: "time",
    title: "Timing",
    component: {
      type: "date",
      style: {},
      options: {
        format: "h:mm a  h:mm a",
      },
    },
  },
];

// contactColumn.js
import React from "react";

export const contactColumn = [
  {
    key: "label",
    // title: "Field",
    render: (row) => row.label || "-",
  },
  {
    key: "value",
    // title: "Value",
    render: (row) => {
      const value = row.value;

      if (React.isValidElement(value)) return value;

      if (typeof value === "string" || typeof value === "number") return value;

      if (typeof value === "object" && value !== null)
        return JSON.stringify(value);

      return "-";
    },
  },
];
