"use client";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { fetchCategoryById } from "@/state/categories/categoriesSlice";
import Header from "@/components/form-elements/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, MinusCircle } from "lucide-react";
import SelectCheckbox from "@/components/form-elements/SelectCheckbox";
import useAutoDismissError from "@/hooks/useAutoDismissError";

const CategoryForm = ({ data, onClose, onCancel, onSubmit }) => {
  const dispatch = useDispatch();
  const handleClose = onClose || onCancel;
  const isEditMode = !!data;
  const [categoryName, setCategoryName] = useState("");
  const [status, setStatus] = useState("ACTIVE");
  const [dynamicFields, setDynamicFields] = useState([]);
  const [errors, setErrors, clearErrors] = useAutoDismissError({});
  const [loadingDetails, setLoadingDetails] = useState(false);
  const lastFetchedId = useRef(null);

  useEffect(() => {
    if (data) {
      // Map initial API data to form state (fast render)
      setCategoryName(data.name || data.category || "");
      setStatus(
        data.status
          ? data.status.toUpperCase() // Ensure backend enum format
          : "ACTIVE"
      );

      // Fetch full details (for fields)
      const id = data._id || data.id;
      if (id && id !== lastFetchedId.current) {
        lastFetchedId.current = id;
        setLoadingDetails(true);
        dispatch(fetchCategoryById(id))
          .unwrap()
          .then((responseData) => {
            const categoryData = responseData.data || responseData;
            if (categoryData) {
              console.log(
                "CategoryForm Fetched Data (Edit Mode):",
                categoryData
              );
              // Update fields from full data
              if (categoryData.fields && Array.isArray(categoryData.fields)) {
                setDynamicFields(
                  categoryData.fields.map((f) => ({
                    id: f._id || Date.now() + Math.random(),
                    name: f.label || f.key,
                    label: f.label || "Field Name",
                    value: f.key || "",
                  }))
                );
              }
              // Optional: ensure other fields are in sync if API returns more up-to-date info
            }
          })
          .catch((err) => {
            console.error(
              `Failed to fetch full category details for ID ${id}:`,
              err?.message || err
            );
          })
          .finally(() => setLoadingDetails(false));
      }

      // Existing local logic fallback if fields present in prop (though unlikely for list view)
      if (data.fields && Array.isArray(data.fields)) {
        setDynamicFields(
          data.fields.map((f) => ({
            id: f._id || Date.now() + Math.random(),
            name: f.label || f.key,
            label: f.label || "Field Name",
            value: f.key || "",
          }))
        );
      }
    }
  }, [data, dispatch]);

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
      { id: Date.now(), name: "", label: "New Field", type: "TEXT" },
    ]);
  };

  const handleRemoveField = (id) => {
    setDynamicFields(dynamicFields.filter((field) => field.id !== id));
  };

  const handleFieldChange = (id, key, value) => {
    setDynamicFields(
      dynamicFields.map((field) =>
        field.id === id ? { ...field, [key]: value } : field
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Transform to Backend Schema
    const payload = {
      name: categoryName,
      status: status.toUpperCase(),
      fields: dynamicFields.map((field, index) => ({
        label: field.name,
        key: field.name.trim(),
        type: field.type || "TEXT",
        isRequired: false,
        order: index + 1,
      })),
    };

    console.log("CategoryForm Payload (Create/Update):", payload);

    if (onSubmit) onSubmit(payload);
    if (handleClose) handleClose();
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
                ? "Edit a listing category."
                : "Create a new listing category."
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
                { label: "Active", value: "ACTIVE" },
                { label: "Inactive", value: "INACTIVE" },
              ]}
              value={status ? [status] : []}
              onChange={(newValues) => {
                const newValue =
                  newValues.length > 0
                    ? newValues[newValues.length - 1].toUpperCase()
                    : "";
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
                Add Fields (Name)
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
              {loadingDetails ? (
                <div className="text-center text-sm text-gray-500 py-4">
                  Loading fields...
                </div>
              ) : (
                dynamicFields.map((field) => (
                  <div key={field.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium text-black">
                        Field Name
                      </label>
                      <button
                        type="button"
                        onClick={() => handleRemoveField(field.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <MinusCircle className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex gap-3 items-center">
                      <Input
                        value={field.name}
                        onChange={(e) =>
                          handleFieldChange(field.id, "name", e.target.value)
                        }
                        placeholder="e.g. Breed"
                        className="h-11 flex-1"
                      />
                      <div className="flex-1 min-w-[120px]">
                        <select
                          value={field.type}
                          onChange={(e) =>
                            handleFieldChange(field.id, "type", e.target.value)
                          }
                          className="h-11 w-full rounded border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="TEXT">Text</option>
                          <option value="NUMBER">Number</option>
                          <option value="BOOLEAN">Boolean</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))
              )}
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
              if (handleClose) handleClose();
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
