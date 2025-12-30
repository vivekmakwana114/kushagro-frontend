"use client";
import React, { useState, useEffect } from "react";
import SettingsSection from "@/components/ui/SettingSection";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useAutoDismissError from "@/hooks/useAutoDismissError";

const EmailPage = () => {
  const [activeTab, setActiveTab] = useState("email");
  const [emailData, setEmailData] = useState({
    sendgridKey: "",
    email: "",
    replyEmail: "",
    senderName: "",
  });
  const [smsData, setSmsData] = useState({
    twilioSid: "",
    twilioToken: "",
    twilioPhone: "",
  });

  const [emailErrors, setEmailErrors, clearEmailErrors] = useAutoDismissError(
    {}
  );
  const [smsErrors, setSmsErrors, clearSmsErrors] = useAutoDismissError({});

  // Clear errors when switching tabs
  useEffect(() => {
    clearEmailErrors();
    clearSmsErrors();
  }, [activeTab, clearEmailErrors, clearSmsErrors]);

  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    setEmailData((prev) => ({ ...prev, [name]: value }));
    // Optional: Clear error on change
    if (emailErrors[name]) {
      setEmailErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSmsChange = (e) => {
    const { name, value } = e.target;
    setSmsData((prev) => ({ ...prev, [name]: value }));
    // Optional: Clear error on change
    if (smsErrors[name]) {
      setSmsErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleUpdate = () => {
    if (activeTab === "email") {
      const newErrors = {};
      if (!emailData.sendgridKey)
        newErrors.sendgridKey = "Sendgrid API Key is required";
      if (!emailData.email) newErrors.email = "Email is required";
      if (!emailData.replyEmail)
        newErrors.replyEmail = "Reply Email is required";
      if (!emailData.senderName)
        newErrors.senderName = "Sender Name is required";

      if (Object.keys(newErrors).length > 0) {
        setEmailErrors(newErrors);
        return;
      }
      console.log("Updating Email Settings:", emailData);
    } else {
      const newErrors = {};
      if (!smsData.twilioSid) newErrors.twilioSid = "Twilio SID is required";
      if (!smsData.twilioToken)
        newErrors.twilioToken = "Twilio Token is required";
      if (!smsData.twilioPhone)
        newErrors.twilioPhone = "Twilio Phone is required";

      if (Object.keys(newErrors).length > 0) {
        setSmsErrors(newErrors);
        return;
      }
      console.log("Updating SMS Settings:", smsData);
    }
  };

  return (
    <div className="space-y-6">
      {/* Boxed Tabs Container */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setActiveTab("email")}
          className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 border ${
            activeTab === "email"
              ? "bg-secondary1/10 text-secondary1 border-secondary1 shadow-sm"
              : "bg-white text-dull-text border-(--border-admin) hover:bg-gray-50"
          }`}
        >
          Email Settings
        </button>
        <button
          onClick={() => setActiveTab("sms")}
          className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 border ${
            activeTab === "sms"
              ? "bg-secondary1/10 text-secondary1 border-secondary1 shadow-sm"
              : "bg-white text-dull-text border-(--border-admin) hover:bg-gray-50"
          }`}
        >
          SMS Settings
        </button>
      </div>

      {/* Content Area with separation */}
      <div className="flex items-center justify-center mt-6">
        {activeTab === "email" ? (
          <div className="w-[650px] border border-(--border-admin) rounded-xl p-8 bg-white shadow-sm">
            <h2 className="text-xl font-bold mb-8 text-black">
              Email Settings
            </h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-black">
                  Sendgrid Api key
                </label>
                <Input
                  name="sendgridKey"
                  placeholder="E.g. B9B5WFB-MA04H02-MARK1T2-DRB33R3"
                  value={emailData.sendgridKey}
                  onChange={handleEmailChange}
                  className={`h-11 ${
                    emailErrors.sendgridKey ? "border-red-500" : ""
                  }`}
                />
                {emailErrors.sendgridKey && (
                  <p className="text-red-500 text-xs mt-1">
                    {emailErrors.sendgridKey}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-black">Email</label>
                <Input
                  name="email"
                  placeholder="E.g. noreply@royaltiesinvesting.com"
                  value={emailData.email}
                  onChange={handleEmailChange}
                  className={`h-11 ${
                    emailErrors.email ? "border-red-500" : ""
                  }`}
                />
                {emailErrors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {emailErrors.email}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-black">
                  Reply Email
                </label>
                <Input
                  name="replyEmail"
                  placeholder="E.g. reply@royaltiesinvesting.com"
                  value={emailData.replyEmail}
                  onChange={handleEmailChange}
                  className={`h-11 ${
                    emailErrors.replyEmail ? "border-red-500" : ""
                  }`}
                />
                {emailErrors.replyEmail && (
                  <p className="text-red-500 text-xs mt-1">
                    {emailErrors.replyEmail}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-black">
                  Sender Name
                </label>
                <Input
                  name="senderName"
                  placeholder="E.g. John Doe"
                  value={emailData.senderName}
                  onChange={handleEmailChange}
                  className={`h-11 ${
                    emailErrors.senderName ? "border-red-500" : ""
                  }`}
                />
                {emailErrors.senderName && (
                  <p className="text-red-500 text-xs mt-1">
                    {emailErrors.senderName}
                  </p>
                )}
              </div>
              <div className="pt-6">
                <Button
                  onClick={handleUpdate}
                  className="w-full bg-secondary1 hover:bg-secondary1/90 text-white h-11 text-md font-medium rounded-md"
                >
                  Update Email Setting
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <div className="w-[650px] border border-(--border-admin) rounded-xl p-8 bg-white shadow-sm">
              <h2 className="text-xl font-bold mb-8 text-black">
                SMS Settings
              </h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-black">
                    Twilio SID
                  </label>
                  <Input
                    name="twilioSid"
                    placeholder="E.g. B9B5WFB-MA04H02-MARK1T2-DRB33R3"
                    value={smsData.twilioSid}
                    onChange={handleSmsChange}
                    className={`h-11 ${
                      smsErrors.twilioSid ? "border-red-500" : ""
                    }`}
                  />
                  {smsErrors.twilioSid && (
                    <p className="text-red-500 text-xs mt-1">
                      {smsErrors.twilioSid}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-black">
                    Twilio Token
                  </label>
                  <Input
                    name="twilioToken"
                    placeholder="E.g. B9B5WFB-MA04H02-MARK1T2-DRB33R3"
                    value={smsData.twilioToken}
                    onChange={handleSmsChange}
                    className={`h-11 ${
                      smsErrors.twilioToken ? "border-red-500" : ""
                    }`}
                  />
                  {smsErrors.twilioToken && (
                    <p className="text-red-500 text-xs mt-1">
                      {smsErrors.twilioToken}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-black">
                    Twilio Phone
                  </label>
                  <Input
                    name="twilioPhone"
                    placeholder="E.g. +81 000 000 0000"
                    value={smsData.twilioPhone}
                    onChange={handleSmsChange}
                    className={`h-11 ${
                      smsErrors.twilioPhone ? "border-red-500" : ""
                    }`}
                  />
                  {smsErrors.twilioPhone && (
                    <p className="text-red-500 text-xs mt-1">
                      {smsErrors.twilioPhone}
                    </p>
                  )}
                </div>
                <div className="pt-28">
                  <Button
                    onClick={handleUpdate}
                    className="w-full bg-secondary1 hover:bg-secondary1/90 text-white h-11 text-md font-medium rounded-md"
                  >
                    Update SMS Setting
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailPage;
