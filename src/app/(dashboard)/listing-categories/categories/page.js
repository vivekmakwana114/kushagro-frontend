"use client";
import React, { useEffect, useState, useRef } from "react";
import GridCommonComponent from "@/components/grid/gridCommonComponent";
import { Input } from "@/components/ui/input";
import { Download, Search } from "lucide-react";
import ActionComponent from "@/components/grid/actionComponent";
import CategoryForm from "./CategoryForm";
import Image from "next/image";
import { getCategoriesColumns } from "./categoriesColumn";
import CategoriesListPDFDocument from "./CategoriesListPDFDocument";

// import from redux store
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  createNewCategory,
  updateExistingCategory,
  removeCategory,
  updateExistingCategoryStatus,
} from "@/state/categories/categoriesSlice";
const options = {
  select: false,
  order: false,
  sortable: false,
};

const ListingCategoriesPage = () => {
  const dispatch = useDispatch();

  const { categories, totalPages, loading, success } = useSelector(
    (state) => state.categories,
  );

  const [searchTerm, setSearchTerm] = useState("");
  // const debouncedSearchTerm = useDebounce(searchTerm, 500); // Removed debounce
  const fetchedRef = useRef(false);

  useEffect(() => {
    // Fetch all categories (no pagination args)
    if (!fetchedRef.current) {
      dispatch(fetchCategories({}));
      fetchedRef.current = true;
    }
  }, [dispatch]);

  // Handlers
  const handleSearch = (e) => {
    setSearchTerm(e?.target?.value);
  };

  const handleCreateCategory = async (formData) => {
    await dispatch(createNewCategory(formData));
  };

  const handleUpdateCategory = async (id, formData) => {
    await dispatch(updateExistingCategory({ id, categoryData: formData }));
  };

  const handleStatusChange = async (id, status) => {
    await dispatch(updateExistingCategoryStatus({ id, status }));
  };

  const handleDeleteCategory = async (id) => {
    await dispatch(removeCategory({ id }));
  };

  // Client-side filtering
  const filteredCategories = React.useMemo(() => {
    let data = categories;
    if (searchTerm) {
      data = categories.filter((c) =>
        c.name?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }
    // Map data for grid
    return data.map((item) => ({
      ...item,
      productCount: item.productCount ?? "0", 
      name: item.name || "NA",
    }));
  }, [categories, searchTerm]);

  const handleDownloadPDF = async () => {
    const { pdf } = await import("@react-pdf/renderer");
    const blob = await pdf(
      <CategoriesListPDFDocument categories={filteredCategories} />,
    ).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "categories_list.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadCSV = () => {
    if (!filteredCategories.length) return;

    const headers = ["Category", "Created On", "Total Listings", "Status"];
    const csvRows = [headers.join(",")];

    filteredCategories.forEach((item) => {
      const row = [
        `"${item.name}"`,
        `"${new Date(item.createdAt).toLocaleDateString()}"`,
        item.productCount,
        item.status,
      ];
      csvRows.push(row.join(","));
    });

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "categories_list.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Pass handlers to columns
  const categoriesColumns = getCategoriesColumns({
    onEdit: handleUpdateCategory,
    onDelete: handleDeleteCategory,
    onStatusChange: handleStatusChange,
  });

  const downloadActions = [
    { header: "Download List" },
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
      onClick: handleDownloadPDF,
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
      onClick: handleDownloadCSV,
    },
  ];

  return (
    <div className="w-full md:h-[calc(100vh-9rem)] h-full flex flex-col">
      <div className="flex items-center justify-between gap-2 mb-4 w-full flex-none">
        <div className="relative flex-1 min-w-[150px] max-w-[400px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-dull-text" />
          <Input
            className="pl-10 h-10 w-full border border-(--border-admin) rounded-md"
            placeholder="Search here..."
            value={searchTerm}
            onChange={handleSearch}
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
                component: <CategoryForm onSubmit={handleCreateCategory} />,
              },
            ]}
            icon={
              <Image
                src="/icons/plusbutton.svg"
                alt="Create Category"
                width={18}
                height={18}
              />
            }
            text={<span className="hidden sm:inline">Add Category</span>}
            buttonClassName="flex items-center justify-center md:gap-2 bg-secondary1 text-white w-10 h-10 sm:w-auto sm:px-4 sm:py-2 rounded-md hover:bg-secondary1/80 cursor-pointer"
          />
        </div>
      </div>

      <div className="flex-1 min-h-0 relative">
        {loading && (
          <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-50">
            Data is loading...
          </div>
        )}

        <GridCommonComponent
          data={filteredCategories}
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
    </div>
  );
};

export default ListingCategoriesPage;
