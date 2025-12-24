"use client";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ToggleSwitch } from "@/components/ui/toggle";
import { initialPaymentsData } from "./paymentsData";

// Reusable Payment Card Component
const PaymentCard = ({ data, onToggleConnect, onToggleLive }) => {
  return (
    <Card className="border border-[var(--border-admin)] shadow-sm w-full md:w-[350px] h-[250px] flex flex-col shrink-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          {data.logo}
        </CardTitle>
        <CardDescription className="pt-2 text-sm text-[var(--color-dull-text)] leading-relaxed line-clamp-2">
          {data.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex items-center justify-between border-t border-[var(--border-admin)] pt-4 mt-auto">
        <Button
          variant={data.connected ? "outline" : "default"}
          onClick={() => onToggleConnect(data.id)}
          className={`min-w-[110px] ${
            data.connected
              ? "border border-[var(--border-admin)] text-black bg-white hover:bg-gray-50"
              : "bg-[#1F1F1F] text-white hover:bg-[#1F1F1F]/90"
          }`}
        >
          {data.connected ? "Connected" : "Connect"}
        </Button>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[var(--color-dull-text)]">
            Live Mode
          </span>
          <ToggleSwitch
            checked={data.liveMode}
            onChange={(e) => onToggleLive(data.id, e.target.checked)}
          />
        </div>
      </CardFooter>
    </Card>
  );
};

const PaymentsPage = () => {
  const [payments, setPayments] = useState(initialPaymentsData);

  const handleToggleConnect = (id) => {
    setPayments((prev) =>
      prev.map((payment) => {
        if (payment.id === id) {
          const newStatus = !payment.connected;
          console.log(`${payment.name} Connected:`, newStatus);
          return { ...payment, connected: newStatus };
        }
        return payment;
      })
    );
  };

  const handleToggleLive = (id, isChecked) => {
    setPayments((prev) =>
      prev.map((payment) => {
        if (payment.id === id) {
          console.log(`${payment.name} Live Mode:`, isChecked);
          return { ...payment, liveMode: isChecked };
        }
        return payment;
      })
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Payment Gateway Configuration</h2>

      <div className="flex flex-wrap gap-4">
        {payments.map((payment) => (
          <PaymentCard
            key={payment.id}
            data={payment}
            onToggleConnect={handleToggleConnect}
            onToggleLive={handleToggleLive}
          />
        ))}
      </div>
    </div>
  );
};

export default PaymentsPage;
