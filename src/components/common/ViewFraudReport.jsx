"use client";
import React, { useState } from "react";
import Image from "next/image";
import Header from "@/components/form-elements/Header";
import TextArea from "@/components/form-elements/TextArea";
import { Button } from "@/components/ui/button";
import ImageZoomModal from "@/components/common/ImageZoomModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchFraudReportById } from "@/state/setting/fraud-ticket/fraudTicketSlice";
import { useEffect } from "react";

const ViewFraudReport = ({
  reportData,
  onClose,
  onSuspend,
  userType,
  onCancel,
  onApply,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [adminNotes, setAdminNotes] = useState("");
  const dispatch = useDispatch();
  const { currentReport } = useSelector((state) => state.fraudTicket);

  useEffect(() => {
    if (reportData?.reportId) {
      dispatch(fetchFraudReportById(reportData.reportId));
    }
  }, [dispatch, reportData?.reportId]);

  // Merge passed data with fetched data, preferring fetched data
  const fetchedData = currentReport
    ? {
        ...currentReport,
        reportId: currentReport._id || currentReport.id,
        date: currentReport.createdAt,
        reportedBy: currentReport.reporterId,
        notes:
          currentReport.reason && Array.isArray(currentReport.reason)
            ? currentReport.reason[0]
            : currentReport.reason,
        evidence: currentReport.image || currentReport.evidence,
      }
    : null;

  const data = fetchedData || reportData || {};

  // For display, use date formatting
  const displayDate = data.date
    ? new Date(data.date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "N/A";

  const handleImageClick = () => {
    if (data.evidence) {
      setSelectedImage(data.evidence);
    }
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleSuspend = () => {
    const payload = {
      reportId: data.reportId,
      adminNotes,
    };

    console.log("Form Submitted - Full Data:", payload);

    if (onSuspend) {
      onSuspend(payload);
    } else if (onApply) {
      onApply(payload);
    }
  };

  const handleCancel = () => {
    if (onClose) {
      onClose();
    } else if (onCancel) {
      onCancel();
    }
  };

  // Capitalize first letter for display
  const userTypeCapitalized = userType
    ? userType.charAt(0).toUpperCase() + userType.slice(1)
    : "";

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
                {data.reportId || "N/A"}
              </p>
            </div>
            <div className="flex justify-between w-full md:block md:w-auto text-left md:pr-12">
              <p className="text-sm text-dull-text mb-0 md:mb-1">Date</p>
              <p className="text-sm font-medium text-black">{displayDate}</p>
            </div>
          </div>

          <div className="flex justify-between items-center md:block">
            <p className="text-sm text-left text-dull-text mb-0 md:mb-3">
              Reported By
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 shrink-0 rounded-full overflow-hidden relative bg-gray-100">
                <Image
                  src={
                    data.reportedBy?.profile ||
                    "/assets/icon/no_profile_icon.svg"
                  }
                  alt={data.reportedBy?.name || "User"}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-black truncate">
                  {data.reportedBy?.name || "N/A"}
                </p>
                <p className="text-xs text-dull-text truncate">
                  {data.reportedBy?.email || "N/A"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-start md:block gap-4">
            <p className="text-sm text-dull-text mb-0 md:mb-2 shrink-0">Note</p>
            <p className="text-sm text-black leading-relaxed text-right md:text-left">
              {data.notes || "N/A"}
            </p>
          </div>

          <div className="flex justify-between items-start md:block">
            <p className="text-sm text-dull-text pb-0 md:pb-2">Evidence</p>
            <div className="rounded-lg w-1/2 md:w-full">
              <div
                className="w-full aspect-video bg-white rounded-lg overflow-hidden cursor-pointer shadow-sm relative"
                onClick={handleImageClick}
              >
                {data.evidence ? (
                  <Image
                    src={data.evidence}
                    alt="Evidence"
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-dull-text text-xs">
                    No Evidence
                  </div>
                )}
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
