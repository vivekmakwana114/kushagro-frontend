"use client";
import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNotificationStore } from "@/state/useNotificationStore";
import {
  FaUserPlus,
  FaIdCard,
  FaBox,
  FaEdit,
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimesCircle,
  FaBell
} from "react-icons/fa";
import { LuBellOff } from "react-icons/lu";

const Notification = ({
  isOpen,
  heading = "Notifications Feed",
  subHeading = "Your central hub for platform-wide alerts and operational updates.",
}) => {
  const ref = useRef();
  const [isExpanded, setIsExpanded] = useState(false);
  const [localReadAll, setLocalReadAll] = useState(false);

  const { notifications, markAllAsRead, markAsRead } = useNotificationStore();

  const handleMarkAllRead = () => {
    setLocalReadAll(true);
    markAllAsRead();
  };

  const renderIcon = (n) => {
    const baseStyle =
      "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white shadow-sm";

    switch (n.type) {
      case "seller_registered":
      case "buyer_registered":
        return (
          <div className={`${baseStyle} bg-blue-500`}>
            <FaUserPlus className="text-lg" />
          </div>
        );
      case "seller_id_uploaded":
        return (
          <div className={`${baseStyle} bg-purple-500`}>
            <FaIdCard className="text-lg" />
          </div>
        );
      case "listing_created":
        return (
          <div className={`${baseStyle} bg-green-500`}>
            <FaBox className="text-lg" />
          </div>
        );
      case "listing_updated":
        return (
          <div className={`${baseStyle} bg-yellow-500`}>
            <FaEdit className="text-lg" />
          </div>
        );
      case "suspicious_activity":
        return (
          <div className={`${baseStyle} bg-red-500`}>
            <FaExclamationTriangle className="text-lg" />
          </div>
        );
      case "payment_successful":
        return (
          <div className={`${baseStyle} bg-green-600`}>
            <FaCheckCircle className="text-lg" />
          </div>
        );
      case "payment_failed":
        return (
          <div className={`${baseStyle} bg-red-600`}>
            <FaTimesCircle className="text-lg" />
          </div>
        );
      default:
        return (
          <div className={`${baseStyle} bg-gray-400`}>
            <FaBell className="text-lg" />
          </div>
        );
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed sm:absolute top-20 sm:top-14 left-1/2 sm:left-auto -translate-x-1/2 sm:translate-x-0 right-[-10px] sm:right-0 w-[95vw] sm:w-[500px] bg-white shadow-2xl rounded-2xl border border-gray-100 z-50 overflow-hidden"
        >
          {/* Header */}
          <div className="p-5 border-b border-gray-50 bg-gray-50/50">
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-lg font-bold text-gray-900 leading-tight">
                {heading}
              </h3>
              {notifications.length > 0 && (
                <button
                  className="text-xs text-primary font-semibold hover:text-primary/80 transition-colors uppercase tracking-wide"
                  onClick={handleMarkAllRead}
                >
                  Mark all read
                </button>
              )}
            </div>
            <p className="text-sm text-gray-500">{subHeading}</p>
          </div>

          {/* Notification list */}
          <div
            className={`transition-all duration-300 overflow-y-auto no-scrollbar bg-white ${isExpanded ? "max-h-[600px]" : "max-h-[450px]"
              }`}
          >
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center px-6">
                <div className="bg-gray-50 p-4 rounded-full mb-4">
                  <LuBellOff className="w-10 h-10 text-gray-300" />
                </div>
                <h4 className="text-gray-900 font-medium text-base mb-1">No notifications yet</h4>
                <p className="text-gray-500 text-sm max-w-xs">
                  When you get notifications, they'll show up here.
                </p>
              </div>
            ) : (
              notifications.map((n, i) => (
                <div
                  key={n.id || i}
                  className={`flex gap-4 p-5 border-b border-gray-50 hover:bg-gray-50/80 transition-colors last:border-0 cursor-default ${!n.isRead ? 'bg-blue-50/30' : ''}`}
                  onClick={() => markAsRead(n.id || n._id)}
                >
                  {renderIcon(n)}
                  <div className="flex-1 min-w-0 pt-0.5">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className={`text-[15px] text-gray-900 ${!n.isRead ? 'font-bold' : 'font-semibold'}`}>
                        {n.title}
                      </h4>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {!n.isRead && (
                          <span className="w-2 h-2 rounded-full bg-blue-500 shadow-sm shadow-blue-200"></span>
                        )}
                        <span className="text-xs text-gray-400 font-medium">
                          {n.time || "Just now"}
                        </span>
                      </div>
                    </div>
                    <div className="text-[13px] text-gray-600 leading-relaxed">
                      {/* Handle description if it's a string or JSX */}
                      {typeof n.description === 'string' ? n.description : n.description}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {notifications.length > 5 && !isExpanded && (
            <div className="p-3 bg-gray-50 border-t border-gray-100 text-center">
              <button
                onClick={() => setIsExpanded(true)}
                className="text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                View all notifications
              </button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;
