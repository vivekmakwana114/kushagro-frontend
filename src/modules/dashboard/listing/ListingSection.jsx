import GridCommonComponent from "@/components/grid/gridCommonComponent";
import { listingData } from "./listingData";
import { listingColumns } from "./listingColumn";

export default function ListingSection({
  title,
  data = listingData,
  columns = listingColumns,
  link,
}) {
  const options = {
    select: false,
    order: false,
    sortable: true,
  };

  return (
    <div className="w-full border rounded-lg p-4 h-[450px] flex flex-col">
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">{title}</div>
        <a
          href={link}
          className="text-sm text-secondary1 hover:underline font-medium"
        >
          View All
        </a>
      </div>
      <div className="pt-4 overflow-y-auto custom-scroll grow">
        <GridCommonComponent
          data={data}
          columns={columns}
          options={options}
          theme={{
            border: "border-none",
            header: { bg: "bg-gray-100" },
          }}
        />
      </div>
    </div>
  );
}
