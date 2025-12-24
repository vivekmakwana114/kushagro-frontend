import { productColumns } from "./productColumn";
import GridCommonComponent from "@/components/grid/gridCommonComponent";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchTopSellingProducts } from "@/state/dashboard/dashboardSlice";

export default function ProductSection() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchTopSellingProducts());
  }, [dispatch]);

  const options = {
    select: false,
    order: false,
    sortable: true,
  };

  return (
    <div className="w-full border rounded-lg p-4 h-[450px] flex flex-col">
      <div className="mt-2 text-lg font-semibold mb-2">Top Selling Products</div>
      <div className="overflow-y-auto custom-scroll grow">
        <GridCommonComponent className="h-full"
          data={products}
          columns={productColumns}
          options={options}
          theme={{
            border: "border-gray-300",
            header: { bg: "bg-gray-100" },
          }}
        />
        {loading && (
          <div className="text-sm text-gray-500 mt-2 text-center">Loading top products...</div>
        )}
      </div>
    </div>
  );
}