"use client";
import React, { useState } from "react";
import Image from "next/image";
import ActionComponent from "@/components/grid/actionComponent";
import DynamicForm from "@/components/modules/DynamicFormRendering";
import { getStoreFormConfig, bannerProfileConfig } from "./profileConfig";
import GridCommonComponent from "@/components/grid/gridCommonComponent";
import { ContactColumn_Data, HoursColumn_Data } from "./profileData";
import { contactColumn, hoursColumns } from "./profileColumn";
import PortfolioCards from "@/components/common/PortfolioCard";
import { useRouter } from "next/navigation";
import PopupForm from "@/components/ui/popupform";
import {
  deleteSellerConfig,
  reactivateSellerConfig,
} from "../../sellerConfig";
import { useSelector } from "react-redux";

const defaultStore = Object.fromEntries(
  Object.entries(bannerProfileConfig).map(([key, config]) => [
    key,
    config.value,
  ])
);

const barberShopCard = [
  {
    color: "bg-secondary1",
    head: "Active Barbers",
    total: "27",
    countIcon: "",
    upCount: "8.06",
    MainIcon: (
      <Image
        src="/assets/card/scissors.svg"
        width={20}
        height={20}
        alt="Barber Shop"
      />
    ),
    description: "+10 New Barbers this month",
  },
  {
    color: "bg-tertiary1",
    head: "Total Bookings",
    total: "1008",
    countIcon: "8.06%",
    upCount: "8.06",
    MainIcon: (
      <Image
        src="/assets/card/barbershop.svg"
        width={20}
        height={20}
        alt="Barber Shop"
      />
    ),
    description: "+02 New this month",
  },
  {
    color: "bg-quaternary1",
    head: "Today's Bookings",
    total: "189",
    countIcon: "",
    upCount: "8.06",
    MainIcon: (
      <Image
        src="/assets/card/booking.svg"
        width={20}
        height={20}
        alt="Barber Shop"
      />
    ),
    description: "+1 Bookings scheduled for today.",
  },
  {
    color: "bg-quinary1",
    head: "Booking Revenue",
    total: "$20,000",
    countIcon: "",
    upCount: "8.06",
    MainIcon: (
      <Image
        src="/assets/card/revenue.svg"
        width={20}
        height={20}
        alt="Barber Shop"
      />
    ),
    description: "+$2000 Earn this month",
  },
];

export const BannerProfile = ({ store }) => {
  const { role } = useSelector((state) => state.auth);
  const statusStyles = {
    active: { bg: "#EAFFED", text: "#097416" },
    suspended: { bg: "#FFF0F0", text: "#BC0D10" },
    inactive: { bg: "#EEEEEE", text: "#5E5E5E" },
  };

  const badgeColor =
    statusStyles[store.status?.toLowerCase()] || statusStyles.inactive;

  return (
    <div className="w-full border rounded-lg shadow-md mb-6 bg-white p-6">
      <div className="flex gap-5 max-sm:flex-col max-sm:items-center">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          {store.profileImage ? (
            <Image
              src={store.profileImage}
              alt="Profile Image"
              width={role === "barbershop" ? 150 : 120}
              height={role === "barbershop" ? 150 : 120}
              className={`object-cover rounded-full ${
                role === "barbershop"
                  ? "border-[4px] border-[var(--color-primary1)]"
                  : ""
              } max-sm:w-[80px] max-sm:h-[80px]`}
            />
          ) : (
            <div
              className={`rounded-full bg-gray-300 ${
                role === "barbershop"
                  ? "w-[150px] h-[150px] border-[4px] border-[var(--color-primary1)]"
                  : "w-[120px] h-[120px]"
              } max-sm:w-[80px] max-sm:h-[80px]`}
            ></div>
          )}
        </div>

        {/* Details */}
        <div className="flex-1 flex flex-col gap-2 max-sm:text-center">
          {role === "barbershop" ? (
            // Barbershop Role Layout
            <div>
              <h1 className="text-2xl font-bold text-[#1B1B1B] max-sm:text-xl mb-6">
                {store.storeName}
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4">
                {/* Phone */}
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-black">Phone Number</span>
                  <span className="text-[var(--color-primary1)] font-medium">
                    {store.phone}
                  </span>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-black">Email</span>
                  <a
                    href={`mailto:${store.email}`}
                    className="text-[var(--color-primary1)] font-medium hover:underline"
                  >
                    {store.email}
                  </a>
                </div>

                {/* Location */}
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-black">Location</span>
                  <span className="text-[var(--color-placeholder-color)] text-sm">
                    {store.locationText}
                  </span>
                </div>

                {/* Map Link */}
                <div className="flex items-end md:justify-start">
                  <button
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps?q=${encodeURIComponent(
                          store.locationText
                        )}`,
                        "_blank"
                      )
                    }
                    className="flex items-center gap-2 text-primary1 hover:underline font-medium"
                  >
                    <Image
                      src="/assets/icon/map.svg" 
                      width={18}
                      height={18}
                      alt="map direction"
                      style={{
                        filter:
                          "brightness(0) saturate(100%) invert(32%) sepia(61%) saturate(5437%) hue-rotate(241deg) brightness(97%) contrast(92%)",
                      }} 
                    />
                    <span>Map Direction</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // Default Layout (Admin/Other)
            <>
              <div className="flex justify-between items-start max-sm:flex-col max-sm:items-center max-sm:gap-2">
                <h1 className="text-2xl font-bold text-[#1B1B1B] max-sm:text-xl">
                  {store.storeName}
                </h1>

                <span
                  className="text-sm font-medium px-4 py-1 rounded-md capitalize"
                  style={{
                    backgroundColor: badgeColor.bg,
                    color: badgeColor.text,
                  }}
                >
                  {store.status}
                </span>
              </div>

              <p className=" text-[var(--color-primary1)] font-medium max-sm:text-sm">
                {store.email}
              </p>

              {/* Phone + Joined */}
              <div className="flex justify-between items-center mt-2 max-sm:flex-col max-sm:gap-1">
                <span className="font-medium text-black">
                  {store.phoneHeader}
                </span>
                <span className="font-medium text-black">Joined On</span>
              </div>

              <div className="flex justify-between items-center max-sm:flex-col max-sm:gap-1">
                <span className="text-[var(--color-primary1)]">
                  {store.phone}
                </span>
                <span className="text-[var(--color-primary1)]">
                  {store.joined_date || store.joinedOn}
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Location Section - Hidden for Barbershop (integrated above) */}
      {role !== "barbershop" && (
        <>
          <div className="mt-6 max-sm:text-center">
            <span className="font-medium text-black">
              {store.locationHeader}
            </span>
          </div>

          <div className="flex justify-between items-center mt-1 max-sm:flex-col max-sm:items-start max-sm:gap-3">
            <span className="text-[var(--color-placeholder-color)] w-2/3 max-sm:w-full max-sm:text-sm">
              {store.locationText}
            </span>

            <button
              onClick={() =>
                window.open(
                  `https://www.google.com/maps?q=${encodeURIComponent(
                    store.locationText
                  )}`,
                  "_blank"
                )
              }
              className="flex items-center gap-2 bg-white text-primary1  
                          rounded-lg hover:bg-primary1/10 transition
                         max-sm:w-full max-sm:justify-center"
            >
              <Image
                src="/assets/icon/map.svg"
                width={18}
                height={18}
                alt="map icon"
              />
              <span className="text-sm font-medium">Map Directions</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const SuspensionReasonCard = ({ reason = "Spam or Fake Account" }) => {
  return (
    <div className="w-full border border-[var(--border-admin)] rounded-lg shadow-md mb-6 bg-white p-4">
      <p className="text-sm font-medium text-[var(--color-placeholder-color)] mb-3">
        Suspension Reason:
      </p>

      <div className="bg-gray-50 font-medium text-sm text-[var(--color-black)]">
        {reason}
      </div>
    </div>
  );
};

const BarbershopProfilePage = () => {
  const [stores, setStores] = useState([defaultStore]);
  const router = useRouter();
  const { role } = useSelector((state) => state.auth);
  const handleBack = () => router.back();

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-4">
        {role !== "barbershop" ? (
          <div
            className="p-2 rounded-md hover:bg-gray-100 cursor-pointer"
            onClick={handleBack}
          >
            <Image
              src="/icons/backArrow.svg"
              alt="back button"
              width={20}
              height={20}
            />
          </div>
        ) : (
          <div></div>
        )}

        {stores.length == 0 ? (
          <ActionComponent
            actions={[
              {
                type: "sidebar",
                component: (
                  <DynamicForm
                    config={getStoreFormConfig("create", {})}
                    onApply={(data) =>
                      setStores((prev) => [
                        ...prev,
                        { id: Date.now(), ...data },
                      ])
                    }
                  />
                ),
              },
            ]}
            icon={
              <Image
                src="/icons/create_store.svg"
                alt="create button"
                width={20}
                height={20}
              />
            }
            text="Create Store"
            buttonClassName="inline-flex items-center gap-2 bg-[#02C8DE] text-white px-4 py-2 rounded-md hover:bg-[#02C8DE] hover:text-[#111111]"
          />
        ) : role === "barbershop" ? (
          <ActionComponent
            actions={[
              {
                type: "sidebar",
                component: (
                  <DynamicForm
                    config={getStoreFormConfig("edit", stores[0], role)}
                    onApply={(data) =>
                      setStores((prev) =>
                        prev.map((store) =>
                          store.id === stores[0].id
                            ? { ...store, ...data }
                            : store
                        )
                      )
                    }
                  />
                ),
              },
            ]}
            icon={
              <Image
                src="/assets/icon/editBooking.svg"
                alt="edit"
                width={18}
                height={18}
                style={{
                  filter: "brightness(0) invert(1)",
                }}
              />
            }
            text="Edit Barbershop"
            buttonClassName="inline-flex items-center gap-2 bg-[var(--color-primary1)] text-white px-4 py-2 rounded-md hover:bg-primary1/90"
          />
        ) : (
          <ActionComponent
            menu
            actions={[
              {
                label: "Edit Barbershop",
                iconUrl: "/assets/icon/editBooking.svg",
                type: "sidebar",
                component: (
                  <DynamicForm
                    config={getStoreFormConfig("edit", stores[0])}
                    onApply={(data) =>
                      setStores((prev) =>
                        prev.map((store) =>
                          store.id === stores[0].id
                            ? { ...store, ...data }
                            : store
                        )
                      )
                    }
                  />
                ),
              },
              {
                label: "Reactivate Barbershop",
                iconUrl: "/assets/icon/markCompleted.svg",
                type: "popUp",
                component: (
                  <PopupForm
                    config={reactivateSellerConfig}
                    onApply={() => {
                      setStores((prev) =>
                        prev.map((store) =>
                          store.id === stores[0].id
                            ? { ...store, status: "Active" }
                            : store
                        )
                      );
                    }}
                    onCancel={() => {}}
                  />
                ),
              },
              {
                label: "Delete Barbershop",
                iconUrl: "/assets/icon/deleteBarbershop.svg",
                type: "popUp",
                component: (
                  <PopupForm
                    config={deleteSellerConfig}
                    onApply={() => {
                      setStores([]);
                    }}
                    onCancel={() => {}}
                  />
                ),
              },
            ]}
            icon={
              <Image
                src="/assets/icon/vertical-ellipsis.svg"
                alt="options"
                width={5}
                height={5}
              />
            }
            buttonClassName="p-2 hover:bg-gray-100 rounded-md"
          />
        )}
      </div>

      {stores.length === 0 ? (
        <p className="text-center text-gray-500 mt-16">No Data Available</p>
      ) : (
        <>
          <div className="mb-4">
            {role !== "barbershop" && <PortfolioCards data={barberShopCard} />}
          </div>
          <div className="mb-6">
            {stores?.map((store, index) => (
              <BannerProfile key={index} store={store} />
            ))}

            {role !== "barbershop" && (
              <SuspensionReasonCard reason="Spam or Fake Account" />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4 shadow-sm">
              <h2 className="text-lg font-bold mb-2">Operating Hours </h2>
              <div className="h-[1px] bg-gray-200 mb-4"></div>
              <GridCommonComponent
                data={HoursColumn_Data}
                options={{ select: false, order: false }}
                columns={hoursColumns}
                theme={{
                  border: "border-[var(--border-admin)]",
                  header: { bg: "bg-gray-100" },
                }}
              />
            </div>

            <div className="border rounded-lg p-4 shadow-sm bg-white">
              <h2 className="text-lg font-bold mb-2 text-gray-800">
                Contact Info
              </h2>
              <div className="h-[1px] bg-gray-200 mb-4"></div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-6 text-sm">
                {ContactColumn_Data.map((row, index) => {
                  const labelRenderer = contactColumn.find(
                    (col) => col.key === "label"
                  )?.render;
                  const valueRenderer = contactColumn.find(
                    (col) => col.key === "value"
                  )?.render;

                  return (
                    <React.Fragment key={index}>
                      <div className="font-medium text-[var(--color-black)]">
                        {labelRenderer(row)}
                      </div>
                      <div className="text-primary1 font-semibold break-words text-right">
                        {valueRenderer(row)}
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BarbershopProfilePage;
