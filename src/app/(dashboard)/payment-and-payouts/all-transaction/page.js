"use client";
import React, { useState } from "react";
import GridCommonComponent from "@/components/grid/gridCommonComponent";
import { transactionData } from "./transactionData";
import { transactionColumn } from "./transactionColumn";
import { Input } from "@/components/ui/input";
import { Download, Filter, Search } from "lucide-react";
import ActionComponent from "@/components/grid/actionComponent";
import TransactionFilterForm from "./TransactionFilterForm";
import { transactionFilterConfig } from "./transactionConfig";
import Pagination from "@/components/ui/pagination";
import Image from "next/image";

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
      <Image
        src="/assets/icon/downloadpdf.svg"
        alt="downloadpdf"
        width={16}
        height={16}
      />
    ),
    onClick: () => console.log("Download PDF"),
  },
  {
    label: "Download CSV",
    icon: (
      <Image
        src="/assets/icon/downloadcsv.svg"
        alt="downloadcsv"
        width={16}
        height={16}
      />
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
    <div className="w-full md:h-[calc(100vh-9rem)] h-full flex flex-col">
      <div className="flex items-center justify-between mb-2 gap-2 flex-none">
        <div className="relative w-[400px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-dull-text" />
          <Input className="pl-10 w-full" placeholder="Search here..." />
        </div>

        <div className="flex gap-2">
          <ActionComponent
            actions={downloadActions}
            buttonClassName="inline-flex items-center justify-center p-2 border border-(--border-admin) bg-white rounded-md  hover:bg-gray-50"
            icon={
              <Download className="w-5 h-5 text-secondary1" />
            }
          />

          <ActionComponent
            actions={[
              {
                type: "sidebar",
                component: <TransactionFilterForm />,
              },
            ]}
            icon={<Filter className="w-5 h-5 text-secondary1" />}
            buttonClassName="inline-flex items-center justify-center p-2 border border-border-admin bg-white rounded-md  hover:bg-gray-50"
          />
        </div>
      </div>
      <div className="flex-1 min-h-0">
        <GridCommonComponent
          data={currentData}
          options={options}
          columns={transactionColumn}
          theme={{
            border: "border-border-admin",
            header: {
              bg: "bg-gray-100",
            },
          }}
        />
      </div>
      <div className="flex-none mt-2">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};
export default AllTransactionPage;
