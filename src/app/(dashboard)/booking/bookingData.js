export const bookingData = [
  {
    id: 1,
    booking_id: "#CIQSB1023102456145258",
    date_time: "2025-08-05T10:00:00Z",
    customer: {
      name: "John Doe",
      email: "john.doe@example.com",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    barber: "Aaliyah Johnson",
    service_name: "Beard Locs",
    amount: "160",
    status: "ongoing",
  },
  {
    id: 2,
    booking_id: "#CIQSB1023102456145259",
    date_time: "2025-08-05T13:30:00Z",
    customer: {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    barber: "Brandon Smith",
    service_name: "Starter Locs",
    amount: "140",
    status: "pending",
  },
  {
    id: 3,
    booking_id: "#CIQSB1023102456145260",
    date_time: "2025-08-06T09:15:00Z",
    customer: {
      name: "Mike Brown",
      email: "mike.brown@example.com",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    barber: "Cassandra Lee",
    service_name: "Hair Retwist",
    amount: "120",
    status: "upcoming",
  },
  {
    id: 4,
    booking_id: "#CIQSB1023102456145261",
    date_time: "2025-08-06T15:00:00Z",
    customer: {
      name: "Sarah Lee",
      email: "sarah.lee@example.com",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    barber: "Deniel Kim",
    service_name: "Loc Maintenance",
    amount: "180",
    status: "cancelled",
  },
  {
    id: 5,
    booking_id: "#CIQSB1023102456145262",
    date_time: "2025-08-07T11:45:00Z",
    customer: {
      name: "David Kim",
      email: "david.kim@example.com",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    barber: "Ella Rodriguez",
    service_name: "Scalp Treatment",
    amount: "70",
    status: "completed",
  },
];
