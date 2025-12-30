"use client";
import React from "react";
import Charts from "@/components/charts/Charts";
import PortfolioCard from "@/components/common/PortfolioCard";
import OrderSection from "./order/OrderSection";
import { AdminPortfolioData } from "@/config/portfolioCardConfig";
import {
  orderColumns,
  paymentColumns,
} from "./order/OrderColumn";
import { orderData, paymentData } from "./order/OrderData";
import ListingSection from "./listing/ListingSection";
import { listingData, verfiactionData } from "./listing/listingData";
import { listingColumns, verificationColumns } from "./listing/listingColumn";

const DashboardView = () => {
  return (
    <div className="flex flex-col gap-[16px] ">
      <div>
        <PortfolioCard data={AdminPortfolioData} />
      </div>

      <Charts />

      <div className="flex flex-col lg:flex-row gap-2">
        <div className="lg:w-[60%] w-full">
          <OrderSection
            title="Recent Orders"
            data={orderData}
            columns={orderColumns}
            link="/order"
          />
        </div>
        <div className="lg:w-[40%] w-full">
          <ListingSection
            title="Listing by Category"
            data={listingData}
            columns = {listingColumns}
            link="/listing-categories"
          />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-2">
        <div className="lg:w-[60%] w-full">
          <OrderSection
            title="Recent Payments"
            data={paymentData}
            columns={paymentColumns}
            link="/payment-and-payouts/all-transaction"
          />
        </div>
        <div className="lg:w-[40%] w-full">
          <ListingSection
            title="Pending Seller Verification"
            data={verfiactionData}
            columns = {verificationColumns}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
