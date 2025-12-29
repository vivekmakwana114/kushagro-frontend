// import Image from "next/image";

// export const renderIcon = (n) => {
//   const baseStyle =
//     "w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center bg-gray-50 overflow-hidden shrink-0"; // Ensure shrink-0 to prevent icon squishing

//   switch (n.type) {
//     case "booking":
//       return (
//         <div className={baseStyle}>
//           <Image
//             src="/assets/icon/notification_booking.svg"
//             alt="Booking"
//             width={20}
//             height={20}
//           />
//         </div>
//       );
//     case "client":
//       const initials = n.name
//         ? n.name
//             .split(" ")
//             .map((p) => p[0])
//             .join("")
//             .toUpperCase()
//         : "N/A";
//       return (
//         <div className={`${baseStyle} bg-primary1 text-white font-bold`}>
//           {initials}
//         </div>
//       );
//     case "payment":
//       return (
//         <div className={baseStyle}>
//           <Image
//             src="/assets/icon/notification_payment.svg"
//             alt="Payment"
//             width={24}
//             height={24}
//           />
//         </div>
//       );
//     case "review":
//       return (
//         <div className={baseStyle}>
//           <Image
//             src="/assets/icon/notification_review.svg"
//             alt="review"
//             width={20}
//             height={20}
//           />
//         </div>
//       );
//     case "cancelled":
//       return (
//         <div className={baseStyle}>
//           <Image
//             src="/assets/icon/notification_booking_cancelled.svg"
//             alt="Booking Cancelled"
//             width={20}
//             height={20}
//           />
//         </div>
//       );
//     case "product":
//       return (
//         <div className={baseStyle}>
//           <Image
//             src={n.image}
//             alt="Product"
//             width={40}
//             height={40}
//             className="object-cover rounded-md"
//           />
//         </div>
//       );
//     default:
//       return null;
//   }
// };

// export const BarberActivityData = [
//   {
//     id: 1,
//     activity: {
//       type: "booking",
//       name: "Aaliyah Johnson",
//       title: "New Appointment Booked",
//       description:
//         "Aaliyah Johnson booked by Tyrone Hill for June 15 at 2:00 PM.",
//       time: "2m ago",
//     },
//   },
//   {
//     id: 2,
//     activity: {
//       type: "client",
//       name: "Vivek Makwana",
//       title: "New Client Registered",
//       description: "Vivek Makwana (vivek.makwana@gmail.com) just signed up.",
//       time: "5m ago",
//     },
//   },
//   {
//     id: 3,
//     activity: {
//       type: "payment",
//       title: "Payment Received",
//       description:
//         "$1,200 received for Booking #BK2308 (Aaliyah Johnson – Tyrone Hill).",
//       time: "1h ago",
//     },
//   },
//   {
//     id: 4,
//     activity: {
//       type: "product",
//       title: "Product Order Placed",
//       description: "Malik Carter ordered “Herbal Scalp Oil” – Order #LOC2048.",
//       image: "/assets/icon/notification_product.svg",
//       time: "2h ago",
//     },
//   },
//   {
//     id: 5,
//     activity: {
//       type: "review",
//       title: "Review Received",
//       description: "“Excellent service!” (5★) review for Brielle Thomas.",
//       time: "3h ago",
//     },
//   },
//   {
//     id: 6,
//     activity: {
//       type: "cancelled",
//       title: "Appointment Canceled",
//       description:
//         "Booking cancelled by Client Nia Banks (Stylist: DeShawn Miller).",
//       time: "3h 25m ago",
//     },
//   },
//   {
//     id: 7,
//     activity: {
//       type: "cancelled",
//       title: "Appointment Canceled",
//       description:
//         "Booking cancelled by Client Nia Banks (Stylist: DeShawn Miller).",
//       time: "3h 25m ago",
//     },
//   },
//   {
//     id: 8,
//     activity: {
//       type: "cancelled",
//       title: "Appointment Canceled",
//       description:
//         "Booking cancelled by Client Nia Banks (Stylist: DeShawn Miller).",
//       time: "3h 25m ago",
//     },
//   },
//   {
//     id: 9,
//     activity: {
//       type: "cancelled",
//       title: "Appointment Canceled",
//       description:
//         "Booking cancelled by Client Nia Banks (Stylist: DeShawn Miller).",
//       time: "3h 25m ago",
//     },
//   },
// ];

// export const barberActivityColumns = [
//   {
//     key: "activity",
//     title: "Activity",
//     isPrimary: true,
//     isObject: true,
//     sortable: true,
//     render: (value) => {
//       // value contains the activity object { type, title, description, time, ... }
//       return (
//         <div className="flex items-start space-x-3">
//           {renderIcon(value)}
//           <div className="flex flex-col">
//             <span className="text-sm font-medium line-clamp-2">
//               {value.description}
//             </span>
//             <span className="text-xs text-[var(--color-placeholder-color)] mt-1">
//               {value.time}
//             </span>
//           </div>
//         </div>
//       );
//     },
//     nonExpandable: true,
//   },
// ];
