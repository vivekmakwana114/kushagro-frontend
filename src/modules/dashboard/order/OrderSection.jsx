import { orderColumns } from "./OrderColumn";
import GridCommonComponent from "@/components/grid/gridCommonComponent";
import { orderData } from "./OrderData";

export default function OrderSection({
  title = "Recent Orders",
  data = orderData,
  columns = orderColumns,
  order =  false,
  link,
}) {
  const options = {
    select: false,
    order: order,
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
      <div className="pt-4 grow h-full overflow-hidden">
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
