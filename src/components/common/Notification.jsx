"use client";
import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const Notification = ({ isOpen, heading, subHeading }) => {
  const ref = useRef();
  const [isExpanded, setIsExpanded] = useState(false);
  const [readAll, setReadAll] = useState(false);

  // Notifications data with types
  const notifications = [
    {
      type: "booking",
      name: "Aaliyah Johnson",
      title: "New Appointment Booked",
      description:
        "Aaliyah Johnson booked by Tyrone Hill for June 15 at 2:00 PM.",
      time: "2m ago",
    },
    {
      type: "client",
      name: "Nia Banks",
      description: "Nia Banks (nia.b@gmail.com) just signed up.",
      title: "New Client Registered",
      time: "5m ago",
    },
    {
      type: "payment",
      title: "Payment Received",
      description:
        "$1,200 received for Booking #BK2308 (Aaliyah Johnson – Tyrone Hill).",
      time: "1h ago",
    },
    {
      type: "product",
      title: "Product Order Placed",
      description: "Malik Carter ordered “Herbal Scalp Oil” – Order #LOC2048.",
      image: "/assets/icon/notification_product.svg",
      time: "2h ago",
    },
    {
      type: "review",
      title: "Review Received",
      description: "“Excellent service!” (5★) review for Brielle Thomas.",
      time: "3h ago",
    },
    {
      type: "cancelled",
      title: "Appointment Canceled",
      description:
        "Booking cancelled by Client Nia Banks (Stylist: DeShawn Miller).",
      time: "3h 25m ago",
    },
    {
      type: "cancelled",
      title: "Appointment Canceled",
      description:
        "Booking cancelled by Client Nia Banks (Stylist: DeShawn Miller).",
      time: "3h 25m ago",
    },
    {
      type: "cancelled",
      title: "Appointment Canceled",
      description:
        "Booking cancelled by Client Nia Banks (Stylist: DeShawn Miller).",
      time: "3h 25m ago",
    },
    {
      type: "cancelled",
      title: "Appointment Canceled",
      description:
        "Booking cancelled by Client Nia Banks (Stylist: DeShawn Miller).",
      time: "3h 25m ago",
    },
  ];

  // Based on the type of notification icon will appear.
  const renderIcon = (n) => {
    const baseStyle =
      "w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center bg-gray-50 overflow-hidden";

    switch (n.type) {
      case "booking":
        return (
          <div className={baseStyle}>
            <Image
              src="/assets/icon/notification_booking.svg"
              alt="Booking"
              width={20}
              height={20}
            />
          </div>
        );
      case "client":
        const initials = n.name
          .split(" ")
          .map((p) => p[0])
          .join("")
          .toUpperCase();
        return (
          <div className={`${baseStyle} bg-primary1 text-white font-bold`}>
            {initials}
          </div>
        );
      case "payment":
        return (
          <div className={baseStyle}>
            <Image
              src="/assets/icon/notification_payment.svg"
              alt="Payment"
              width={24}
              height={24}
            />
          </div>
        );
      case "review":
        return (
          <div className={baseStyle}>
            <Image
              src="/assets/icon/notification_review.svg"
              alt="review"
              width={20}
              height={20}
            />
          </div>
        );
      case "cancelled":
        return (
          <div className={baseStyle}>
            <Image
              src="/assets/icon/notification_booking_cancelled.svg"
              alt="Booking Cancelled"
              width={20}
              height={20}
            />
          </div>
        );
      case "product":
        return (
          <div className={baseStyle}>
            <Image
              src={n.image}
              alt="Product"
              width={40}
              height={40}
              className="object-cover rounded-md"
            />
          </div>
        );
      default:
        return null;
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
          className="absolute top-14 -right-22 w-[90vw] sm:w-[500px] bg-white shadow-xl rounded-xl border border-gray-200 z-50"
        >
          {/* Header */}
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-semibold text-[var(--color-black)]">
                {heading}
              </h3>
              <button
                className="text-xs text-primary1 hover:underline"
                onClick={() => setReadAll(true)}
              >
                Mark all as Read
              </button>
            </div>
            <h5 className="text-sm text-[var(--color-dull-text)] mt-1">
              {subHeading}
            </h5>
          </div>

          {/* Notification list */}
          <div
            className={`transition-all duration-300 overflow-y-auto no-scrollbar ${
              isExpanded ? "max-h-[500px]" : "max-h-[300px]"
            }`}
          >
            {notifications.map((n, i) => (
              <div
                key={i}
                className="flex gap-3 p-4 border-b hover:bg-gray-50 transition"
              >
                <div className="flex-shrink-0">{renderIcon(n)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-sm text-[var(--color-secondary1)] truncate">
                      {n.title}
                    </p>
                    <div className="flex items-center gap-1">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          readAll
                            ? "bg-[var(--color-dull-text)]"
                            : "bg-[var(--color-primary1)]"
                        } transition-colors duration-300`}
                      ></span>

                      <p className="text-xs text-gray-400">{n.time}</p>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--color-placeholder-color)] mt-0.5 line-clamp-2 sm:line-clamp-none">
                    {n.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-3 border-t flex justify-end items-center">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 text-sm text-primary1 font-medium hover:underline transition-all"
            >
              <span>{isExpanded ? "Collapse" : "View More"}</span>
              <Image
                src="/assets/icon/rightarrow.svg"
                alt="View More"
                width={18}
                height={18}
                className={`transition-transform duration-300 ${
                  isExpanded ? "rotate-270" : "rotate-0"
                }`}
              />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;
