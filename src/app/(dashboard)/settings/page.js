"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleSwitch } from "@/components/ui/toggle";
import useAutoDismissError from "@/hooks/useAutoDismissError";

const GeneralSettingsPage = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [platformAccess, setPlatformAccess] = useState(false);
  const [errors, setErrors] = useAutoDismissError({});

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // only number and +country code.
  // max number upto 15.
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (/^\+?[0-9]*$/.test(value) && value.length <= 16) {
      setPhone(value);
      if (errors.phone) {
        setErrors((prev) => ({ ...prev, phone: "" }));
      }
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const handleSubmit = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Invalid email address";
    }

    if (!phone) {
      newErrors.phone = "Phone number is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log({
      email,
      phone,
      notifications,
      platformAccess,
    });
  };

  return (
    <div className="w-full">
      <div className="w-full bg-white rounded-xl shadow-md p-6 border border-[var(--border-admin)]">
        {/* <h2 className="text-lg font-semibold text-[var(--color-black)] mb-4">
          Contact Information
        </h2> */}

        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div>
            <label className="text-sm text-[var(--color-black)] mb-1 block">
              Support Email
            </label>
            <Input
              placeholder="support@cutinq.com"
              value={email}
              onChange={handleEmailChange}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="text-sm text-[var(--color-black)] mb-1 block">
              Support Phone
            </label>
            <Input
              placeholder="+1-454-7856"
              value={phone}
              onChange={handlePhoneChange}
              className={errors.phone ? "border-red-500" : ""}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>
        </div> */}

        <h2 className="text-lg font-semibold text-[var(--color-black)] mb-4">
          Platform Controls
        </h2>

        <div className="p-4  flex flex-col gap-4">
          <div className="flex items-center justify-between w-[50%]">
            <p className="font-medium text-[var(--color-black)]">
              Maintenance Mode
            </p>
            <ToggleSwitch
              checked={maintenanceMode}
              onChange={(e) => setMaintenanceMode(e.target.checked)}
            />
          </div>

          <div className="flex items-center justify-between w-[50%]">
            <p className="font-medium text-[var(--color-black)]">
              Send Admin Activity Alerts
            </p>
            <ToggleSwitch
              checked={platformAccess}
              onChange={(e) => setPlatformAccess(e.target.checked)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <Button
            className="
              w-auto 
              border border-[var(--color-secondary1)] 
              text-[var(--color-secondary1)] 
              bg-white 
              px-4 py-2 rounded

              hover:bg-white 
              hover:text-[var(--color-secondary1)] 
              hover:border-[var(--color-secondary1)]
            "
          >
            Cancel
          </Button>

          <Button
            className="
              w-auto 
              bg-[var(--color-secondary1)] 
              text-white 
              px-4 py-2 rounded
            
              hover:bg-[var(--color-secondary1)] 
              hover:text-white
            "
            onClick={handleSubmit}
          >
            Update Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GeneralSettingsPage;
