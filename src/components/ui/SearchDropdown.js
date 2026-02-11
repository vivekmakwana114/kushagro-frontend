import React, { useState, useEffect } from "react";
import Image from "next/image";

export const SearchDropdown = ({ field, formData, handleSelectClient }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (field.options?.fetchOptions) {
      field.options.fetchOptions(searchText).then(setOptions);
    }
  }, [searchText, field.options]);

  return (
    <div className="relative w-full">
      {field.label && (
        <label className="block mb-1 font-medium">{field.label}</label>
      )}

      {/* <div
        className="border rounded p-2 flex items-center justify-between cursor-pointer"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <span className="text-gray-400">
          {field.options?.placeholder || "Select..."}
        </span>
      </div> */}

      <div className="relative">
      <input
        type="text"
        value={
          formData[field.key]
            ? field.options.renderSelectedText?.(formData[field.key]) ||
              formData[field.key].name
            : searchText
        }
        onClick={() => setDropdownOpen(true)}
        onChange={(e) => {
          setSearchText(e.target.value);
          setDropdownOpen(true);
          // If user types, clear selection
          if (formData[field.key]) {
            handleSelectClient(null);
          }
        }}
        placeholder={field.options?.placeholder || "Select..."}
        className="w-full border rounded p-2 outline-none"
      />
      </div>

      {dropdownOpen && (
        <div className="absolute z-10 w-full bg-white border mt-1 rounded shadow max-h-60 overflow-y-auto">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search..."
            className="w-full border-b p-2 outline-none"
          />
          {options.map((option) => (
            <div
              key={option[field.options.valueKey || "id"]}
              className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
              onClick={() => {
                handleSelectClient(option);
                setDropdownOpen(false);
                setSearchText("");
              }}
            >
              {field.options?.renderOption ? (
                field.options.renderOption(option)
              ) : (
                <span>{option.label}</span>
              )}
            </div>
          ))}
          {options.length === 0 && (
            <div className="p-2 text-gray-500">No results found</div>
          )}
        </div>
      )}

      {/* Render selected user below the dropdown */}
      {formData[field.key] && (
        <div className="mt-2">
          {field.options.renderSelected(formData[field.key])}
        </div>
      )}
    </div>
  );
};
