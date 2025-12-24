"use client";
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { FaArrowUp } from "react-icons/fa";

const PortfolioCards = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleDotClick = (index) => setCurrentIndex(index);

  const handleTouchStart = (e) => {
    if (!isMobile) return;
    const touch = e.touches[0];
    e.target.dataset.startX = touch.clientX;
  };
  const handleTouchEnd = (e) => {
    if (!isMobile) return;
    const touch = e.changedTouches[0];
    const startX = parseFloat(e.target.dataset.startX);
    const diff = startX - touch.clientX;

    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentIndex < data.length - 1)
        setCurrentIndex(currentIndex + 1);
      else if (diff < 0 && currentIndex > 0) setCurrentIndex(currentIndex - 1);
    }
  };

  const cols =
    data.length === 5
      ? "lg:grid-cols-5"
      : data.length === 4
      ? "lg:grid-cols-4"
      : data.length === 3
      ? "lg:grid-cols-3"
      : data.length === 2
      ? "lg:grid-cols-2"
      : "lg:grid-cols-1";

  return (
    <>
      {/* Mobile View */}
      <div className="md:hidden w-full ">
        <div
          className="relative w-full "
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {data.map((item, index) => (
              <div key={index} className="w-full flex-shrink-0 px-4">
                <Card className={`${item.color} rounded-[8px] !text-white`}>
                  <div className="flex flex-col gap-[12px] px-[12px] py-[8px]">
                    <div className="flex justify-between items-center">
                      <h3 className="text-[16px] font-medium">{item.head}</h3>
                      <div className="flex items-center gap-[4px]">
                        <div className="flex justify-center items-center w-[13px] h-[13px] bg-white rounded-full">
                          <FaArrowUp
                            size={10}
                            color={`var(--color-${item.color.replace(
                              "bg-",
                              ""
                            )})`}
                          />
                        </div>
                        {item.upCount} %
                      </div>
                    </div>
                    <div className="flex flex-row gap-[8px] items-center">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                        {typeof item.MainIcon === "string" ? (
                          <div
                            className="w-5 h-5"
                            style={{
                              backgroundColor: `var(--color-${item.color.replace(
                                "bg-",
                                ""
                              )})`,
                              maskImage: `url(${item.MainIcon})`,
                              WebkitMaskImage: `url(${item.MainIcon})`,
                              maskSize: "contain",
                              WebkitMaskSize: "contain",
                              maskRepeat: "no-repeat",
                              WebkitMaskRepeat: "no-repeat",
                              maskPosition: "center",
                              WebkitMaskPosition: "center",
                            }}
                          />
                        ) : (
                          item.MainIcon
                        )}
                      </div>
                      <p className="text-[24px] font-medium text-black">
                        {item.total}
                      </p>
                    </div>
                    <p className="text-[14px] font-medium">
                      {item.description}
                    </p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {data.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? "bg-cyan-400 w-6"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to card ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6"> */}
        <div className={`grid grid-cols-1 md:grid-cols-2 ${cols} gap-6`}>
          {data.map((item, index) => (
            <Card
              key={index}
              className={`${item.color} rounded-[8px] text-white`}
            >
              <div className="flex flex-col gap-[12px] px-[12px] py-[8px]">
                <div className="flex justify-between items-center">
                  <h3 className="text-[16px] font-medium">{item.head}</h3>
                  <div className="flex items-center gap-[4px]">
                    <div className="flex justify-center items-center w-[13px] h-[13px] bg-white rounded-full">
                      <FaArrowUp
                        size={10}
                        color={`var(--color-${item.color.replace("bg-", "")})`}
                      />
                    </div>
                    {item.upCount} %
                  </div>
                </div>
                <div className="flex flex-row gap-[8px] items-center">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                    {typeof item.MainIcon === "string" ? (
                      <div
                        className="w-5 h-5"
                        style={{
                          backgroundColor: `var(--color-${item.color.replace(
                            "bg-",
                            ""
                          )})`,
                          maskImage: `url(${item.MainIcon})`,
                          WebkitMaskImage: `url(${item.MainIcon})`,
                          maskSize: "contain",
                          WebkitMaskSize: "contain",
                          maskRepeat: "no-repeat",
                          WebkitMaskRepeat: "no-repeat",
                          maskPosition: "center",
                          WebkitMaskPosition: "center",
                        }}
                      />
                    ) : (
                      item.MainIcon
                    )}
                  </div>
                  <p className="text-[24px] font-medium">{item.total}</p>
                </div>
                <p className="text-sm">{item.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default PortfolioCards;
