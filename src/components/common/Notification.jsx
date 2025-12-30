"use client";
import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const Notification = ({
  isOpen,
  heading = "Notifications Feed",
  subHeading = "Your central hub for platform-wide alerts and operational updates.",
}) => {
  const ref = useRef();
  const [isExpanded, setIsExpanded] = useState(false);
  const [readAll, setReadAll] = useState(false);

  // Notifications data matching the design
  const notifications = [
    {
      type: "seller_registered",
      name: "James Smith",
      title: "New seller registered",
      description: "James Smith Join as a new seller.",
      time: "5m ago",
      initials: "JS",
      isRead: false,
    },
    {
      type: "buyer_registered",
      name: "Olivia Davis",
      title: "New buyer registered",
      description: "Olivia Davis Join as new Buyer",
      time: "10m ago",
      initials: "OD",
      isRead: false,
    },
    {
      type: "seller_id_uploaded",
      title: "Seller ID uploaded",
      description: (
        <>
          Sophia Martinez has submitted their government ID for Verification.{" "}
          <span className="text-green-600 underline cursor-pointer font-medium">
            Verify now
          </span>
        </>
      ),
      time: "15m ago",
      isRead: false,
    },
    {
      type: "listing_created",
      title: "Listing created",
      description: "Isabella Garcia added a new listing.",
      time: "20m ago",
      isRead: false,
    },
    {
      type: "listing_updated",
      title: "Listing updated",
      description: "Lucas Rodriguez edited details of an existing listing.",
      time: "25m ago",
      isRead: false,
    },
    {
      type: "suspicious_activity",
      title: "Suspicious activity reported",
      description: "Mason Lee submitted a fraud report.",
      time: "30m ago",
      isRead: false,
    },
    {
      type: "payment_successful",
      title: "Payment successful",
      description: (
        <>
          Payment received for Order ID{" "}
          <span className="text-green-600 font-medium underline cursor-pointer">
            #KSA6516146465
          </span>
          .
        </>
      ),
      time: "35m ago",
      isRead: false,
    },
    {
      type: "payment_failed",
      title: "Payment failed",
      description: (
        <>
          A transaction failed during processing for Order ID{" "}
          <span className="text-green-600 font-medium underline cursor-pointer">
            #KSA6516146465
          </span>
          .
        </>
      ),
      time: "40m ago",
      isRead: false,
    },
  ];

  const renderIcon = (n) => {
    // Common styles for icon container
    const baseStyle =
      "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0";

    switch (n.type) {
      case "seller_registered":
        return (
          <div className={`${baseStyle} bg-[#365E32]`}>
            <span className="text-white font-medium text-lg">{n.initials}</span>
          </div>
        );
      case "buyer_registered":
        return (
          <div className={`${baseStyle} bg-[#365E32]`}>
            <span className="text-white font-medium text-lg">{n.initials}</span>
          </div>
        );
      case "seller_id_uploaded":
        return (
          <div className={`${baseStyle} overflow-hidden`}>
            <Image
              src="/assets/icon/notification_seller_ID.svg"
              alt="Seller ID"
              width={24}
              height={24}
              className="w-12 h-12"
            />
          </div>
        );
      case "listing_created":
      case "listing_updated":
        return (
          <div className={`${baseStyle} border border-gray-200`}>
            <Image
              src="/assets/icon/notification_listing.svg"
              alt="Listing"
              width={24}
              height={24}
            />
          </div>
        );
      case "suspicious_activity":
        return (
          <div className={`${baseStyle} border border-gray-200`}>
            <Image
              src="/assets/icon/notification_suspicious_activity.svg"
              alt="Suspicious"
              width={24}
              height={24}
            />
          </div>
        );
      case "payment_successful":
        return (
          <div className={`${baseStyle} border border-gray-200`}>
            <Image
              src="/assets/icon/notification_payment_success.svg"
              alt="Success"
              width={24}
              height={24}
            />
          </div>
        );
      case "payment_failed":
        return (
          <div className={`${baseStyle} border border-gray-200`}>
            <Image
              src="/assets/icon/notification_payment_failed.svg"
              alt="Failed"
              width={24}
              height={24}
            />
          </div>
        );
      default:
        return <div className={`${baseStyle} bg-gray-100`}></div>;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="fixed sm:absolute top-20 sm:top-14 left-1/2 sm:left-auto -translate-x-1/2 sm:translate-x-0 right-auto sm:right-0 w-[95vw] sm:w-[550px] bg-white shadow-xl rounded-xl border border-gray-200 z-50 overflow-hidden"
        >
          {/* Header */}
          <div className="p-5 border-b border-gray-100">
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-lg font-bold text-gray-900 leading-tight">
                {heading}
              </h3>
              <button
                className="text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors"
                onClick={() => setReadAll(true)}
              >
                Mark all as Read
              </button>
            </div>
            <p className="text-sm text-gray-500">{subHeading}</p>
          </div>

          {/* Notification list */}
          <div
            className={`transition-all duration-300 overflow-y-auto no-scrollbar ${
              isExpanded ? "max-h-[600px]" : "max-h-[450px]"
            }`}
          >
            {notifications.map((n, i) => (
              <div
                key={i}
                className="flex gap-4 p-5 border-b border-gray-100 hover:bg-gray-50 transition-colors last:border-0"
              >
                {renderIcon(n)}
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex justify-between items-start mb-0.5">
                    <h4 className="font-semibold text-[15px] text-gray-900">
                      {n.title}
                    </h4>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {!readAll && !n.isRead && (
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                      )}
                      <span className="text-xs text-gray-400 font-medium">
                        {n.time}
                      </span>
                    </div>
                  </div>
                  <p className="text-[13px] text-gray-500 leading-normal">
                    {n.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;
