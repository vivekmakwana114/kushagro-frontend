import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

/**
 * CheckboxGroup Component
 * Renders a labeled group of checkboxes.
 * @param {string} label - Group label
 * @param {boolean} showLabel - Whether to show the label
 * @param {Array} options - Array of {label, value} objects
 * @param {Array} value - Array of currently selected values
 * @param {Function} onChange - Callback (newValues) => void
 */
const CheckboxGroup = ({
  label,
  showLabel = true,
  options = [],
  value = [],
  onChange,
  singleSelect = false,
}) => {
  const handleCheck = (optionValue, isChecked) => {
    let newValue;
    if (singleSelect) {
      if (isChecked) {
        newValue = [optionValue];
      } else {
        newValue = [];
      }
    } else {
      if (isChecked) {
        // Add if not present
        if (!value.includes(optionValue)) {
          newValue = [...value, optionValue];
        } else {
          newValue = value;
        }
      } else {
        // Remove
        newValue = value.filter((v) => v !== optionValue);
      }
    }
    onChange(newValue);
  };

  return (
    <div className="mb-4">
      {showLabel && label && (
        <label className="block text-sm font-medium mb-2 text-[var(--color-dull-text)]">
          {label}
        </label>
      )}
      <div className="flex flex-row gap-6 flex-wrap">
        {options.map((option) => {
          const isChecked = value.includes(option.value);
          return (
            <label
              key={option.value}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => handleCheck(option.value, e.target.checked)}
                className="w-4 h-4 rounded border border-[var(--border-admin)]
                bg-white
                checked:bg-[var(--color-secondary1)] 
                relative cursor-pointer
                before:content-['✔'] before:absolute before:text-[var(--color-dull-text)]
                checked:before:text-white before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2
                appearance-none
                flex items-center justify-center"
              />
              <span className="ml-1 text-sm font-medium text-[var(--color-dull-text)]">
                {option.label}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default CheckboxGroup;
