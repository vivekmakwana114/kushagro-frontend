"use client";
import React, { useState, useEffect } from "react";
import SettingsSection from "@/components/ui/SettingSection";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToggleSwitch } from "@/components/ui/toggle";
import useAutoDismissError from "@/hooks/useAutoDismissError";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCommission,
  resetCommissionState,
  getCommission,
} from "@/state/setting/commission/commissionSlice";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const TaxCommissionPage = () => {
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, message, settings } = useSelector(
    (state) => state.commission,
  );

  const [activeTab, setActiveTab] = useState("commission");

  // Commission State
  const [enableCommission, setEnableCommission] = useState(false);
  const [commissionPercent, setCommissionPercent] = useState("");
  const [commissionMinValue, setCommissionMinValue] = useState("");
  const [commissionErrors, setCommissionErrors, clearCommissionErrors] =
    useAutoDismissError({});

  // Tax State
  const [taxPercent, setTaxPercent] = useState("");
  const [enablePlatformCharges, setEnablePlatformCharges] = useState(false);
  const [platformCharges, setPlatformCharges] = useState("");
  const [taxErrors, setTaxErrors, clearTaxErrors] = useAutoDismissError({});

  // Fetch settings on mount
  useEffect(() => {
    dispatch(getCommission());
  }, [dispatch]);

  // Populate local state from settings
  useEffect(() => {
    if (settings) {
      setEnableCommission(settings.isCommissionEnabled ?? false);
      setCommissionPercent(settings.commissionPercentage?.toString() || "");
      setCommissionMinValue(settings.minimumOrderValue?.toString() || "");

      setTaxPercent(settings.taxPercentage?.toString() || "");
      setEnablePlatformCharges(settings.isPlatformChargesApplied ?? false);
      setPlatformCharges(settings.platformCharges?.toString() || "");
    }
  }, [settings]);

  // Clear errors when switching tabs
  useEffect(() => {
    clearCommissionErrors();
    clearTaxErrors();
  }, [activeTab, clearCommissionErrors, clearTaxErrors]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(message || "Settings updated successfully!");
      dispatch(resetCommissionState());
    }

    if (isError) {
      toast.error(message || "Failed to update settings");
      dispatch(resetCommissionState());
    }
  }, [isSuccess, isError, message, dispatch]);

  // Commission Handlers
  const handleCommissionChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      if (Number(value) <= 100) {
        setCommissionPercent(value);
        if (commissionErrors.commissionPercent) {
          setCommissionErrors((prev) => ({ ...prev, commissionPercent: "" }));
        }
      }
    }
  };

  const handleCommissionMinValueChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setCommissionMinValue(value);
      if (commissionErrors.minValue) {
        setCommissionErrors((prev) => ({ ...prev, minValue: "" }));
      }
    }
  };

  const handleCommissionSubmit = () => {
    const newErrors = {};

    if (!commissionPercent) {
      newErrors.commissionPercent = "Commission Percentage is required";
    }

    if (!commissionMinValue) {
      newErrors.minValue = "Minimum Value is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setCommissionErrors(newErrors);
      return;
    }

    const payload = {
      taxPercentage: Number(taxPercent) || 0,
      isPlatformChargesApplied: enablePlatformCharges,
      platformCharges: Number(platformCharges) || 0,
      isCommissionEnabled: enableCommission,
      commissionPercentage: Number(commissionPercent),
      minimumOrderValue: Number(commissionMinValue),
    };

    dispatch(updateCommission(payload));
  };

  // Tax Handlers
  const handleTaxChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      if (Number(value) <= 100) {
        setTaxPercent(value);
        if (taxErrors.taxPercent) {
          setTaxErrors((prev) => ({ ...prev, taxPercent: "" }));
        }
      }
    }
  };

  const handlePlatformChargesChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPlatformCharges(value);
      if (taxErrors.platformCharges) {
        setTaxErrors((prev) => ({ ...prev, platformCharges: "" }));
      }
    }
  };

  const handleTaxSubmit = () => {
    const newErrors = {};

    if (!taxPercent) {
      newErrors.taxPercent = "Tax Percentage is required";
    }

    if (enablePlatformCharges && !platformCharges) {
      newErrors.platformCharges = "Platform Charges are required when enabled";
    }

    if (Object.keys(newErrors).length > 0) {
      setTaxErrors(newErrors);
      return;
    }

    const payload = {
      taxPercentage: Number(taxPercent),
      isPlatformChargesApplied: enablePlatformCharges,
      platformCharges: Number(platformCharges) || 0,
      isCommissionEnabled: enableCommission,
      commissionPercentage: Number(commissionPercent) || 0,
      minimumOrderValue: Number(commissionMinValue) || 0,
    };

    dispatch(updateCommission(payload));
  };

  return (
    <div className="space-y-6">
      {/* Tabs Container */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setActiveTab("tax")}
          className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 border ${
            activeTab === "tax"
              ? "bg-[#ECFDF3] text-[#1E4620] border-[#1E4620]"
              : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
          }`}
        >
          Platform Tax
        </button>
        <button
          onClick={() => setActiveTab("commission")}
          className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 border ${
            activeTab === "commission"
              ? "bg-[#ECFDF3] text-[#1E4620] border-[#1E4620]"
              : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
          }`}
        >
          Platform Commission
        </button>
      </div>

      {/* Content Area */}
      <div className="flex items-center justify-center mt-6">
        {activeTab === "commission" ? (
          <div className="w-full max-w-2xl">
            <SettingsSection
              title="Platform Commission Structure"
              description="Set up how commissions are calculated for each service."
            >
              <div className="flex justify-between items-center">
                <div>
                  <label className="font-medium text-black">
                    Enable Commission
                  </label>
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
                <label className="font-medium text-black">
                  Commission Percentage (%)
                </label>
                <p className="text-sm text-gray-500">
                  Define the percentage of the service fee taken as commission.
                </p>

                <Input
                  className={`mt-2 h-11 ${
                    commissionErrors.commissionPercent ? "border-red-500" : ""
                  }`}
                  value={commissionPercent}
                  placeholder="Commission %"
                  onChange={handleCommissionChange}
                />
                {commissionErrors.commissionPercent && (
                  <p className="text-red-500 text-xs mt-1">
                    {commissionErrors.commissionPercent}
                  </p>
                )}
              </div>

              <div className="mt-6">
                <label className="font-medium text-black">Minimum Value</label>
                <p className="text-sm text-gray-500">
                  Set the minimum service amount eligible for commission.
                </p>

                <Input
                  className={`mt-2 h-11 ${
                    commissionErrors.minValue ? "border-red-500" : ""
                  }`}
                  value={commissionMinValue}
                  placeholder="Minimum Value of Service"
                  onChange={handleCommissionMinValueChange}
                />
                {commissionErrors.minValue && (
                  <p className="text-red-500 text-xs mt-1">
                    {commissionErrors.minValue}
                  </p>
                )}
              </div>

              <Button
                className="w-full mt-10 bg-[#2D5B32] hover:bg-[#254b29] text-white h-11 text-md font-medium rounded-md"
                onClick={handleCommissionSubmit}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : null}
                {isLoading ? "Updating..." : "Update Settings"}
              </Button>
            </SettingsSection>
          </div>
        ) : (
          <div className="w-full max-w-2xl">
            <SettingsSection
              title="Tax & Platform Charges"
              description="Configure tax rates and platform fees for your services."
            >
              <div>
                <label className="font-medium text-black">
                  Tax Percentage (%)
                </label>
                <p className="text-sm text-gray-500">
                  Set a global tax rate applied to all Services.
                </p>

                <Input
                  className={`mt-2 h-11 ${
                    taxErrors.taxPercent ? "border-red-500" : ""
                  }`}
                  value={taxPercent}
                  placeholder="Tax Percentage"
                  onChange={handleTaxChange}
                />
                {taxErrors.taxPercent && (
                  <p className="text-red-500 text-xs mt-1">
                    {taxErrors.taxPercent}
                  </p>
                )}
              </div>

              <div className="flex justify-between items-center mt-6">
                <div>
                  <label className="font-medium text-black">
                    Apply Platform Charges
                  </label>
                  <p className="text-sm text-gray-500">
                    Enable or disable platform-wide Service charges.
                  </p>
                </div>

                <ToggleSwitch
                  checked={enablePlatformCharges}
                  onChange={(e) => setEnablePlatformCharges(e.target.checked)}
                />
              </div>

              <div className="mt-6">
                <Input
                  className={`mt-2 h-11 ${
                    taxErrors.platformCharges ? "border-red-500" : ""
                  }`}
                  value={platformCharges}
                  placeholder="Platform Charges"
                  onChange={handlePlatformChargesChange}
                  disabled={!enablePlatformCharges}
                />
                {taxErrors.platformCharges && (
                  <p className="text-red-500 text-xs mt-1">
                    {taxErrors.platformCharges}
                  </p>
                )}
              </div>

              <Button
                className="w-full mt-10 bg-[#2D5B32] hover:bg-[#254b29] text-white h-11 text-md font-medium rounded-md"
                onClick={handleTaxSubmit}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : null}
                {isLoading ? "Updating..." : "Update Settings"}
              </Button>
            </SettingsSection>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaxCommissionPage;
