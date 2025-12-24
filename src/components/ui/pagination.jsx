"use client";
import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}) => {
  // Helper to build visible page numbers (1 2 3 ... 10)
  const getVisiblePages = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };

  return (
    <div className={`flex justify-end items-center mt-4 ${className}`}>
      <div className="flex items-center gap-1 text-sm">
        {/* Prev Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 border w-8 h-8 rounded-sm text-[var(--color-placeholder-color)]
            ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-[color-mix(in_srgb,var(--color-primary1)_10%,transparent)]"
            }`}
        >
          &lt;
        </button>

        {/* Page Numbers */}
        {getVisiblePages().map((page, index) =>
          page === "..." ? (
            <span key={index} className="px-2 select-none">
              ...
            </span>
          ) : (
            <button
              key={index}
              onClick={() => onPageChange(page)}
              className={`w-8 h-8 border rounded-sm flex items-center justify-center 
                transition-colors duration-150 ${
                  currentPage === page
                    ? "bg-[var(--color-secondary1)] text-white border-[var(--color-secondary1)]"
                    : "text-[var(--color-placeholder-color)] hover:bg-[color-mix(in_srgb,var(--color-secondary1)_10%,transparent)]"
                }`}
            >
              {page}
            </button>
          )
        )}

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 border w-8 h-8 rounded-sm text-[var(--color-placeholder-color)] 
            ${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-[color-mix(in_srgb,var(--color-primary1)_10%,transparent)]"
            }`}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
