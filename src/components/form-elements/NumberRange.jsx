import React from "react";

/**
 * NumberRange Component
 * Renders two number inputs (From and To).
 * @param {string} label - Label for the group
 * @param {number|string} from - Start value
 * @param {number|string} to - End value
 * @param {Function} onFromChange - (value) => void
 * @param {Function} onToChange - (value) => void
 */
const NumberRange = ({ label, from, to, onFromChange, onToChange }) => {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium mb-2 text-[var(--color-dull-text)]">
          {label}
        </label>
      )}
      <div className="flex gap-2 flex-wrap sm:flex-nowrap">
        <input
          type="number"
          placeholder="From"
          className="w-full sm:w-1/2 border border-[var(--border-admin)] px-2 py-1 rounded focus:outline-none focus:border-[var(--color-secondary1)]"
          value={from || ""}
          onChange={(e) => onFromChange(e.target.value)}
        />
        <input
          type="number"
          placeholder="To"
          className="w-full sm:w-1/2 border border-[var(--border-admin)] px-2 py-1 rounded focus:outline-none focus:border-[var(--color-secondary1)]"
          value={to || ""}
          onChange={(e) => onToChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default NumberRange;
