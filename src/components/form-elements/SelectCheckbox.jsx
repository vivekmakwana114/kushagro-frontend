"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";

/**
 * SelectCheckbox Component
 * Renders a dropdown with checkboxes for multi-selection.
 * Displays selected items as tags below the dropdown.
 *
 * @param {string} label - Label for the input
 * @param {string} placeholder - Placeholder text
 * @param {Array} options - Array of {label, value} objects
 * @param {Array} value - Array of selected values
 * @param {Function} onChange - Callback (newValues) => void
 */
const SelectCheckbox = ({
  label,
  placeholder = "Select Options",
  options = [],
  value = [],
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggleOption = (optionValue) => {
    const newValue = value.includes(optionValue)
      ? value.filter((v) => v !== optionValue)
      : [...value, optionValue];
    onChange(newValue);
  };

  const handleRemoveTag = (optionValue) => {
    const newValue = value.filter((v) => v !== optionValue);
    onChange(newValue);
  };

  const selectedOptions = options.filter((opt) => value.includes(opt.value));

  return (
    <div className="w-full relative mb-4" ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-medium mb-2 text-[var(--color-dull-text)]">
          {label}
        </label>
      )}

      {/* Trigger Area */}
      <div
        className="relative w-full border border-[var(--border-admin)] rounded-md bg-[var(--color-gray-1)] min-h-[42px] cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between p-2">
          <span className="text-sm text-[var(--color-dull-text)]">
            {selectedOptions.length > 0
              ? `${selectedOptions.length} Selected`
              : placeholder}
          </span>
          <ChevronDown
            size={16}
            className={`transition-transform text-[var(--color-dull-text)] ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-[var(--border-admin)] rounded-md shadow-lg max-h-60 overflow-y-auto [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:bg-transparent [-ms-overflow-style:none] [scrollbar-width:none]">
          {options.length === 0 ? (
            <div className="px-3 py-2 text-sm text-gray-500">
              No options available
            </div>
          ) : (
            options.map((option) => {
              const isSelected = value.includes(option.value);
              return (
                <div
                  key={option.value}
                  className={`flex items-center px-3 py-2 cursor-pointer hover:bg-gray-50 ${
                    isSelected ? "bg-gray-50" : ""
                  }`}
                  onClick={() => handleToggleOption(option.value)}
                >
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {}} 
                      className="w-4 h-4 rounded border border-[var(--border-admin)]
                        bg-white
                        checked:bg-[var(--color-secondary1)] 
                        relative cursor-pointer
                        before:content-['✔'] before:absolute before:text-[var(--color-dull-text)]
                        checked:before:text-white before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2
                        appearance-none
                        flex items-center justify-center mr-2 pointer-events-none"
                    />
                    <span
                      className={`text-sm ${
                        isSelected
                          ? "text-[var(--color-secondary1)] font-medium"
                          : "text-[var(--color-dull-text)]"
                      }`}
                    >
                      {option.label}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Selected Options Below Dropdown */}
      {selectedOptions.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {selectedOptions.map((opt) => (
            <div
              key={opt.value}
              className="flex items-center gap-1 bg-[#E8F5E9] text-[var(--color-secondary1)] px-2 py-1 rounded text-xs font-medium"
            >
              <span>{opt.label}</span>
              <div
                onClick={() => handleRemoveTag(opt.value)}
                className="cursor-pointer text-[var(--color-secondary1)] hover:text-red flex items-center group"
              >
                <X size={12} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectCheckbox;
