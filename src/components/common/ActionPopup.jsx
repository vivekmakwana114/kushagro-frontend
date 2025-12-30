import React, { useState } from "react";
import { X } from "lucide-react";
import SelectCheckbox from "../form-elements/SelectCheckbox";

/**
 * ActionPopup Component
 * A reusable modal for confirming actions with custom content or built-in form fields.
 *
 * @param {boolean} isOpen - Whether the popup is open
 * @param {Function} onClose - Function to close the popup
 * @param {string} heading - Main title of the popup
 * @param {string|Array} subHeading - Description text or array of strings
 * @param {Function} onConfirm - Function to call on confirm
 * @param {Function} onApply - Alias for onConfirm
 * @param {Function} onCancel - Function to call on cancel (defaults to onClose)
 * @param {string} confirmText - Text for confirm button
 * @param {string} cancelText - Text for cancel button
 * @param {string} confirmColor - Color theme for confirm button ('red', 'green', 'primary')
 * @param {React.ReactNode} children - Custom content (forms, etc.)
 *
 * Form Props:
 * @param {Array} dropdownOptions - Options for SelectCheckbox [{label, value}]
 * @param {string} dropdownLabel - Label for SelectCheckbox
 * @param {string} dropdownPlaceholder - Placeholder for SelectCheckbox
 * @param {boolean} showTextarea - Whether to show the textarea
 * @param {string} textareaLabel - Label for textarea
 * @param {string} textareaPlaceholder - Placeholder for textarea
 */
const ActionPopup = ({
  isOpen,
  onClose,
  heading,
  subHeading,
  onConfirm,
  onApply,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "primary",
  children,
  // Form props
  dropdownOptions,
  dropdownLabel,
  dropdownPlaceholder,
  showTextarea,
  textareaLabel = "Note",
  textareaPlaceholder = "Add a Note",
}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [note, setNote] = useState("");

  if (!isOpen) return null;

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      onClose();
    }
    // Reset state on close/cancel
    setSelectedOptions([]);
    setNote("");
  };

  const handleConfirm = () => {
    const data = {
      selectedOptions,
      note,
    };
    if (onApply) onApply(data);
    else if (onConfirm) onConfirm(data);

    // Reset state
    setSelectedOptions([]);
    setNote("");
  };

  const getButtonColor = () => {
    switch (confirmColor) {
      case "red":
        return "bg-[#DC2626] hover:bg-red-700 text-white";
      case "green":
        return "bg-green-600 hover:bg-green-700 text-white";
      case "primary":
      default:
        return "bg-[var(--color-secondary1)] hover:bg-opacity-90 text-white";
    }
  };

  return (
    <div className="fixed inset-0 z-1000 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 transition-opacity"
        onClick={handleCancel}
      />

      {/* Modal Content */}
      <div className="relative z-1001 bg-white rounded-lg shadow-xl w-full max-w-[500px] animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">{heading}</h2>
            {subHeading && (
              <p className="text-sm text-gray-500 leading-relaxed text-wrap wrap-break-word">
                {subHeading}
              </p>
            )}
          </div>

          {/* Built-in Form Fields */}
          {(dropdownOptions || showTextarea) && (
            <div className="space-y-4 text-left  mb-6">
              {dropdownOptions && (
                <SelectCheckbox
                  label={dropdownLabel}
                  placeholder={dropdownPlaceholder}
                  options={dropdownOptions}
                  value={selectedOptions}
                  onChange={setSelectedOptions}
                />
              )}

              {(showTextarea ||
                (dropdownOptions && selectedOptions.includes("Other"))) && (
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    {textareaLabel}{" "}
                    <span className="text-gray-400 font-normal">
                      (optional)
                    </span>
                  </label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder={textareaPlaceholder}
                    rows={4}
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[var(--color-secondary1)] focus:border-transparent outline-none resize-none"
                  />
                </div>
              )}
            </div>
          )}

          {/* Custom Content */}
          {children && <div className="mb-6">{children}</div>}

          {/* Footer Actions */}
          <div className="flex gap-3">
            {cancelText && (
              <button
                onClick={handleCancel}
                className="flex-1 px-4 py-2.5 bg-white border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                {cancelText}
              </button>
            )}
            <button
              onClick={handleConfirm}
              className={`flex-1 px-4 py-2.5 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${getButtonColor()}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionPopup;
