import React from "react";
import LineChartByYear from "./LineChartByYear";
import PieChart from "./PieChart";

const Charts = ({
  revenueData,
  orderStatusData,
  selectedYear,
  onYearChange,
}) => {
  return (
    <div className="flex md:flex-row flex-col gap-[16px] w-full h-full">
      <div className="w-full md:w-[60%]">
        <LineChartByYear
          data={revenueData}
          year={selectedYear}
          onYearChange={onYearChange}
        />
      </div>
      <div className="w-full md:w-[40%]">
        <PieChart data={orderStatusData} />
      </div>
    </div>
  );
};

export default Charts;
