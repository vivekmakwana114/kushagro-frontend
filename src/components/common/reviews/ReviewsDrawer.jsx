import React, { useEffect } from "react";
import Image from "next/image";
import ReviewCard from "./ReviewCard";

const ReviewsDrawer = ({ isOpen, onClose, reviews, title = "Reviews" }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex justify-end p-4 rounded-md">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div className="relative w-full max-w-[450px] bg-white h-full shadow-2xl flex flex-col animate-slide-in-right rounded-md overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-[#E4E4E6] flex justify-between items-start bg-white z-10">
          <div>
            <h2 className="text-xl font-bold text-[#111111] mb-1">{title}</h2>
            <p className="text-[#666666] text-sm">
              View all reviews about this Seller
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Image
              src="/assets/icon/cross.svg"
              width={14}
              height={14}
              alt="Close"
            />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#F9FAFB] custom-scroll">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewsDrawer;
