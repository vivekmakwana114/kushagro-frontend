"use client";
import React, { useState } from "react";
import SettingsSection from "@/components/ui/SettingSection";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    setEmailData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSmsChange = (e) => {
    const { name, value } = e.target;
    setSmsData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    if (activeTab === "email") {
      console.log("Updating Email Settings:", emailData);
    } else {
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
              ? "bg-secondary1/10 text-secondary1 border-[var(--color-secondary1)] shadow-sm"
              : "bg-white text-[var(--color-dull-text)] border-[var(--border-admin)] hover:bg-gray-50"
          }`}
        >
          Email Settings
        </button>
        <button
          onClick={() => setActiveTab("sms")}
          className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 border ${
            activeTab === "sms"
              ? "bg-secondary1/10 text-secondary1 border-[var(--color-secondary1)] shadow-sm"
              : "bg-white text-[var(--color-dull-text)] border-[var(--border-admin)] hover:bg-gray-50"
          }`}
        >
          SMS Settings
        </button>
      </div>

      {/* Content Area with separation */}
      <div className="flex items-center justify-center mt-6">
        {activeTab === "email" ? (
          <div className="w-[650px] border border-[var(--border-admin)] rounded-xl p-8 bg-white shadow-sm">
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
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-black">Email</label>
                <Input
                  name="email"
                  placeholder="E.g. noreply@royaltiesinvesting.com"
                  value={emailData.email}
                  onChange={handleEmailChange}
                  className="h-11"
                />
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
                  className="h-11"
                />
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
                  className="h-11"
                />
              </div>
              <div className="pt-6">
                <Button
                  onClick={handleUpdate}
                  className="w-full bg-[var(--color-secondary1)] hover:bg-[var(--color-secondary1)]/90 text-white h-11 text-md font-medium rounded-md"
                >
                  Update Email Setting
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center">
          <div className="w-[650px] border border-[var(--border-admin)] rounded-xl p-8 bg-white shadow-sm">
            <h2 className="text-xl font-bold mb-8 text-black">SMS Settings</h2>
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
                  className="h-11"
                />
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
                  className="h-11"
                />
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
                  className="h-11"
                />
              </div>
              <div className="pt-28">
                <Button
                  onClick={handleUpdate}
                  className="w-full bg-[var(--color-secondary1)] hover:bg-[var(--color-secondary1)]/90 text-white h-11 text-md font-medium rounded-md"
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
