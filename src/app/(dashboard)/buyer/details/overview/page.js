"use client";
import React, { useState, useEffect } from "react";
import PortfolioCard from "@/components/common/PortfolioCard";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import ActionPopup from "@/components/common/ActionPopup";
import GridCommonComponent from "@/components/grid/gridCommonComponent";
import { getFraudReportColumns } from "./farudReportColumn";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBuyers,
  reactivateBuyer,
  sendResetPasswordLink,
  suspendBuyer,
} from "@/state/buyer/buyerSlice";
import {
  fetchFraudReportsByUser,
  deleteFraudReports,
} from "@/state/fraudReport/fraudReportSlice";
import { toast } from "sonner";

const ClientDetails = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const dispatch = useDispatch();

  const { buyers, loading: buyerLoading } = useSelector((state) => state.buyer);
  const { reports, loading: reportLoading } = useSelector(
    (state) => state.fraudReport,
  );

  const [isReactivateOpen, setIsReactivateOpen] = useState(false);

  // Find the specific buyer from the store
  const currentBuyer = buyers.find((b) => b._id === id || b.id === id);

  useEffect(() => {
    // If we don't have buyers list then fetch them
    if (!currentBuyer && !buyerLoading && buyers.length === 0) {
      dispatch(fetchBuyers({}));
    }
  }, [dispatch, currentBuyer, buyerLoading, buyers.length]);

  useEffect(() => {
    if (id) {
      dispatch(fetchFraudReportsByUser(id));
    }
  }, [dispatch, id]);

  const options = {
    select: false,
    order: false,
    sortable: false,
  };

  const loading = buyerLoading || reportLoading;

  if (loading && !currentBuyer) {
    return <div className="p-6">Loading...</div>;
  }

  if (!currentBuyer && !loading && buyers.length > 0) {
    return <div className="p-6">Buyer not found</div>;
  }

  // Fallback to empty object if loading or not found
  const buyerData = currentBuyer || {};

  const client = {
    image: buyerData.profile || "/CustomerImage.svg",
    name: buyerData.name || "N/A",
    email: buyerData.email || "N/A",
    phone: buyerData.phone || "N/A",
    status: buyerData.isSuspended
      ? "Suspended"
      : buyerData.isActive
        ? "Active"
        : "Inactive",
    joined: buyerData.createdAt
      ? new Date(buyerData.createdAt).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "N/A",
    suspensionReason: buyerData.suspensionReason || "",
  };

  const OverviewData = [
    {
      color: "bg-primary1",
      head: "Product Orders",
      total: buyerData.totalOrders || "0",
      countIcon: "",
      upCount: "",
      MainIcon: (
        <Image
          src="/assets/card/overview_booking.svg"
          width={20}
          height={20}
          alt="Booking"
        />
      ),
      description: "Products Orders placed this month",
    },
    {
      color: "bg-secondary1",
      head: "Total Spent",
      total: `$${buyerData.totalSpent || 0}`,
      countIcon: "",
      upCount: "",
      MainIcon: (
        <Image
          src="/assets/card/overview_revenue.svg"
          width={20}
          height={20}
          alt="Revenue"
        />
      ),
      description: "Spent this month",
    },
  ];

  const formattedFraudReports = (reports || []).map((item) => ({
    id: item._id || item.id,
    reportId: item.reportId || item.id || "N/A",
    reason: Array.isArray(item.reason)
      ? item.reason.join(", ")
      : item.reason || "N/A",
    reportOn: item.createdAt,
    status: item.status,
    evidence: item.image,
    reportBy: {
      name: item.reporterId?.name || "N/A",
      email: item.reporterId?.email || "N/A",
      profile: item.reporterId?.profile,
    },
    targetUser: {
      id: item.reportedId?.id || item.userId,
      type: "BUYER",
    },
    // fullReport: item, // Keep full object for view modal if needed
  }));

  const handleBack = () => router.back();

  const handleReactivate = async () => {
    const reason = "Reactivated by admin from overview";
    try {
      await dispatch(
        reactivateBuyer({
          id: buyerData._id || buyerData.id,
          data: { reason },
        }),
      ).unwrap();
      toast.success("Buyer reactivated successfully");
      setIsReactivateOpen(false);
    } catch (error) {
      toast.error(error.message || "Failed to reactivate buyer");
    }
  };

  const handleResetLink = async () => {
    try {
      await dispatch(
        sendResetPasswordLink(buyerData._id || buyerData.id),
      ).unwrap();
      toast.success("Reset link sent successfully");
    } catch (error) {
      toast.error(error.message || "Failed to send reset link");
    }
  };

  const handleDeleteReport = async (reportId) => {
    try {
      await dispatch(deleteFraudReports([reportId])).unwrap();
      toast.success("Report deleted successfully");
    } catch (error) {
      toast.error(error.message || "Failed to delete report");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-4">
        {/* Back arrow */}
        <div
          className="p-2 rounded-md hover:bg-gray-100 cursor-pointer"
          onClick={handleBack}
        >
          <Image
            src="/icons/backArrow.svg"
            alt="back button"
            width={20}
            height={20}
          />
        </div>
      </div>

      <div className="mb-4">
        <PortfolioCard data={OverviewData} />
      </div>

      {/* Buyer Details */}
      <div className="border border-[#E4E4E6] rounded-lg p-6 bg-[#FFFFFF] mb-4">
        {/* header */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h2 className="text-lg font-semibold">Buyer Details</h2>
        </div>

        {/* Profile */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="rounded-md  mb-3">
            <Image
              src={client.image}
              alt={client.name}
              width={200}
              height={250}
              unoptimized
              className="object-cover  rounded"
            />
          </div>
          <h3 className="text-lg  font-semibold">{client.name}</h3>
          <p className="text-[var(--color-dull-text)] text-sm">
            {client.email}
          </p>
        </div>

        {/* Information of Client */}
        <div className="grid grid-cols-3  text-sm text-center border-t border-b py-4">
          <div>
            <p className="text-[var(--color-dull-text)] mb-1">Phone</p>
            <p className="font-medium">{client.phone}</p>
          </div>

          <div>
            <p className="text-[var(--color-dull-text)] mb-1">Status</p>
            {client.status === "Suspended" ? (
              <span className="bg-red-100 text-red-600 px-3 py-1 rounded-md text-xs font-medium">
                Suspended
              </span>
            ) : (
              <span className="bg-green-100 text-green-600 px-3 py-1 rounded-md text-xs font-medium">
                Active
              </span>
            )}
          </div>
          <div>
            <p className="text-[var(--color-dull-text)] mb-1">Joined Date</p>
            <p className="font-medium">{client.joined}</p>
          </div>
        </div>
      </div>

      {/* Fraud Report Grid */}
      <div className="border border-[#E4E4E6] rounded-lg p-6 bg-[#FFFFFF] mb-4">
        <h2 className="text-lg font-semibold mb-4">Fraud Reports</h2>
        <div className="mt-6 mb-6">
          <GridCommonComponent
            data={formattedFraudReports}
            options={options}
            columns={getFraudReportColumns({
              onDelete: handleDeleteReport,
            })}
            theme={{
              border: "border-none",
              header: {
                bg: "bg-gray-100",
              },
            }}
          />
        </div>
      </div>

      {/* Suspension Reason */}
      {client.suspensionReason && (
        <div className="border border-[#E4E4E6] rounded-lg p-6 bg-[#FFFFFF] mb-4">
          <div className="rounded-md bg-gray-50 text-sm">
            <p className="text-[var(--color-dull-text)] mb-1">
              Suspension Reason:
            </p>
            <p className="font-medium">{client.suspensionReason}</p>
          </div>
        </div>
      )}

      {/* Reactivate & share password reset link buttons */}
      <div className="flex gap-2 justify-end mt-2">
        {client.status === "Suspended" && (
          <button
            className="flex items-center gap-2 p-2 border border-[var(--border-admin)] rounded-md bg-white hover:bg-gray-100 text-[var(--color-dull-text)]"
            onClick={() => setIsReactivateOpen(true)}
          >
            <Image
              src="/assets/icon/reactivateCustomer.svg"
              alt="Reactivate Customer"
              width={14}
              height={14}
            />
            <span className="hidden sm:inline">Reactivate Buyer</span>
          </button>
        )}

        {client.status !== "Suspended" && (
          <button
            className="flex items-center gap-2 p-2 border border-[var(--border-admin)] rounded-md bg-white hover:bg-gray-100 text-[var(--color-dull-text)]"
            onClick={handleResetLink}
          >
            <Image
              src="/assets/icon/lock.svg"
              alt="Reset Password"
              width={14}
              height={14}
            />
            <span className="hidden sm:inline">Share Reset Password Link</span>
          </button>
        )}

        {isReactivateOpen && (
          <ActionPopup
            isOpen={isReactivateOpen}
            onClose={() => setIsReactivateOpen(false)}
            onCancel={() => setIsReactivateOpen(false)}
            heading="Reactivate Buyer?"
            subHeading={[
              "Are you sure you want to reactivate this Buyer’s account?",
              "Once reactivated, Buyer will regain full access to kushagro,",
              "including Booking appointments and making purchases.",
            ]}
            confirmText="Confirm Reactivation"
            confirmColor="text-secondary1"
            onApply={handleReactivate}
          />
        )}
      </div>
    </div>
  );
};

export default ClientDetails;
