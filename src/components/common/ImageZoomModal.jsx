"use client";
import React, { useEffect } from "react";
import { X } from "lucide-react";

/**
 * Reusable Image Zoom Modal Component
 *
 * @param {string} imageUrl - URL of the image to display
 * @param {string} alt - Alt text for the image
 * @param {boolean} isOpen - Controls modal visibility
 * @param {function} onClose - Callback when modal closes
 */
const ImageZoomModal = ({
  imageUrl,
  alt = "Zoomed image",
  isOpen,
  onClose,
}) => {
  // Handle ESC key press to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-200 text-white"
        aria-label="Close modal"
      >
        <X size={24} />
      </button>

      <div
        className="relative max-w-[90vw] max-h-[90vh] animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={imageUrl}
          alt={alt}
          className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
        />
      </div>
    </div>
  );
};

export default ImageZoomModal;
