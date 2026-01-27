import React, { useState } from "react";
import { X, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ImageZoomModal from "@/components/common/ImageZoomModal";
import { useDispatch } from "react-redux";
import { updateTicketStatus } from "@/state/setting/support-ticket/supportTicketSlice";
import { toast } from "sonner";
import Image from "next/image";

const ViewSupportTicket = ({ data, onCancel }) => {
  const [status, setStatus] = useState(data?.status || "open");
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();

  // Mock data to match the design if real data is missing certain fields
  const displayData = {
    subject: data?.subject || "Not Getting Log Out",
    status: status,
    description:
      data?.description || data?.message || "No description provided.",
    images: data?.attachments || data?.images || [],
    customer: {
      name: data?.user?.name || "N/A",
      email: data?.user?.email || "N/A",
      phone: data?.user?.phone || "N/A",
      raisedOn:
        data?.raisedOn || data?.createdAt
          ? new Date(data?.raisedOn || data?.createdAt).toLocaleDateString(
              "en-GB",
              {
                day: "numeric",
                month: "short",
                year: "numeric",
              },
            )
          : "N/A",
      profile: data?.user?.profile || "/assets/images/profile-placeholder.png",
    },
  };

  const statusOptions = [
    { value: "open", label: "Open" },
    { value: "inprocess", label: "In Process" },
    { value: "done", label: "Done" },
  ];

  const handleUpdate = async () => {
    let apiStatus = status.toUpperCase();
    if (status === "inprocess") apiStatus = "IN_PROGRESS";

    try {
      await dispatch(
        updateTicketStatus({
          id: data?._id || data?.id,
          data: { status: apiStatus },
        }),
      ).unwrap();
      toast.success("Ticket status updated successfully");
      onCancel && onCancel();
    } catch (error) {
      toast.error("Failed to update ticket status");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white w-full max-w-[600px] mx-auto relative">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 p-4 xl:p-0 text-left">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Support Ticket Details
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            View complete information and status of submitted query.
          </p>
        </div>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5 mb-12" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar text-left">
        {/* Subject */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-1">
            Subject
          </label>
          <p className="text-gray-500 font-light">{displayData.subject}</p>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Status
          </label>
          <div className="relative">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:border-primary1 text-gray-700"
            >
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Description
          </label>
          <p className="text-gray-500 leading-relaxed text-sm wrap-break-word whitespace-pre-wrap">
            {displayData.description}
          </p>
        </div>

        {/* Images */}
        {displayData.images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {displayData.images.map((img, idx) => (
              <div
                key={idx}
                className="relative group aspect-square rounded-lg overflow-hidden border border-gray-100"
              >
                <Image
                  src={img}
                  unoptimized
                  fill
                  alt={`Evidence ${idx + 1}`}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => setSelectedImage(img)}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/150";
                  }}
                />
                <button
                  className="absolute top-2 right-2 p-1.5 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => setSelectedImage(img)}
                >
                  <Maximize2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Customer Details */}
        <div className="">
          <h3 className="text-secondary1 text-sm font-semibold mb-3">
            Customer Details
          </h3>
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex flex-col md:flex-row items-start justify-between gap-4 md:gap-0">
              <div className="flex gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 shrink-0">
                  <img
                    src={displayData.customer.profile}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/50";
                    }}
                  />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">
                    {displayData.customer.name}
                  </h4>
                  <p className="text-success text-sm">
                    {displayData.customer.email}
                  </p>

                  <div className="mt-4">
                    <p className="text-gray-500 text-sm">Ticket Raised on</p>
                    <p className="font-semibold text-gray-900 text-sm">
                      {displayData.customer.raisedOn}
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-left md:text-right w-full md:w-auto pl-[60px] md:pl-0">
                <p className="text-gray-500 text-sm text-left md:text-right">
                  Phone
                </p>
                <p className="font-semibold text-success text-sm">
                  {displayData.customer.phone}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100 grid grid-cols-2 gap-4">
        <Button
          onClick={onCancel}
          variant="outline"
          className="w-full py-2.5 px-4 border border-secondary1 text-secondary1 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          Close
        </Button>
        <Button
          onClick={handleUpdate}
          className="w-full py-2.5 px-4 bg-secondary1 text-white rounded-lg font-medium hover:bg-secondary1/90 transition-colors"
        >
          Update Ticket
        </Button>
      </div>
      <ImageZoomModal
        isOpen={!!selectedImage}
        imageUrl={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
};

export default ViewSupportTicket;
