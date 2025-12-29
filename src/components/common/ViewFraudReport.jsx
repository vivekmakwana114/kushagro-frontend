"use client";
import React, { useState } from "react";
import Image from "next/image";
import Header from "@/components/form-elements/Header";
import TextArea from "@/components/form-elements/TextArea";
import { Button } from "@/components/ui/button";
import ImageZoomModal from "@/components/common/ImageZoomModal";

const ViewFraudReport = ({
  reportData,
  onClose,
  onSuspend,
  userType = "buyer",
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [adminNotes, setAdminNotes] = useState("");

  // mock data for demonstration
  const defaultData = {
    reportId: "#SPAM2146515",
    date: "15 Jul, 2025",
    reportedBy: {
      name: "Will Jack",
      email: "willjack@gmail.com",
      avatar: "https://picsum.photos/200",
    },
    notes:
      "Order items that decline to accept delivery when product reach on address.",
    evidence: "/assets/images/testimage.png",
  };

  const data = reportData || defaultData;

  const handleImageClick = () => {
    setSelectedImage(data.evidence);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleSuspend = () => {
    console.log("Form Submitted - Report ID:", data.reportId);
    console.log("Form Submitted - Admin Notes:", adminNotes);
    console.log("Form Submitted - Full Data:", {
      reportId: data.reportId,
      adminNotes,
    });

    if (onSuspend) {
      onSuspend({
        reportId: data.reportId,
        adminNotes,
      });
    }
  };

  const handleCancel = () => {
    if (onClose) onClose();
  };

  // Capitalize first letter for display
  const userTypeCapitalized =
    userType.charAt(0).toUpperCase() + userType.slice(1);

  return (
    <div className="flex flex-col h-full bg-white overflow-y-auto overflow-x-hidden no-scrollbar">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <Header type="header" label="Fraud Report Details" />
          <Header
            type="subheader"
            text={`View and manage all fraud cases reported against this ${userType}.`}
          />
        </div>
      </div>

      <div className="w-full h-px m-2 bg-(--border-admin)" />

      <div className="flex-1 mt-2 overflow-y-auto overflow-x-hidden no-scrollbar">
        <div className="space-y-4 w-full">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-dull-text mb-1">Report ID</p>
              <p className="text-sm font-medium text-secondary1">
                {data.reportId}
              </p>
            </div>
            <div className="text-left pr-12">
              <p className="text-sm text-dull-text mb-1">Date</p>
              <p className="text-sm font-medium text-black">{data.date}</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-dull-text mb-3">Reported By</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 shrink-0 rounded-full overflow-hidden relative bg-gray-100">
                <Image
                  src={data.reportedBy.avatar}
                  alt={data.reportedBy.name}
                  fill
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

          <div>
            <p className="text-sm text-dull-text mb-2">Note</p>
            <p className="text-sm text-black leading-relaxed">{data.notes}</p>
          </div>

          <div>
            <p className="text-sm text-dull-text pb-2">Evidence</p>
            <div className="rounded-lg w-full">
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

          <div>
            <TextArea
              label="Admin Notes"
              value={adminNotes}
              onChange={setAdminNotes}
              placeholder="Add investigation notes for internal tracking..."
              rows={4}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex gap-4">
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
