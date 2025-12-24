"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { galleryData } from "./galleryData";

const PortfolioPage = () => {
  const allPhotos = galleryData?.photos;
  const [photos, setPhoto] = useState(allPhotos);
  const [error, setError] = useState("");

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);

    const validFiles = files?.filter((file) => {
      if (file.size > 2 * 1024 * 1024) {
        return false;
      }
      return true;
    });

    if (validFiles?.length < files.length) {
      setError("Only files 2MB or smaller are allowed.");
    } else {
      setError("");
    }

    const newPhotos = files?.map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
    }));

    setPhoto([...photos, ...newPhotos]);
  };

  const handleDeletePhoto = (idx) => {
    const updatedPhotos = photos?.filter((_, i) => i !== idx);
    setPhoto(updatedPhotos);
    if (error) {
      setError("");
    }
  };

  return (
    <div className="p-4 border border-[var(--border-admin)] rounded-md bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Photo Gallery</h2>
        <div className="flex items-center gap-2">
          <Image
            src="/assets/icon/information.svg"
            alt="Information"
            width={18}
            height={18}
          />
          <p
            className={`text-sm ${
              error ? "text-red-500" : "text-[var(--color-placeholder-color)]"
            }`}
          >
            {error ||
              "Max 20 allowed per Photo Gallery Album (Max File size 2MB each)"}
          </p>
        </div>
      </div>

      <hr className="mb-4" />

      {/* Gallery or No Images */}
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
        {photos?.map((photo, idx) => (
          <div
            key={idx}
            className="relative w-full h-32 rounded-md overflow-hidden border border-[var(--border-admin)]"
          >
            <Image
              src={photo?.url}
              alt={photo?.name || "Photo"}
              fill
              className="object-cover w-full h-full"
            />
            <button
              className="absolute top-1 right-1 bg-[var(--color-placeholder-color)] rounded-full p-1 text-white shadow"
              onClick={() => handleDeletePhoto(idx)}
            >
              ✕
            </button>
          </div>
        ))}

        {/* Upload New Photos */}
        <div className="flex items-center justify-center border-2 border-dashed rounded-md h-32 cursor-pointer hover:border-[var(--color-primary1)] relative">
          <input
            type="file"
            accept="image/*"
            multiple
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleFileUpload}
          />
          <Plus size={24} className="text-[var(--color-primary1)]" />
        </div>
        {photos?.length === 0 && (
          <div className="col-span-full text-center text-[var(--color-placeholder-color)] py-2">
            No images are available now.
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioPage;
