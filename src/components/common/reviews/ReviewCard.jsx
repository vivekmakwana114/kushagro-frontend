import React from "react";
import Image from "next/image";

const ReviewCard = ({ review }) => {
  return (
    <div className="border border-[#E4E4E6] rounded-md p-4 bg-white mb-4 shadow-sm relative">
      <p className="text-[#666666] text-sm mb-4 leading-relaxed">
        {review.review}
      </p>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#4B8F62] flex items-center justify-center text-white font-bold text-lg">
          {review.buyerId?.name?.charAt(0) || "U"}
        </div>

        <div>
          <div className="flex mb-1 gap-1">
            {[1, 2, 3, 4, 5].map((star) => {
              const fillPercentage = Math.min(
                100,
                Math.max(0, (review.rating - (star - 1)) * 100),
              );

              return (
                <div key={star} className="relative w-[14px] h-[14px]">
                  <Image
                    src="/assets/icon/star.svg"
                    width={14}
                    height={14}
                    alt="star"
                    className="absolute inset-0 grayscale opacity-30"
                  />
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${fillPercentage}%` }}
                  >
                    <Image
                      src="/assets/icon/star.svg"
                      width={14}
                      height={14}
                      alt="star"
                      className="min-w-[14px]"
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-[#097416] font-medium text-sm">
            {review.buyerId?.name || "Unknown User"}
          </p>
        </div>
      </div>

      {/* Quote Icon Background Effect */}
      <div className="absolute bottom-4 right-4">
        <Image
          src="/assets/icon/quote.svg"
          width={40}
          height={40}
          alt="quote"
          className="object-contain brightness-0 opacity-10"
        />
      </div>
    </div>
  );
};

export default ReviewCard;
