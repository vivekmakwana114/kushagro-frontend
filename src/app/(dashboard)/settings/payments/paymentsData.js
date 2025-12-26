import Image from "next/image";
import React from "react";

export const initialPaymentsData = [
  {
    id: "paystack",
    name: "PayStack",
    // We can render the logo as a component property
    logo: (
      <div className="flex items-center gap-2 text-xl">
        <Image
          src="/assets/logo/paystack.svg"
          alt="PayStack"
          width={40}
          height={40}
        />{" "}
        PayStack
      </div>
    ),
    description:
      "Accept payments via PayStack to process credit cards, debit cards, and other payment methods.",
    connected: true,
    liveMode: true,
  },
  {
    id: "momo",
    name: "MOMO",
    logo: (
      <div className="flex items-center gap-2 text-xl">
        <div className="flex items-center gap-2 text-xl">
          <Image
            src="/assets/logo/momo.svg"
            alt="MOMO"
            width={40}
            height={40}
          />{" "}
          MOMO
        </div>
      </div>
    ),
    description:
      "Enable MOMO to allow customers to quickly book services using their Apple Wallet.",
    connected: false,
    liveMode: false,
  },
];
