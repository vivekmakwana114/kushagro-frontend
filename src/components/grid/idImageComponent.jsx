import React, { useState } from "react";
import Image from "next/image";

const IdImageComponent = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const imageUrl =
    data &&
    typeof data === "string" &&
    (data.startsWith("http") || data.startsWith("/"))
      ? data
      : `https://picsum.photos/512?random=${Math.floor(Math.random() * 100)}`; // Placeholder

  return (
    <>
      <div
        className="cursor-pointer w-8 h-8 relative rounded overflow-hidden hover:opacity-80 transition-opacity"
        onClick={() => setIsOpen(true)}
      >
        <Image src={imageUrl} alt="ID Document" fill className="object-cover" />
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setIsOpen(false)}
        >
          <div className="relative max-w-3xl max-h-[90vh] w-full h-full flex items-center justify-center p-2">
            <div
              className="relative w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={imageUrl}
                alt="ID Document Zoomed"
                fill
                className="object-contain"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-2 right-2 bg-white text-black rounded-full p-2 shadow-lg hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default IdImageComponent;
