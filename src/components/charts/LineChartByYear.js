"use client";
import React, { useState, useEffect } from "react";
import { IoCalendarClear } from "react-icons/io5";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IoIosCheckmarkCircle } from "react-icons/io";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

const LineChartByYear = ({
  year = new Date().getFullYear().toString(),
  onYearChange,
  data = [],
}) => {
  const [selected, setSelected] = useState(year);

  useEffect(() => {
    setSelected(year);
  }, [year]);

  const years = Array.from({ length: 6 }, (_, i) =>
    (new Date().getFullYear() - 2 + i).toString()
  );

  return (
    <div className="border border-[var(--border-admin)] rounded-[8px]  h-full">
      <div className="border border-[var(--border-admin)] border-b p-4 justify-between flex flex-row">
        <p className="text-black text-[18px] font-semibold ">
          Revenue Report
        </p>
        <div className="flex flex-row gap-2 items-center">
          <p className="text-[#282928] text-[14px] font-medium">{selected}</p>
          <Popover>
            <PopoverTrigger>
              <IoCalendarClear size={20} className="cursor-pointer" />
            </PopoverTrigger>
            <PopoverContent
              className="border w-[162px] border-[var(--border-admin)] rounded-[8px] p-[20px] "
              align="center"
              sideOffset={10}
            >
              {years.map((item) => (
                <div
                  key={item}
                  className={`flex flex-row gap-2 justify-between cursor-pointer p-2 rounded-[8px] ${item === selected
                    ? "text-primary1 bg-[#E5FCFF]"
                    : ""
                    }`}
                  onClick={() => setSelected(item)}
                >
                  <p className="text-[14px] font-medium text-[var(--dark)]">
                    {item}
                  </p>
                  {item === selected && (
                    <IoIosCheckmarkCircle
                      color="white"
                      fill="var(--color-primary1) "
                    />
                  )}
                </div>
              ))}
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="w-full h-[250px] pt-8 pr-2 sm:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="50%" stopColor="#FFD24E" stopOpacity={0.4} />
                <stop offset="80%" stopColor="#FFD24E" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#2E5B20"
              fillOpacity={1}
              fill="url(#colorUsers)"
              dot={{ r: 5, fill: "#2E5B20" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChartByYear;
