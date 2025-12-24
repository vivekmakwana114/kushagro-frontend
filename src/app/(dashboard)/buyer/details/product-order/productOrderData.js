const productOrderData = [
  {
    id: 1,
    product_order_id: "#KSA23102456145258",
    product: {
      name: "Jersey Cow",
      category: "LiveStocks",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    seller: {
      name: "John Doe",
      email: "john.doe@example.com",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    date_time: "2025-08-05T10:20:30.000Z",
    amount: "160.32",
    status: "ongoing",
    actions: [
      { id: 1, action: "View Booking", url: "/users/1" },
      { id: 2, action: "Edit Booking", url: "/users/1/edit" },
      { id: 3, action: "Mark As Completed", url: "/users/1/complete" },
      { id: 4, action: "Flag Booking", url: "/users/1/flag" },
      { id: 5, action: "Download Invoice", url: "/users/1/download" },
    ],
  },
  {
    id: 2,
    product_order_id: "#KSA23102456145259",
    product: {
      name: "Chana Dal",
      category: "Cereals",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    seller: {
      name: "Jordan Lee",
      email: "jordan.lee@example.com",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    date_time: "2025-08-06T10:20:30.000Z",
    amount: "1620.14",
    status: "complete",
    actions: [
      { id: 1, action: "View Booking", url: "/users/1" },
      { id: 2, action: "Edit Booking", url: "/users/1/edit" },
      { id: 3, action: "Mark As Completed", url: "/users/1/complete" },
      { id: 4, action: "Flag Booking", url: "/users/1/flag" },
      { id: 5, action: "Download Invoice", url: "/users/1/download" },
    ],
  },
  {
    id: 3,
    product_order_id: "#KSA23102456145260",
    product: {
      name: "Ground Nuts",
      category: "Tropical",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    seller: {
      name: "DeShwan Miller",
      email: "deshwan.miller@example.com",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    date_time: "2025-08-07T10:20:30.000Z",
    amount: "168.74",
    status: "complete",
    actions: [
      { id: 1, action: "View Booking", url: "/users/1" },
      { id: 2, action: "Edit Booking", url: "/users/1/edit" },
      { id: 3, action: "Mark As Completed", url: "/users/1/complete" },
      { id: 4, action: "Flag Booking", url: "/users/1/flag" },
      { id: 5, action: "Download Invoice", url: "/users/1/download" },
    ],
  },
  {
    id: 4,
    product_order_id: "#KSA23102456145261",
    product: {
      name: "Mango",
      category: "Fruits and Vegetables",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    seller: {
      name: "Brielle Thomas",
      email: "brielle.thomas@example.com",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    date_time: "2025-08-08T10:20:30.000Z",
    amount: "160.25",
    status: "cancelled",
    actions: [
      { id: 1, action: "View Booking", url: "/users/1" },
      { id: 2, action: "Edit Booking", url: "/users/1/edit" },
      { id: 3, action: "Mark As Completed", url: "/users/1/complete" },
      { id: 4, action: "Flag Booking", url: "/users/1/flag" },
      { id: 5, action: "Download Invoice", url: "/users/1/download" },
    ],
  },
  {
    id: 5,
    product_order_id: "#KSA23102456145262",
    product: {
      name: "Jersey Cow",
      category: "LiveStocks",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    seller: {
      name: "Malik Carter",
      email: "malik.carter@example.com",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    date_time: "2025-08-09T10:20:30.000Z",
    amount: "180.56",
    status: "ongoing",
    actions: [
      { id: 1, action: "View Booking", url: "/users/1" },
      { id: 2, action: "Edit Booking", url: "/users/1/edit" },
      { id: 3, action: "Mark As Completed", url: "/users/1/complete" },
      { id: 4, action: "Flag Booking", url: "/users/1/flag" },
      { id: 5, action: "Download Invoice", url: "/users/1/download" },
    ],
  },
  {
    id: 6,
    product_order_id: "#KSA23102456145263",
    product: {
      name: "Chana Dal",
      category: "Cereals",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    seller: {
      name: "Jordan Lee",
      email: "jordan.lee@example.com",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    date_time: "2025-08-11T10:20:30.000Z",
    amount: "160.63",
    status: "complete",
    actions: [
      { id: 1, action: "View Booking", url: "/users/1" },
      { id: 2, action: "Edit Booking", url: "/users/1/edit" },
      { id: 3, action: "Mark As Completed", url: "/users/1/complete" },
      { id: 4, action: "Flag Booking", url: "/users/1/flag" },
      { id: 5, action: "Download Invoice", url: "/users/1/download" },
    ],
  },
  {
    id: 7,
    product_order_id: "#KSA23102456145264",
    product: {
      name: "Ground Nuts",
      category: "Tropical",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    seller: {
      name: "DeShwan Miller",
      email: "deshwan.miller@example.com",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    date_time: "2025-08-12T10:20:30.000Z",
    amount: "192.69",
    status: "complete",
    actions: [
      { id: 1, action: "View Booking", url: "/users/1" },
      { id: 2, action: "Edit Booking", url: "/users/1/edit" },
      { id: 3, action: "Mark As Completed", url: "/users/1/complete" },
      { id: 4, action: "Flag Booking", url: "/users/1/flag" },
      { id: 5, action: "Download Invoice", url: "/users/1/download" },
    ],
  },
  {
    id: 8,
    product_order_id: "#KSA23102456145265",
    product: {
      name: "Mango",
      category: "Fruits and Vegetables",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    seller: {
      name: "John Doe",
      email: "john.doe@example.com",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    date_time: "2025-08-13T10:20:30.000Z",
    amount: "210.47",
    status: "ongoing",
    actions: [
      { id: 1, action: "View Booking", url: "/users/1" },
      { id: 2, action: "Edit Booking", url: "/users/1/edit" },
      { id: 3, action: "Mark As Completed", url: "/users/1/complete" },
      { id: 4, action: "Flag Booking", url: "/users/1/flag" },
      { id: 5, action: "Download Invoice", url: "/users/1/download" },
    ],
  },
  {
    id: 9,
    product_order_id: "#KSA23102456145266",
    product: {
      name: "Jersey Cow",
      category: "LiveStocks",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    seller: {
      name: "Deshawn Miller",
      email: "deshawn.miller@example.com",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    date_time: "2025-08-14T10:20:30.000Z",
    amount: "216.32",
    status: "complete",
    actions: [
      { id: 1, action: "View Booking", url: "/users/1" },
      { id: 2, action: "Edit Booking", url: "/users/1/edit" },
      { id: 3, action: "Mark As Completed", url: "/users/1/complete" },
      { id: 4, action: "Flag Booking", url: "/users/1/flag" },
      { id: 5, action: "Download Invoice", url: "/users/1/download" },
    ],
  },
  {
    id: 10,
    product_order_id: "#KSA23102456145267",
    product: {
      name: "Jersey Cow",
      category: "LiveStocks",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    seller: {
      name: "Malik Carter",
      email: "malik.carter@example.com",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    date_time: "2025-08-15T10:20:30.000Z",
    amount: "216.47",
    status: "complete",
    actions: [
      { id: 1, action: "View Booking", url: "/users/1" },
      { id: 2, action: "Edit Booking", url: "/users/1/edit" },
      { id: 3, action: "Mark As Completed", url: "/users/1/complete" },
      { id: 4, action: "Flag Booking", url: "/users/1/flag" },
      { id: 5, action: "Download Invoice", url: "/users/1/download" },
    ],
  },
];

export default productOrderData;
