"use client";

import React from "react";
import HolidayPage from "./holiday/HolidayPage";
import OperatingHoursPage from "./operatinghours/OperatingHoursPage";

const AvailabilityPage = () => {
  const options = {
    select: false,
    order: true,
    sortable: true,
  };
  return (
    <div className="w-full h-full">
      <div className="pb-5">
        <OperatingHoursPage />
      </div>
      <div className="pb-5">
        <HolidayPage />
      </div>
    </div>
  );
};

export default AvailabilityPage;
