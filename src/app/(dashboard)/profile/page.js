"use client";
import PopupForm from "@/components/ui/popupform";
import { Toaster } from "@/components/ui/sonner";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";
import { changePasswordConfig } from "./config";
import { useSelector } from "react-redux";
import BarberProfileView from "./BarberProfileView";

const ProfilePage = () => {
  const { role } = useSelector((state) => state.auth);
  const [name, setName] = useState("John");
  const [email] = useState("johndoe@example.com");
  const [profilePhoto, setProfilePhoto] = useState("/default.png");
  const [isOpen, setIsOpen] = useState(false);

  if (role === "barber") {
    return <BarberProfileView />;
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePhoto(imageUrl);
    }
  };

  const handleUpdateProfile = () => {
    toast.success("Profile updated successfully!", {
      style: {
        borderRadius: "12px",
        background: "#ffffff",
        color: "#000000",
        position: "bottom-right",
        border: "2px solid black",
        padding: "12px 20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      },
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white border border-[#E4E4E6] rounded-2xl shadow-md mt-6 font-sans">
      <h2 className="text-2xl font-semibold mb-2">My Profile</h2>
      <p className="text-sm text-gray-500 mb-6">
        Manage your personal information and update your account credentials
        securely.
      </p>

      {/* Divider */}
      <div className="border-b border-gray-300 mb-6"></div>

      {/* Personal Information Section */}
      <h3 className="text-xl font-semibold mb-8">Personal Information</h3>

      <div className="grid md:grid-cols-2 gap-4 mb-20">
        <div className="flex flex-col justify-start">
          <label className="block text-sm font-medium mb-1">
            Profile Photo
          </label>
          <p className="text-sm text-gray-500">
            Update your display image for this account.
          </p>
        </div>

        {/* Right side: Profile photo */}
        <div className="flex items-center justify-center">
          <div className="relative">
            <label className="relative cursor-pointer">
              <Image
                src="/profile.jpg"
                alt="Profile"
                width={150}
                height={150}
                className="rounded-full object-cover border-2 border-primary1"
              />
              <label
                htmlFor="photo-upload"
                className="absolute bottom-0 right-0 bg-primary1 text-white p-2 rounded-full cursor-pointer text-sm"
              >
                📸
              </label>
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

      <div className="grid md:grid-cols-2 gap-4 items-center mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <p className="text-sm text-gray-500">
            This name will be visible across your admin activities.
          </p>
        </div>
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 items-center mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">
            Email Address
          </label>
          <p className="text-sm text-gray-500">
            This email will be used for login and notifications.
          </p>
        </div>
        <div>
          <input
            type="email"
            value={email}
            readOnly
            className="w-full border border-gray-200 bg-gray-100 rounded-lg px-3 py-2 cursor-not-allowed"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 items-center mb-6">
        <div></div>
        <div>
          <button
            onClick={handleUpdateProfile}
            className="w-full bg-primary1 text-white px-4 py-2 rounded-lg hover:bg-primary1/80 transition"
          >
            Update Profile
          </button>
        </div>
      </div>

      <div className="border-b border-gray-300 mb-6"></div>

      {/* Account Security Section */}
      <h3 className="text-xl font-semibold mb-4">Account Security</h3>

      {/* Change Password */}
      <div className="grid md:grid-cols-2 gap-4 items-center mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Change Password
          </label>
          <p className="text-sm text-gray-500">
            Change your password to keep your account secure. Make sure
            it&apos;s strong and unique.
          </p>
        </div>
        <div>
          <button
            onClick={() => setIsOpen(true)}
            className="w-full bg-primary1 text-white px-4 py-2 rounded-lg hover:bg-primary1/80 transition"
          >
            Change Password
          </button>
          {isOpen && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-0 bg-black/50"
              onClick={() => setIsOpen(false)}
            >
              <div onClick={(e) => e.stopPropagation()}>
                <PopupForm
                  config={changePasswordConfig}
                  width="600px"
                  onApply={(data) => {
                    console.log("New Password Data:", data);
                    setIsOpen(false);
                  }}
                  onCancel={() => setIsOpen(false)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
