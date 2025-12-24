"use client";
import React, { useState } from "react";
import GridCommonComponent from "@/components/grid/gridCommonComponent";
import { transactionData } from "./transactionData";
import { transactionColumn } from "./transactionColumn";
import { Input } from "@/components/ui/input";
import { Download, Filter, Search } from "lucide-react";
import { BsFilePdf, BsFileSpreadsheet } from "react-icons/bs";
import ActionComponent from "@/components/grid/actionComponent";
import DynamicForm from "@/components/modules/DynamicFormRendering";
import { transactionFilterConfig } from "./transactionConfig";
import Pagination from "@/components/ui/pagination";

const options = {
  select: false,
  order: false,
  sortable: false,
};

const downloadActions = [
  {
    header: "Download List",
  },
  {
    label: "Download PDF",
    icon: (
      <BsFilePdf className="w-4 h-4 text-[var(--color-placeholder-color)] font-bold" />
    ),
    onClick: () => console.log("Download PDF"),
  },
  {
    label: "Download CSV",
    icon: (
      <BsFileSpreadsheet className="w-4 h-4  text-[var(--color-placeholder-color)] font-bold" />
    ),
    onClick: () => console.log("Download CSV"),
  },
];

const AllTransactionPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = transactionData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(transactionData.length / itemsPerPage);
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2 gap-2">
        <div className="relative w-[400px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-dull-text)]" />
          <Input className="pl-10 w-full" placeholder="Search here..." />
        </div>

        <div className="flex gap-2">
          <ActionComponent
            actions={downloadActions}
            buttonClassName="inline-flex items-center justify-center p-2 border border-[var(--border-admin)] bg-white rounded-md  hover:bg-gray-50"
            icon={<Download className="w-5 h-5 text-[var(--color-primary1)]" />}
          />

          <ActionComponent
            actions={[
              {
                type: "sidebar",
                component: <DynamicForm config={transactionFilterConfig} />,
              },
            ]}
            icon={<Filter className="w-5 h-5 text-[var(--color-primary1)]" />}
            buttonClassName="inline-flex items-center justify-center p-2 border border-[var(--border-admin)] bg-white rounded-md  hover:bg-gray-50"
          />
        </div>
      </div>
      <div className="">
        <GridCommonComponent
          data={currentData}
          options={options}
          columns={transactionColumn}
          theme={{
            border: "border-gray-300",
            header: {
              bg: "bg-gray-100",
            },
          }}
        />
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};
export default AllTransactionPage;
