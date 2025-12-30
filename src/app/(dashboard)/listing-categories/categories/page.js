"use client";
import React, { useState } from "react";
import GridCommonComponent from "@/components/grid/gridCommonComponent";
import { Input } from "@/components/ui/input";
import { Download, Search } from "lucide-react";
import ActionComponent from "@/components/grid/actionComponent";
import CategoryForm from "./CategoryForm";
import Image from "next/image";
import PopupForm from "@/components/ui/popupform";
import Pagination from "@/components/ui/pagination";
import { categoriesData } from "./categoriesData";
import { getCategoriesColumns } from "./categoriesColumn";

const options = {
  select: false,
  order: false,
  sortable: false,
};

const downloadActions = [
  {
    header: "Download List",
  },
  {
    label: "Download PDF",
    icon: (
      <Image
        src="/assets/icon/downloadpdf.svg"
        alt="downloadpdf"
        width={16}
        height={16}
      />
    ),
    onClick: () => console.log("Download PDF"),
  },
  {
    label: "Download CSV",
    icon: (
      <Image
        src="/assets/icon/downloadcsv.svg"
        alt="downloadcsv"
        width={16}
        height={16}
      />
    ),

    onClick: () => console.log("Download CSV"),
  },
];

const ListingCategoriesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = categoriesData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(categoriesData.length / itemsPerPage);

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showCannotDeletePopup, setShowCannotDeletePopup] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [createdOffers, setCreatedOffers] = useState([]);
  const [showBulkCannotDeletePopup, setShowBulkCannotDeletePopup] =
    useState(false);
  const [selectedBulkOffers, setSelectedBulkOffers] = useState([]);

  const handleCreateOffer = (formData) => {
    const transformedOffer = {
      id: Date.now(),
      offerName: formData.offerName || "",
      couponCode: formData.couponCode || "",
      usageLimit: formData.usageLimit || "",
      discount: formData.discount || "",
      maxDiscount: formData.maxDiscount || "",
      status: formData.status || "inactive",

      DateRange: {
        from: formData.DateRange_from,
        to: formData.DateRange_to,
      },

      "cart value": formData["cart value"] || "",

      description: formData.description || "",
    };

    setCreatedOffers((prev) => [...prev, transformedOffer]);
  };

  const handleDeleteOffer = (row) => {
    setSelectedOffer(row);
    setShowDeletePopup(true);
  };

  const categoriesColumns = getCategoriesColumns(handleDeleteOffer);

  return (
    <div className="w-full md:h-[calc(100vh-9rem)] h-full flex flex-col">
      <div className="flex items-center justify-between gap-2 mb-4 w-full flex-none">
        <div className="relative flex-1 min-w-[150px] max-w-[400px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-dull-text" />
          <Input
            className="pl-10 h-10 w-full border border-(--border-admin) rounded-md"
            placeholder="Search here..."
          />
        </div>

        <div className="flex items-center gap-2">
          <ActionComponent
            actions={downloadActions}
            buttonClassName="inline-flex items-center justify-center p-2 border border-[var(--border-admin)] bg-white rounded-md hover:bg-gray-50"
            icon={<Download className="w-5 h-5 text-secondary1" />}
          />
          <ActionComponent
            actions={[
              {
                type: "sidebar",
                component: <CategoryForm />,
              },
            ]}
            icon={
              <Image
                src="/icons/plusbutton.svg"
                alt="Create Offer"
                width={18}
                height={18}
              />
            }
            text={<span className="hidden sm:inline">Add Category</span>}
            buttonClassName="flex items-center justify-center md:gap-2 bg-secondary1 text-white w-10 h-10 sm:w-auto sm:px-4 sm:py-2 rounded-md hover:bg-secondary1/80 cursor-pointer"
          />
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <GridCommonComponent
          data={[...currentData, ...createdOffers]}
          options={options}
          columns={categoriesColumns?.map((col) => {
            if (col.key === "actions") {
              return {
                ...col,
                component: {
                  ...col.component,
                  options: {
                    ...col.component.options,
                    actions: (row) => col.component.options.actions(row),
                  },
                },
              };
            }
            return col;
          })}
          theme={{
            border: "var(--border-admin)",
            header: {
              bg: "bg-[var(--color-background)]",
            },
          }}
        />
      </div>

      {/* Single Delete Popup */}
      {showDeletePopup && selectedOffer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setShowDeletePopup(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <PopupForm
              config={DeleteOfferConfig}
              width="600px"
              onApply={() => {
                const offerName = selectedOffer?.offerName
                  ?.trim()
                  ?.toLowerCase();
                const offerExists = offerData?.some(
                  (offer) =>
                    offer.offerName?.trim()?.toLowerCase() === offerName
                );

                if (offerExists) {
                  setShowDeletePopup(false);
                  setShowCannotDeletePopup(true);
                } else {
                  setShowDeletePopup(false);
                }
              }}
              onCancel={() => setShowDeletePopup(false)}
            />
          </div>
        </div>
      )}

      {/* Cannot Delete Single Offer Popup */}
      {showCannotDeletePopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setShowCannotDeletePopup(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <PopupForm
              config={cannotDeleteOfferConfig}
              width="500px"
              onApply={() => setShowCannotDeletePopup(false)}
              onCancel={() => setShowCannotDeletePopup(false)}
            />
          </div>
        </div>
      )}

      {/* Cannot Delete Bulk Offers Popup */}
      {showBulkCannotDeletePopup && selectedBulkOffers?.length > 0 && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setShowBulkCannotDeletePopup(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <PopupForm
              config={{
                ...cannotDeleteOfferConfigAll,
                body: {
                  ...cannotDeleteOfferConfigAll.body,
                  content: (
                    <div className="space-y-3">
                      <p className="text-placeholder-color text-sm">
                        The following {selectedBulkOffers.length} offer(s)
                        cannot be deleted because they already exist in the
                        system:
                      </p>
                      <ul className="list-disc list-inside text-red text-sm space-y-1 max-h-60 overflow-y-auto">
                        {selectedBulkOffers.map((offer, i) => (
                          <li key={i}>{offer.offerName || "Unnamed Offer"}</li>
                        ))}
                      </ul>
                    </div>
                  ),
                },
              }}
              width="500px"
              onApply={() => {
                setShowBulkCannotDeletePopup(false);
                setSelectedBulkOffers([]);
              }}
              onCancel={() => {
                setShowBulkCannotDeletePopup(false);
                setSelectedBulkOffers([]);
              }}
            />
          </div>
        </div>
      )}

      <div className="flex-none mt-2">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default ListingCategoriesPage;
