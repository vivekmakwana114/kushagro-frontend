import React from "react";

/**
 * TextArea Component
 * Renders a textarea input with consistent styling.
 * @param {string} label - Label for the textarea
 * @param {string} value - Current value
 * @param {Function} onChange - (value) => void
 * @param {string} placeholder - Placeholder text
 * @param {number} rows - Number of rows (default: 4)
 * @param {string} className - Additional CSS classes
 * @param {boolean} disabled - Whether the textarea is disabled
 * @param {boolean} required - Whether the textarea is required
 */
const TextArea = ({
  label,
  value,
  onChange,
  placeholder = "",
  rows = 4,
  className = "",
  disabled = false,
  required = false,
}) => {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium mb-2 text-dull-text">
          {label}
          {required && <span className="text-red ml-1">*</span>}
        </label>
      )}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        required={required}
        className={`w-full border border-(--border-admin) px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-secondary1 resize-none ${
          disabled ? "bg-gray-50 cursor-not-allowed" : ""
        } ${className}`}
      />
    </div>
  );
};

export default TextArea;
