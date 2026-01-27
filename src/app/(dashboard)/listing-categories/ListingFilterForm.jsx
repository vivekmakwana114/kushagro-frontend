"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/form-elements/Header";
import CheckboxGroup from "@/components/form-elements/CheckboxGroup";
import DateRange from "@/components/form-elements/DateRange";
import NumberRange from "@/components/form-elements/NumberRange";
import SelectCheckbox from "@/components/form-elements/SelectCheckbox";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/state/categories/categoriesSlice";

const ListingFilterForm = ({ onCancel, onApply }) => {
  // State for the form
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);

  const [status, setStatus] = useState(["all"]);
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchCategories({}));
  }, [dispatch]);

  const categoryOptions = categories.map((cat) => ({
    label: cat.name,
    value: cat._id || cat.id,
  }));

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
    if (dateFrom && dateTo && dateFrom > dateTo) {
      newErrors.dateRange = "From Date must be before To Date";
      isValid = false;
    }

    // Range Validations
    if (!validateRange(priceFrom, priceTo, "priceRange", "Price"))
      isValid = false;

    // Check if form is empty
    const isStatusAll = status.length === 1 && status[0] === "all";
    const isDateRangeEmpty = !dateFrom && !dateTo;
    const isPriceRangeEmpty = !priceFrom && !priceTo;
    const isCategoriesEmpty = selectedCategories.length === 0;

    if (
      isStatusAll &&
      isDateRangeEmpty &&
      isPriceRangeEmpty &&
      isCategoriesEmpty
    ) {
      newErrors.form = "Please select at least one filter to apply.";
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) return;

    const filterData = {
      status,
      dateRange: { from: dateFrom, to: dateTo },
      priceRange: { from: priceFrom, to: priceTo },
      categories: selectedCategories,
    };
    console.log("Applied Listing Filters:", filterData);
    if (onApply) onApply(filterData);
  };

  const handleReset = () => {
    setStatus(["all"]);
    setDateFrom(null);
    setDateTo(null);
    setPriceFrom("");
    setPriceTo("");
    setSelectedCategories([]);
    setErrors({});

    if (onApply) onApply({});
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

      <div className="flex-1 overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:bg-transparent [-ms-overflow-style:none] [scrollbar-width:none]">
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
              { value: "inactive", label: "Inactive" },
            ]}
            value={status}
            onChange={(val) => {
              if (val.length === 0) setStatus(["all"]);
              else setStatus(val);
            }}
            singleSelect={true}
          />

          {/* Date Range */}
          <div>
            <DateRange
              label="Date Range"
              from={dateFrom}
              to={dateTo}
              onFromChange={setDateFrom}
              onToChange={setDateTo}
            />
            {errors.dateRange && (
              <p className="text-red-500 text-xs mt-1">{errors.dateRange}</p>
            )}
          </div>

          {/* Price Range */}
          <div>
            <NumberRange
              label="Price Range"
              from={priceFrom}
              to={priceTo}
              onFromChange={setPriceFrom}
              onToChange={setPriceTo}
            />
            {errors.priceRange && (
              <p className="text-red-500 text-xs mt-1">{errors.priceRange}</p>
            )}
          </div>

          {/* Categories */}
          <div>
            <SelectCheckbox
              label="Category"
              placeholder="Select Category"
              options={categoryOptions}
              value={selectedCategories}
              onChange={(newValues) => {
                if (newValues.length > 0) {
                  const lastSelected = newValues[newValues.length - 1];
                  setSelectedCategories([lastSelected]);
                } else {
                  setSelectedCategories([]);
                }
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {errors.form && <p className="text-red-500 text-sm">{errors.form}</p>}
        <div className="flex gap-4">
          <Button
            type="button"
            onClick={handleReset}
            variant="outline"
            className="flex-1 border-[var(--color-secondary1)] text-[var(--color-secondary1)] hover:bg-[var(--color-secondary1)]/10"
          >
            Reset
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

export default ListingFilterForm;
