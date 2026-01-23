"use client";

import { Download, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import GridCommonComponent from "@/components/grid/gridCommonComponent";
import { getProductOrderColumns } from "./prodctOrderColumn";
import ActionComponent from "@/components/grid/actionComponent";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchBuyerOrders } from "@/state/buyer/buyerSlice";

export default function Page() {
  const options = { select: false, order: false, sortable: false };
  const searchParams = useSearchParams();
  const buyerId = searchParams.get("id");
  const dispatch = useDispatch();

  const { buyerOrders, buyerOrdersLoading } = useSelector(
    (state) => state.buyer,
  );

  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    if (buyerId) {
      dispatch(fetchBuyerOrders({ buyerId: buyerId }));
    }
  }, [dispatch, buyerId]);

  const handleCancelBooking = (row) => {
    setSelectedBooking(row);
    setShowCancelPopup(true);
  };

  const columns = getProductOrderColumns(handleCancelBooking);

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

  // Map backend data to grid format
  const formattedOrders = (buyerOrders || []).map((order) => {
    const rawPaymentStatus =
      order.paymentStatus?.toLowerCase() ||
      order.payments?.[0]?.status?.toLowerCase() ||
      "";
    let paymentStatus = "pending";

    if (["payment success", "paid"].includes(rawPaymentStatus)) {
      paymentStatus = "paid";
    } else if (
      ["refund initiated", "refunded initiated", "processing"].includes(
        rawPaymentStatus,
      )
    ) {
      paymentStatus = "processing";
    } else {
      paymentStatus = rawPaymentStatus || "pending";
    }

    const currentStatus = order.status?.toLowerCase() || "ongoing";

    return {
      ...order,
      product_order_id: order.orderNumber || order.orderId || order._id, // Fallback for ID
      product: {
        name: order.product?.name || "N/A",
        category: order.product?.category || order.category?.name || "N/A",
        profile: order.product?.image || order.product?.images?.[0] || "",
      },
      seller: {
        name: order.seller?.name || "N/A",
        email: order.seller?.email || "",
        profile: order.seller?.profile || "",
      },
      date_time: order.date || order.createdAt,
      amount: order.amount ?? order.totalAmount,
      status: paymentStatus === "processing" ? "cancelled" : currentStatus,
      payment_status: paymentStatus,
    };
  });

  return (
    <div className="w-full md:h-[calc(100vh-9rem)] h-full flex flex-col">
      {/* Top Controls */}
      <div className="flex items-center justify-between mb-2 gap-2 flex-none">
        <div className="relative w-[400px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input className="pl-10 w-full" placeholder="Search here..." />
        </div>

        <div className="flex gap-2">
          <ActionComponent
            actions={downloadActions}
            buttonClassName="inline-flex items-center justify-center p-2 border border-[var(--border-admin)] bg-white rounded-md  hover:bg-gray-50"
            icon={<Download className="w-4 h-4 text-secondary1" />}
          />
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 min-h-0">
        <GridCommonComponent
          data={formattedOrders}
          options={options}
          columns={columns}
          loading={buyerOrdersLoading}
          theme={{
            border: "border-gray-300",
            header: { bg: "bg-gray-100" },
          }}
        />
      </div>
    </div>
  );
}
