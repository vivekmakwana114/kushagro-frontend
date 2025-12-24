import React from "react";

export default function SettingsSection({ title, description, children }) {
  return (
    <div className="w-full border rounded-xl p-6 bg-white">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm text-gray-500 mb-6">{description}</p>
      <div className="space-y-6">{children}</div>
    </div>
  );
}
