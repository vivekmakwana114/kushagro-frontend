"use client";
import React, { useState } from "react";
import Header from "@/components/form-elements/Header";
import CheckboxGroup from "@/components/form-elements/CheckboxGroup";
import DateRange from "@/components/form-elements/DateRange";
import NumberRange from "@/components/form-elements/NumberRange";
import { Button } from "@/components/ui/button";

const SellerFilterForm = ({ onCancel, onApply }) => {
  // State for the form
  const [status, setStatus] = useState(["all"]);
  const [idStatus, setIdStatus] = useState(["all"]);
  const [joinDateFrom, setJoinDateFrom] = useState(null);
  const [joinDateTo, setJoinDateTo] = useState(null);

  // Ranges
  const [earningAmountFrom, setEarningAmountFrom] = useState("");
  const [earningAmountTo, setEarningAmountTo] = useState("");

  const [orderRangeFrom, setOrderRangeFrom] = useState("");
  const [orderRangeTo, setOrderRangeTo] = useState("");

  const [listingsRangeFrom, setListingsRangeFrom] = useState("");
  const [listingsRangeTo, setListingsRangeTo] = useState("");

  const [errors, setErrors] = useState({});

  const handleApply = () => {
    const newErrors = {};
    let isValid = true;

    // Validation Helper
    const validateRange = (from, to, fieldName, label) => {
      const fromVal = parseFloat(from);
      const toVal = parseFloat(to);

      if (from && fromVal < 0) {
        newErrors[fieldName] = `${label} From cannot be negative`;
        return false;
      }
      if (to && toVal < 0) {
        newErrors[fieldName] = `${label} To cannot be negative`;
        return false;
      }
      if (from && to && !isNaN(fromVal) && !isNaN(toVal) && fromVal > toVal) {
        newErrors[fieldName] = `${label} From must be less than ${label} To`;
        return false;
      }
      return true;
    };

    // Date Validation
    if (joinDateFrom && joinDateTo && joinDateFrom > joinDateTo) {
      newErrors.joinDate = "From Date must be before To Date";
      isValid = false;
    }

    // Range Validations
    if (
      !validateRange(
        earningAmountFrom,
        earningAmountTo,
        "earningAmount",
        "Earning Amount"
      )
    )
      isValid = false;
    if (
      !validateRange(orderRangeFrom, orderRangeTo, "orderRange", "Order Range")
    )
      isValid = false;
    if (
      !validateRange(
        listingsRangeFrom,
        listingsRangeTo,
        "listingsRange",
        "Listings Range"
      )
    )
      isValid = false;

    // Check if form is empty
    const isStatusAll = status.length === 1 && status[0] === "all";
    const isIdStatusAll = idStatus.length === 1 && idStatus[0] === "all";
    const isJoinDateEmpty = !joinDateFrom && !joinDateTo;
    const isEarningAmountEmpty = !earningAmountFrom && !earningAmountTo;
    const isOrderRangeEmpty = !orderRangeFrom && !orderRangeTo;
    const isListingsRangeEmpty = !listingsRangeFrom && !listingsRangeTo;

    if (
      isStatusAll &&
      isIdStatusAll &&
      isJoinDateEmpty &&
      isEarningAmountEmpty &&
      isOrderRangeEmpty &&
      isListingsRangeEmpty
    ) {
      newErrors.form = "Please select at least one filter to apply.";
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) return;

    const filterData = {
      status,
      idStatus,
      joinDate: { from: joinDateFrom, to: joinDateTo },
      earningAmount: { from: earningAmountFrom, to: earningAmountTo },
      orderRange: { from: orderRangeFrom, to: orderRangeTo },
      listingsRange: { from: listingsRangeFrom, to: listingsRangeTo },
    };
    console.log("Applied Seller Filters:", filterData);
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

      <div className="w-full h-[1px] m-2 bg-[var(--border-admin)]" />

      <div className="flex-1 overflow-y-auto pr-2">
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
          {/* Status */}
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

          {/* ID Status */}
          <CheckboxGroup
            label="ID Status"
            options={[
              { value: "all", label: "All" },
              { value: "verified", label: "Verified" },
              { value: "pending", label: "Pending" },
              { value: "rejected", label: "Rejected" },
            ]}
            value={idStatus}
            onChange={(val) => {
              if (val.length === 0) setIdStatus(["all"]);
              else setIdStatus(val);
            }}
            singleSelect={true}
          />

          {/* Join Date */}
          <div>
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
          </div>

          {/* Earning Amount Range */}
          <div>
            <NumberRange
              label="Earning Amount Range"
              from={earningAmountFrom}
              to={earningAmountTo}
              onFromChange={setEarningAmountFrom}
              onToChange={setEarningAmountTo}
            />
            {errors.earningAmount && (
              <p className="text-red-500 text-xs mt-1">
                {errors.earningAmount}
              </p>
            )}
          </div>

          {/* Order Range */}
          <div>
            <NumberRange
              label="Order Range"
              from={orderRangeFrom}
              to={orderRangeTo}
              onFromChange={setOrderRangeFrom}
              onToChange={setOrderRangeTo}
            />
            {errors.orderRange && (
              <p className="text-red-500 text-xs mt-1">{errors.orderRange}</p>
            )}
          </div>

          {/* Listings Range */}
          <div>
            <NumberRange
              label="Listings Range"
              from={listingsRangeFrom}
              to={listingsRangeTo}
              onFromChange={setListingsRangeFrom}
              onToChange={setListingsRangeTo}
            />
            {errors.listingsRange && (
              <p className="text-red-500 text-xs mt-1">
                {errors.listingsRange}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {errors.form && <p className="text-red-500 text-sm">{errors.form}</p>}
        <div className="flex gap-4">
          <Button
            type="button"
            onClick={handleCancel}
            variant="outline"
            className="flex-1 border-[var(--color-secondary1)] text-[var(--color-secondary1)] hover:bg-[var(--color-secondary1)]/10"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleApply}
            className="flex-1 bg-[var(--color-secondary1)] text-white hover:bg-[var(--color-secondary1)]/90"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SellerFilterForm;
