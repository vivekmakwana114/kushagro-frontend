"use client";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import Standard_Avatar from "@/components/grid/user";
import PhoneComponent from "./phoneComponent";
import DateFormateComponent from "./dateFormateComponent";
import CurrencyComponent from "./currencyComponent";
import BadgeComponent from "./badgeComponent";
import ActionComponent from "./actionComponent";

import IdImageComponent from "./idImageComponent";
import TimeRangeCell from "../ui/timerangecell";
import Image from "next/image";

const GridCommonComponent = ({
  data = [],
  options = {},
  theme = {},
  columns,
  bulkActionsConfig = [],
}) => {
  const { select = false, order = false, sortable = false } = options;
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const [sortedData, setSortedData] = useState(data || []);
  useEffect(() => setSortedData(data || []), [data]);

  const sortData = (key, column) => {
    let direction = "asc";

    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sorted = [...sortedData].sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];

      const getVal = (v) => {
        if (v && typeof v === "object") {
          return v.name || v.email || Object.values(v)[0] || "";
        }
        return v ?? "";
      };

      const valA = getVal(aVal);
      const valB = getVal(bVal);

      const isNumber = !isNaN(parseFloat(valA)) && !isNaN(parseFloat(valB));
      const isAlphaNumeric =
        typeof valA === "string" && /[a-zA-Z]/.test(valA) && /\d/.test(valA);

      if (isNumber) {
        return direction === "asc"
          ? parseFloat(valA) - parseFloat(valB)
          : parseFloat(valB) - parseFloat(valA);
      }

      if (isAlphaNumeric || typeof valA === "string") {
        return direction === "asc"
          ? valA.localeCompare(valB, undefined, {
              numeric: true,
              sensitivity: "base",
            })
          : valB.localeCompare(valA, undefined, {
              numeric: true,
              sensitivity: "base",
            });
      }

      return 0;
    });

    setSortConfig({ key, direction });
    setSortedData(sorted);
  };

  useEffect(() => {
    if (data.length > 0) {
      setSelectAll(selectedRows.length === data.length);
    }
  }, [selectedRows, data.length]);

  const handleRowSelect = (rowIndex) => {
    setSelectedRows((prev) =>
      prev.includes(rowIndex)
        ? prev.filter((index) => index !== rowIndex)
        : [...prev, rowIndex]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((_, index) => index));
    }
  };

  const toggleCardExpansion = (cardIndex) => {
    setExpandedCard(expandedCard === cardIndex ? null : cardIndex);
  };

  const getNestedValue = (obj, path) => {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
  };

  const renderCellContent = (column, value, row, context = {}) => {
    if (column?.render) {
      return column?.render(value);
    }

    // Recent activity Component using grid
    if (column.component?.type === "activity_cell") {
      const { profile, description, time } = value || {};
      return (
        <div className="flex items-start space-x-3">
          <img
            src={profile}
            alt="User"
            className={`${column.component.style.radius || "rounded-full"} ${
              column.component.style.size || "w-10 h-10"
            } ${column.component.style.border || ""}`}
          />
          <div className="flex flex-col">
            <span className="text-black text-sm font-medium whitespace-normal line-clamp-2 md:line-clamp-3 lg:line-clamp-4">
              {description}
            </span>
            <span className="text-xs text-[var(--color-placeholder-color)] mt-1">
              {time}
            </span>
          </div>
        </div>
      );
    }

    if (column.isObject) {
      const structuredData = {};
      if (column.structure) {
        Object.keys(column.structure).forEach((key) => {
          const path = column.structure[key];
          structuredData[key] = getNestedValue(value, path);
        });
      } else {
        Object.assign(structuredData, value);
      }

      if (column.component) {
        switch (column.component.type) {
          case "standard_avatar":
            return (
              <Standard_Avatar
                user={structuredData}
                {...column.component.props}
                style={column.component.style}
              />
            );
          default:
            break;
        }
      }

      return JSON.stringify(structuredData);
    }

    if (column.component) {
      switch (column.component.type) {
        case "standard_avatar":
          return (
            <Standard_Avatar
              user={{ name: value }}
              {...column.component.props}
              style={column.component.style}
            />
          );
        case "phone":
          let phoneStyle = column.component.style;
          if (context.isMobile && column.mobileStack) {
            phoneStyle = { ...phoneStyle, whiteSpace: "normal" };
          }
          return (
            <PhoneComponent
              data={value}
              {...column.component.props}
              style={phoneStyle}
            />
          );
        case "date":
          return (
            <DateFormateComponent
              data={value}
              {...column.component.options}
              style={column.component.style}
            />
          );
        case "currency":
          return (
            <CurrencyComponent
              data={value}
              {...column.component.options}
              style={column.component.style}
            />
          );
        case "badge":
          return (
            <BadgeComponent
              data={value}
              {...column.component?.options}
              style={column.component?.style}
            />
          );
        case "action":
          return (
            <ActionComponent
              // data={value}
              data={row}
              {...column.component.options}
              style={column.component.style}
            />
          );

        case "timeRange":
          return (
            <TimeRangeCell
              row={row}
              fieldName={column.key}
              onChange={row.onChange}
            />
          );

        case "toggle":
          return (
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={row.active} // your row boolean
                onChange={() => row.onToggle(row.id)}
                className="sr-only peer"
              />
              <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-primary1 transition-colors">
                <span
                  className={`absolute left-0 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out
            ${row.active ? "translate-x-6" : "translate-x-0"}`}
                />
              </div>
            </label>
          );

        case "id_image":
          return (
            <IdImageComponent
              data={value}
              {...column.component.props}
              style={column.component.style}
            />
          );

        default:
          break;
      }
    }

    return value || value === 0 ? value : "-";
  };

  // Desktop/Tablet Table View
  const renderTableView = () => (
    <div className="w-full h-full flex flex-col">
      {/* Container with proper z-index management */}
      <div
        className={`w-full h-full flex flex-col rounded-lg ${
          theme?.border === "border-none"
            ? "border-none"
            : `${theme?.border || "border-[var(--border-admin)]"} border`
        } bg-white overflow-hidden`}
        style={{ position: "relative" }}
      >
        {/* Fixed header container */}
        <div className="overflow-auto flex-1 custom-scroll">
          <div className="min-w-full">
            <table className="w-full text-sm text-left">
              <thead
                className={`text-xs  ${theme?.header?.bg || "bg-gray-100"}`}
                style={{
                  display: theme?.hideHeader ? "none" : "table-header-group",
                }}
              >
                {/* checkbox on the left side in grid */}
                <tr>
                  {select && (
                    <th
                      scope="col"
                      className="px-2  py-3 whitespace-nowrap w-10"
                      style={{
                        position: "sticky",
                        left: 0,
                        top: 0,
                        zIndex: 30,
                        background: theme?.header?.bg || "#f3f4f6", // Default to gray-100 hex if theme missing
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                        // className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        className="w-4 h-4 rounded border border-[var(--color-placeholder-color)]
                        bg-white
                        checked:bg-secondary1 
                        relative cursor-pointer
                        before:content-['✔'] before:absolute before:text-gray-300
                        checked:before:text-white before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2
                        appearance-none
                        flex items-center justify-center"
                      />
                    </th>
                  )}
                  {order && (
                    <th
                      scope="col"
                      className="font-medium px-2 py-3 whitespace-nowrap w-16 text-xs sm:text-sm text-[var(--color-placeholder-color)] sticky top-0 z-20 bg-gray-100"
                    >
                      <span className="font-medium text-black">Rank</span>
                    </th>
                  )}
                  {columns.map((column, index) => (
                    <th
                      key={index}
                      scope="col"
                      className={`px-2 py-3 whitespace-nowrap text-xs sm:text-sm font-medium sticky top-0 z-20 ${
                        theme?.header?.bg || "bg-gray-100"
                      } ${
                        column.sortable === true ||
                        (sortable && column.sortable !== false)
                          ? "cursor-pointer hover:bg-gray-200"
                          : ""
                      }`}
                      onClick={() => {
                        const isColumnSortable =
                          column.sortable === true ||
                          (sortable && column.sortable !== false);
                        if (isColumnSortable) sortData(column.key, column);
                      }}
                    >
                      {/* <div className="flex items-center justify-between">
                        <span className="truncate">{column.title}</span>
                      </div> */}
                      <div
                        className={`flex items-center justify-between w-full gap-1 ${
                          column.sortable === true ||
                          (sortable && column.sortable !== false)
                            ? "cursor-pointer select-none"
                            : ""
                        }`}
                        onClick={() => {
                          const isColumnSortable =
                            column.sortable === true ||
                            (sortable && column.sortable !== false);
                          if (isColumnSortable) sortData(column.key, column);
                        }}
                      >
                        <span className="truncate">{column.title}</span>

                        {(column.sortable === true ||
                          (sortable && column.sortable !== false)) && (
                          <div className="flex flex-col justify-end ml-1">
                            <Image
                              src="/assets/icon/grid_sort_icon.svg"
                              alt="sorting icon"
                              width={18}
                              height={20}
                              className={`${
                                sortConfig.key === column.key &&
                                sortConfig.direction === "asc"
                                  ? "text-secondary1"
                                  : "text-gray-400"
                              }`}
                            />
                          </div>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {sortedData.length === 0 && (
                  <tr>
                    <td
                      colSpan={
                        columns.length + (select ? 1 : 0) + (order ? 1 : 0)
                      }
                      className="px-6 py-12 text-center text-(--color-dull-text)"
                    >
                      No Data Available
                    </td>
                  </tr>
                )}
                {sortedData.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={`${
                      theme?.border === "border-none" ? "" : "border-b"
                    } hover:bg-gray-50 transition-colors h-16 ${
                      selectedRows.includes(rowIndex)
                        ? "bg-gray-100"
                        : "bg-white"
                    }`}
                  >
                    {select && (
                      <td
                        className="px-2 py-3 whitespace-nowrap"
                        style={{
                          position: "sticky",
                          left: 0,
                          zIndex: 10,
                          background: selectedRows.includes(rowIndex)
                            ? "#f3f4f6"
                            : "white",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(rowIndex)}
                          onChange={() => handleRowSelect(rowIndex)}
                          className="w-4 h-4 rounded border border-gray-500
                        bg-white
                        checked:bg-[var(--color-secondary1)] 
                        relative cursor-pointer
                        before:content-['✔'] before:absolute before:text-gray-400
                        checked:before:text-white before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2
                        appearance-none
                        flex items-center justify-center"
                        />
                      </td>
                    )}
                    {order && (
                      <td className="px-2 py-3 whitespace-nowrap text-xs sm:text-sm text-placeholder-color">
                        {rowIndex + 1}
                      </td>
                    )}
                    {columns.map((column, colIndex) => (
                      <td
                        key={colIndex}
                        className={`px-2 py-3 whitespace-nowrap text-xs sm:text-sm
                          ${column.component?.style?.text || "text-black"}
                        `}
                        style={{ minWidth: column.minWidth || "auto" }}
                      >
                        <div className="flex items-center text-[var(--color-dull-text)] justify-start max-w-xs lg:max-w-none ">
                          {/* {renderCellContent(column, row[column.key], row)} */}

                          {renderCellContent(
                            column,
                            column.component?.type === "action"
                              ? row
                              : row[column.key],
                            row
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  // Mobile Card View
  const renderCardView = () => (
    <div className="space-y-3 px-2 sm:px-4">
      {sortedData.map((row, rowIndex) => {
        const isExpanded = expandedCard === rowIndex;
        const primaryColumn =
          columns.find((col) => col.isPrimary) || columns[0];

        return (
          <div
            key={rowIndex}
            className={`bg-white rounded-lg border ${
              theme?.border || "border-gray-200"
            }  shadow-sm ${
              selectedRows.includes(rowIndex)
                ? "ring-2 ring-indigo-500 ring-opacity-50"
                : ""
            }`}
          >
            {/* Card Header */}
            <div className="p-3 sm:p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                {select && (
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(rowIndex)}
                    onChange={() => handleRowSelect(rowIndex)}
                    // className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 flex-shrink-0"
                    className="w-4 h-4 rounded border border-gray-500
                        bg-white
                        checked:bg-secondary1
                        relative cursor-pointer
                        before:content-['✔'] before:absolute before:text-gray-400
                        checked:before:text-white before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2
                        appearance-none
                        flex items-center justify-center"
                  />
                )}

                {order && (
                  <div className="flex-shrink-0 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-600">
                      {rowIndex + 1}
                    </span>
                  </div>
                )}

                {/* Primary content */}
                <div className="flex-1 min-w-0">
                  <div className="text-sm">
                    {renderCellContent(
                      primaryColumn,
                      row[primaryColumn.key],
                      row
                    )}
                  </div>
                </div>
              </div>

              {/* Expand/Collapse Button */}
              <button
                onClick={() => toggleCardExpansion(rowIndex)}
                className={`ml-2 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0 ${
                  // Hide expand button if all non-primary columns are nonExpandable like activity_cell -- Activity section Component
                  columns.filter((col) => !col.isPrimary && !col.nonExpandable)
                    .length === 0
                    ? "hidden"
                    : ""
                }`}
                aria-label={isExpanded ? "Collapse" : "Expand"}
              >
                {isExpanded ? (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 12H4"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* Expanded Card Content */}
            {isExpanded && (
              <div className="border-t border-gray-100 bg-gray-50">
                <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
                  {columns // skip the nonExpandable columns
                    .filter(
                      (column) => !column.isPrimary && !column.nonExpandable
                    )
                    .map((column, colIndex) => {
                      // Check for mobileStack property
                      const isStacked = column.mobileStack;

                      return (
                        <div
                          key={colIndex}
                          className={`${
                            isStacked
                              ? "flex flex-col items-start py-2" // Stacked layout
                              : "flex justify-between items-center py-1 sm:py-2" // Default layout
                          } border-b border-gray-200 last:border-b-0 min-h-[2rem]
                        ${column.component?.style?.text}`}
                        >
                          <span
                            className={`text-xs sm:text-sm font-medium text-gray-600 flex-shrink-0 ${
                              isStacked ? "mb-1 w-full" : "w-24 sm:w-32"
                            }`}
                          >
                            {column.title}
                          </span>
                          <div
                            className={`text-xs sm:text-sm text-gray-900 ${
                              isStacked
                                ? "w-full text-left"
                                : "text-right flex-1 min-w-0 ml-2"
                            }`}
                          >
                            <div
                              className={`flex ${
                                isStacked
                                  ? "items-start w-full"
                                  : "items-center justify-end w-full"
                              }`}
                            >
                              {renderCellContent(
                                column,
                                row[column.key],
                                row,
                                { isMobile: true } // context
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        );
      })}
      {sortedData.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-(--color-dull-text)">
          <p>No Data Available</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full max-w-full h-full flex flex-col">
      {/* Tablet and Desktop view */}
      <div className="hidden sm:flex h-full flex-col">{renderTableView()}</div>

      {/* Mobile view (320px and up) */}
      <div className="block sm:hidden h-full overflow-y-auto custom-scroll">
        {/* Mobile Header with Select All */}
        {select && (
          <div className="mb-3 mx-2 p-3 bg-gray-50 rounded-lg">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
                className="w-4 h-4 rounded border border-gray-500
                        bg-white
                        checked:bg-secondary1
                        relative cursor-pointer
                        before:content-['✔'] before:absolute before:text-gray-400
                        checked:before:text-white before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2
                        appearance-none
                        flex items-center justify-center"
              />
              <span className="text-sm font-medium text-gray-700">
                Select All ({selectedRows.length} selected)
              </span>
            </label>
          </div>
        )}

        {renderCardView()}
      </div>

      {/* Bulk Actions Bar */}
      {selectedRows.length > 0 && (
        <div className="w-full mt-4 flex justify-center">
          <div className="w-full max-w-full bg-white border rounded-lg shadow-sm p-3 flex justify-center gap-8 items-center">
            {/* <ActionComponent */}

            {bulkActionsConfig.map((actionSet, index) => (
              <ActionComponent
                key={index}
                data={selectedRows.map((i) => data[i])}
                actions={[actionSet]}
                selectedRows={selectedRows.map((i) => data[i])}
                direct
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

GridCommonComponent.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  options: PropTypes.shape({
    select: PropTypes.bool,
    order: PropTypes.bool,
    sortable: PropTypes.bool,
  }),
  theme: PropTypes.shape({
    border: PropTypes.string,
    header: PropTypes.shape({
      bg: PropTypes.string,
    }),
  }),
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      isObject: PropTypes.bool,
      isPrimary: PropTypes.bool,
      sortable: PropTypes.bool,
      minWidth: PropTypes.string,
      structure: PropTypes.object,
      render: PropTypes.func,
      component: PropTypes.shape({
        type: PropTypes.string,
        variant: PropTypes.string,
        props: PropTypes.object,
        options: PropTypes.object,
        style: PropTypes.object,
      }),
    })
  ).isRequired,
  onSort: PropTypes.func,

  bulkActionsConfig: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      iconUrl: PropTypes.string,
      component: PropTypes.node,
      children: PropTypes.array,
    })
  ),
};

export default GridCommonComponent;
