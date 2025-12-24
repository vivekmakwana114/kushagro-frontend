import Image from "next/image";
import React from "react";

export const initialPaymentsData = [
  {
    id: "stripe",
    name: "Stripe",
    // We can render the logo as a component property
    logo: (
      <div className="flex items-center gap-2 text-xl">
        <Image
          src="/assets/logo/stripe.svg"
          alt="Stripe"
          width={40}
          height={40}
        />{" "}
        Stripe
      </div>
    ),
    description:
      "Accept payments via Stripe to process credit cards, debit cards, and other payment methods.",
    connected: true,
    liveMode: true,
  },
  {
    id: "apple_pay",
    name: "Apple Pay",
    logo: (
      <div className="flex items-center gap-2 text-xl">
        <div className="flex items-center gap-2 text-xl">
          <Image
            src="/assets/logo/applepay.svg"
            alt="Apple Pay"
            width={40}
            height={40}
          />{" "}
          Apple Pay
        </div>
      </div>
    ),
    description:
      "Enable Apple Pay to allow customers to quickly book services using their Apple Wallet.",
    connected: false,
    liveMode: false,
  },
];
