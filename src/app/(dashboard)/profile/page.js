"use client";
import React, { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Eye, EyeOff, Camera } from "lucide-react";
import ActionPopup from "@/components/common/ActionPopup";

const ProfilePage = () => {
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [profileData, setProfileData] = useState({
    name: "Sofia Martine",
    email: "sofiadmin@exampleemail.com",
    profilePhoto: "/profile.jpg",
  });

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileData((prev) => ({ ...prev, profilePhoto: imageUrl }));
    }
  };

  const handleUpdateProfile = () => {
    // Add validation if needed
    if (!profileData.name.trim()) {
      toast.error("Full Name cannot be empty");
      return;
    }
    toast.success("Profile updated successfully!");
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitPassword = () => {
    // Validation
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      toast.error("All password fields are required.");
      return;
    }
    if (passwords.new.length < 6) {
      toast.error("New password must be at least 6 characters long.");
      return;
    }
    if (passwords.new !== passwords.confirm) {
      toast.error("New passwords do not match!");
      return;
    }

    console.log("Change Password Data:", passwords);
    toast.success("Password changed successfully!");
    setIsPasswordOpen(false);
    setPasswords({ current: "", new: "", confirm: "" });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white border border-[#E4E4E6] rounded-2xl shadow-sm mt-6 font-sans">
      {/* Header */}
      <h2 className="text-xl font-bold mb-1 text-gray-900">My Profile</h2>
      <p className="text-sm text-gray-500 mb-8">
        Manage your personal information and update your account credentials
        securely.
      </p>

      {/* Personal Information Section */}
      <div className="mb-10">
        <h3 className="text-base font-bold text-gray-900 mb-6">
          Personal Information :
        </h3>

        {/* Profile Photo Row */}
        <div className="flex flex-col md:flex-row items-center md:items-start mb-8">
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <p className="font-semibold text-gray-900 text-sm mb-1">
              Profile Photo
            </p>
            <p className="text-xs text-gray-500">
              Update your display image for this account.
            </p>
          </div>
          <div className="w-full md:w-2/3 flex justify-center md:justify-center">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <Image
                  src={profileData.profilePhoto}
                  alt={profileData.name}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <label
                htmlFor="photo-upload"
                className="absolute bottom-1 right-2 bg-[#2E5B20] text-white p-2 rounded-full cursor-pointer hover:bg-[#254a1a] transition-colors border-2 border-white shadow-sm"
              >
                <Camera size={18} />
                <input
                  type="file"
                  id="photo-upload"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Full Name Row */}
        <div className="flex flex-col md:flex-row items-center mb-6">
          <div className="w-full md:w-1/3 mb-2 md:mb-0">
            <label className="font-semibold text-gray-900 text-sm mb-1 block">
              Full Name
            </label>
            <p className="text-xs text-gray-500">
              This name will be visible across your admin activities.
            </p>
          </div>
          <div className="w-full md:w-2/3 md:pl-10">
            <input
              type="text"
              value={profileData.name}
              onChange={(e) =>
                setProfileData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full md:w-[450px] border border-gray-300 rounded-md px-4 py-2.5 text-sm text-gray-900 focus:ring-1 focus:ring-[#2E5B20] focus:border-[#2E5B20] outline-none"
            />
          </div>
        </div>

        {/* Email Row */}
        <div className="flex flex-col md:flex-row items-center mb-8">
          <div className="w-full md:w-1/3 mb-2 md:mb-0">
            <label className="font-semibold text-gray-900 text-sm mb-1 block">
              Email Address
            </label>
            <p className="text-xs text-gray-500">
              Your registered email used for account access.
            </p>
          </div>
          <div className="w-full md:w-2/3 md:pl-10">
            <input
              type="email"
              value={profileData.email}
              readOnly
              className="w-full md:w-[450px] border border-gray-200 bg-gray-50 rounded-md px-4 py-2.5 text-sm text-gray-500 cursor-not-allowed outline-none"
            />
          </div>
        </div>

        {/* Update Button */}
        <div className="flex justify-end pt-2 border-b border-gray-100 pb-10">
          <div className="w-full md:w-2/3 md:pl-10">
            <button
              onClick={handleUpdateProfile}
              className="w-full md:w-[450px] bg-[#2E5B20] hover:bg-[#254a1a] text-white font-medium py-2.5 rounded-md transition-colors text-sm"
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>

      {/* Account Security Section */}
      <div>
        <h3 className="text-base font-bold text-gray-900 mb-6">
          Account Security :
        </h3>

        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <p className="font-semibold text-gray-900 text-sm mb-1">
              Change Password
            </p>
            <p className="text-xs text-gray-500">
              Change your password to keep your account secure. Make sure
              it&apos;s strong and unique.
            </p>
          </div>
          <div className="w-full md:w-2/3 md:pl-10">
            <button
              onClick={() => setIsPasswordOpen(true)}
              className="w-full md:w-[450px] bg-[#2E5B20] hover:bg-[#254a1a] text-white font-medium py-2.5 rounded-md transition-colors text-sm"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* Change Password Popup */}
      {isPasswordOpen && (
        <ActionPopup
          isOpen={isPasswordOpen}
          heading="Change Password"
          subHeading="Change your password to keep your account secure. Make sure it's strong and unique."
          confirmText="Update Password"
          confirmColor="bg-[#2E5B20] hover:bg-[#254a1a] text-white"
          onClose={() => setIsPasswordOpen(false)}
          onConfirm={handleSubmitPassword}
        >
          <div className="space-y-4">
            {/* Current Password */}
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">
                Current Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="3"
                      y="11"
                      width="18"
                      height="11"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
                <input
                  type={showPassword.current ? "text" : "password"}
                  name="current"
                  value={passwords.current}
                  onChange={handlePasswordChange}
                  placeholder="Enter Your Current Password"
                  className="w-full pl-10 pr-10 border border-gray-300 rounded-md py-2.5 outline-none focus:ring-1 focus:ring-[#2E5B20] focus:border-[#2E5B20] text-sm"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("current")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 outline-none"
                >
                  {showPassword.current ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="3"
                      y="11"
                      width="18"
                      height="11"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
                <input
                  type={showPassword.new ? "text" : "password"}
                  name="new"
                  value={passwords.new}
                  onChange={handlePasswordChange}
                  placeholder="Create a New Password"
                  className="w-full pl-10 pr-10 border border-gray-300 rounded-md py-2.5 outline-none focus:ring-1 focus:ring-[#2E5B20] focus:border-[#2E5B20] text-sm"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("new")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 outline-none"
                >
                  {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="3"
                      y="11"
                      width="18"
                      height="11"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
                <input
                  type={showPassword.confirm ? "text" : "password"}
                  name="confirm"
                  value={passwords.confirm}
                  onChange={handlePasswordChange}
                  placeholder="Re-enter Your New Password"
                  className="w-full pl-10 pr-10 border border-gray-300 rounded-md py-2.5 outline-none focus:ring-1 focus:ring-[#2E5B20] focus:border-[#2E5B20] text-sm"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirm")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 outline-none"
                >
                  {showPassword.confirm ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>
          </div>
        </ActionPopup>
      )}
    </div>
  );
};

export default ProfilePage;
