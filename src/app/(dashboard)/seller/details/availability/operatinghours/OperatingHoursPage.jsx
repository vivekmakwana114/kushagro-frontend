"use client";
import GridCommonComponent from "@/components/grid/gridCommonComponent";
import React from "react";
import { operatingHoursColumns } from "./operatingHoursColumns";
import { operatingHoursData } from "./operatingHoursData";

const OperatingHoursPage = () => {
  const [data, setData] = React.useState(operatingHoursData);

  const handleTimeChange = (id, value) => {
    setData((prev) =>
      prev.map((row) => (row.id === id ? { ...row, ...value } : row))
    );
  };

  const handleToggle = (id) => {
    setData((prev) =>
      prev.map((row) => (row.id === id ? { ...row, active: !row.active } : row))
    );
  };
  const options = {
    select: false,
    order: true,
    sortable: true,
  };
  return (
    <div className="w-full border rounded-lg p-4">
      <div className="mt-2">
        <h2 className="text-lg font-semibold mb-2">Operating Hours</h2>

        <GridCommonComponent
          data={data.map((row) => ({
            ...row,
            onChange: handleTimeChange,
            onToggle: handleToggle,
          }))}
          columns={operatingHoursColumns}
          theme={{
            border: "border-gray-300",
            header: { bg: "bg-gray-100" },
          }}
        />
      </div>
    </div>
  );
};

export default OperatingHoursPage;
