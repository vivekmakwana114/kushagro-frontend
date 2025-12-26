"use client";
import React, { useState } from "react";
import GridCommonComponent from "@/components/grid/gridCommonComponent";
import { offerData } from "./listingData";
import { getOfferColumns } from "./listingColumn";
import { Input } from "@/components/ui/input";
import { Download, Filter, Search } from "lucide-react";
import ActionComponent from "@/components/grid/actionComponent";
import DynamicForm from "@/components/modules/DynamicFormRendering";
import Image from "next/image";

import PopupForm from "@/components/ui/popupform";
import Pagination from "@/components/ui/pagination";
import { orderFilterConfig } from "./listingConfig";

const options = {
  select: false,
  order: false,
  sortable:false,
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
const ListingPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = offerData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(offerData.length / itemsPerPage);

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

  const offerColumns = getOfferColumns(handleDeleteOffer);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-2 mb-4 w-full">
        <div className="relative flex-1 min-w-[150px] max-w-[400px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-dull-text)]" />
          <Input
            className="pl-10 h-10 w-full border border-[var(--border-admin)] rounded-md"
            placeholder="Search here..."
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex gap-2">
          <ActionComponent
            actions={downloadActions}
            buttonClassName="inline-flex items-center justify-center p-2 border border-[var(--border-admin)] bg-white rounded-md hover:bg-gray-50"
            icon={
              <Download className="w-5 h-5 text-[var(--color-secondary1)]" />
            }
          />

          <ActionComponent
            actions={[
              {
                type: "sidebar",
                component: <DynamicForm config={orderFilterConfig} />,
              },
            ]}
            icon={<Filter className="w-5 h-5 text-[var(--color-secondary1)]" />}
            buttonClassName="inline-flex items-center justify-center p-2 border border-[var(--border-admin)] bg-white rounded-md hover:bg-gray-50"
          />
        </div>
         

        </div>
      </div>

      <div className="w-full">
        <GridCommonComponent
          data={[...currentData, ...createdOffers]}
          options={options}
          columns={offerColumns?.map((col) => {
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
                      <p className="text-[var(--color-placeholder-color)] text-sm">
                        The following {selectedBulkOffers.length} offer(s)
                        cannot be deleted because they already exist in the
                        system:
                      </p>
                      <ul className="list-disc list-inside text-[var(--color-red)] text-sm space-y-1 max-h-60 overflow-y-auto">
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

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default ListingPage;
