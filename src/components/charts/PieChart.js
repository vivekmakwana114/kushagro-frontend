"use client";
import React, { useState } from "react";
import { CardContent } from "../ui/card";
import { useEffect } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const COLORS = ["#2E5B20", "#FFBE00", "#FF4560", "#775DD0"];

const PieChartComponent = ({ data = [] }) => {
  const [screenSize, setScreenSize] = useState("desktop");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setScreenSize("mobile");
      } else if (window.innerWidth < 1024) {
        setScreenSize("tablet");
      } else {
        setScreenSize("desktop");
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const noData = !data || data.length === 0 || data.every((d) => Number(d.value) === 0);

  // Responsive chart dimensions
  const chartWidth =
    screenSize === "mobile" ? 240 : screenSize === "tablet" ? 280 : 320;
  const chartHeight =
    screenSize === "mobile" ? 240 : screenSize === "tablet" ? 280 : 320;
  const innerRadius =
    screenSize === "mobile" ? 45 : screenSize === "tablet" ? 55 : 60;
  const outerRadius =
    screenSize === "mobile" ? 100 : screenSize === "tablet" ? 120 : 140;

  return (
    <div className="border border-[var(--border-admin)] rounded-[8px] pb-6 h-full">
      <div className="border border-[var(--border-admin)] border-b p-4 justify-between flex flex-row">
        <p className="text-black text-[18px] font-semibold ">
          Orders Status
        </p>
      </div>

      <div className=" p-4 md:p-6 lg:p-8 w-full md:h-full flex flex-col items-center justify-center  ">
        <div className="relative">
          {noData ? (
            <div
              className="flex items-center justify-center"
              style={{ width: chartWidth, height: chartHeight }}
            >
              <span className="text-sm text-placeholder-color">
                No data available
              </span>
            </div>
          ) : (
            <ResponsiveContainer width={chartWidth} height={chartHeight}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={innerRadius}
                  outerRadius={outerRadius}
                  startAngle={90}
                  endAngle={-270}
                  strokeWidth={4}
                  stroke="#ffffff"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color || COLORS[index % COLORS.length]}
                      cornerRadius={index === 0 ? 10 : 10}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {!noData && (
          <div
            className={`flex flex-row-reverse justify-center mt-2 
  ${screenSize === "mobile"
                ? "gap-3"
                : screenSize === "tablet"
                  ? "gap-5"
                  : "gap-8"
              }`}
          >
            {data.map((item, index) => (
              <div
                key={index}
                className="flex justify-center items-center gap-2"
              >
                <div
                  className="h-4 w-4 rounded"
                  style={{ backgroundColor: item.color || COLORS[index % COLORS.length] }}
                ></div>
                <span className="text-[14px] font-medium">{item.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PieChartComponent;
