"use client";
import React, { useState } from "react";
import FileUpload from "./FileUpload";
import InputField from "./InputRegistry";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar1, ChevronDown, X } from "lucide-react";
import { SearchDropdown } from "@/app/(dashboard)/booking/SearchDropdown";
import Image from "next/image";

const DynamicForm = ({ config, onCancel, onApply, onSubmit, onChange }) => {
  const [formData, setFormData] = useState({});
  const [durationDropdowns, setDurationDropdowns] = useState({});
  const [showDropdowns, setShowDropdowns] = useState({});
  const [showCalendars, setShowCalendars] = useState({});
  const [timePeriods, setTimePeriods] = useState({});
  const [searchTerms, setSearchTerms] = useState({});
  const [thumbnailImages, setThumbnailImages] = useState(
    () => config?.fields?.find((f) => f.type === "thumbnailList")?.images || []
  );

  const handleChange = React.useCallback((e, fieldName) => {
    const { value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [fieldName]: type === "checkbox" ? checked : value,
    }));
  }, []);

  const handleSelectClient = (client) => {
    setFormData((prev) => ({
      ...prev,
      existingClient: client,
    }));
  };

  const handleApply = () => {
    onChange?.(formData); // live update parent
    onSubmit?.(formData); // trigger submission callback
    onApply?.(formData);
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
  };

  const renderField = (field) => {
    const commonProps = {
      name: field.name,
      value: formData[field.name] || "",
      onChange: (e) => handleChange(e, field.name),
      placeholder: field.placeholder || "",
      style: field.css || {},
      className:
        "form-field w-full border border-[var(--border-admin)] rounded-md",
    };

    switch (field.type) {
      case "header":
        return <h2 className="text-lg font-bold">{field.label}</h2>;

      case "subheader":
        return (
          <p className="text-sm text-[var(--color-placeholder-color)] break-words leading-relaxed">
            {field.text}
          </p>
        );

      case "textBlock":
        return (
          <p
            className="text-xs text-[var(--color-dull-text)] sm:text-sm break-words"
            style={field.css}
          >
            {field.content || field.label}
          </p>
        );

      case "divider":
        return <hr className="border-[var(--border-admin)] my-3 sm:my-4" />;

      case "toggle":
        return (
          <div className="flex items-start mb-4 gap-2">
            {field.options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, [field.name]: opt.value }))
                }
                className={`px-4 py-2 rounded-md border flex-1 font-medium ${
                  formData[field.name] === opt.value
                    ? "bg-[var(--color-primary1)] text-white border-[var(--color-primary1)]"
                    : "bg-white text-[var(--color-dull-text)] border-[var(--border-admin)]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        );

      case "conditional":
        return field.condition(formData)
          ? field.fields.map((subField, idx) => (
              <div key={`${subField.name || subField.type}-${idx}`}>
                {renderField(subField)}
              </div>
            ))
          : null;

      case "inputGroup":
        const columns = field.columns || 2;
        let colClass = "md:grid-cols-2";

        if (columns === 3) {
          colClass = "lg:grid-cols-3";
        } else if (columns === 4) {
          colClass = "lg:grid-cols-4";
        }

        return (
          <div
            className={`grid grid-cols-1 ${colClass} gap-4 whitespace-nowrap`}
          >
            {field.fields.map((subField, idx) => (
              <div key={`${subField.name || subField.type}-${idx}`}>
                {renderField(subField)}
              </div>
            ))}
          </div>
        );

      case "thumbnailList":
        const handleRemove = (index) => {
          const updated = thumbnailImages.filter((_, i) => i !== index);
          setThumbnailImages(updated);
          setFormData((prev) => ({ ...prev, [field.name]: updated }));
          field.onChange?.(updated); //
        };

        return (
          <div className="flex flex-wrap gap-3 mt-2">
            {thumbnailImages.map((img, idx) => (
              <div
                key={idx}
                className="relative w-18 h-16 rounded-lg overflow-hidden border border-[var(--border-admin)]"
              >
                <img
                  src={img.src}
                  alt={img.alt || `image-${idx}`}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => handleRemove(idx)}
                  className="absolute top-1 right-1 bg-[var(--color-placeholder-color)] text-white text-xs rounded-full p-1 hover:bg-[var(--color-red)]"
                  title="Remove"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        );

      case "search_dropdown":
        return (
          <SearchDropdown
            field={field}
            formData={formData}
            handleSelectClient={handleSelectClient}
          />
        );

      case "radioWithConditionalDropdown":
        const selected = formData[field.name] || "";
        const showDropdown = showDropdowns[field.name] || {};
        const [imageLoaded, setImageLoaded] = useState({});

        return (
          <div className="w-full relative mb-4">
            <label className="block text-sm font-medium mb-2  text-[var(--color-dull-text)]">
              {field.label}
            </label>

            <div className="flex flex-col gap-4">
              {field.options.map((opt) => {
                const isSelected = selected === opt.value;
                const optKey = opt.value;
                const optShowDropdown = showDropdown[optKey] || false;

                const selectedSubOptions =
                  opt.dropdownOptions?.filter(
                    (o) => formData[`${field.name}_${o.value}`]
                  ) || [];

                return (
                  <div key={opt.value} className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <div
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            [field.name]: opt.value,
                          }));

                          setShowDropdowns((prev) => ({
                            ...prev,
                            [field.name]: {},
                          }));
                        }}
                        className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          isSelected
                            ? "border-[var(--color-primary1)]"
                            : "border-[var(--border-admin)]"
                        }`}
                      >
                        {isSelected && (
                          <div className="w-2.5 h-2.5 bg-[var(--color-primary1)] rounded-full" />
                        )}
                      </div>
                      <span
                        className={`text-sm ${
                          isSelected
                            ? " text-[var(--color-primary1)]"
                            : " text-[var(--color-dull-text)]"
                        }`}
                      >
                        {opt.label}
                      </span>
                    </label>

                    {isSelected && opt.value === "Cart Value" && (
                      <input
                        type="number"
                        className="w-full border px-3 py-2 rounded text-black mt-1"
                        placeholder={field.inputPlaceholder || "Enter value..."}
                        value={formData[`${field.name}_cartValue`] || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [`${field.name}_cartValue`]: e.target.value,
                          })
                        }
                      />
                    )}

                    {isSelected && opt.dropdownOptions && (
                      <div className="relative w-full">
                        <div
                          className="flex justify-between w-full border px-3 py-2 rounded cursor-pointer  text-[var(--color-dull-text)]"
                          onClick={() =>
                            setShowDropdowns((prev) => ({
                              ...prev,
                              [field.name]: {
                                ...prev[field.name],
                                [optKey]: !optShowDropdown,
                              },
                            }))
                          }
                        >
                          <span className="text-sm">
                            {selectedSubOptions.length > 0
                              ? `${selectedSubOptions.length} selected`
                              : `Select ${opt.label} Options`}
                          </span>
                          <ChevronDown
                            className={`transition-transform duration-200 ${
                              optShowDropdown ? "rotate-180" : ""
                            }`}
                            size={18}
                          />
                        </div>

                        {optShowDropdown && (
                          <div className="absolute z-10 w-full bg-white border rounded mt-1 shadow">
                            {opt.dropdownOptions.map((option) => {
                              const key = `${field.name}_${option.value}`;
                              const isChecked = formData[key] ?? false;

                              return (
                                <label
                                  key={key}
                                  className="flex items-center gap-3 px-3 py-2 hover: bg-[var(--color-dull-text)] cursor-pointer"
                                >
                                  <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        [key]: e.target.checked,
                                      })
                                    }
                                    className="w-4 h-4 rounded border border-[var(--border-admin)]
                  bg-white
                  checked:bg-[var(--color-primary1)]
                  relative cursor-pointer
                  before:content-['✔'] before:absolute before: text-[var(--color-dull-text)]
                  checked:before:text-white before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2
                  appearance-none
                  flex items-center justify-center"
                                  />

                                  {option.image && (
                                    <Image
                                      src={option.image}
                                      alt={option.label}
                                      width={28}
                                      height={28}
                                      className="object-contain rounded border border-[var(--color-primary1)]"
                                      onLoad={() =>
                                        setImageLoaded((prev) => ({
                                          ...prev,
                                          [option.value]: true,
                                        }))
                                      }
                                    />
                                  )}

                                  <span
                                    className={`text-sm font-medium ${
                                      isChecked
                                        ? " text-[var(--color-primary1)]"
                                        : " text-[var(--color-dull-text)]"
                                    }`}
                                  >
                                    {option.label}
                                  </span>
                                </label>
                              );
                            })}
                          </div>
                        )}

                        {selectedSubOptions.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {selectedSubOptions.map((sub) => (
                              <div
                                key={sub.value}
                                className="flex items-center gap-1 bg-white  text-[var(--color-primary1)] px-2 py-1 rounded text-sm"
                              >
                                <span>{sub.label}</span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setFormData((prev) => ({
                                      ...prev,
                                      [`${field.name}_${sub.value}`]: false,
                                    }));
                                  }}
                                  className=" text-[var(--color-dull-text)] hover:text-[var(--color-red)] font-bold"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );

      case "filterBy":
        return <p className="text-sm font-bold text-black">{field.text}</p>;

      case "checkboxGroup":
        return (
          <div className="mb-2">
            <label className="block text-sm font-medium mb-2  text-[var(--color-dull-text)]">
              {field.label}
            </label>
            <div className="flex flex-row gap-6 flex-wrap">
              {field.options.map((option) => {
                const keyName = `${field.name}_${option.value}`;
                const isChecked = formData[keyName] ?? false;

                return (
                  <label key={keyName} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [keyName]: e.target.checked,
                        })
                      }
                      className="w-4 h-4 rounded border border-[var(--border-admin)]
                        bg-white
                        checked:bg-[var(--color-primary1)] 
                        relative cursor-pointer
                        before:content-['✔'] before:absolute before: text-[var(--color-dull-text)]
                        checked:before:text-white before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2
                        appearance-none
                        flex items-center justify-center"
                    />
                    <span className="ml-1 text-sm font-medium  text-[var(--color-dull-text)]">
                      {option.label}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        );

      case "input":
        return (
          <div className="w-full">
            <div className="flex justify-between mb-2">
              <label className="text-xs  text-[var(--color-dull-text)] sm:text-sm break-words">
                {field?.label}
              </label>
              {field?.label2 && (
                <label className="text-xs  text-[var(--color-dull-text)] sm:text-sm break-words">
                  {field?.label2}
                </label>
              )}
            </div>
            <InputField
              type="text"
              {...commonProps}
              readOnly={field.readonly}
              style={{
                ...commonProps.style,
                ...field.css,
                cursor: field.readonly ? "not-allowed" : "text",
              }}
            />
          </div>
        );

      case "inputReadOnly":
        return (
          <div className="mb-3">
            {field.label && (
              <label className="block text-sm font-medium mb-1  text-[var(--color-dull-text)]">
                {field.label}
              </label>
            )}
            <div
              style={{
                padding: "8px 12px",
                backgroundColor: "#F5F5F5",
                border: "1px solid #ccc",
                borderRadius: "4px",
                width: "100%",
                display: "inline-block",
                fontFamily: "inherit",
                fontSize: "14px",
                color: "#333",
              }}
            >
              {field.placeholder || "-"}
            </div>
          </div>
        );

      case "inputPair":
        return (
          <div className="flex gap-2 flex-wrap sm:flex-nowrap">
            <div className="w-full sm:w-1/2">
              <label className="block text-sm font-medium mb-2  text-[var(--color-dull-text)]">
                {field.label1}
              </label>
              <InputField
                type="text"
                name={field.name1}
                value={formData[field.name1] || ""}
                onChange={(e) =>
                  setFormData({ ...formData, [field.name1]: e.target.value })
                }
                placeholder={field.placeholder1 || ""}
                style={field.css1 || {}}
                className="w-full"
              />
            </div>

            <div className="w-full sm:w-1/2">
              <label className="block text-sm font-medium mb-2  text-[var(--color-dull-text)]">
                {field.label2}
              </label>
              <InputField
                type="text"
                name={field.name2}
                value={formData[field.name2] || ""}
                onChange={(e) =>
                  setFormData({ ...formData, [field.name2]: e.target.value })
                }
                placeholder={field.placeholder2 || ""}
                style={field.css2 || {}}
                className="w-full"
              />
            </div>
          </div>
        );

      case "textarea":
        return (
          <div className="w-full">
            <div className="flex justify-between mb-2 ">
              <label className="text-xs  text-[var(--color-dull-text)] sm:text-sm break-words">
                {field?.label}
              </label>
              <label className="text-xs  text-[var(--color-dull-text)] sm:text-sm break-words">
                {field?.label2}
              </label>
            </div>
            <textarea
              maxLength={250}
              className="w-full border border-[var(--color-dull-text)] focus:outline-none rounded resize-y px-3 py-2 text-black"
              {...commonProps}
              rows={field.rows || 4}
            ></textarea>
          </div>
        );

      case "file":
        return (
          <div className="w-full">
            <div className="flex justify-between mb-2">
              <label className="text-xs  text-[var(--color-dull-text)] sm:text-sm break-words">
                {field?.label}
              </label>
              {field?.label2 && (
                <label className="text-xs  text-[var(--color-dull-text)] sm:text-sm break-words">
                  {field?.label2}
                </label>
              )}
            </div>

            <FileUpload
              value={formData[field.name]}
              multiple={field.multiple}
              maxFiles={field.maxFiles}
              onChange={(file) =>
                setFormData({
                  ...formData,
                  [field.name]: file,
                })
              }
            />
          </div>
        );

      case "select":
        const showSelectDropdown = showDropdowns[field.name] || false;
        const selectedOption =
          field.options.find((opt) => opt.value === formData[field.name]) ||
          field.options.find((opt) => opt.value === field.defaultValue) ||
          null;

        return (
          <div className="w-full relative mb-4">
            <label className="block text-sm font-medium mb-2  text-[var(--color-dull-text)]">
              {field.label}
            </label>

            <div
              className="flex justify-between items-center w-full border border-[var(--border-admin)] px-3 py-2 rounded-sm bg-white  text-[var(--color-dull-text)] shadow-sm cursor-pointer min-h-[41px]"
              onClick={() =>
                setShowDropdowns((prev) => ({
                  ...prev,
                  [field.name]: !showSelectDropdown,
                }))
              }
            >
              <div className="flex items-center gap-2">
                {selectedOption?.icon && (
                  <Image
                    src={selectedOption.icon}
                    alt={selectedOption.label}
                    width={20}
                    height={20}
                    className="object-cover rounded"
                  />
                )}
                <span className="text-sm font-medium">
                  {selectedOption
                    ? selectedOption.label
                    : field.placeholder || field.label}
                </span>
              </div>
              <ChevronDown
                className={`transition-transform duration-200 ${
                  showSelectDropdown ? "rotate-180" : ""
                }`}
                size={18}
              />
            </div>

            {showSelectDropdown && (
              <div className="absolute z-10 mt-1 w-full max-h-60 overflow-auto border rounded bg-white shadow-lg">
                {field.options.map((option) => {
                  const isSelected = formData[field.name] === option.value;
                  return (
                    <div
                      key={option.value}
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          [field.name]: option.value,
                        }));
                        setShowDropdowns((prev) => ({
                          ...prev,
                          [field.name]: false,
                        }));
                      }}
                      className={`flex items-center justify-between gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                        isSelected ? "bg-white" : ""
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {option.icon && (
                          <Image
                            src={option.icon}
                            alt={option.label}
                            width={20}
                            height={20}
                            className="object-cover rounded"
                          />
                        )}
                        <span
                          className={`text-sm font-medium ${
                            isSelected
                              ? "text-[var(--color-primary1)]"
                              : " text-[var(--color-dull-text)]"
                          }`}
                        >
                          {option.label}
                        </span>
                      </div>

                      {isSelected && (
                        <span className="text-[var(--color-primary1)] font-bold text-lg">
                          ✔
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );

      case "timeDuration":
        const state = durationDropdowns[field.name] || {
          show: false,
          value: "",
        };

        return (
          <div className="w-full relative mb-4">
            <label className="block text-sm font-light mb-2  text-[var(--color-dull-text)]">
              {field.label}
            </label>

            <div
              className="w-full border px-3 py-2 rounded cursor-pointer flex justify-between"
              onClick={() => {
                setDurationDropdowns((prev) => ({
                  ...prev,
                  [field.name]: { ...state, show: !state.show },
                }));
              }}
            >
              <span className="block text-sm font-light  text-[var(--color-dull-text)]">
                {state.value || "Select Duration"}
              </span>
              <ChevronDown
                size={16}
                className={`transition-transform  text-[var(--color-dull-text)] ${
                  state.show ? "rotate-180" : ""
                }`}
              />
            </div>

            {state.show && (
              <div className="absolute z-10 mt-1 w-full p-2 bg-white border rounded shadow-lg">
                <input
                  type="text"
                  placeholder="HH:MM"
                  value={state.value}
                  onChange={(e) => {
                    const value = e.target.value;
                    setDurationDropdowns((prev) => ({
                      ...prev,
                      [field.name]: { ...state, value },
                    }));
                    setFormData((prev) => ({
                      ...prev,
                      [field.name]: value,
                    }));
                  }}
                  className="w-full border px-2 py-1 rounded text-black"
                />
              </div>
            )}
          </div>
        );

      case "dateRange":
        return (
          <div>
            <label className="block text-sm font-medium mb-2  text-[var(--color-dull-text)]">
              {field?.label}
            </label>
            <div className="flex gap-2 flex-wrap sm:flex-nowrap">
              <div className="relative w-full sm:w-1/2">
                <DatePicker
                  selected={formData[`${field.name}_from`] || null}
                  onChange={(date) =>
                    setFormData({ ...formData, [`${field.name}_from`]: date })
                  }
                  placeholderText="From"
                  dateFormat="dd-MM-yyyy"
                  className="w-full border px-3 py-2 pr-10 rounded text-black cursor-pointer"
                />
                <Calendar1 className="absolute right-3 top-1/2 -translate-y-1/2 text-black pointer-events-none" />
              </div>
              <div className="relative w-full sm:w-1/2">
                <DatePicker
                  selected={formData[`${field.name}_to`] || null}
                  onChange={(date) =>
                    setFormData({ ...formData, [`${field.name}_to`]: date })
                  }
                  placeholderText="To"
                  dateFormat="dd-MM-yyyy"
                  className="w-full border px-3 py-2 pr-10 rounded text-black cursor-pointer"
                />
                <Calendar1 className="absolute right-3 top-1/2 -translate-y-1/2 text-black pointer-events-none" />
              </div>
            </div>
          </div>
        );

      case "date":
        const showCalendar = showCalendars[field.name] || false;

        return (
          <div className="relative w-full mb-4">
            <label className="block text-sm font-medium mb-2  text-[var(--color-dull-text)]">
              {field.label}
            </label>
            <div
              className="relative w-full border px-3 py-2 rounded cursor-pointer flex items-center justify-between  text-[var(--color-dull-text)]"
              onClick={() =>
                setShowCalendars((prev) => ({
                  ...prev,
                  [field.name]: !showCalendar,
                }))
              }
            >
              <span>
                {formData[field.name]
                  ? new Date(formData[field.name]).toLocaleDateString("en-GB")
                  : "Select Date"}
              </span>
              <Calendar1 size={18} className="text-black" />
            </div>
            {showCalendar && (
              <div className="absolute z-10 mt-1 w-full p-2 bg-white border rounded shadow-lg">
                <DatePicker
                  selected={formData[field.name] || null}
                  onChange={(date) => {
                    setFormData({ ...formData, [field.name]: date });
                    setShowCalendars((prev) => ({
                      ...prev,
                      [field.name]: false,
                    }));
                  }}
                  inline
                />
              </div>
            )}
          </div>
        );

      case "time":
        const showSingleTime = showDropdowns[`${field.name}_time`] || false;
        const selectedPeriod = timePeriods[field.name] || "AM";

        const singleTimeOptions = [];
        for (let h = 8; h < 20; h++) {
          singleTimeOptions.push(`${h}:00`);
          singleTimeOptions.push(`${h}:30`);
        }

        return (
          <div className="relative w-full mb-4">
            <label className="block text-sm font-medium mb-2  text-[var(--color-dull-text)]">
              {field.label}
            </label>
            <div
              className="relative w-full border px-3 py-2 rounded cursor-pointer flex items-center justify-between  text-[var(--color-dull-text)]"
              onClick={() =>
                setShowDropdowns((prev) => ({
                  ...prev,
                  [`${field.name}_time`]: !showSingleTime,
                }))
              }
            >
              <span>
                {formData[field.name]
                  ? `${formData[field.name]} ${selectedPeriod}`
                  : "Select Time"}
              </span>
              <ChevronDown
                size={18}
                className={`transition-transform duration-200 ${
                  showSingleTime ? "rotate-180" : ""
                }`}
              />
            </div>
            {showSingleTime && (
              <div className="absolute z-10 mt-1 p-2 bg-white border rounded shadow-lg w-full max-h-60 overflow-auto">
                <div className="flex justify-end mb-2">
                  {["AM", "PM"].map((period) => (
                    <button
                      key={period}
                      type="button"
                      onClick={() =>
                        setTimePeriods((prev) => ({
                          ...prev,
                          [field.name]: period,
                        }))
                      }
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

                <div className="grid grid-cols-3 gap-2">
                  {singleTimeOptions.map((time) => (
                    <div
                      key={time}
                      onClick={() => {
                        setFormData({ ...formData, [field.name]: time });
                        setShowDropdowns((prev) => ({
                          ...prev,
                          [`${field.name}_time`]: false,
                        }));
                      }}
                      className={`text-sm p-2 text-center border rounded cursor-pointer hover:bg-[var(--color-primary1)] hover:text-white ${
                        formData[field.name] === time
                          ? "bg-[var(--color-primary1)] text-white"
                          : ""
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

      case "existingClientSelect":
        const selectedClient = formData[field.name]
          ? field.options.find((opt) => opt.value === formData[field.name])
          : null;
        const showClientDropdown = showDropdowns[field.name] || false;
        const searchTerm = searchTerms[field.name] || "";

        const filteredOptions = field.options.filter(
          (opt) =>
            opt.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
            opt.email.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return (
          <div className="w-full relative mb-4">
            <label className="block text-sm font-medium mb-2  text-[var(--color-dull-text)]">
              {field.label}
            </label>

            <div
              className="flex justify-between w-full border px-3 py-2 rounded cursor-pointer  text-[var(--color-dull-text)]"
              onClick={() =>
                setShowDropdowns((prev) => ({
                  ...prev,
                  [field.name]: !showClientDropdown,
                }))
              }
            >
              <span className="text-sm">
                {selectedClient ? selectedClient.label : field.placeholder}
              </span>
              <ChevronDown
                className={`transition-transform duration-200 ${
                  showClientDropdown ? "rotate-180" : ""
                }`}
                size={18}
              />
            </div>

            {showClientDropdown && (
              <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow-lg">
                <div className="p-2 border-b">
                  <input
                    type="text"
                    placeholder="Search client..."
                    value={searchTerm}
                    onChange={(e) =>
                      setSearchTerms((prev) => ({
                        ...prev,
                        [field.name]: e.target.value,
                      }))
                    }
                    className="w-full border px-2 py-1 rounded text-black text-sm"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                <div className="max-h-60 overflow-auto">
                  {filteredOptions.map((option) => (
                    <div
                      key={option.value}
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          [field.name]: option.value,
                        }));
                        setShowDropdowns((prev) => ({
                          ...prev,
                          [field.name]: false,
                        }));
                        setSearchTerms((prev) => ({
                          ...prev,
                          [field.name]: "",
                        }));
                      }}
                      className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {option.avatar ? (
                        <img
                          src={option.avatar}
                          alt={option.label}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[var(--color-primary1)] flex items-center justify-center text-white font-semibold">
                          {option.label.charAt(0)}
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-medium text-black">
                          {option.label}
                        </p>
                        <p className="text-xs  text-[var(--color-dull-text)]">
                          {option.email}
                        </p>
                      </div>
                      <span className="text-xs  text-[var(--color-dull-text)]">
                        {option.phone}
                      </span>
                    </div>
                  ))}
                  {filteredOptions.length === 0 && (
                    <div className="px-3 py-4 text-center  text-[var(--color-dull-text)] text-sm">
                      No clients found
                    </div>
                  )}
                </div>
              </div>
            )}

            {selectedClient && field.showClientInfo && (
              <div className="grid grid-cols-2 gap-4 p-3 mt-3 bg-gray-50 rounded border">
                <div>
                  <p className="text-xs font-semibold  text-[var(--color-dull-text)] mb-1">
                    Client
                  </p>
                  <p className="text-sm text-black font-medium">
                    {selectedClient.label}
                  </p>
                  <p className="text-xs  text-[var(--color-dull-text)]">
                    {selectedClient.email}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold  text-[var(--color-dull-text)] mb-1">
                    Phone
                  </p>
                  <p className="text-sm text-black font-medium">
                    {selectedClient.phone}
                  </p>
                </div>
              </div>
            )}
          </div>
        );

      case "inputWithSelectCheckboxDropdown":
        const selectedRadioOption = formData[field.selectCheckbox.name] || [];

        const toggleOptions = (value) => {
          setFormData((prev) => {
            const current = prev[field.selectCheckbox.name] || [];
            if (current.includes(value)) {
              return {
                ...prev,
                [field.selectCheckbox.name]: current.filter((v) => v !== value),
              };
            } else {
              return {
                ...prev,
                [field.selectCheckbox.name]: [...current, value],
              };
            }
          });
        };

        return (
          <div className="flex gap-4 flex-wrap">
            {/* Input side */}
            <div className="flex-1 sm:w-1/2">
              <label className="block text-sm font-medium mb-2  text-[var(--color-dull-text)] ">
                {field?.input?.label}
              </label>
              <InputField
                type="text"
                name={field?.input?.name}
                value={formData[field?.input?.name] || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [field?.input?.name]: e.target.value,
                  })
                }
                placeholder={field?.input?.placeholder || ""}
                className="w-full border"
              />
            </div>

            {/* SelectCheckbox dropdown side */}
            <div className="flex-1 sm:w-1/2 relative">
              <label className="block text-sm font-medium mb-2  text-[var(--color-dull-text)]">
                {field.selectCheckbox.label}
              </label>

              <div
                className="border px-3 py-2 rounded cursor-pointer flex justify-between items-center  text-[var(--color-dull-text)]"
                onClick={() => setShowDropdowns(!showDropdowns)}
              >
                <span>
                  {selectedRadioOption.length
                    ? selectedRadioOption
                        .map(
                          (v) =>
                            field.selectCheckbox.options.find(
                              (o) => o.value === v
                            )?.label
                        )
                        .join(", ")
                    : "Select Options"}
                </span>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    showDropdowns ? "rotate-180" : ""
                  }`}
                />
              </div>

              {showDropdowns && (
                <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow-lg max-h-60 overflow-auto p-2">
                  {field.selectCheckbox.options.map((option) => {
                    const isChecked = selectedRadioOption.includes(
                      option.value
                    );
                    return (
                      <label
                        key={option.value}
                        className="flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-gray-100"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleOptions(option.value)}
                          className="w-4 h-4 rounded border border-[var(--border-admin)]
                    bg-white
                    checked:bg-[var(--color-primary1)] 
                    relative cursor-pointer
                    before:content-['✔'] before:absolute before: text-[var(--color-dull-text)]
                    checked:before:text-white before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2
                    appearance-none
                    flex items-center justify-center"
                        />
                        <span
                          className={
                            isChecked
                              ? "text-[var(--color-primary1)]"
                              : " text-[var(--color-dull-text)]"
                          }
                        >
                          {option.label}
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        );

      case "selectCheckbox":
        const selectedOptions = formData[field.name] || [];
        const showCheckboxDropdown = showDropdowns[field.name] || false;

        return (
          <div className="w-full relative mb-4">
            <label className="block text-sm font-medium mb-2  text-[var(--color-dull-text)]">
              {field.label}
            </label>

            <div
              className="flex justify-between items-center w-full border border-[var(--border-admin)]  px-3 py-2 rounded-sm bg-white  text-[var(--color-dull-text)] shadow-sm cursor-pointer min-h-[41px]"
              onClick={() =>
                setShowDropdowns((prev) => ({
                  ...prev,
                  [field.name]: !showCheckboxDropdown,
                }))
              }
            >
              <span className="text-sm">
                {field.placeholder || field.label}
              </span>
              <ChevronDown
                className={`transition-transform duration-200 ${
                  showCheckboxDropdown ? "rotate-180" : ""
                }`}
                size={18}
              />
            </div>

            {showCheckboxDropdown && (
              <div className="absolute z-10 mt-1 w-full max-h-60 overflow-auto border rounded bg-white shadow-lg">
                {field.options.map((option) => {
                  const isChecked = selectedOptions.includes(option.value);

                  return (
                    <label
                      key={option.value}
                      className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {
                          setFormData((prev) => {
                            const current = prev[field.name] || [];
                            if (current.includes(option.value)) {
                              return {
                                ...prev,
                                [field.name]: current.filter(
                                  (v) => v !== option.value
                                ),
                              };
                            } else {
                              return {
                                ...prev,
                                [field.name]: [...current, option.value],
                              };
                            }
                          });
                        }}
                        className="w-4 h-4 rounded border border-[var(--border-admin)]
                          bg-white
                          checked:bg-[var(--color-primary1)] 
                          relative cursor-pointer
                          before:content-['✔'] before:absolute before: text-[var(--color-dull-text)]
                          checked:before:text-white before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2
                          appearance-none
                          flex items-center justify-center"
                      />

                      {option.icon &&
                        (typeof option.icon === "string" ? (
                          <Image
                            src={option.icon}
                            alt={option.label}
                            width={20}
                            height={20}
                            className="object-cover rounded"
                          />
                        ) : (
                          <span>{option.icon}</span>
                        ))}
                      <span
                        className={`text-sm font-medium ${
                          isChecked
                            ? "text-[var(--color-primary1)]"
                            : " text-[var(--color-dull-text)]"
                        }`}
                      >
                        {option.label}
                      </span>
                    </label>
                  );
                })}
              </div>
            )}

            {selectedOptions.length > 0 && field.showLabel !== false && (
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedOptions.map((value) => {
                  const label = field.options.find(
                    (o) => o.value === value
                  )?.label;
                  return (
                    <div
                      key={value}
                      className="flex items-center gap-1 bg-[var(--color-back-label)]   text-[var(--color-primary1)] px-2 py-1 rounded text-sm"
                    >
                      <span>{label}</span>

                      <button
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            [field.name]: (prev[field.name] || []).filter(
                              (v) => v !== value
                            ),
                          }));
                        }}
                        className=" text-[var(--color-dull-text)] hover:text-[var(--color-red)] font-bold"
                      >
                        ×
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );

      case "timeRange":
        const generateHalfHourlyTimes = () => {
          const times = [];
          for (let h = 8; h < 20; h++) {
            times.push(`${h}:00`);
            times.push(`${h}:30`);
          }
          return times;
        };

        const times = generateHalfHourlyTimes();
        const showFromTimes = showDropdowns[`${field.name}_from`] || false;
        const showToTimes = showDropdowns[`${field.name}_to`] || false;

        return (
          <div className="mb-4 relative">
            <label className="block text-sm font-medium mb-2  text-[var(--color-dull-text)]">
              {field?.label}
            </label>
            <div className="flex gap-2 flex-wrap sm:flex-nowrap">
              <div className="relative w-full sm:w-1/2">
                <input
                  type="text"
                  readOnly
                  placeholder="From"
                  value={
                    formData[`${field.name}_from`]
                      ? `${formData[`${field.name}_from`]} ${
                          timePeriods[`${field.name}_from`] || "AM"
                        }`
                      : ""
                  }
                  onClick={() =>
                    setShowDropdowns((prev) => ({
                      ...prev,
                      [`${field.name}_from`]: !showFromTimes,
                    }))
                  }
                  className="w-full border px-3 py-2 rounded cursor-pointer pr-10"
                />
                <ChevronDown
                  size={18}
                  className={`absolute right-3 top-1/2 -translate-y-1/2  text-[var(--color-dull-text)] transition-transform duration-200 ${
                    showFromTimes ? "rotate-180" : ""
                  }`}
                />

                {showFromTimes && (
                  <div className="absolute z-10 mt-1 p-2 bg-white border rounded shadow-lg w-full max-h-60 overflow-auto">
                    <div className="flex justify-end mb-2">
                      {["AM", "PM"].map((period) => (
                        <button
                          key={period}
                          type="button"
                          onClick={() =>
                            setTimePeriods((prev) => ({
                              ...prev,
                              [`${field.name}_from`]: period,
                            }))
                          }
                          className={`px-2 py-1 text-sm rounded border ml-1 ${
                            (timePeriods[`${field.name}_from`] || "AM") ===
                            period
                              ? "bg-[var(--color-primary1)] text-white border-[var(--color-primary1)]"
                              : "bg-white text-black border-[var(--border-admin)]"
                          }`}
                        >
                          {period}
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {times.map((time) => (
                        <div
                          key={time}
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              [`${field.name}_from`]: time,
                            }));
                            setShowDropdowns((prev) => ({
                              ...prev,
                              [`${field.name}_from`]: false,
                            }));
                          }}
                          className={`text-sm p-2 text-center border rounded cursor-pointer hover:bg-[var(--color-primary1)] hover:text-white ${
                            formData[`${field.name}_from`] === time
                              ? "bg-[var(--color-primary1)] text-white"
                              : ""
                          }`}
                        >
                          {time}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="relative w-full sm:w-1/2">
                <input
                  type="text"
                  readOnly
                  placeholder="To"
                  value={
                    formData[`${field.name}_to`]
                      ? `${formData[`${field.name}_to`]} ${
                          timePeriods[`${field.name}_to`] || "AM"
                        }`
                      : ""
                  }
                  onClick={() =>
                    setShowDropdowns((prev) => ({
                      ...prev,
                      [`${field.name}_to`]: !showToTimes,
                    }))
                  }
                  className="w-full border px-3 py-2 rounded cursor-pointer pr-10"
                />
                <ChevronDown
                  size={18}
                  className={`absolute right-3 top-1/2 -translate-y-1/2  text-[var(--color-dull-text)] transition-transform duration-200 ${
                    showToTimes ? "rotate-180" : ""
                  }`}
                />

                {showToTimes && (
                  <div className="absolute z-10 mt-1 p-2 bg-white border rounded shadow-lg w-full max-h-60 overflow-auto">
                    <div className="flex justify-end mb-2">
                      {["AM", "PM"].map((period) => (
                        <button
                          key={period}
                          type="button"
                          onClick={() =>
                            setTimePeriods((prev) => ({
                              ...prev,
                              [`${field.name}_to`]: period,
                            }))
                          }
                          className={`px-2 py-1 text-sm rounded border ml-1 ${
                            (timePeriods[`${field.name}_to`] || "AM") === period
                              ? "bg-[var(--color-primary1)] text-white border-[var(--color-primary1)]"
                              : "bg-white text-black border-[var(--border-admin)]"
                          }`}
                        >
                          {period}
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {times.map((time) => (
                        <div
                          key={time}
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              [`${field.name}_to`]: time,
                            }));
                            setShowDropdowns((prev) => ({
                              ...prev,
                              [`${field.name}_to`]: false,
                            }));
                          }}
                          className={`text-sm p-2 text-center border rounded cursor-pointer hover:bg-[var(--color-primary1)] hover:text-white ${
                            formData[`${field.name}_to`] === time
                              ? "bg-[var(--color-primary1)] text-white"
                              : ""
                          }`}
                        >
                          {time}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case "numberRange":
        return (
          <div>
            <label className="block text-sm font-medium mb-2  text-[var(--color-dull-text)]">
              {field?.label}
            </label>
            <div className="flex gap-2 flex-wrap sm:flex-nowrap">
              <input
                type="number"
                placeholder="From"
                className="w-full sm:w-1/2 border px-2 py-1 rounded"
                value={formData[`${field.name}_from`] || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [`${field.name}_from`]: e.target.value,
                  })
                }
              />
              <input
                type="number"
                placeholder="To"
                className="w-full sm:w-1/2 border px-2 py-1 rounded"
                value={formData[`${field.name}_to`] || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [`${field.name}_to`]: e.target.value,
                  })
                }
              />
            </div>
          </div>
        );

      case "customComponent":
        if (typeof field.render === "function") {
          return (
            <div key={field.name} className="my-4">
              {field.render(formData, setFormData)}
            </div>
          );
        }
        return null;

      default:
        console.warn(`Unknown field type: ${field.type}`);
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        {config?.title && (
          <h2 className="text-lg font-bold mb-4">{config?.title}</h2>
        )}
        {config?.fields?.map((field, index) => (
          <div
            key={field.name || `${field.type}-${index}`}
            className="form-group"
            style={field.containerCss || {}}
          >
            {renderField(field)}
          </div>
        ))}
      </div>

      {config?.footer && (
        <div className="flex gap-2 p-4 border-t bg-white flex-shrink-0">
          {config?.footer?.cancel && (
            <button
              type="button"
              onClick={handleCancel}
              className={
                config?.footer?.cancel?.className ||
                "bg-[var(--color-primary1)] text-white px-4 py-2 rounded w-full"
              }
            >
              {config?.footer?.cancel?.label || "Cancel"}
            </button>
          )}

          {config?.footer?.apply && (
            <button
              type="button"
              onClick={() => {
                if (config.footer.apply.onClick) {
                  config.footer.apply.onClick(formData, onSubmit);
                } else {
                  handleApply();
                }
              }}
              className={
                config?.footer?.apply?.className ||
                "w-full border border-[var(--color-primary1)] text-[var(--color-primary1)] px-4 py-2 rounded"
              }
            >
              {config?.footer?.apply?.label || "Apply"}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default DynamicForm;
