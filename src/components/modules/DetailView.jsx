"use client";
import React, { useState } from "react";
import { X, Check, Calendar1, Maximize2, ChevronDown } from "lucide-react";
import GridCommonComponent from "../grid/gridCommonComponent";
import DatePicker from "react-datepicker";
import Image from "next/image";

const DetailView = ({ config, onClose, formData }) => {
  const [showReviews, setShowReviews] = React.useState(false);
  const [zoomedImage, setZoomedImage] = useState(null); // State for zoomed image
  const [dropdownOpen, setDropdownOpen] = useState(null); // State for tracking open dropdowns

  const [thumbnailImages, setThumbnailImages] = useState(
    () => config?.fields?.find((f) => f.type === "thumbnailList")?.images || []
  );

  // Initialize local form data from config fields that are inputs
  const [localFormData, setLocalFormData] = useState(() => {
    const initial = { ...formData };
    config?.fields?.forEach((field) => {
      if (
        ["dropdown", "input", "textarea"].includes(field.type) &&
        field.name &&
        field.value !== undefined
      ) {
        initial[field.name] = field.value;
      }
    });
    return initial;
  });

  const handleFieldChange = (name, value) => {
    setLocalFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Get reviews from config
  const reviewCardField = config?.fields?.find((f) => f.type === "reviewCard");
  const allReviews = reviewCardField?.reviews || [];

  // Get product table field if exists
  const productTableField = config?.fields?.find(
    (f) => f.type === "productTable"
  );

  const renderField = (field) => {
    switch (field.type) {
      case "header":
        return (
          <h2
            className="text-base sm:text-lg font-bold break-words"
            style={field.css}
          >
            {field.label}
          </h2>
        );

      case "subheader":
        return (
          <p
            className="text-xs sm:text-sm  text-[var(--color-placeholder-color)] break-words leading-relaxed whitespace-pre-wrap"
            style={field.css}
          >
            {field.text}
          </p>
        );

      case "profileCard":
        if (field.variant === "bordered") {
          return (
            <div className="border border-[var(--border-admin)] rounded-lg p-4 mb-2">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    {field?.avatar ? (
                      <img
                        src={field?.avatar}
                        alt={field?.name}
                        className="w-12 h-12 rounded-full object-cover border border-primary1"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold text-xl">
                        {field?.name?.charAt(0) || "?"}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <h3 className="text-base font-bold text-gray-900 break-words">
                      {field?.name}
                    </h3>
                    <a
                      href={`mailto:${field?.email}`}
                      className="text-sm text-[var(--color-primary1)] break-all hover:underline"
                    >
                      {field?.email}
                    </a>
                    <p className="text-xs text-[var(--color-placeholder-color)] mt-0.5">
                      {field?.subtitle}
                    </p>
                  </div>
                </div>

                {field?.phone && (
                  <div className="flex flex-col items-start">
                    <p className="text-xs text-[var(--color-dull-text)] mb-1">
                      {field?.phone?.label}
                    </p>
                    <p className="text-sm font-medium text-[var(--color-primary1)] break-all">
                      {field?.phone?.value}
                    </p>
                  </div>
                )}
              </div>

              {field?.dateInfo && (
                <div className="mt-4 pt-0">
                  <p className="text-xs text-[var(--color-dull-text)] mb-1">
                    {field.dateInfo.label}
                  </p>
                  <p className="text-sm font-bold text-black">
                    {field.dateInfo.value}
                  </p>
                </div>
              )}
            </div>
          );
        }

        // Default Layout (Original)
        return (
          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-[var(--border-admin)]">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                {field?.avatar ? (
                  <img
                    src={field?.avatar}
                    alt={field?.name}
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border border-primary1"
                  />
                ) : (
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold text-xl">
                    {field?.name?.charAt(0) || "?"}
                  </div>
                )}
              </div>

              <div className="flex-1">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 break-words">
                  {field?.name}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--color-primary1)] break-all">
                  {field?.email}
                </p>
                <p className="text-xs text-[var(--color-placeholder-color)] mt-1">
                  {field?.subtitle}
                </p>
              </div>
            </div>

            {field?.phone && (
              <div className="flex flex-col items-start justify-start">
                <p className="text-xs text-[var(--color-dull-text)] mb-1">
                  {field?.phone?.label}
                </p>
                <p className="text-xs sm:text-sm font-medium text-primary1 break-all">
                  {field?.phone?.value}
                </p>
              </div>
            )}
          </div>
        );

      case "divider":
        return <hr className="border-[var(--border-admin)] my-3 sm:my-4" />;

      case "textBlock":
        return (
          <div style={field.css}>
            {field.label && (
              <span
                style={field.labelStyle}
                className="text-sm font-semibold text-gray-900 block"
              >
                {field.label}
              </span>
            )}
            <p className="text-xs sm:text-sm break-words whitespace-pre-line text-justify">
              {field.content}
            </p>
          </div>
        );

      case "sectionHeader":
        return (
          <div
            className="flex justify-between items-center gap-2"
            style={field.css}
          >
            <h3 className="font-medium text-sm sm:text-base break-words flex-1">
              {field.label}
            </h3>

            {field.action && (
              <button
                onClick={field.action.onClick}
                className="flex items-center justify-center p-1.5 rounded-md hover:bg-gray-100"
                title={field.action.title || "Download"}
                style={{ color: field.action.color || "var(--color-primary1)" }}
              >
                {field.action.icon === "download" ? (
                  <Image
                    src="/assets/icon/download.svg"
                    alt="download invoice"
                    width={20}
                    height={20}
                  />
                ) : (
                  field.action.icon
                )}
              </button>
            )}
          </div>
        );

      case "infoGrid":
        const cols = field.columns || 2;
        const gridClass =
          cols === 2
            ? "grid-cols-1 sm:grid-cols-2"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

        return (
          <div
            className={`grid ${gridClass} gap-x-4 sm:gap-x-8 gap-y-3 sm:gap-y-4`}
          >
            {field.items.map((item, idx) => {
              const isRating = item.renderType === "rating";
              return (
                <div
                  key={idx}
                  className={`flex flex-col min-w-0 ${
                    isRating ? "cursor-pointer" : ""
                  }`}
                  onClick={() => {
                    if (isRating) setShowReviews(true);
                  }}
                >
                  <span className="text-xs  text-[var(--color-dull-text)] mb-1 break-words">
                    {item.label}
                  </span>
                  <span
                    className="text-xs sm:text-sm font-medium break-words flex items-center gap-1"
                    style={item.valueStyle || {}}
                  >
                    {isRating && (
                      <>
                        <svg
                          className={`w-5 h-5 ${
                            item.rating >= 1
                              ? "text-yellow-400"
                              : " text-[var(--color-dull-text)]"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.954a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.447a1 1 0 00-.364 1.118l1.286 3.954c.3.921-.755 1.688-1.538 1.118l-3.37-2.447a1 1 0 00-1.176 0l-3.37 2.447c-.783.57-1.838-.197-1.538-1.118l1.286-3.954a1 1 0 00-.364-1.118L2.073 9.38c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.954z" />
                        </svg>
                        <span className="ml-1 text-[var(--color-primary1)] text-xs sm:text-sm">
                          ({item.totalReviews})
                        </span>
                      </>
                    )}
                    {!isRating && item.value}
                  </span>
                </div>
              );
            })}
          </div>
        );

      case "serviceGrid":
        const serviceCols = field.columns || 3;
        const serviceGridClass =
          serviceCols === 2
            ? "grid-cols-1 sm:grid-cols-2"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

        return (
          <div className={`grid ${serviceGridClass} gap-3`}>
            {field.services.map((service, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 text-xs sm:text-sm"
              >
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 ${
                    service.checked
                      ? "bg-[var(--color-primary1)] text-white"
                      : "bg-gray-200  text-[var(--color-dull-text)]"
                  }`}
                >
                  {service.checked && (
                    <Check className="w-3 h-3" strokeWidth={3} />
                  )}
                </div>
                <span className="text-black break-words">{service.name}</span>
              </div>
            ))}
          </div>
        );

      case "phoneNumber":
        return (
          <div className="flex items-center gap-2 flex-wrap" style={field.css}>
            <span className=" text-[var(--color-placeholder-color)]">📞</span>
            <span className="text-xs sm:text-sm break-all">{field.value}</span>
          </div>
        );

      case "remarkBadge":
        return (
          <div
            className="flex items-start gap-2 sm:gap-3 bg-gray-50 p-2 sm:p-3 rounded-lg border border-[var(--border-admin)]"
            style={field.css}
          >
            <div className="bg-purple-500 text-white rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center font-bold flex-shrink-0 text-xs sm:text-sm">
              {field.avatar || "M"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs  text-[var(--color-dull-text)] font-semibold mb-1">
                {field.remarkLabel || "Remark"}
              </p>
              <p className="text-xs sm:text-sm  text-[var(--color-placeholder-color)] break-words">
                {field.text}
              </p>
            </div>
          </div>
        );

      case "keyValue":
        return (
          <div className="flex flex-col py-2 gap-1">
            <span className="text-sm font-semibold text-black break-words flex-1">
              {field.label}
            </span>
            <span
              className="text-xs sm:text-sm font-medium break-all flex-shrink-0"
              style={field.valueStyle || {}}
            >
              {field.value}
            </span>
          </div>
        );

      case "image":
        return (
          <div className="flex justify-center relative group" style={field.css}>
            <div className="relative inline-block">
              <img
                src={field.src}
                alt={field.alt || ""}
                className={field.className || "max-w-full h-auto"}
                style={field.imageStyle}
                onClick={() => field.enableZoom && setZoomedImage(field.src)}
              />
              {field.enableZoom && (
                <button
                  className="absolute top-2 right-2 bg-black/50 p-1 rounded-md text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => setZoomedImage(field.src)}
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        );

      case "dropdown":
        const isOpen = dropdownOpen === field.name;
        // Use local state if available, fallback to field.value
        const currentValue =
          localFormData[field.name] !== undefined
            ? localFormData[field.name]
            : field.value;

        return (
          <div
            className="flex flex-col gap-1 w-full relative"
            style={field.css}
          >
            {field.label && (
              <label className="text-sm font-semibold text-gray-900">
                {field.label}
              </label>
            )}
            <button
              type="button"
              onClick={() => setDropdownOpen(isOpen ? null : field.name)}
              className="w-full flex justify-between items-center bg-white border border-[var(--border-admin)] text-gray-900 text-sm rounded-lg p-2.5 focus:ring-[var(--color-primary1)] focus:border-[var(--color-primary1)]"
            >
              <span>
                {field.options?.find((opt) => opt.value === currentValue)
                  ?.label ||
                  currentValue ||
                  "Select"}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-gray-500 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-[var(--border-admin)] rounded-lg shadow-lg max-h-60 overflow-y-auto top-full left-0">
                {field.options?.map((opt, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm"
                    onClick={() => {
                      // Update local state
                      handleFieldChange(field.name, opt.value);

                      if (field.onChange) {
                        field.onChange({
                          target: { name: field.name, value: opt.value },
                        });
                      }
                      setDropdownOpen(null);
                    }}
                  >
                    <span>{opt.label}</span>
                    {currentValue === opt.value && (
                      <Check className="w-4 h-4 text-[var(--color-primary1)]" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case "thumbnailList":
        const handleRemove = (index) => {
          const updated = thumbnailImages.filter((_, i) => i !== index);
          setThumbnailImages(updated);
          field.onChange?.(updated);
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
                  className="absolute top-1 right-1 bg-[var(--color-dull-text)] text-white text-xs rounded-full p-1 hover:bg-[var(--color-red)]"
                  title="Remove"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        );

      case "productTable":
        return (
          <div className="mt-4">
            <GridCommonComponent
              data={[
                ...(productTableField?.rows || []).map((row, idx) => ({
                  id: idx,
                  product: {
                    name: row.product.name,
                    image: row.product.image,
                  },
                  quantity: row.quantity,
                  price: row.price,
                  subtotal: row.subtotal,
                })),
                {
                  id: "total",
                  product: { name: "Total", profile: "" },
                  quantity: "",
                  price: "",
                  subtotal: productTableField?.total || "",
                  isTotalRow: true,
                },
              ]}
              columns={config.productOrderColumns || []} // Fallback if missing
              options={{ select: false, order: false }}
              theme={{
                border: "border-gray-300",
                header: { bg: "bg-gray-100" },
              }}
              rowClassName={(row) =>
                row.isTotalRow
                  ? "bg-gray-50 font-semibold border-t border-gray-300"
                  : ""
              }
              cellRenderer={(key, value, row) => {
                if (row.isTotalRow) {
                  if (key === "product")
                    return (
                      <div className="text-right font-semibold">Total</div>
                    );
                  if (key === "subtotal")
                    return (
                      <div className="font-semibold  text-[var(--color-primary1)]">
                        {value || "-"}
                      </div>
                    );
                  return null;
                }

                // Normal rendering for product cell with image
                if (key === "product" && value?.name) {
                  return (
                    <div className="flex items-center gap-3">
                      {value.image ? (
                        <img
                          src={value.image}
                          alt={value.name}
                          className="w-10 h-10 rounded-md border border-[var(--border-admin)] object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-md bg-gray-200" />
                      )}
                      <span className="text-sm font-medium  text-[var(--color-placeholder-color)]">
                        {value.name}
                      </span>
                    </div>
                  );
                }

                return (
                  <span className="text-sm  text-[var(--color-placeholder-color)]">
                    {value}
                  </span>
                );
              }}
            />
          </div>
        );

      case "invoiceSummary":
        return (
          <div className="border rounded-lg p-3 sm:p-4 bg-gray-50 space-y-2">
            {field.invoiceId && (
              <div className="flex justify-between items-center pb-3 border-b border-dashed border-[var(--border-admin)] gap-2">
                <span className="text-xs  text-[var(--color-dull-text)] font-medium break-words">
                  Invoice ID
                </span>
                <span
                  className="text-xs sm:text-sm font-medium break-all"
                  style={{ color: "var(--color-primary1)" }}
                >
                  {field.invoiceId}
                </span>
              </div>
            )}

            <div className="space-y-2 sm:space-y-3">
              {field.items.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex justify-between items-center gap-2 pb-2 ${
                    item.divider !== false && idx !== field.items.length - 1
                      ? "border-b border-dashed border-[var(--border-admin)]"
                      : ""
                  }`}
                >
                  <span
                    className={`text-xs sm:text-sm ${
                      item.bold ? "font-semibold" : ""
                    } break-words flex-1`}
                    style={{ color: item.color || "#374151" }}
                  >
                    {item.label}
                  </span>
                  <span
                    className={`text-xs sm:text-sm ${
                      item.bold ? "font-bold" : ""
                    } ${
                      item.large ? "text-sm sm:text-base" : ""
                    } break-all flex-shrink-0`}
                    style={{ color: item.color || "#111111" }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      case "productList":
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
            {field.items?.map((product, idx) => (
              <div
                key={idx}
                className=" rounded-lg p-3 flex flex-col items-center bg-white hover:shadow-md transition-shadow"
              >
                <span className="bg-[var(--color-back-label)] text-sm text-center font-medium  text-[var(--color-primary1)] break-words">
                  {product.label}
                </span>
              </div>
            ))}
          </div>
        );

      case "categoryList":
        return (
          <div className="flex flex-wrap gap-2 mb-4">
            {field.items?.map((category, idx) => (
              <div
                key={idx}
                className="bg-[var(--color-back-label)] text-[var(--color-primary1)] px-4 py-2 rounded-md text-sm font-medium border border-[var(--color-placeholder-color)]"
              >
                {category.label}
              </div>
            ))}
          </div>
        );

      case "socialLinks":
        return (
          <div className="grid grid-cols-2  items-center gap-3">
            {field?.items?.map((item, idx) => (
              <a
                key={idx}
                href={item?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <Image
                  src={item?.icon}
                  alt={item?.label}
                  width={20}
                  height={20}
                  className="w-5 h-5  object-cover"
                />

                <span className="text-sm text-primary1 group-hover:underline break-all">
                  {item?.label}
                </span>
              </a>
            ))}
          </div>
        );

      default:
        console.warn(`Unknown field type: ${field.type}`);
        return null;
    }
  };

  return (
    <div className="flex h-full w-full bg-white relative">
      {/* Lightbox for Zoomed Image */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setZoomedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={() => setZoomedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={zoomedImage}
            alt="Zoomed Review"
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
          />
        </div>
      )}

      {/* Left Sidebar - Reviews (slides in from left) */}
      {showReviews && (
        <div className="w-[100%] h-full bg-white border-r border-[var(--border-admin)] flex flex-col">
          <div className="p-6 flex flex-col h-full">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-[var(--border-admin)]">
              <h3 className="text-lg font-semibold text-gray-900">
                Customer Reviews
              </h3>
              <button
                onClick={() => setShowReviews(false)}
                className=" text-[var(--color-dull-text)] hover:text-[var(--color-placeholder-color)] transition-colors p-1 hover:bg-gray-100 rounded"
                aria-label="Close reviews"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {allReviews && allReviews.length > 0 ? (
                allReviews.map((review, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg border border-[var(--border-admin)] shadow-md p-6 mb-4 mx-auto w-full max-w-md overflow-hidden"
                    style={{ minHeight: "250px" }}
                  >
                    {/* Review Description (Body) */}
                    <p className="text-sm sm:text-base  text-[var(--color-placeholder-color)] leading-relaxed mb-4 break-words whitespace-normal">
                      {review.description}
                    </p>

                    {/* Header: Avatar + Name + Rating */}
                    <div className="flex items-center gap-3">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-12 h-12 rounded-full object-cover border border-[var(--border-admin)] flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-sm sm:text-base font-semibold text-black break-words">
                          {review.name}
                        </span>
                        <div className="flex gap-0.5 mt-1">
                          {Array.from({ length: 5 }).map((_, starIdx) => {
                            const filled = starIdx < Math.floor(review.rating);
                            return (
                              <svg
                                key={starIdx}
                                className={`w-4 h-4 ${
                                  filled
                                    ? "text-yellow-400"
                                    : " text-[var(--color-dull-text)]"
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.954a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.447a1 1 0 00-.364 1.118l1.286 3.954c.3.921-.755 1.688-1.538 1.118l-3.37-2.447a1 1 0 00-1.176 0l-3.37 2.447c-.783.57-1.838-.197-1.538-1.118l1.286-3.954a1 1 0 00-.364-1.118L2.073 9.38c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.954z" />
                              </svg>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center  text-[var(--color-dull-text)] text-sm mt-8">
                  No reviews available
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Right Side - Stylist Details (Always Visible) */}
      <div
        className={`flex flex-col h-full bg-white transition-all duration-300 ${
          showReviews ? "w-[60%]" : "w-full"
        }`}
      >
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-2">
          {config?.title && (
            <h2 className="text-xl font-bold mb-4" style={config.titleCss}>
              {config.title}
            </h2>
          )}

          <div className="space-y-4">
            {config?.fields?.map((field, index) => (
              <div
                key={field.name || `${field.type}-${index}`}
                className={`detail-section ${
                  field.type === "divider" ? "-mx-4 sm:-mx-6" : ""
                }`}
                style={field.containerCss || {}}
              >
                {renderField(field)}
              </div>
            ))}
          </div>
        </div>

        {/* Sticky Footer */}
        {config?.footer && (
          <div className="border-t bg-white px-6 py-4 flex-shrink-0">
            <div className="flex gap-3">
              {config.footer.close && (
                <button
                  type="button"
                  onClick={onClose}
                  className={
                    config.footer.close.className ||
                    "w-full border border-[var(--color-primary1)] text-[var(--color-primary1)] px-4 py-2 rounded hover:bg-[var(--color-primary1)] hover:text-white transition-colors"
                  }
                >
                  {config.footer.close.label || "Close"}
                </button>
              )}
              {config.footer.actions &&
                config.footer.actions.map((action, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => action.onClick(localFormData)}
                    className={
                      action.className ||
                      "w-full bg-[var(--color-primary1)] text-white px-4 py-2 rounded hover:bg-[var(--color-primary1)] transition-colors"
                    }
                  >
                    {action.label}
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailView;
