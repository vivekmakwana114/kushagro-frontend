"use client";

import React, { useEffect, useState } from "react";
import Charts from "@/components/charts/Charts";
import PortfolioCard from "@/components/common/PortfolioCard";
import OrderSection from "./order/OrderSection";
import ListingSection from "./listing/ListingSection";

import {
  orderColumns,
  paymentColumns,
} from "./order/OrderColumn";

import {
  listingColumns,
  getVerificationColumns,
} from "./listing/listingColumn";

import {
  getDashboardStats,
  getRecentOrders,
  getRecentPayments,
  getTopCategories,
  getRevenueReport,
  getOrderStatusStats,
  getPendingSellers,
  verifySeller,
} from "@/state/dashboard/dashboardService";

const DashboardView = () => {
  const [portfolioData, setPortfolioData] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [recentPayments, setRecentPayments] = useState([]);
  const [topCategories, setTopCategories] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [orderStatusData, setOrderStatusData] = useState([]);
  const [pendingSellers, setPendingSellers] = useState([]);
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [isLoadingPayments, setIsLoadingPayments] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getDashboardStats();
        if (response?.success && response?.data) {
          const stats = response.data;

          setPortfolioData([
            {
              color: "bg-primary1",
              head: "Total Buyers",
              total: stats.buyers.total.toLocaleString(),
              upCount: stats.buyers.growth.toFixed(2),
              MainIcon: "/assets/card/customer.svg",
              description: `+${stats.buyers.thisMonth} New Buyers this month`,
            },
            {
              color: "bg-secondary1",
              head: "Total Sellers",
              total: stats.sellers.total.toLocaleString(),
              upCount: stats.sellers.growth.toFixed(2),
              MainIcon: "/assets/card/scissors.svg",
              description: `+${stats.sellers.thisMonth} New Sellers this month`,
            },
            {
              color: "bg-tertiary1",
              head: "Total Orders",
              total: stats.orders.total.toLocaleString(),
              upCount: stats.orders.growth.toFixed(2),
              MainIcon: "/assets/card/barbershop.svg",
              description: `+${stats.orders.thisMonth} Orders this month`,
            },
            {
              color: "bg-quaternary1",
              head: "Total Listings",
              total: stats.listings.total.toLocaleString(),
              upCount: stats.listings.growth.toFixed(2),
              MainIcon: "/assets/card/booking.svg",
              description: `+${stats.listings.thisMonth} Listings this month`,
            },
            {
              color: "bg-quinary1",
              head: "Total Revenue",
              total: `$${stats.revenue.total.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`,
              upCount: stats.revenue.growth.toFixed(2),
              MainIcon: "/assets/card/revenue.svg",
              description: `+$${stats.revenue.thisMonth.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })} Revenue this month`,
            },
          ]);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      }
    };

    const fetchRecentOrders = async () => {
      setIsLoadingOrders(true);
      try {
        const response = await getRecentOrders();
        if (response?.success && response?.data) {
          setRecentOrders(
            response.data.map((order) => ({
              orderId: order.orderNumber,
              buyer: {
                name: order.buyerId?.name || "N/A",
                email: order.buyerId?.email || "",
                profile: order.buyerId?.profile || "",
              },
              seller: {
                name: order.sellerId?.name || "N/A",
                email: order.sellerId?.email || "",
                profile: order.sellerId?.profile || "",
              },
              amount: order.totalAmount,
              date: order.createdAt,
              status: order.status.toLowerCase(),
            }))
          );
        }
      } catch (error) {
        console.error("Failed to fetch recent orders", error);
      } finally {
        setIsLoadingOrders(false);
      }
    };

    const fetchRecentPayments = async () => {
      setIsLoadingPayments(true);
      try {
        const response = await getRecentPayments();
        if (response?.success && response?.data) {
          setRecentPayments(
            response.data.map((payment) => ({
              transactionId: payment.reference,
              seller: {
                name: payment.sellerId?.name || "N/A",
                email: payment.sellerId?.email || "",
                profile: payment.sellerId?.profile || "",
              },
              method: payment.method,
              amount: payment.amount,
              date: payment.createdAt,
              status: payment.status.toLowerCase(),
            }))
          );
        }
      } catch (error) {
        console.error("Failed to fetch recent payments", error);
      } finally {
        setIsLoadingPayments(false);
      }
    };

    const fetchTopCategories = async () => {
      try {
        const response = await getTopCategories();
        if (response?.success && response?.data) {
          setTopCategories(
            response.data.map((cat) => ({
              category: cat.categoryName,
              currentListings: cat.currentListings,
            }))
          );
        }
      } catch (error) {
        console.error("Failed to fetch top categories", error);
      }
    };

    const fetchOrderStatusStats = async () => {
      try {
        const response = await getOrderStatusStats();
        if (response?.success && response?.data) {
          setOrderStatusData([
            { name: "Completed", value: response.data.completed, color: "#2E5B20" },
            { name: "Pending", value: response.data.pending, color: "#FFBE00" },
          ]);
        }
      } catch (error) {
        console.error("Failed to fetch order status stats", error);
      }
    };

    const fetchPendingSellers = async () => {
      try {
        const response = await getPendingSellers();
        if (response?.success && response?.data) {
          const mappedSellers = response.data.map((seller) => ({
            sellerId: seller.id,
            seller: {
              name: seller.name,
              email: seller.email,
              profile: seller.profile,
            },
            id: seller.governmentId,
          }));
          setPendingSellers(mappedSellers);
        }
      } catch (error) {
        console.error("Failed to fetch pending sellers", error);
      }
    };

    fetchStats();
    fetchRecentOrders();
    fetchRecentPayments();
    fetchTopCategories();
    fetchOrderStatusStats();
    fetchPendingSellers();
  }, []);

  const handleApproveSeller = async (row) => {
    try {
      await verifySeller(row.sellerId, { status: "APPROVED" });
      // Refresh list
      const response = await getPendingSellers();
      if (response?.success && response?.data) {
        setPendingSellers(
          response.data.map((seller) => ({
            sellerId: seller.id,
            seller: {
              name: seller.name,
              email: seller.email,
              profile: seller.profile,
            },
            id: seller.governmentId,
          }))
        );
      }
    } catch (error) {
      console.error("Failed to approve seller", error);
    }
  };

  const handleRejectSeller = async (row, data) => {
    try {
      const reason = data.value;

      await verifySeller(row.sellerId, {
        status: "REJECTED",
        reasons: [reason]
      });

      const response = await getPendingSellers();
      if (response?.success && response?.data) {
        setPendingSellers(
          response.data.map((seller) => ({
            sellerId: seller.id,
            seller: {
              name: seller.name,
              email: seller.email,
              profile: seller.profile,
            },
            id: seller.governmentId,
          }))
        );
      }
    } catch (error) {
      console.error("Failed to reject seller", error);
    }
  };

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const response = await getRevenueReport(selectedYear);
        if (response?.success && response?.data) {
          setRevenueData(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch revenue report", error);
      }
    };

    fetchRevenue();
  }, [selectedYear]);

  return (
    <div className="flex flex-col gap-4">
      <PortfolioCard data={portfolioData} />

      <Charts
        revenueData={revenueData}
        orderStatusData={orderStatusData}
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
      />

      <div className="flex flex-col lg:flex-row gap-2">
        <div className="lg:w-[60%] w-full">
          <OrderSection
            title="Recent Orders"
            data={recentOrders}
            columns={orderColumns}
            link="/order"
            loading={isLoadingOrders}
          />
        </div>

        <div className="lg:w-[40%] w-full">
          <ListingSection
            title="Top Categories"
            data={topCategories}
            columns={listingColumns}
            link="/listing-categories"
          />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-2">
        <div className="lg:w-[60%] w-full">
          <OrderSection
            title="Recent Payments"
            data={recentPayments}
            columns={paymentColumns}
            link="/payment-and-payouts/all-transaction"
            loading={isLoadingPayments}
          />
        </div>

        <div className="lg:w-[40%] w-full">
          <ListingSection
            title="Pending Seller Verification"
            data={pendingSellers}
            columns={getVerificationColumns(handleApproveSeller, handleRejectSeller)}
            link=""
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
