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
  deleteFraudReports,
} from "@/state/fraudReport/fraudReportSlice";
import { toast } from "sonner";

const options = {
  select: true,
  order: false,
  sortable: false,
};
const FraudReportPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const { reports, loading, totalPages } = useSelector(
    (state) => state.fraudReport,
  );

  useEffect(() => {
    dispatch(fetchAllFraudReports({ page: 1, limit: 10 }));
  }, [dispatch]);

  const handleDelete = useCallback(
    async (id) => {
      try {
        await dispatch(deleteFraudReports([id])).unwrap();
        toast.success("Fraud report deleted successfully");
        // refresh
        dispatch(
          fetchAllFraudReports({
            page: currentPage,
            limit: 10,
          }),
        );
      } catch (error) {
        toast.error("Failed to delete fraud report");
      }
    },
    [dispatch, currentPage],
  );

  const handleBulkDelete = useCallback(
    async (data, rows) => {
      const ids = rows.map((row) => row._id || row.id);
      if (ids.length === 0) {
        toast.error("No items selected");
        return;
      }

      try {
        await dispatch(deleteFraudReports(ids)).unwrap();
        toast.success("Fraud reports deleted successfully");
        // Refresh to ensure pagination sync
        dispatch(
          fetchAllFraudReports({
            page: currentPage,
            limit: 10,
          }),
        );
      } catch (error) {
        toast.error("Failed to delete fraud reports");
      }
    },
    [dispatch, currentPage],
  );

  const columns = useMemo(
    () => getFraudReportColumns({ onDelete: handleDelete }),
    [handleDelete],
  );

  // Filter fraud reports client-side
  const filteredReports = useMemo(() => {
    if (!reports) return [];

    let result = Array.isArray(reports) ? reports : [];

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter((report) => {
        const reportId = (report._id || report.id || "")
          .toString()
          .toLowerCase();

        // Handle potentially populated fields or IDs
        const reportedUser = report.reportedId;
        const reportedByName = (
          typeof reportedUser === "object"
            ? reportedUser?.name
            : reportedUser || ""
        ).toLowerCase();

        const reporterUser = report.reporterId;
        const reporterByName = (
          typeof reporterUser === "object"
            ? reporterUser?.name
            : reporterUser || ""
        ).toLowerCase();

        const reason = (
          Array.isArray(report.reason) ? report.reason[0] : report.reason || ""
        ).toLowerCase();

        return (
          reportId.includes(lowerQuery) ||
          reportedByName.includes(lowerQuery) ||
          reporterByName.includes(lowerQuery) ||
          reason.includes(lowerQuery)
        );
      });
    }

    return result.map((report) => ({
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
    }));
  }, [reports, searchQuery]);

  const currentData = filteredReports;

  // Reset to first page when search query changes
  useEffect(() => {
    setCurrentPage(1);
    // Ideally dispatch search to server here if supported
  }, [searchQuery]);

  return (
    <div className="w-full md:h-[calc(100vh-9rem)] h-full flex flex-col">
      <div className="flex items-center justify-between gap-2 mb-4 w-full flex-none">
        <div className="relative flex-1 min-w-[150px] max-w-[400px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-dull-text" />
          <Input
            className="pl-10 h-10 w-full border border-(--border-admin) rounded-md"
            placeholder="Search here..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
              onApply: handleBulkDelete,
            },
          ]}
        />
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => {
          setCurrentPage(page);
          dispatch(fetchAllFraudReports({ page, limit: 10 }));
        }}
      />
    </div>
  );
};

export default FraudReportPage;
