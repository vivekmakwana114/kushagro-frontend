"use client";
import React, { useState } from "react";
import Image from "next/image";
import ActionComponent from "@/components/grid/actionComponent";
import DynamicForm from "@/components/modules/DynamicFormRendering";
import { amenities_data } from "./amenities_data";
import { addAmenitiesConfig } from "./config";

const AmenitiesPage = () => {
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  

  const toggleAmenity = (id) => {
    setSelectedAmenities((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-full border rounded-lg p-4">
      <div className="mt-2">
        <div className="flex justify-between gap-4 mb-4">
          <h2 className="text-lg font-semibold mb-2">Store Amenities</h2>

          <ActionComponent
            actions={[
              {
                type: "sidebar",
                component: <DynamicForm config={addAmenitiesConfig} />,
              },
            ]}
            icon={
              <Image
                src="/icons/plusbutton.svg"
                alt="Add Amenities"
                width={18}
                height={18}
              />
            }
            text="Add Amenities"
            buttonClassName="inline-flex items-center gap-2 bg-[#02C8DE] text-white px-4 py-2 rounded-md hover:bg-[#02C8DE] hover:text-[#111111]"
          />
        </div>

        {/* ✅ Checkbox Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {amenities_data.map((item) => {
            const isChecked = selectedAmenities.includes(item.id);

            return (
              <label
                key={item.id}
                className="flex items-center gap-2 cursor-pointer p-2 transition-all"
              >
                {/* Checkbox indicator */}
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleAmenity(item.id)}
                  className="w-4 h-4 rounded border border-gray-300
                     bg-white
                     checked:bg-[#02C8DE]
                     relative cursor-pointer
                     before:content-['✔'] before:absolute before:text-[#7B7B7B]
                     checked:before:text-white
                     before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2
                     appearance-none
                     flex items-center justify-center"
                />

                {/* Text next to checkbox */}
                <p
                  className={`text-sm font-medium ${
                    isChecked ? "text-[#02C8DE]" : "text-gray-600"
                  }`}
                >
                  {item?.name}
                </p>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AmenitiesPage;
