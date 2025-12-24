"use client";
import GridCommonComponent from "@/components/grid/gridCommonComponent";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import React from "react";
import { service_data } from "./service_data";
import { columns } from "./column";
import ActionComponent from "@/components/grid/actionComponent";
import DynamicForm from "@/components/modules/DynamicFormRendering";
import { addServiceConfig } from "./config";
import Image from "next/image";

const ServicesPage = () => {
  const options = {
    select: false,
    order: false,
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="relative mb-2 w-[400px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input className="pl-10" placeholder="Search here..." />
        </div>
        <div className="flex gap-2">
          <ActionComponent
            actions={[
              {
                type: "sidebar",
                component: <DynamicForm config={addServiceConfig} />,
              },
            ]}
            icon={
              <Image
                src="/icons/plusbutton.svg"
                alt="Add Services"
                width={18}
                height={18}
              />
            }
            text="Add Services"
            buttonClassName="inline-flex items-center gap-2 bg-[#02C8DE] text-white px-4 py-2 rounded-md hover:bg-[#02C8DE] hover:text-[#111111]"
          />
        </div>
      </div>

      <div className="w-full">
        <GridCommonComponent
          data={service_data}
          options={options}
          columns={columns}
          theme={{
            border: "border-gray-300",
            header: {
              bg: "bg-gray-100",
            },
          }}
        />
      </div>
    </div>
  );
};

export default ServicesPage;
