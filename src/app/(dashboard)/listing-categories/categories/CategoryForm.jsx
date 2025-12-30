"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/form-elements/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, MinusCircle, X } from "lucide-react";
import SelectCheckbox from "@/components/form-elements/SelectCheckbox";
import useAutoDismissError from "@/hooks/useAutoDismissError";

const CategoryForm = ({ data, onClose, onSubmit }) => {
  const isEditMode = !!data;
  const [categoryName, setCategoryName] = useState("");
  const [status, setStatus] = useState("Active");
  const [dynamicFields, setDynamicFields] = useState([]);
  const [errors, setErrors, clearErrors] = useAutoDismissError({});

  useEffect(() => {
    if (data) {
      setCategoryName(data.category || "");
      setStatus(
        data.status
          ? data.status.charAt(0).toUpperCase() + data.status.slice(1)
          : "Active"
      );
    }
  }, [data]);

  const validateForm = () => {
    const newErrors = {};
    if (!categoryName.trim()) {
      newErrors.categoryName = "Category Name is required";
    }
    if (!status) {
      newErrors.status = "Status is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddField = () => {
    setDynamicFields([
      ...dynamicFields,
      { id: Date.now(), name: "", label: "Field Name" },
    ]);
  };

  const handleRemoveField = (id) => {
    setDynamicFields(dynamicFields.filter((field) => field.id !== id));
  };

  const handleFieldChange = (id, value) => {
    setDynamicFields(
      dynamicFields.map((field) =>
        field.id === id ? { ...field, name: value } : field
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = {
      categoryName,
      status,
      fields: dynamicFields,
    };
    console.log("Form Submitted:", formData);
    if (onSubmit) onSubmit(formData);
    if (onClose) onClose();
  };

  return (
    <div className="flex flex-col h-full bg-white w-full max-w-2xl mx-auto p-6 md:p-0">
      <div className="flex justify-between items-start ">
        <div className="text-left space-y-1">
          <Header
            type="header"
            label={isEditMode ? "Edit Category" : "Add Category"}
          />
          <Header
            type="subheader"
            text={
              isEditMode
                ? "Edit a listing category to organize products across the platform."
                : "Create a new listing category to organize products across the platform."
            }
          />
        </div>
      </div>

      <div className="w-full h-px my-4 bg-(--border-admin)" />

      <form
        onSubmit={handleSubmit}
        className="flex-1 overflow-y-auto no-scrollbar space-y-6"
      >
        <div className="space-y-4">
          <div>
            <label className="text-left text-sm font-medium text-black block mb-2">
              Category Name
            </label>
            <Input
              value={categoryName}
              onChange={(e) => {
                setCategoryName(e.target.value);
                if (errors.categoryName) {
                  setErrors((prev) => ({ ...prev, categoryName: "" }));
                }
              }}
              placeholder="e.g. Live Stock"
              className={`h-11 ${errors.categoryName ? "border-red-500" : ""}`}
              required
            />
            {errors.categoryName && (
              <p className="text-red-500 text-xs mt-1">{errors.categoryName}</p>
            )}
          </div>

          <div className="text-left">
            <SelectCheckbox
              label="Status"
              placeholder="Select Status"
              options={[
                { label: "Active", value: "Active" },
                { label: "Inactive", value: "Inactive" },
              ]}
              value={status ? [status] : []}
              onChange={(newValues) => {
                const newValue =
                  newValues.length > 0 ? newValues[newValues.length - 1] : "";
                setStatus(newValue);
                if (errors.status) {
                  setErrors((prev) => ({ ...prev, status: "" }));
                }
              }}
            />
            {errors.status && (
              <p className="text-red-500 text-xs mt-1">{errors.status}</p>
            )}
          </div>

          <div className="pt-2">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-[#2E5B20]">
                Add Fields
              </span>
              <button
                type="button"
                onClick={handleAddField}
                className="text-[#2E5B20] hover:text-[#1e3b15]"
              >
                <PlusCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {dynamicFields.map((field) => (
                <div key={field.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-black">
                      {field.label}
                    </label>
                    <button
                      type="button"
                      onClick={() => handleRemoveField(field.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <MinusCircle className="w-5 h-5" />
                    </button>
                  </div>
                  <Input
                    value={field.name}
                    onChange={(e) =>
                      handleFieldChange(field.id, e.target.value)
                    }
                    placeholder="e.g. Breed"
                    className="h-11"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>

      <div className="pt-6 mt-auto">
        <div className="md:grid grid-cols-2 flex flex-col-reverse gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              clearErrors();
              if (onClose) onClose();
            }}
            className="w-full h-11 border-secondary1 text-secondary1 hover:bg-secondary1/10"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            className="w-full h-11 bg-secondary1 hover:bg-secondary1/90 text-white"
          >
            {isEditMode ? "Update Category" : "Create Category"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;
