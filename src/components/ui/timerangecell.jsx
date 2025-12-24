"use client";
import React, { useState } from "react";

const TimeRangeCell = ({ row, fieldName, onChange }) => {
  // Initialize state with row value
  const [showGrid, setShowGrid] = useState(false);
  const [selectedTime, setSelectedTime] = useState(
    row[fieldName]?.split(" ")[0] || "8:00"
  );
  const [selectedPeriod, setSelectedPeriod] = useState(
    row[fieldName]?.includes("PM") ? "PM" : "AM"
  );

  // Generate half-hourly times from 8:00 to 19:30
  const generateHalfHourlyTimes = () => {
    const times = [];
    for (let h = 8; h < 20; h++) {
      times.push(`${h}:00`);
      times.push(`${h}:30`);
    }
    return times;
  };
  const times = generateHalfHourlyTimes();

  // Handle time selection
  const handleSelectTime = (time) => {
    setSelectedTime(time);
    onChange(row.id, { [fieldName]: `${time} ${selectedPeriod}` });
    setShowGrid(false); // close grid after selection
  };

  // Handle AM/PM toggle
  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
    onChange(row.id, { [fieldName]: `${selectedTime} ${period}` });
  };

  const isDisabled = row.active === false;

  return (
    <div className={`relative w-24 ${isDisabled ? "cursor-not-allowed opacity-60" : ""}`}>
      {/* Cell */}
      <div
        className={`w-full h-10 border rounded flex items-center justify-center text-sm font-medium transition-colors
          ${
            isDisabled
              ? "bg-gray-100 text-gray-400 border-gray-200 pointer-events-none"
              : "border-[var(--color-primary1)] text-[var(--color-primary1)] bg-white cursor-pointer hover:bg-gray-50"
          }`}
        onClick={() => !isDisabled && setShowGrid((prev) => !prev)}
      >
        {`${selectedTime} ${selectedPeriod}`}
      </div>

      {/* Time Grid Dropdown */}
      {showGrid && (
        <div className="absolute z-10 mt-1 p-2 bg-white border rounded shadow-lg w-full max-w-xs sm:w-[255px] max-h-60 overflow-auto left-0">
          {/* AM/PM Toggle */}
          <div className="flex justify-end mb-2">
            {["AM", "PM"].map((period) => (
              <button
                key={period}
                onClick={() => handlePeriodChange(period)}
                className={`px-2 py-1 text-sm rounded border ml-1 ${
                  selectedPeriod === period
                    ? "bg-[var(--color-primary1)] text-white border-[var(--color-primary1)]"
                    : "bg-white text-black border-[var(--border-admin)]"
                }`}
              >
                {period}
              </button>
            ))}
          </div>

          {/* Time grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {times.map((time) => (
              <div
                key={time}
                onClick={() => onSelect(time)}
                className={`text-sm p-2 text-center border rounded cursor-pointer hover:bg-[var(--color-primary1)] hover:text-white ${
                  selectedTime === time ? "bg-[var(--color-primary1)] text-white" : ""
                }`}
              >
                {time}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeRangeCell;
