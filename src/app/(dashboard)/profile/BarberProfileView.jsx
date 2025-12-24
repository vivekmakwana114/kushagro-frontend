"use client";
import React, { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import PopupForm from "@/components/ui/popupform";
import DynamicForm from "@/components/modules/DynamicFormRendering";
import { changePasswordConfig } from "./config";
import { barberProfileEditConfig } from "./barberProfileConfig";
import ActionComponent from "@/components/grid/actionComponent";

const BarberProfileView = () => {
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);

  // Mock Data
  const [profileData, setProfileData] = useState({
    name: "Aaliyah Johnson",
    email: "aaliyahj@ciq.com",
    phone: "(555)123-4567",
    instagram: "https://ig.me/m/aksdhhSD?text=sar..",
    tiktok: "https://tiktok.me/m/aksdhhSD?text=sar..",
    profilePhoto: "/profile.jpg",
    gallery: [],
  });

  const handleUpdateProfile = (data) => {
    console.log("Updated Profile Data:", data);

    setProfileData((prev) => {
      let updatedGallery = prev.gallery || [];

      // Handle removals if data.gallery exists
      if (data.gallery) {
        updatedGallery = data.gallery.map((img) => img.src);
      }

      // Handle additions
      const rawPhotos = data.galleryPhoto;
      let newFiles = [];

      if (rawPhotos) {
        if (Array.isArray(rawPhotos)) {
          newFiles = rawPhotos;
        } else if (rawPhotos instanceof FileList) {
          newFiles = Array.from(rawPhotos);
        } else if (rawPhotos instanceof File) {
          newFiles = [rawPhotos];
        }
      }

      if (newFiles.length > 0) {
        const newPhotoUrls = newFiles.map((file) => URL.createObjectURL(file));
        updatedGallery = [...updatedGallery, ...newPhotoUrls];
      }

      return {
        ...prev,
        ...data,
        gallery: updatedGallery,
      };
    });

    toast.success("Profile updated successfully!");
  };

  const handleChangePassword = (data) => {
    console.log("Change Password Data:", data);
    toast.success("Password changed successfully!");
    setIsPasswordOpen(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white border border-[#E4E4E6] rounded-2xl shadow-md mt-6 font-sans">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">My Profile</h2>
          <p className="text-sm text-gray-500">
            Manage your personal information and update your account credentials
            securely.
          </p>
        </div>
        <ActionComponent
          actions={[
            {
              type: "sidebar",
              component: (
                <DynamicForm
                  config={{
                    ...barberProfileEditConfig,
                    fields: barberProfileEditConfig.fields.map((field) => {
                      if (field.name === "fullName")
                        return { ...field, value: profileData.name };
                      if (field.name === "email")
                        return { ...field, value: profileData.email };
                      if (field.name === "phone")
                        return { ...field, value: profileData.phone };
                      if (field.name === "gallery")
                        return {
                          ...field,
                          images: profileData.gallery.map((src) => ({
                            src,
                            id: src,
                          })),
                        };
                      return field;
                    }),
                  }}
                  onApply={handleUpdateProfile}
                  onSubmit={handleUpdateProfile}
                />
              ),
            },
          ]}
          icon={
            <div
              className="w-[20px] h-[20px] bg-primary1"
              style={{
                maskImage: 'url("/assets/icon/editBooking.svg")',
                maskSize: "contain",
                maskRepeat: "no-repeat",
                WebkitMaskImage: 'url("/assets/icon/editBooking.svg")',
                WebkitMaskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
              }}
            />
          }
          text="Edit Profile"
          buttonClassName="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-primary1 hover:bg-gray-50 transition hover:opacity-90 cursor-pointer"
        />
      </div>

      <div className="border-b border-gray-200 mb-8"></div>

      <h3 className="text-xl font-semibold mb-8">Personal Information :</h3>

      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="flex-shrink-0">
          <p className="text-xs text-gray-500 mb-2">Profile Photo</p>
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-primary1 p-1">
            <Image
              src={profileData.profilePhoto}
              alt={profileData.name}
              width={128}
              height={128}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
          <div>
            <p className="text-xs text-gray-500 mb-1">Full Name</p>
            <p className="font-semibold text-lg">{profileData.name}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Email</p>
            <p className="text-primary1">{profileData.email}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Phone Number</p>
            <p className="text-primary1">{profileData.phone}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Instagram</p>
            <a href="#" className="text-primary1 truncate block max-w-[200px]">
              {profileData.instagram}
            </a>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">TikTok</p>
            <a href="#" className="text-primary1 truncate block max-w-[200px]">
              {profileData.tiktok}
            </a>
          </div>
        </div>
      </div>
      <div className="border-b border-gray-200 mb-8"></div>

      {/* Album Photos */}
      <div className="mb-10">
        <p className="text-sm font-medium mb-4">Album Photos</p>
        <div className="grid grid-cols-10 gap-2">
          {profileData.gallery.map((photo, index) => (
            <div
              key={index}
              className="aspect-video w-full rounded-md overflow-hidden relative"
            >
              <Image
                src={photo}
                alt={`Album ${index}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="border-b border-gray-200 mb-8"></div>

      {/* Account Security Section */}
      <div className="bg-white rounded-xl ">
        <h3 className="text-lg font-semibold mb-2">Account Security</h3>
        <p className="text-sm text-gray-500 mb-6">
          Control app access, modify your password, and enhance your
          account&apos;s security.
        </p>

        <div className="border-b border-gray-200 mb-6"></div>

        <div className="grid md:grid-cols-2 gap-4 items-center">
          <div>
            <p className="font-medium mb-1">Change Password</p>
            <p className="text-sm text-gray-500">
              Change your password to keep your account secure. Make sure
              it&apos;s strong and unique.
            </p>
          </div>
          <div className="text-right">
            <button
              onClick={() => setIsPasswordOpen(true)}
              className="bg-primary1 text-white px-6 py-3 rounded-lg hover:opacity-90 transition w-full md:w-auto cursor-pointer"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* Change Password Popup Form */}
      {isPasswordOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-0 bg-black/50"
          onClick={() => setIsPasswordOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <PopupForm
              config={changePasswordConfig}
              width="600px"
              onApply={handleChangePassword}
              onCancel={() => setIsPasswordOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BarberProfileView;
