"use client";
import GridCommonComponent from "@/components/grid/gridCommonComponent";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { getFraudReportColumns } from "./fraudReportColumns";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Pagination from "@/components/ui/pagination";
import ActionPopup from "@/components/common/ActionPopup";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFraudReports,
  deleteFraudReport,
} from "@/state/fraudReport/fraudReportSlice";
import { toast } from "sonner";

const options = {
  select: true,
  order: false,
  sortable: false,
};
const FraudReportPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const { reports, loading } = useSelector((state) => state.fraudReport);

  useEffect(() => {
    dispatch(fetchAllFraudReports());
  }, [dispatch]);

  const handleDelete = useCallback(
    async (id) => {
      try {
        await dispatch(deleteFraudReport(id)).unwrap();
        toast.success("Fraud report deleted successfully");
      } catch (error) {
        toast.error("Failed to delete fraud report");
      }
    },
    [dispatch],
  );

  const columns = useMemo(
    () => getFraudReportColumns({ onDelete: handleDelete }),
    [handleDelete],
  );

  const itemsPerPage = 10;
  const indexofLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexofLastItem - itemsPerPage;

  const currentData = (Array.isArray(reports) ? reports : [])
    .map((report) => ({
      ...report,
      report_id: report._id || report.id || "N/A",
      reported_user: report.reportedId || {
        name: "N/A",
        email: "N/A",
        profile: "",
      },
      reported_by: report.reporterId || {
        name: "N/A",
        email: "N/A",
        profile: "",
      },
      reason: Array.isArray(report.reason)
        ? report.reason[0]
        : report.reason || "N/A",
      reported_on: report.createdAt,
    }))
    .slice(indexOfFirstItem, indexofLastItem);

  const totalPages = Math.ceil((reports?.length || 0) / itemsPerPage);

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
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar">
        <GridCommonComponent
          data={currentData}
          options={options}
          columns={columns}
          loading={loading}
          theme={{
            border: "border-gray-300",
            header: {
              bg: "bg-gray-100",
            },
          }}
          bulkActionsConfig={[
            {
              label: "Delete Ticket",
              iconUrl: "/assets/icon/deleteBarbershop.svg",
              type: "modal_component",
              component: (
                <ActionPopup
                  heading="Delete Fraud Ticket?"
                  subHeading="Are you sure you want to delete this fraud ticket? Once deleted, this ticket will be removed from the panel and will no longer be visible to admin."
                  confirmText="Confirm Delete"
                  confirmColor="red"
                />
              ),
              onApply: (data) => console.log("Delete:", data),
            },
          ]}
        />
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => {
          setCurrentPage(page);
        }}
      />
    </div>
  );
};

export default FraudReportPage;
