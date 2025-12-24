import React from "react";
import { toast } from "sonner";

const VerificationActionComponent = ({
  row,
  onReject,
  rejectConfig,
  PopupComponent,
}) => {
  const [showRejectPopup, setShowRejectPopup] = React.useState(false);

  const handleAccept = () => {
    toast.success(`${row?.seller?.name || "Seller"} verified successfully!`);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <button
          onClick={handleAccept}
          className="w-8 h-8 flex items-center justify-center rounded bg-[#DCFCE7] text-[#16A34A] hover:bg-[#d1fae5] transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </button>
        <button
          onClick={() => setShowRejectPopup(true)}
          className="w-8 h-8 flex items-center justify-center rounded bg-[#FEE2E2] text-[#DC2626] hover:bg-[#fecaca] transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {showRejectPopup && PopupComponent && rejectConfig && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black opacity-60"
            onClick={() => setShowRejectPopup(false)}
          ></div>
          <div
            className="relative z-[1001]"
            onClick={(e) => e.stopPropagation()}
          >
            <PopupComponent
              config={rejectConfig}
              width="500px"
              onApply={(data) => {
                console.log("Rejection Reason:", data);
                toast.error(`${row?.seller?.name || "Seller"} rejected.`);
                setShowRejectPopup(false);
                if (onReject) onReject(row, data);
              }}
              onCancel={() => setShowRejectPopup(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default VerificationActionComponent;
