"use client";
import Image from "next/image";
export const HoursColumn_Data = [
  {
    id: 1,
    day: "Mon",
    time: "2025-08-05T10:00:00Z",
    style: {
      color: "text-[var(--color-primary1)]",
    },
  },
  {
    id: 2,
    day: "Tue",
    time: "2025-08-05T10:00:00Z",
  },
  {
    id: 3,
    day: "Wed",
    time: "2025-08-05T10:00:00Z",
  },
  {
    id: 4,
    day: "Thur",
    time: "2025-08-05T10:00:00Z",
  },
  {
    id: 5,
    day: "Fri",
    time: "2025-08-05T10:00:00Z",
  },
  {
    id: 6,
    day: "Sat",
    time: "2025-08-05T10:00:00Z",
  },
  {
    id: 7,
    day: "Sun",
    time: "2025-08-05T10:00:00Z",
  },
];

export const ContactColumn_Data = [
  { label: "Phone", value: "(404)555-0198" },
  { label: "Email", value: "hello@ciqempire.us" },
  {
    label: "Social Links",
    value: (
      <div className="flex items-center gap-3 -primary1 justify-end">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/assets/icon/instagram.svg"
            alt="Instagram"
            width={20}
            height={20}
          />
        </a>
        <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
          <Image
            src="/assets/icon/tiktok.svg"
            alt="Tiktok"
            width={20}
            height={20}
          />
        </a>
      </div>
    ),
  },
];
