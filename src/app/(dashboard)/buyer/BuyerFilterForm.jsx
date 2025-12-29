"use client";
import React, { useState } from "react";
import Header from "@/components/form-elements/Header";
import CheckboxGroup from "@/components/form-elements/CheckboxGroup";
import DateRange from "@/components/form-elements/DateRange";
import NumberRange from "@/components/form-elements/NumberRange";
import { Button } from "@/components/ui/button";

const BuyerFilterForm = ({ onCancel, onApply }) => {
  // State for the form
  const [status, setStatus] = useState(["all"]);
  const [joinDateFrom, setJoinDateFrom] = useState(null);
  const [joinDateTo, setJoinDateTo] = useState(null);
  const [spendAmountFrom, setSpendAmountFrom] = useState("");

  const [spendAmountTo, setSpendAmountTo] = useState("");
  const [errors, setErrors] = useState({});

  const handleApply = () => {
    const newErrors = {};
    let isValid = true;

    // Validation
    if (joinDateFrom && joinDateTo && joinDateFrom > joinDateTo) {
      newErrors.joinDate = "From Date must be before To Date";
      isValid = false;
    }

    const fromAmount = parseFloat(spendAmountFrom);
    const toAmount = parseFloat(spendAmountTo);

    if (spendAmountFrom && fromAmount < 0) {
      newErrors.spendAmount = "Spent Amount From cannot be negative";
      isValid = false;
    } else if (spendAmountTo && toAmount < 0) {
      newErrors.spendAmount = "Spent Amount To cannot be negative";
      isValid = false;
    } else if (
      spendAmountFrom &&
      spendAmountTo &&
      !isNaN(fromAmount) &&
      !isNaN(toAmount) &&
      fromAmount > toAmount
    ) {
      newErrors.spendAmount =
        "Spent Amount From must be less than Spent Amount To";
      isValid = false;
    }

    // Check if form is empty
    const isStatusAll = status.length === 1 && status[0] === "all";
    const isJoinDateEmpty = !joinDateFrom && !joinDateTo;
    const isSpendAmountEmpty = !spendAmountFrom && !spendAmountTo;

    if (isStatusAll && isJoinDateEmpty && isSpendAmountEmpty) {
      newErrors.form = "Please select at least one filter to apply.";
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) return;

    const filterData = {
      status,
      joinDate: { from: joinDateFrom, to: joinDateTo },
      spendAmount: { from: spendAmountFrom, to: spendAmountTo },
    };
    console.log("Applied Filters:", filterData);
    if (onApply) onApply(filterData);
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <Header type="header" label="Advance Filters" />
          <Header
            type="subheader"
            text="Refine your search results using custom criteria across modules."
          />
        </div>
      </div>

      <div className="w-full h-px m-2 bg-(--border-admin)" />

      <div className="flex-1 overflow-y-auto">
        <Header
          type="subheader"
          label="Filter by:"
          css={{
            marginBottom: "16px",
            color: "var(--color-black)",
            fontWeight: "600",
            fontSize: "16px",
          }}
        />

        <div className="space-y-6">
          <CheckboxGroup
            label="Status"
            options={[
              { value: "all", label: "All" },
              { value: "active", label: "Active" },
              { value: "suspended", label: "Suspended" },
            ]}
            value={status}
            onChange={(val) => {
              if (val.length === 0) setStatus(["all"]);
              else setStatus(val);
            }}
            singleSelect={true}
          />

          <DateRange
            label="Join Date"
            from={joinDateFrom}
            to={joinDateTo}
            onFromChange={setJoinDateFrom}
            onToChange={setJoinDateTo}
          />
          {errors.joinDate && (
            <p className="text-red-500 text-xs mt-1">{errors.joinDate}</p>
          )}

          <NumberRange
            label="Spent Amount Range"
            from={spendAmountFrom}
            to={spendAmountTo}
            onFromChange={setSpendAmountFrom}
            onToChange={setSpendAmountTo}
          />
          {errors.spendAmount && (
            <p className="text-red-500 text-xs mt-1">{errors.spendAmount}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {errors.form && <p className="text-red-500 text-sm">{errors.form}</p>}
        <div className="flex gap-4">
          <Button
            type="button"
            onClick={handleCancel}
            variant="outline"
            className="flex-1 border-secondary1 text-secondary1 hover:bg-secondary1/10"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleApply}
            className="flex-1 bg-secondary1 text-white hover:bg-secondary1/90"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BuyerFilterForm;
