"use client";

import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar1 } from "lucide-react";

const PolicyForm = ({ isOpen, onClose, onSave, initialData, sectionTitle }) => {
  const [formData, setFormData] = useState({
    title: "",
    updateDate: "",
    description: "",
  });

  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    if (isOpen && initialData) {
      setFormData({
        title: initialData.title || "",
        updateDate: initialData.updateDate
          ? new Date(initialData.updateDate)
          : null,
        description: initialData.description || "",
      });
    } else if (isOpen) {
      setFormData({
        title: "",
        updateDate: null,
        description: "",
      });
    }
    setShowCalendar(false);
  }, [isOpen, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      updateDate: formData.updateDate
        ? formData.updateDate.toISOString().split("T")[0]
        : "",
    };

    onSave(submissionData);
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        className="mr-4 mt-4 mb-4 rounded-lg h-[calc(100vh-2rem)] border border-[#E4E4E6] shadow-xl sm:max-w-[600px] p-0 overflow-y-auto focus-visible:outline-none bg-white"
        side="right"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <SheetHeader className="text-left p-0">
              <SheetTitle className="text-xl font-bold">
                {initialData.title ? "Edit Data" : "Add Data"}
              </SheetTitle>
              <div className="text-sm text-gray-500">
                {sectionTitle}
              </div>
            </SheetHeader>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="text-sm font-medium text-placeholder-color"
              >
                Title
              </label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter content title"
                className="w-full"
                required
              />
            </div>

            <div className="space-y-2 relative">
              <label
                htmlFor="updateDate"
                className="text-sm font-medium text-placeholder-color"
              >
                Update Date
              </label>

              <div
                className="relative w-full border border-[var(--border-admin)] px-3 py-2 rounded-md cursor-pointer flex items-center justify-between text-[var(--color-dull-text)] bg-white h-[42px]"
                onClick={() => setShowCalendar(!showCalendar)}
              >
                <span className="text-sm text-black">
                  {formData.updateDate
                    ? formData.updateDate.toLocaleDateString("en-GB")
                    : "Select Date"}
                </span>
                <Calendar1 size={18} className="text-black" />
              </div>
              {showCalendar && (
                <div className="absolute z-50 mt-1 w-full p-2 bg-white border rounded shadow-lg">
                  <DatePicker
                    selected={formData.updateDate}
                    onChange={(date) => {
                      setFormData((prev) => ({ ...prev, updateDate: date }));
                      setShowCalendar(false);
                    }}
                    inline
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="description"
                className="text-sm font-medium text-placeholder-color"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full min-h-[200px] p-3 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              />
            </div>

            <div className="flex gap-4 pt-4 mt-36">
              <Button
                type="button"
                onClick={onClose}
                className="flex-1 border border-secondary1 text-secondary1 hover:bg-white/20 bg-white cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 border-secondary1 text-white bg-secondary1 hover:bg-secondary1/50 cursor-pointer"
              >
                {initialData.title ? "Update" : "Add"}
              </Button>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default PolicyForm;
