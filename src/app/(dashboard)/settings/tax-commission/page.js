"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SettingsSection from "@/components/ui/SettingSection";
import { ToggleSwitch } from "@/components/ui/toggle";
import React, { useState } from "react";

const TaxCommissionPage = () => {
  const [enableCommission, setEnableCommission] = useState(false);
  const [commissionPercent, setCommissionPercent] = useState("");
  const [minValue, setMinValue] = useState("");
  const [errors, setErrors] = useState({});

  const handleCommissionChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      if (Number(value) <= 100) {
        setCommissionPercent(value);
        if (errors.commissionPercent) {
          setErrors((prev) => ({ ...prev, commissionPercent: "" }));
        }
      }
    }
  };

  const handleMinValueChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      if (value === "" || Number(value) <= 1000) {
        setMinValue(value);
        if (errors.minValue) {
          setErrors((prev) => ({ ...prev, minValue: "" }));
        }
      }
    }
  };

  const handleSubmit = () => {
    const newErrors = {};

    if (!commissionPercent) {
      newErrors.commissionPercent = "Commission Percentage is required";
    }

    if (!minValue) {
      newErrors.minValue = "Minimum Value is required";
    } else if (Number(minValue) < 100) {
      newErrors.minValue = "Minimum Value must be at least 100";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log({
      enableCommission,
      commissionPercent,
      minValue,
    });
  };

  return (
    <div className="w-full flex justify-center mt-10">
      <div className="w-full max-w-2xl">
        <SettingsSection
          title="Platform Commission Structure"
          description="Set up how commissions are calculated for each service."
        >
          <div className="flex justify-between items-center">
            <div>
              <label className="font-medium">Enable Commission</label>
              <p className="text-sm text-gray-500">
                Enable or disable platform-wide Service Commission.
              </p>
            </div>

            <ToggleSwitch
              checked={enableCommission}
              onChange={(e) => setEnableCommission(e.target.checked)}
            />
          </div>

          <div className="mt-6">
            <label className="font-medium">Commission Percentage (%)</label>
            <p className="text-sm text-gray-500">
              Define the percentage of the service fee taken as commission.
            </p>

            <Input
              className={`mt-2 ${
                errors.commissionPercent ? "border-red-500" : ""
              }`}
              value={commissionPercent}
              placeholder="Commission Percentage"
              onChange={handleCommissionChange}
            />
            {errors.commissionPercent && (
              <p className="text-red-500 text-xs mt-1">
                {errors.commissionPercent}
              </p>
            )}
          </div>

          <div className="mt-6">
            <label className="font-medium">Minimum Value</label>
            <p className="text-sm text-gray-500">
              Set the minimum service amount eligible for commission.
            </p>

            <Input
              className={`mt-2 ${errors.minValue ? "border-red-500" : ""}`}
              value={minValue}
              placeholder="Min Value"
              onChange={handleMinValueChange}
            />
            {errors.minValue && (
              <p className="text-red-500 text-xs mt-1">{errors.minValue}</p>
            )}
          </div>

          <Button
            className="w-full mt-30  bg-[var(--color-primary1)] 
              text-white 
              px-4 py-2 rounded
            
              hover:bg-[var(--color-primary1)] 
              hover:text-white "
            onClick={handleSubmit}
          >
            Update Settings
          </Button>
        </SettingsSection>
      </div>
    </div>
  );
};

export default TaxCommissionPage;
