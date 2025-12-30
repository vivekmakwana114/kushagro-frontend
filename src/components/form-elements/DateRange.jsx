import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar1 } from "lucide-react";

/**
 * DateRange Component
 * Renders two date inputs (From and To).
 * @param {string} label - Label for the group
 * @param {Date|null} from - Start date
 * @param {Date|null} to - End date
 * @param {Function} onFromChange - (date) => void
 * @param {Function} onToChange - (date) => void
 */
const DateRange = ({ label, from, to, onFromChange, onToChange }) => {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium mb-2 mt-2 text-[var(--color-dull-text)]">
          {label}
        </label>
      )}
      <div className="flex gap-2 flex-wrap sm:flex-nowrap">
        <div className="relative w-full sm:w-1/2">
          <DatePicker
            selected={from}
            onChange={onFromChange}
            placeholderText="From"
            dateFormat="dd-MM-yyyy"
            className="w-full border border-[var(--border-admin)] px-3 py-2 pr-10 rounded text-black cursor-pointer focus:outline-none focus:border-[var(--color-secondary1)]"
          />
          <Calendar1
            className="absolute right-3 top-1/2 -translate-y-1/2 text-black pointer-events-non"
            size={18}
          />
        </div>
        <div className="relative w-full sm:w-1/2">
          <DatePicker
            selected={to}
            onChange={onToChange}
            placeholderText="To"
            dateFormat="dd-MM-yyyy"
            className="w-full border border-[var(--border-admin)] px-3 py-2 pr-10 rounded text-black cursor-pointer focus:outline-none focus:border-[var(--color-secondary1)]"
          />
          <Calendar1
            className="absolute right-3 top-1/2 -translate-y-1/2 text-black pointer-events-none"
            size={18}
          />
        </div>
      </div>
    </div>
  );
};

export default DateRange;
