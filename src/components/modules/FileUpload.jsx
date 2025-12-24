import React, { useState, useId, useEffect } from "react";
import { LuGalleryVertical } from "react-icons/lu";
import { X } from "lucide-react";

const FileUpload = ({ onChange, value, multiple = false, maxFiles = 20 }) => {
  const uniqueId = useId();
  // Internal state for selected files
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  // Sync internal state with props if needed, though value prop handling is tricky with File objects.
  // We'll rely on internal state for file management and propagate changes up.

  // Cleanup object URLs
  useEffect(() => {
    return () => {
      previews.forEach((p) => URL.revokeObjectURL(p.url));
    };
  }, [previews]);

  const updateFiles = (newFiles) => {
    setSelectedFiles(newFiles);

    // Generate previews
    const newPreviews = newFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setPreviews(newPreviews);

    // Notify parent
    onChange(multiple ? newFiles : newFiles[0]);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    handleNewFiles(files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleNewFiles(files);
  };

  const handleNewFiles = (files) => {
    const validFiles = files.filter((file) => file.size <= 2 * 1024 * 1024);

    if (validFiles.length !== files.length) {
      alert("Some files were skipped because they exceed the 2MB limit.");
    }

    if (multiple) {
      if (selectedFiles.length + validFiles.length > maxFiles) {
        alert(`You can only upload a maximum of ${maxFiles} files.`);
        return;
      }
      updateFiles([...selectedFiles, ...validFiles]);
    } else {
      if (validFiles.length > 0) {
        updateFiles([validFiles[0]]);
      }
    }
  };

  const removeFile = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    updateFiles(newFiles);
  };

  return (
    <div className="w-full">
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="w-full border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition relative"
      >
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
          className="hidden"
          id={uniqueId}
          multiple={multiple}
        />

        <label
          htmlFor={uniqueId}
          className="flex flex-col items-center space-y-2 w-full h-full cursor-pointer"
        >
          <div className="w-12 h-12 border rounded flex items-center justify-center text-gray-400">
            <LuGalleryVertical />
          </div>
          <span className="text-gray-600">
            {selectedFiles.length > 0
              ? `${selectedFiles.length} file(s) selected`
              : `Upload or drop ${multiple ? "files" : "a file"} right here`}
          </span>
          <span className="text-xs text-gray-400">
            (File Format - PNG, JPEG, Max 2MB)
          </span>
        </label>
      </div>

      {previews.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {previews.map((preview, index) => (
            <div
              key={preview.url}
              className="relative w-24 h-24 border rounded overflow-hidden group"
            >
              <img
                src={preview.url}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="absolute top-1 right-1 bg-black/50 hover:bg-red-500 text-white rounded-full p-1 transition-colors"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
