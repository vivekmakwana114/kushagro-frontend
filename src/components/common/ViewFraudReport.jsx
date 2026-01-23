import React, { useState, useEffect } from "react";
import Image from "next/image";
import Header from "@/components/form-elements/Header";
import TextArea from "@/components/form-elements/TextArea";
import { Button } from "@/components/ui/button";
import ImageZoomModal from "@/components/common/ImageZoomModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchFraudReportById } from "@/state/fraudReport/fraudReportSlice";
import { suspendBuyer } from "@/state/buyer/buyerSlice";
import { toast } from "sonner";

const ViewFraudReport = ({
  reportData,
  onClose,
  onSuspend,
  userType,
  onCancel,
  onApply,
  id,
  reportId,
  ...props
}) => {
  const dispatch = useDispatch();
  const { currentReport, loading } = useSelector((state) => state.fraudReport);
  const [selectedImage, setSelectedImage] = useState(null);
  const [adminNotes, setAdminNotes] = useState("");

  const effectiveReportId =
    reportId || id || (reportData && reportData.reportId);

  useEffect(() => {
    if (effectiveReportId && !reportData) {
      dispatch(fetchFraudReportById(effectiveReportId));
    }
  }, [dispatch, effectiveReportId, reportData]);

  // Determine data source
  let data = null;

  if (reportData) {
    data = reportData;
  } else if (currentReport) {
    data = {
      reportId: currentReport.id || currentReport.reportId || "N/A",
      date: currentReport.createdAt
        ? new Date(currentReport.createdAt).toLocaleDateString()
        : "N/A",
      reportedBy: {
        name: currentReport.reporterId?.name || "N/A",
        email: currentReport.reporterId?.email || "N/A",
        avatar:
          currentReport.reporterId?.profile || "/assets/images/placeholder.png",
      },
      notes: Array.isArray(currentReport.reason)
        ? currentReport.reason.join(", ")
        : currentReport.reason || "N/A",
      evidence: currentReport.image || "/assets/images/placeholder.png",
      fullReport: currentReport,
    };
  }

  if (!data) {
    return <div className="p-4 text-center">Loading report details...</div>;
  }

  const handleImageClick = () => {
    setSelectedImage(data.evidence);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleCancel = () => {
    if (onClose) {
      onClose();
    } else if (onCancel) {
      onCancel();
    }
  };

  // Capitalize first letter for display
  const userTypeCapitalized =
    userType.charAt(0).toUpperCase() + userType.slice(1);

  const handleSuspend = async () => {
    // Determine the user ID to suspend
    // Try to get it from the full report object first
    const targetUserId =
      data.fullReport?.reportedId?._id ||
      data.fullReport?.reportedId?.id ||
      data.fullReport?.userId ||
      data.fullReport?.reportedId; // Fallback if it's just an ID string

    if (!targetUserId) {
      toast.error("Could not identify the user to suspend.");
      return;
    }

    try {
      await dispatch(
        suspendBuyer({
          id: targetUserId,
          data: { reason: adminNotes || "Suspended from fraud report view" },
        }),
      ).unwrap();

      toast.success(`${userTypeCapitalized} suspended successfully`);
      if (onSuspend) onSuspend();
      handleCancel(); 
    } catch (error) {
      toast.error(error.message || `Failed to suspend ${userType}`);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white overflow-y-auto overflow-x-hidden p-2 xl:p-0 no-scrollbar">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <Header
            type="header"
            label="Fraud Report Details"
            className="text-base md:text-lg text-left"
          />
          <Header
            type="subheader"
            text={`View and manage all fraud cases reported against this ${userType}.`}
            className="text-left"
          />
        </div>
      </div>

      <div className="w-full h-px m-2 bg-(--border-admin)" />

      <div className="flex-1 mt-2 overflow-y-auto overflow-x-hidden no-scrollbar">
        <div className="space-y-4 w-full">
          <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-2 md:gap-0">
            <div className="flex justify-between w-full md:block md:w-auto">
              <p className="text-sm text-dull-text mb-0 md:mb-1">Report ID</p>
              <p className="text-sm font-medium text-secondary1">
                {data.reportId}
              </p>
            </div>
            <div className="flex justify-between w-full md:block md:w-auto text-left md:pr-12">
              <p className="text-sm text-dull-text mb-0 md:mb-1">Date</p>
              <p className="text-sm font-medium text-black">{data.date}</p>
            </div>
          </div>

          <div className="flex justify-between items-center md:block">
            <p className="text-sm text-left text-dull-text mb-0 md:mb-3">
              Reported By
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 shrink-0 rounded-full overflow-hidden relative bg-gray-100">
                <Image
                  src={data.reportedBy.avatar}
                  alt={data.reportedBy.name}
                  fill
                  unoptimized
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-black truncate">
                  {data.reportedBy.name}
                </p>
                <p className="text-xs text-dull-text truncate">
                  {data.reportedBy.email}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-start md:block gap-4">
            <p className="text-sm text-dull-text mb-0 md:mb-2 shrink-0">Note</p>
            <p className="text-sm text-black leading-relaxed text-right md:text-left">
              {data.notes}
            </p>
          </div>

          <div className="flex justify-between items-start md:block">
            <p className="text-sm text-dull-text pb-0 md:pb-2">Evidence</p>
            <div className="rounded-lg w-1/2 md:w-full">
              <div
                className="w-full aspect-video bg-white rounded-lg overflow-hidden cursor-pointer shadow-sm relative"
                onClick={handleImageClick}
              >
                <Image
                  src={data.evidence}
                  alt="Evidence"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between items-start md:block gap-4">
            <p className="text-sm text-dull-text mb-0 md:mb-2 pt-3 md:pt-0 shrink-0">
              Admin Notes
            </p>
            <div className="w-2/3 md:w-full">
              <TextArea
                value={adminNotes}
                onChange={setAdminNotes}
                placeholder="Add investigation notes for internal tracking..."
                rows={4}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-col md:flex-row gap-3 md:gap-4">
          <Button
            type="button"
            onClick={handleCancel}
            variant="outline"
            className="flex-1 border-secondary1 text-secondary1 hover:bg-secondary1/10"
          >
            Close
          </Button>
          <Button
            type="button"
            onClick={handleSuspend}
            className="flex-1 bg-red text-white hover:bg-red/90"
          >
            Suspend {userTypeCapitalized}
          </Button>
        </div>
      </div>

      {/* Image Zoom Modal */}
      <ImageZoomModal
        imageUrl={selectedImage}
        alt="Evidence"
        isOpen={!!selectedImage}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default ViewFraudReport;
