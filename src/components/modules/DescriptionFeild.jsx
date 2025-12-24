"use client";
import React, { useState } from "react";
import FileUpload from "./FileUpload";
import InputField from "./InputRegistry";
import dynamic from "next/dynamic";

// Dynamically import react-quill (avoids SSR issues in Next.js)
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const DynamicForm = ({ config }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e, fieldName) => {
    const { value, type, checked } = e.target;
    setFormData({
      ...formData,
      [fieldName]: type === "checkbox" ? checked : value,
    });
  };

  const renderField = (field) => {
    const commonProps = {
      name: field.name,
      value: formData[field.name] || "",
      onChange: (e) => handleChange(e, field.name),
      placeholder: field.placeholder || "",
      style: field.css || {},
      className: "form-field",
    };

    switch (field.type) {
      case "input":
        return <InputField type="text" {...commonProps} label={field.label} />;

      case "textarea":
        if (field.richText) {
          return (
            <ReactQuill
              theme="snow"
              value={formData[field.name] || ""}
              onChange={(content) =>
                setFormData({ ...formData, [field.name]: content })
              }
              placeholder={field.placeholder || "Enter description..."}
            />
          );
        }
        return <textarea {...commonProps} rows={field.rows || 4} />;

      case "file":
        return (
          <FileUpload
            value={formData[field.name]}
            onChange={(file) =>
              setFormData({
                ...formData,
                [field.name]: file,
              })
            }
          />
        );

      case "select":
        return (
          <select {...commonProps}>
            <option value="">Select {field.label}</option>
            {field.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      default:
        return <input type="text" {...commonProps} />;
    }
  };

  return (
    <form className="w-full dynamic-form" style={config.formCss || {}}>
      {config.title && <h2>{config.title}</h2>}

      {config.fields.map((field) => (
        <div
          key={field.name}
          className="form-group"
          style={field.containerCss || {}}
        >
          <label className="block mb-2 font-medium">{field.label}</label>
          {renderField(field)}
        </div>
      ))}
    </form>
  );
};

export default DynamicForm;
