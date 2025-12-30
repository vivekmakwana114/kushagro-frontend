"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SettingsSection from "@/components/ui/SettingSection";
import { ChevronDown, Check } from "lucide-react";
import useAutoDismissError from "@/hooks/useAutoDismissError";

const PushAlertsPage = () => {
  const [notification, setNotificationTitle] = useState("");
  const [bodyContent, setBodyContent] = useState("");
  const [receiver, setReceiver] = useState("");
  const [type, setType] = useState("");
  const [errors, setErrors] = useAutoDismissError({});
  const [showDropdowns, setShowDropdowns] = useState({
    receiver: false,
    type: false,
  });

  const receiverOptions = [
    { label: "All buyers", value: "All buyers" },
    { label: "All sellers", value: "All sellers" },
  ];

  const typeOptions = [
    {
      label: "Promotional - Offers, discounts, seasonal sales.",
      value: "Promotional-",
    },
    {
      label: "Transactional - Booking confirmation, receipts, payment updates.",
      value: "Transactional-",
    },
    {
      label: "Reminder - Booking reminders, cart abandonment.",
      value: "Reminder-",
    },
    {
      label: "Alert - Urgent updates, security alerts, system notices.",
      value: "Alert-",
    },
    {
      label: "Informational - General news, new features, announcements.",
      value: "Informational-",
    },
    {
      label: "Event-based - Special events, live sessions, festivals.",
      value: "Event-based-",
    },
  ];

  const toggleDropdown = (key) => {
    setShowDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSelect = (key, value) => {
    if (key === "receiver") setReceiver(value);
    if (key === "type") setType(value);

    setShowDropdowns((prev) => ({
      ...prev,
      [key]: false,
    }));

    // Clear error if exists
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };

  const handleSubmit = () => {
    const newErrors = {};

    if (!notification)
      newErrors.notification = "Notification title is required";
    if (!bodyContent)
      newErrors.bodyContent = "Notification content is required";
    if (!receiver) newErrors.receiver = "Receiver is required";
    if (!type) newErrors.type = "Type is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log({
      notification,
      bodyContent,
      receiver,
      type,
    });
  };
  return (
    <div className="w-full flex justify-center mt-10">
      <div className="w-full max-w-2xl">
        <SettingsSection
          title="Push Notification"
          description="Send and manage app notifications for updates, offers, and reminders."
        >
          <div className="mt-6">
            <label className="font-medium">Notification Title</label>

            <Input
              className={`mt-2 ${errors.notification ? "border-red-500" : ""}`}
              value={notification}
              placeholder="Notification Title"
              onChange={(e) => setNotificationTitle(e.target.value)}
            />
            {errors.notification && (
              <p className="text-red-500 text-xs mt-1">{errors.notification}</p>
            )}
          </div>

          <div className="mt-2">
            <label className="font-medium">Body Content</label>

            <Input
              className="mt-2 h-20 pb-8"
              value={bodyContent}
              placeholder="Enter Notification Body Content"
              onChange={(e) => setBodyContent(e.target.value)}
            />
            {errors.bodyContent && (
              <p className="text-red-500 text-xs mt-1">{errors.bodyContent}</p>
            )}
          </div>

          <div className="mt-2 relative">
            <label className="font-medium">Select Receiver</label>
            <div
              className={`mt-2 flex h-10 w-full items-center justify-between rounded-md border border-[var(--color-placeholder-color)] bg-white px-3 py-2 text-sm ring-offset-background cursor-pointer ${
                errors.receiver ? "border-red-500" : ""
              }`}
              onClick={() => toggleDropdown("receiver")}
            >
              <span className={!receiver ? "text-muted-foreground" : ""}>
                {receiver || "Select Receiver"}
              </span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </div>

            {showDropdowns.receiver && (
              <div className="absolute z-10 mt-1 w-full overflow-auto rounded-md border bg-white shadow-lg">
                {receiverOptions.map((option) => (
                  <div
                    key={option.value}
                    className="flex cursor-pointer select-none items-center justify-between px-3 py-2 text-sm hover:bg-gray-100"
                    onClick={() => handleSelect("receiver", option.value)}
                  >
                    <span>{option.label}</span>
                    {receiver === option.value && (
                      <div className="flex bg-[var(--color-secondary1)] rounded-full h-5 w-5 items-center justify-center">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {errors.receiver && (
              <p className="text-red-500 text-xs mt-1">{errors.receiver}</p>
            )}
          </div>

          <div className="mt-2 relative">
            <label className="font-medium">Notification Type</label>
            <div
              className={`mt-2 flex h-10 w-full items-center justify-between rounded-md border border-[var(--color-placeholder-color)] bg-white px-3 py-2 text-sm ring-offset-background cursor-pointer ${
                errors.type ? "border-red-500" : ""
              }`}
              onClick={() => toggleDropdown("type")}
            >
              <span className={!type ? "text-muted-foreground" : "truncate"}>
                {type
                  ? typeOptions.find((o) => o.value === type)?.label
                  : "Select Type"}
              </span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </div>

            {showDropdowns.type && (
              <div className="absolute z-10 mt-1 w-full max-h-60 overflow-auto rounded-md border bg-white shadow-lg">
                {typeOptions.map((option) => (
                  <div
                    key={option.value}
                    className="flex cursor-pointer select-none items-center justify-between px-3 py-2 text-sm hover:bg-gray-100"
                    onClick={() => handleSelect("type", option.value)}
                  >
                    <span className="truncate pr-4">{option.label}</span>
                    {type === option.value && (
                      <div className="flex bg-[var(--color-secondary1)] rounded-full h-5 w-5 min-w-[1.25rem] items-center justify-center">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {errors.type && (
              <p className="text-red-500 text-xs mt-1">{errors.type}</p>
            )}
          </div>

          <Button
            className="w-full bg-[var(--color-secondary1)] 
                 text-white 
                 px-4 py-2 rounded
               
                 hover:bg-[var(--color-secondary1)] 
                 hover:text-white "
            onClick={handleSubmit}
          >
            Send Notification
          </Button>
        </SettingsSection>
      </div>
    </div>
  );
};

export default PushAlertsPage;
