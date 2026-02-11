"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Header from "@/components/form-elements/Header";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductDetails,
  clearListingDetails,
} from "@/state/listing/listingSlice";
import { fetchCategoryById } from "@/state/categories/categoriesSlice";
import { Loader2 } from "lucide-react";

const ViewListingDetails = ({ listingId, onClose, data: propsData }) => {
  const dispatch = useDispatch();
  const { listingDetails, detailsLoading, error } = useSelector(
    (state) => state.listing
  );

  const [categoryFields, setCategoryFields] = React.useState([]);

  useEffect(() => {
    if (listingId && !propsData) {
      dispatch(fetchProductDetails(listingId));
    }
    return () => {
      if (!propsData) {
        dispatch(clearListingDetails());
      }
    };
  }, [listingId, dispatch, propsData]);

  // Use propsData if available, otherwise fall back to Redux state
  const data = propsData || listingDetails?.data || listingDetails;

  // New Effect: Fetch category fields if not present in data
  useEffect(() => {
    if (!data) return;

    const cat = data.category || data.categoryId;

    // If we already have fields in the category object, use them
    if (cat && cat.fields && Array.isArray(cat.fields)) {
      setCategoryFields(cat.fields);
      return;
    }

    // Otherwise, if we have a category ID, fetch the full category
    const catId = cat && typeof cat === "object" ? cat._id || cat.id : cat;

    if (catId) {
      dispatch(fetchCategoryById(catId))
        .unwrap()
        .then((res) => {
          const fullCat = res.data || res;
          if (fullCat && fullCat.fields) {
            setCategoryFields(fullCat.fields);
          }
        })
        .catch((err) =>
          console.error("Failed to fetch category fields for listing:", err)
        );
    }
  }, [data, dispatch]);

  if (detailsLoading && !propsData) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-secondary1" />
      </div>
    );
  }

  if (error && !propsData) {
    return (
      <div className="flex h-full w-full items-center justify-center text-red-500">
        Failed to load details.
      </div>
    );
  }

  // Debug logs
  console.log("ViewListingDetails Data (Rendered):", data);
  console.log("ViewListingDetails Category Fields:", categoryFields);

  const getCategoryName = (cat) => {
    if (!cat) return "N/A";
    if (typeof cat === "string") return cat;
    if (typeof cat === "object") return cat.name || "N/A";
    return "N/A";
  };

  // Fallback data or mapping
  const listingData = {
    name: data?.name || data?.title || "N/A",
    category: getCategoryName(data?.category || data?.categoryId),
    price: data?.price ? `$${data.price}` : "N/A",
    location:
      (typeof data?.location === "object"
        ? data?.location?.address
        : data?.location) || "N/A",
    status: data?.status || "inactive",
    healthCondition: data?.healthCondition || "No health condition provided.",
    description: data?.description || "No description provided.",
    images:
      data?.images && data?.images.length > 0
        ? data.images
        : ["/assets/icon/image_not_found.svg"],
  };

  const placeholderImage = "/assets/icon/image_not_found.svg";
  const displayImages =
    listingData.images.length > 0 ? listingData.images : [placeholderImage];

  return (
    <div className="flex flex-col h-full bg-white w-full">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-6">
        <div className="space-y-1">
          <Header
            type="header"
            label="Product Details"
            css={{ textAlign: "left" }}
          />
          <Header
            type="subheader"
            text="View complete product information, pricing, stock, status."
            css={{ textAlign: "left" }}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 no-scrollbar">
        {/* Listing Photos */}
        <div className="mb-6">
          <h3 className=" text-left text-sm font-semibold text-black mb-3">
            Listing Photos
          </h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {displayImages.map((img, index) => (
              <div
                key={index}
                className="w-18 h-18 shrink-0 rounded-lg overflow-hidden relative border border-gray-100"
              >
                <Image
                  src={img}
                  alt={`Listing photo ${index}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Details Grid */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-y-3 gap-x-8 mb-4 md:gap-y-4">
          <div className="flex justify-between items-center md:block">
            <p className="text-sm text-dull-text mb-0 md:mb-1">Listing Name</p>
            <p className="text-base font-medium text-black">
              {listingData.name}
            </p>
          </div>
          <div className="flex justify-between items-center md:block">
            <p className="text-sm text-dull-text mb-0 md:mb-1">Category</p>
            <p className="text-base font-medium text-black">
              {listingData.category}
            </p>
          </div>

          <div className="flex justify-between items-center md:block">
            <p className="text-sm text-dull-text mb-0 md:mb-1">Price</p>
            <p className="text-base font-medium text-black">
              {listingData.price}
            </p>
          </div>
          <div className="flex justify-between items-center md:block">
            <p className="text-sm text-dull-text mb-0 md:mb-1">Location</p>
            <p className="text-base font-medium text-black whitespace-pre-wrap">
              {listingData.location}
            </p>
          </div>

          <div className="flex justify-between items-center md:block">
            <p className="text-sm text-dull-text mb-0 md:mb-1">Status</p>
            <p
              className={`text-base font-medium ${
                listingData.status.toLowerCase() === "active"
                  ? "text-[#2E5B20]"
                  : "text-gray-500"
              }`}
            >
              {listingData.status.charAt(0).toUpperCase() +
                listingData.status.slice(1)}
            </p>
          </div>

          {/* Dynamic Fields */}
          {categoryFields.map((field) => (
            <div
              key={field._id || field.key}
              className="flex justify-between items-center md:block"
            >
              <p className="text-sm text-dull-text mb-0 md:mb-1">
                {field.label}
              </p>
              <p className="text-base font-medium text-black">
                {data[field.key] || data.extraFields?.[field.key] || "N/A"}
              </p>
            </div>
          ))}
        </div>

        {/* Health and Condition */}
        <div className="mb-6">
          <h3 className="text-left text-sm text-dull-text mb-2">
            Health and Condition
          </h3>
          <p className="text-left text-sm text-dull-text leading-relaxed">
            {listingData.healthCondition}
          </p>
        </div>

        {/* Product Description */}
        <div className="mb-6">
          <h3 className="text-left text-sm text-dull-text mb-2">
            Product Description
          </h3>
          <div className="text-left text-sm text-dull-text leading-relaxed whitespace-pre-line">
            {listingData.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewListingDetails;
