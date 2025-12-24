"use client";
import React, { useState } from "react";
import { IoCalendarClear } from "react-icons/io5";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { CardContent } from "../ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

const bookingData = [
  {
    year: "2024",
    data: [
      { month: "Jan", bookingValue: "8214" },
      { month: "Feb", bookingValue: "3742" },
      { month: "Mar", bookingValue: "10563" },
      { month: "Apr", bookingValue: "2491" },
      { month: "May", bookingValue: "6789" },
      { month: "Jun", bookingValue: "5123" },
      { month: "Jul", bookingValue: "9341" },
      { month: "Aug", bookingValue: "1678" },
      { month: "Sep", bookingValue: "7890" },
      { month: "Oct", bookingValue: "4321" },
      { month: "Nov", bookingValue: "2987" },
      { month: "Dec", bookingValue: "11542" },
    ],
  },
  {
    year: "2025",
    data: [
      { month: "Jan", bookingValue: "5432" },
      { month: "Feb", bookingValue: "9876" },
      { month: "Mar", bookingValue: "3214" },
      { month: "Apr", bookingValue: "7654" },
      { month: "May", bookingValue: "2109" },
      { month: "Jun", bookingValue: "8765" },
      { month: "Jul", bookingValue: "4567" },
      { month: "Aug", bookingValue: "10987" },
      { month: "Sep", bookingValue: "6543" },
      { month: "Oct", bookingValue: "3210" },
      { month: "Nov", bookingValue: "7890" },
      { month: "Dec", bookingValue: "5432" },
    ],
  },
  {
    year: "2026",
    data: [
      { month: "Jan", bookingValue: "9123" },
      { month: "Feb", bookingValue: "2345" },
      { month: "Mar", bookingValue: "6789" },
      { month: "Apr", bookingValue: "4567" },
      { month: "May", bookingValue: "8901" },
      { month: "Jun", bookingValue: "1234" },
      { month: "Jul", bookingValue: "5678" },
      { month: "Aug", bookingValue: "3456" },
      { month: "Sep", bookingValue: "7890" },
      { month: "Oct", bookingValue: "2345" },
      { month: "Nov", bookingValue: "6789" },
      { month: "Dec", bookingValue: "9012" },
    ],
  },
  {
    year: "2027",
    data: [
      { month: "Jan", bookingValue: "4567" },
      { month: "Feb", bookingValue: "7890" },
      { month: "Mar", bookingValue: "1234" },
      { month: "Apr", bookingValue: "5678" },
      { month: "May", bookingValue: "9012" },
      { month: "Jun", bookingValue: "3456" },
      { month: "Jul", bookingValue: "6789" },
      { month: "Aug", bookingValue: "2345" },
      { month: "Sep", bookingValue: "8901" },
      { month: "Oct", bookingValue: "4567" },
      { month: "Nov", bookingValue: "1234" },
      { month: "Dec", bookingValue: "7890" },
    ],
  },
  {
    year: "2028",
    data: [
      { month: "Jan", bookingValue: "5678" },
      { month: "Feb", bookingValue: "9012" },
      { month: "Mar", bookingValue: "3456" },
      { month: "Apr", bookingValue: "7890" },
      { month: "May", bookingValue: "2345" },
      { month: "Jun", bookingValue: "6789" },
      { month: "Jul", bookingValue: "1234" },
      { month: "Aug", bookingValue: "4567" },
      { month: "Sep", bookingValue: "8901" },
      { month: "Oct", bookingValue: "5678" },
      { month: "Nov", bookingValue: "2345" },
      { month: "Dec", bookingValue: "9012" },
    ],
  },
  {
    year: "2029",
    data: [
      { month: "Jan", bookingValue: "3456" },
      { month: "Feb", bookingValue: "7890" },
      { month: "Mar", bookingValue: "1234" },
      { month: "Apr", bookingValue: "5678" },
      { month: "May", bookingValue: "9012" },
      { month: "Jun", bookingValue: "4567" },
      { month: "Jul", bookingValue: "2345" },
      { month: "Aug", bookingValue: "6789" },
      { month: "Sep", bookingValue: "1234" },
      { month: "Oct", bookingValue: "7890" },
      { month: "Nov", bookingValue: "5678" },
      { month: "Dec", bookingValue: "9012" },
    ],
  },
];

const sampleData = [
  { month: "Jan", users: 4000 },
  { month: "Feb", users: 3000 },
  { month: "Mar", users: 2000 },
  { month: "Apr", users: 2780 },
  { month: "May", users: 1890 },
  { month: "Jun", users: 2390 },
  { month: "Jul", users: 3490 },
  { month: "Aug", users: 4000 },
  { month: "Sep", users: 3000 },
  { month: "Oct", users: 2000 },
  { month: "Nov", users: 2780 },
  { month: "Dec", users: 1890 },
];

const chartConfig = {
  height: 300,
  width: "100%",
};

const LineChartByYear = () => {
  const [selected, setSelected] = useState(new Date().getFullYear().toString());

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
              {bookingData.map((item) => (
                <div
                  key={item}
                  className={`flex flex-row gap-2 justify-between cursor-pointer p-2 rounded-[8px] ${
                    item.year === selected
                      ? "text-primary1 bg-[#E5FCFF]"
                      : ""
                  }`}
                  onClick={() => setSelected(item.year)}
                >
                  <p className="text-[14px] font-medium text-[var(--dark)]">
                    {item.year}
                  </p>
                  {item.year === selected && (
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
          <AreaChart data={sampleData}>
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
              dataKey="users"
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
