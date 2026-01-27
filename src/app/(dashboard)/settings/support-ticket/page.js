"use client";
import GridCommonComponent from "@/components/grid/gridCommonComponent";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { getSupportTicketColumns } from "./supportTicketColumns";
import ActionComponent from "@/components/grid/actionComponent";
import SupportTicketFilterForm from "./SupportTicketFilterForm";
import { Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Pagination from "@/components/ui/pagination";
import ActionPopup from "@/components/common/ActionPopup";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSupportTickets,
  updateTicketStatus,
  deleteTicket,
} from "@/state/setting/support-ticket/supportTicketSlice";
import { toast } from "sonner";

const options = {
  select: true,
  order: false,
  sortable: false,
};
const SupportTicketPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const { supportTickets, isLoading } = useSelector(
    (state) => state.supportTicket,
  );

  // Initial fetch
  useEffect(() => {
    dispatch(fetchSupportTickets());
  }, [dispatch]);

  const itemsPerPage = 10;

  // Filter support tickets client-side
  const filteredTickets = useMemo(() => {
    if (!supportTickets) return [];

    let result = Array.isArray(supportTickets) ? supportTickets : [];

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter((ticket) => {
        const ticketId = (ticket.ticketId || ticket._id || "")
          .toString()
          .toLowerCase();
        const subject = (ticket.topic || "").toLowerCase();
        const userName = (
          typeof ticket.user === "object"
            ? ticket.user?.name
            : ticket.user || ""
        ).toLowerCase();
        const status = (ticket.status || "").toLowerCase();

        return (
          ticketId.includes(lowerQuery) ||
          subject.includes(lowerQuery) ||
          userName.includes(lowerQuery) ||
          status.includes(lowerQuery)
        );
      });
    }

    return result.map((ticket) => ({
      ...ticket,
      ticket_id: ticket.ticketId || ticket._id || "N/A",
      subject: ticket.subject || ticket.topic || "N/A",
      date_time: ticket.raisedOn,
      user:
        typeof ticket.user === "object"
          ? ticket.user
          : { name: ticket.user || "N/A", email: "N/A", profile: "" },
      status:
        ticket.status && ticket.status.toUpperCase() === "IN_PROGRESS"
          ? "inprocess"
          : ticket.status
            ? ticket.status.toLowerCase()
            : "open",
    }));
  }, [supportTickets, searchQuery]);

  const indexofLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexofLastItem - itemsPerPage;
  const currentData = filteredTickets.slice(indexOfFirstItem, indexofLastItem);

  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);

  // Reset to first page when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handleDelete = useCallback(
    async (id) => {
      try {
        await dispatch(deleteTicket(id)).unwrap();
        toast.success("Ticket deleted successfully");
        dispatch(fetchSupportTickets());
      } catch (error) {
        toast.error("Failed to delete ticket");
      }
    },
    [dispatch],
  );

  const handleStatusUpdate = useCallback(
    async (id, status) => {
      let apiStatus = status.toUpperCase();
      if (status === "inprocess") apiStatus = "IN_PROGRESS";

      try {
        await dispatch(
          updateTicketStatus({ id, data: { status: apiStatus } }),
        ).unwrap();
        toast.success("Ticket status updated successfully");
      } catch (error) {
        toast.error("Failed to update status");
      }
    },
    [dispatch],
  );

  const columns = useMemo(
    () =>
      getSupportTicketColumns({
        onDelete: handleDelete,
        onStatusUpdate: handleStatusUpdate,
      }),
    [handleDelete, handleStatusUpdate],
  );

  const handleFilterApply = (filterData) => {
    const params = {};
    if (
      filterData.status &&
      filterData.status.length > 0 &&
      !filterData.status.includes("all")
    ) {
      params.status = filterData.status[0];
    }

    const formatDate = (date) => {
      if (!date) return undefined;
      const d = new Date(date);
      return d.toISOString().split("T")[0];
    };

    if (filterData.dateRange?.from)
      params.fromDate = formatDate(filterData.dateRange.from);
    if (filterData.dateRange?.to)
      params.toDate = formatDate(filterData.dateRange.to);

    dispatch(fetchSupportTickets(params));
  };

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
        <div className="flex items-center gap-2">
          <ActionComponent
            actions={[
              {
                type: "sidebar",
                component: (
                  <SupportTicketFilterForm onApply={handleFilterApply} />
                ),
              },
            ]}
            icon={<Filter className="w-4 h-4 text-secondary1" />}
            buttonClassName="flex items-center justify-center w-10 h-10 sm:w-auto sm:px-3 sm:py-2 border border-secondary1 bg-white rounded-md shadow-sm hover:bg-gray-50"
          />
        </div>
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar">
        <GridCommonComponent
          data={currentData}
          options={options}
          columns={columns}
          loading={isLoading}
          theme={{
            border: "border-(--border-admin)",
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
                  heading="Delete Selected Tickets?"
                  subHeading="Are you sure you want to delete these tickets?"
                  confirmText="Delete All"
                  confirmColor="red"
                />
              ),
              onApply: console.log("Delete Ticket"),
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

export default SupportTicketPage;
