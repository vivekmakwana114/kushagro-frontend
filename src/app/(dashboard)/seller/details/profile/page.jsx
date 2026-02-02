"use client";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import {
  getSellerDetailsAction,
  reactivateSellerAction,
  verifySellerAction,
  resetPasswordLinkAction,
  fetchSellerReviews,
} from "@/state/seller/sellerSlice";
import {
  deleteFraudReports,
  fetchFraudReportsByUser,
} from "@/state/fraudReport/fraudReportSlice";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import GridCommonComponent from "@/components/grid/gridCommonComponent";
import PortfolioCards from "@/components/common/PortfolioCard";
import { useRouter } from "next/navigation";
import { getFraudReportColumns } from "./fraudReportColumn";
import ActionPopup from "@/components/common/ActionPopup";
import { toast } from "sonner";
import ReviewsDrawer from "@/components/common/reviews/ReviewsDrawer";

const options = {
  select: false,
  order: false,
  sortable: false,
};

const seller = {
  image: "/CustomerImage.svg",
  name: "Brayan Lara",
  email: "brayanl@ksa.com",
  phone: "(+81)000 0000",
  status: "Suspended",
  joined: "22 Feb, 2024",
  suspensionReason: "Spam or fake account",
  about:
    "A dedicated seller with a passion for providing unique and high-quality products to discerning customers.",
  location: "Sudan, Central Africa",
  verificationStatus: "Pending",
  rating: 4.8,
  reviews: 230,
};

const sellerCard = [
  {
    color: "bg-primary1",
    head: "Total Orders",
    total: "08",
    countIcon: "",
    upCount: "8.06",
    MainIcon: (
      <Image
        src="/assets/card/overview_booking.svg"
        width={20}
        height={20}
        alt="Barber Shop"
      />
    ),
    description: "+10 New Orders this month",
  },
  {
    color: "bg-tertiary1",
    head: "Total Products",
    total: "04",
    countIcon: "8.06%",
    upCount: "8.06",
    MainIcon: (
      <Image
        src="/assets/card/overview_order.svg"
        width={20}
        height={20}
        alt="Barber Shop"
      />
    ),
    description: "+02 Completed Orders this month",
  },
  {
    color: "bg-quaternary1",
    head: "Total Listing",
    total: "12",
    countIcon: "",
    upCount: "8.06",
    MainIcon: (
      <Image
        src="/assets/card/overview_listing.svg"
        width={20}
        height={20}
        alt="Barber Shop"
      />
    ),
    description: "5 New Listing this month.",
  },
  {
    color: "bg-quinary1",
    head: "Total Earnings",
    total: "$1189.56",
    countIcon: "",
    upCount: "8.06",
    MainIcon: (
      <Image
        src="/assets/card/overview_revenue.svg"
        width={20}
        height={20}
        alt="Barber Shop"
      />
    ),
    description: "+$189 Earn this month",
  },
];

const SellerProfilePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const dispatch = useDispatch();
  const {
    sellerDetails,
    sellerReviews,
    sellerReviewsStats,
    sellers,
    loading: sellerLoading,
  } = useSelector((state) => state.seller);
  const { reports: sellerReports, loading: reportsLoading } = useSelector(
    (state) => state.fraudReport,
  );

  const loading = sellerLoading || reportsLoading;

  const handleBack = () => router.back();
  const [isReactivateOpen, setIsReactivateOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getSellerDetailsAction(id));
      dispatch(fetchFraudReportsByUser(id));
      dispatch(fetchSellerReviews(id));
    }
  }, [dispatch, id]);

  const handleReactivate = () => {
    dispatch(reactivateSellerAction(id))
      .unwrap()
      .then(() => {
        toast.success("Seller Reactivated Successfully");
        setIsReactivateOpen(false);
        dispatch(getSellerDetailsAction(id));
      })
      .catch((err) => toast.error(err || "Failed to reactivate"));
  };

  const handleVerify = () => {
    dispatch(verifySellerAction({ id, data: { status: "APPROVED" } }))
      .unwrap()
      .then(() => {
        toast.success("Seller Verified Successfully");
        dispatch(getSellerDetailsAction(id));
      })
      .catch((err) => toast.error(err || "Failed to verify"));
  };

  const handleReject = (data) => {
    // const reason = data.selectedOptions?.[0] || "Other";
    dispatch(
      verifySellerAction({
        id,
        data: { status: "REJECTED", reasons: ["Other"] },
      }),
    )
      .unwrap()
      .then(() => {
        toast.success("Seller Rejected Successfully");
        setIsRejectOpen(false);
        dispatch(getSellerDetailsAction(id));
      })
      .catch((err) => toast.error(err || "Failed to reject"));
  };

  const handleResetPassword = () => {
    dispatch(resetPasswordLinkAction(id))
      .unwrap()
      .then(() => toast.success("Reset password link sent"))
      .catch((err) => toast.error(err || "Failed to send link"));
  };

  const sellerData = sellerDetails?.seller || sellerDetails || {};
  const stats = sellerDetails?.stats || sellerDetails || {};

  // Find seller in the list to prioritize list status if available
  const listSeller = sellers.find((s) => s._id === id || s.id === id);
  const prioritizedStatus = listSeller?.status || sellerData.status || "Active";

  // Normalize data fields
  const displaySeller = {
    ...sellerData,
    image: sellerData.profile || "/CustomerImage.svg",
    joined:
      sellerData.createdAt || sellerData.joinedAt
        ? new Date(
            sellerData.createdAt || sellerData.joinedAt,
          ).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : "N/A",
    name: sellerData.name || "N/A",
    email: sellerData.email || "N/A",
    phone: sellerData.phone || sellerData.phoneNumber || "N/A",
    status: prioritizedStatus,
    verificationStatus:
      sellerData.identityVerificationStatus === "APPROVED" ||
      sellerData.idStatus === "Verified"
        ? "Verified"
        : sellerData.identityVerificationStatus === "REJECTED" ||
            sellerData.idStatus === "Rejected"
          ? "Rejected"
          : "Pending",
    rating: sellerData.rating || 0,
    reviews: sellerData.reviews || 0,
    about: sellerData.bio || "No description provided.",
    location: sellerData.address || "N/A",
    idImage: sellerData.governmentId || "/assets/images/testimage.png",
    suspensionReason: sellerData.suspensionReason || null,
  };

  const sellerCard = [
    {
      color: "bg-primary1",
      head: "Total Orders",
      total: stats.totalOrders || "0",
      countIcon: "",
      upCount: "8.06",
      MainIcon: (
        <Image
          src="/assets/card/overview_booking.svg"
          width={20}
          height={20}
          alt="Barber Shop"
        />
      ),
      description: "+10 New Orders this month",
    },
    {
      color: "bg-tertiary1",
      head: "Total Products",
      total: stats.totalProducts || "0",
      countIcon: "8.06%",
      upCount: "8.06",
      MainIcon: (
        <Image
          src="/assets/card/overview_order.svg"
          width={20}
          height={20}
          alt="Barber Shop"
        />
      ),
      description: "+02 Completed Orders this month",
    },
    {
      color: "bg-quaternary1",
      head: "Total Listing",
      total: stats.totalListings || "0",
      countIcon: "",
      upCount: "8.06",
      MainIcon: (
        <Image
          src="/assets/card/overview_listing.svg"
          width={20}
          height={20}
          alt="Barber Shop"
        />
      ),
      description: "5 New Listing this month.",
    },
    {
      color: "bg-quinary1",
      head: "Total Earnings",
      total: `$${stats.totalEarnings || 0}`,
      countIcon: "",
      upCount: "8.06",
      MainIcon: (
        <Image
          src="/assets/card/overview_revenue.svg"
          width={20}
          height={20}
          alt="Barber Shop"
        />
      ),
      description: "+$189 Earn this month",
    },
  ];

  // Map reports for grid
  const formattedReports = (sellerReports || []).map((report) => ({
    _id: report._id || report.id,
    reportId: report.reportId || report.id || report._id,
    reportBy: {
      name: report.reporterId?.name || "Unknown",
      email: report.reporterId?.email || "N/A",
      profile: report.reporterId?.profile || "/assets/icon/no_profile_icon.svg",
    },
    reason: report.reason
      ? Array.isArray(report.reason)
        ? report.reason.join(", ")
        : report.reason
      : "N/A",
    report_on: report.createdAt,
  }));

  const handleDeleteReport = (reportId) => {
    dispatch(deleteFraudReports([reportId]))
      .unwrap()
      .then(() => toast.success("Report deleted successfully"))
      .catch((err) => toast.error(err || "Failed to delete report"));
  };

  if (loading && !sellerDetails) {
    return <div className="p-8 text-center">Loading seller details...</div>;
  }

  return (
    <div className="w-full px-4 text-sm">
      <div className="flex justify-between items-center mb-4">
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

      <>
        <div className="mb-4">
          <PortfolioCards data={sellerCard} />
        </div>
      </>

      {/* Seller Details */}
      <div className="border border-[#E4E4E6] rounded-lg p-6 bg-[#FFFFFF] mb-4">
        {/* header */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h2 className="text-lg font-semibold text-[#111111]">
            Seller Details
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column: Profile Info + Stats */}
          <div className="flex flex-col w-full md:w-1/2">
            <div className="flex flex-col items-center text-center">
              <div className="rounded-md overflow-hidden mb-4 p-1">
                <Image
                  src={displaySeller.image}
                  // alt={displaySeller.name}
                  alt="seller photo"
                  width={180}
                  height={180}
                  unoptimized
                  className="object-cover rounded-md"
                />
              </div>
              <h3 className="text-xl font-bold text-[#111111] mb-1">
                {displaySeller.name}
              </h3>
              <p className="text-[var(--color-dull-text)] font-medium">
                {displaySeller.email}
              </p>
            </div>

            <div className="h-[1px] bg-[#E4E4E6] w-full my-6"></div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-[var(--color-dull-text)] mb-2 font-medium">
                  Phone
                </p>
                <p className="font-semibold text-[#111111]">
                  {displaySeller.phone}
                </p>
              </div>

              <div>
                <p className="text-[var(--color-dull-text)] mb-2 font-medium">
                  Status
                </p>
                <div className="flex justify-center">
                  {displaySeller.status === "Suspended" ? (
                    <span className="bg-[#FFF0F0] text-[#BC0D10] px-3 py-1.5 rounded text-xs font-semibold">
                      Suspended
                    </span>
                  ) : (
                    <span className="bg-[#EAFFED] text-[#097416] px-3 py-1.5 rounded text-xs font-semibold">
                      Active
                    </span>
                  )}
                </div>
              </div>

              <div>
                <p className="text-[var(--color-dull-text)] mb-2 font-medium">
                  Joined Date
                </p>
                <p className="font-semibold text-[#111111]">
                  {displaySeller.joined}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Info + Verification */}
          <div className="flex flex-1 flex-col gap-6 md:w-1/2 md:border-l md:pl-8 border-[#E4E4E6]">
            <div>
              <p className="text-[var(--color-dull-text)] mb-2 font-medium">
                About Seller
              </p>
              <p className="font-semibold text-[#111111] leading-relaxed">
                {displaySeller.about}
              </p>
            </div>

            <div>
              <p className="text-[var(--color-dull-text)] mb-2 font-medium">
                Seller Location
              </p>
              <p className="font-semibold text-[#111111]">
                {displaySeller.location}
              </p>
            </div>

            <div>
              <p className="text-[var(--color-dull-text)] mb-2 font-medium">
                Seller&apos;s ID
              </p>
              <div className="relative w-fit">
                <div
                  className="cursor-pointer"
                  onClick={() => setIsImageExpanded(true)}
                >
                  <Image
                    src={displaySeller.idImage}
                    width={200}
                    height={100}
                    alt="Seller ID"
                    unoptimized
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>

            <div>
              <p className="text-dull-text mb-2 font-medium">
                Verification Status
              </p>
              <div className="flex items-center justify-between gap-4">
                <span
                  className={`px-3 py-1.5 rounded text-xs font-semibold ${
                    displaySeller.verificationStatus === "Verified"
                      ? "bg-[#EAFFED] text-[#097416]"
                      : displaySeller.verificationStatus === "Rejected"
                        ? "bg-[#FFF0F0] text-[#BC0D10]"
                        : "bg-[#FFF8DD] text-[#FFBE00]"
                  }`}
                >
                  {displaySeller.verificationStatus}
                </span>
                <div className="flex gap-2">
                  <button
                    className="w-8 h-8 flex items-center justify-center bg-secondary1/10 rounded hover:bg-green-100 transition-colors"
                    onClick={() => {
                      handleVerify();
                    }}
                  >
                    <Image
                      src="/assets/icon/check.svg"
                      width={16}
                      height={16}
                      alt="Verify"
                    />
                  </button>
                  <button
                    className="w-8 h-8 flex items-center justify-center bg-red/10 rounded hover:bg-red-100 transition-colors"
                    onClick={() => handleReject()}
                  >
                    <Image
                      src="/assets/icon/cross.svg"
                      width={12}
                      height={12}
                      alt="Reject"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fraud Report Grid */}
      <div className="border border-[#E4E4E6] rounded-lg p-6 bg-[#FFFFFF] mb-4">
        <h2 className="text-lg font-semibold mb-4">Fraud Reports</h2>
        <div className="mt-6 mb-6">
          <GridCommonComponent
            data={formattedReports}
            options={options}
            columns={getFraudReportColumns({
              onDelete: handleDeleteReport,
            }).map((col) => {
              if (col.key === "action") {
                return {
                  ...col,
                  component: {
                    ...col.component,
                    options: {
                      ...col.component.options,
                      actions: (row) => col.component.options.actions(row),
                    },
                  },
                };
              }
              return col;
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

      {/* Ratings and Reviews */}
      <div className="border border-[#E4E4E6] rounded-lg p-6 bg-[#FFFFFF] mb-4">
        <h2 className="text-dull-text mb-4">Ratings and Reviews</h2>
        <div className="flex items-center gap-4">
          <span className="text-5xl font-bold text-[#111111] w-[140px]">
            {sellerReviewsStats?.averageRating || 0}/5
          </span>
          <div className="flex flex-col gap-1">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => {
                const fillPercentage = Math.min(
                  100,
                  Math.max(
                    0,
                    ((sellerReviewsStats?.averageRating || 0) - (star - 1)) *
                      100,
                  ),
                );

                return (
                  <div key={star} className="relative w-[24px] h-[24px]">
                    <Image
                      src="/assets/icon/star.svg"
                      width={24}
                      height={24}
                      alt="star"
                      unoptimized
                      // empty grayscale star
                      className="absolute inset-0 grayscale opacity-30"
                    />
                    <div
                      className="absolute inset-0 overflow-hidden"
                      style={{ width: `${fillPercentage}%` }}
                    >
                      <Image
                        src="/assets/icon/star.svg"
                        width={24}
                        height={24}
                        alt="star"
                        unoptimized
                        className="min-w-[24px]"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <span className="text-sm">
              <span className="text-dull-text">Based on: </span>
              <button
                className="text-secondary1 font-semibold hover:underline"
                onClick={() => setIsReviewsOpen(true)}
              >
                {sellerReviewsStats?.totalReviews || 0} reviews
              </button>
            </span>
          </div>
        </div>
      </div>

      {/* Suspension Reason */}
      {displaySeller.status?.toLowerCase() === "suspended" &&
        displaySeller.suspensionReason && (
          <div className="border border-[#E4E4E6] rounded-lg p-6 bg-[#FFFFFF] mb-4">
            <div className="rounded-md bg-gray-50 text-sm">
              <p className="text-[var(--color-dull-text)] mb-1">
                Suspension Reason:
              </p>
              <p className="font-medium">{displaySeller.suspensionReason}</p>
            </div>
          </div>
        )}

      {/* Reactivate & share password reset link buttons */}
      <div className="flex gap-2 justify-end mt-2">
        <button
          className="flex items-center gap-2 p-2 border border-[var(--border-admin)] rounded-md bg-white hover:bg-gray-100 text-[var(--color-dull-text)]"
          onClick={handleResetPassword}
        >
          <Image
            src="/assets/icon/lock.svg"
            alt="Reset Password"
            width={14}
            height={14}
          />
          <span className="hidden sm:inline">Share Reset Password Link</span>
        </button>

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
          <span className="hidden sm:inline">Reactivate Seller</span>
        </button>

        {isReactivateOpen && (
          <ActionPopup
            isOpen={isReactivateOpen}
            onClose={() => setIsReactivateOpen(false)}
            onCancel={() => setIsReactivateOpen(false)}
            heading="Reactivate Seller?"
            subHeading={[
              "Are you sure you want to reactivate this Seller’s account?",
              "Once reactivated, Seller will regain full access to kushagro,",
              "including Booking appointments and making purchases.",
            ]}
            confirmText="Confirm Reactivation"
            onApply={(data) => handleReactivate()}
          />
        )}

        {/* Image Expansion Modal */}
        {isImageExpanded && (
          <div
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80"
            onClick={() => setIsImageExpanded(false)}
          >
            <div
              className="relative max-w-[90vw] max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsImageExpanded(false)}
                className="absolute -top-10 right-0 text-white hover:text-gray-300"
              ></button>
              <Image
                src={displaySeller.idImage}
                width={800}
                height={600}
                alt="Seller ID Image"
                className="object-contain max-h-[90vh] rounded-lg"
              />
            </div>
          </div>
        )}

        {/* Reviews Drawer */}
        <ReviewsDrawer
          isOpen={isReviewsOpen}
          onClose={() => setIsReviewsOpen(false)}
          reviews={sellerReviews}
        />
      </div>
    </div>
  );
};

export default SellerProfilePage;
