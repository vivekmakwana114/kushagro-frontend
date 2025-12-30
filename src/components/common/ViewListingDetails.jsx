"use client";
import React, { useState } from "react";
import Image from "next/image";
import Header from "@/components/form-elements/Header";
import { X } from "lucide-react";
import ImageZoomModal from "@/components/common/ImageZoomModal";

const ViewListingDetails = ({ data, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Fallback data if no data is provided (or for fields missing in data)
  const listingData = {
    name: data?.name || "Jersey Cow",
    category: data?.category || "Livestock",
    price: data?.price || "$99",
    location: data?.location || "Sudan, Africa",
    breed: data?.breed || "Jersey",
    age: data?.age || "2Year 2Months",
    weight: data?.weight || "120Kg",
    status: data?.status || "active",
    healthCondition:
      data?.healthCondition ||
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    description:
      data?.description ||
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    images: data?.images || [
      "/assets/images/cow1.png",
      "/assets/images/cow2.png",
      "/assets/images/cow3.png",
      "/assets/images/cow4.png",
    ],
  };

  const displayImages = data?.media || [
    "https://picsum.photos/seed/cow1/200/200",
    "https://picsum.photos/seed/cow2/200/200",
    "https://picsum.photos/seed/cow3/200/200",
    "https://picsum.photos/seed/cow4/200/200",
  ];

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
                  alt={`Listing photo ${index + 1}`}
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
            <p className="text-base font-medium text-black">
              {listingData.location}
            </p>
          </div>

          <div className="flex justify-between items-center md:block">
            <p className="text-sm text-dull-text mb-0 md:mb-1">Breed</p>
            <p className="text-base font-medium text-black">
              {listingData.breed}
            </p>
          </div>
          <div className="flex justify-between items-center md:block">
            <p className="text-sm text-dull-text mb-0 md:mb-1">Age</p>
            <p className="text-base font-medium text-black">
              {listingData.age}
            </p>
          </div>

          <div className="flex justify-between items-center md:block">
            <p className="text-sm text-dull-text mb-0 md:mb-1">Weight</p>
            <p className="text-base font-medium text-black">
              {listingData.weight}
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
