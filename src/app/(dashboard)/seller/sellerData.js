export const sellerData = [
  {
    id: 1,
    seller: {
      name: "John Doe",
      email: "john.doe@example.com",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    phone: "+1-123-456-7890",
    joined_on: "2021-06-15T10:20:30.000Z",
    total_listing: 54,
    total_order: 10,
    total_earning: 1000,
    // avg_rating: 4.8,
    id_status: "verified",
    status: "active",
    actions: [
      { id: 1, action: "View Profile", url: "/users/1" },
      { id: 2, action: "Edit Profile", url: "/users/1/edit" },
      { id: 3, action: "Delete Profile", url: "/users/1/delete" },
    ],
    created_at: "2021-06-15T10:20:30.000Z",
    updated_at: "2023-10-01T08:00:00.000Z",
  },
  {
    id: 2,
   seller: {
      name: "John Doe",
      email: "john.doe@example.com",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    phone: "+1-098-765-4321",
    joined_on: "2020-03-20T14:00:00.000Z",
    total_listing: 5,
    total_order: 10,
    total_earning: 500,
    id_status: "pending",
    status: "active",
    // avg_rating: 4.8,
    actions: [
      { id: 1, action: "View Profile", url: "/users/2" },
      { id: 2, action: "Edit Profile", url: "/users/2/edit" },
    ],
    created_at: "2020-03-20T14:00:00.000Z",
    updated_at: "2023-01-12T09:15:00.000Z",
  },
  {
    id: 3,
    seller: {
      name: "Bob Smith",
      email: "bob.smith@example.com",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    phone: "+1-555-123-4567",
    joined_on: "2022-11-10T08:45:00.000Z",
    total_listing: 15,
    total_order: 15,
    total_earning: 1500,
    id_status: "rejected",
    status: "active",
    // avg_rating: 4.8,
    actions: [
      { id: 1, action: "View Profile", url: "/users/3" },
      { id: 2, action: "Edit Profile", url: "/users/3/edit" },
      { id: 3, action: "Delete Profile", url: "/users/3/delete" },
    ],
    created_at: "2022-11-10T08:45:00.000Z",
    updated_at: "2024-02-05T10:30:00.000Z",
  },
  {
    id: 4,
    seller: {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    phone: "+1-555-555-5555",
    joined_on: "2021-01-25T11:10:00.000Z",
    total_listing: 10,
    total_order: 45,
    total_earning: 1000,
    id_status: "verified",
    status: "active",
    // avg_rating: 4.8,
    actions: [
      { id: 1, action: "View Profile", url: "/users/4" },
      { id: 2, action: "Edit Profile", url: "/users/4/edit" },
    ],
    created_at: "2021-01-25T11:10:00.000Z",
    updated_at: "2022-12-01T13:40:00.000Z",
  },
  {
    id: 5,
    seller: {
      name: "Mike Brown",
      email: "mike.brown@example.com",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    phone: "+1-555-555-5556",
    joined_on: "2023-04-12T09:30:00.000Z",
    total_listing: 20,
    total_order: 63,
    total_earning: 1500,
    id_status: "verified",
    status: "active",
    // avg_rating: 4.8,
    actions: [
      { id: 1, action: "View Profile", url: "/users/5" },
      { id: 2, action: "Edit Profile", url: "/users/5/edit" },
      { id: 3, action: "Delete Profile", url: "/users/5/delete" },
    ],
    created_at: "2023-04-12T09:30:00.000Z",
    updated_at: "2024-06-15T15:50:00.000Z",
  },

  {
    id: 6,
    seller: {
      name: "John Doe",
      email: "john.doe@example.com",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    phone: "+1-123-456-7890",
    joined_on: "2021-06-15T10:20:30.000Z",
    total_listing: 10,
    total_order: 78,
    total_earning: 1000,
    id_status: "verified",
    status: "active",
    // avg_rating: 4.8,
    actions: [
      { id: 1, action: "View Profile", url: "/users/1" },
      { id: 2, action: "Edit Profile", url: "/users/1/edit" },
      { id: 3, action: "Delete Profile", url: "/users/1/delete" },
    ],
    created_at: "2021-06-15T10:20:30.000Z",
    updated_at: "2023-10-01T08:00:00.000Z",
  },
  {
    id: 7,
    seller: {
      name: "Jane Doe",
      email: "jane.doe@example.com",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    phone: "+1-098-765-4321",
    joined_on: "2020-03-20T14:00:00.000Z",
    total_listing: 5,
    total_order: 74,
    total_earning: 500,
    id_status: "verified",
    status: "active",
    // avg_rating: 4.8,
    actions: [
      { id: 1, action: "View Profile", url: "/users/2" },
      { id: 2, action: "Edit Profile", url: "/users/2/edit" },
    ],
    created_at: "2020-03-20T14:00:00.000Z",
    updated_at: "2023-01-12T09:15:00.000Z",
  },
  {
    id: 8,
    seller: {
      name: "Bob Smith",
      email: "bob.smith@example.com",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    phone: "+1-555-123-4567",
    joined_on: "2022-11-10T08:45:00.000Z",
    total_listing: 15,
    total_order: 96,
    total_earning: 1500,
    id_status: "verified",
    status: "active",
    // avg_rating: 4.8,
    actions: [
      { id: 1, action: "View Profile", url: "/users/3" },
      { id: 2, action: "Edit Profile", url: "/users/3/edit" },
      { id: 3, action: "Delete Profile", url: "/users/3/delete" },
    ],
    created_at: "2022-11-10T08:45:00.000Z",
    updated_at: "2024-02-05T10:30:00.000Z",
  },
  {
    id: 9,
    seller: {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    phone: "+1-555-555-5555",
    joined_on: "2021-01-25T11:10:00.000Z",
    total_listing: 10,
    total_order: 42,
    total_earning: 1000,
    id_status: "verified",
    status: "active",
    // avg_rating: 4.8,
    actions: [
      { id: 1, action: "View Profile", url: "/users/4" },
      { id: 2, action: "Edit Profile", url: "/users/4/edit" },
    ],
    created_at: "2021-01-25T11:10:00.000Z",
    updated_at: "2022-12-01T13:40:00.000Z",
  },
  {
    id: 10,
    seller: {
      name: "Mike Brown",
      email: "mike.brown@example.com",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    phone: "+1-555-555-5556",
    joined_on: "2023-04-12T09:30:00.000Z",
    total_listing: 20,
    total_order: 63,
    total_earning: 2000,
    id_status: "pending",
    status: "active",
    // avg_rating: 4.8,
    actions: [
      { id: 1, action: "View Profile", url: "/users/5" },
      { id: 2, action: "Edit Profile", url: "/users/5/edit" },
      { id: 3, action: "Delete Profile", url: "/users/5/delete" },
    ],
    created_at: "2023-04-12T09:30:00.000Z",
    updated_at: "2024-06-15T15:50:00.000Z",
  },
  {
    id: 11,
    seller: {
      name: "John Doe",
      email: "john.doe@example.com",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    phone: "+1-123-456-7890",
    joined_on: "2021-06-15T10:20:30.000Z",
    total_listing: 10,  
    total_order: 63,
    total_earning: 1000,
    id_status: "rejected",
    status: "suspended",
    // avg_rating: 4.8,
    actions: [
      { id: 1, action: "View Profile", url: "/users/1" },
      { id: 2, action: "Edit Profile", url: "/users/1/edit" },
      { id: 3, action: "Delete Profile", url: "/users/1/delete" },
    ],
    created_at: "2021-06-15T10:20:30.000Z",
    updated_at: "2023-10-01T08:00:00.000Z",
  },
  {
    id: 12,
    seller: {
      name: "Jane Doe",
      email: "jane.doe@example.com",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    phone: "+1-098-765-4321",
    joined_on: "2020-03-20T14:00:00.000Z",
    total_listing: 5,
    total_order: 32,
    total_earning: 500,
    id_status: "pending",
    status: "active",
    // avg_rating: 4.8,
    actions: [
      { id: 1, action: "View Profile", url: "/users/2" },
      { id: 2, action: "Edit Profile", url: "/users/2/edit" },
    ],
    created_at: "2020-03-20T14:00:00.000Z",
    updated_at: "2023-01-12T09:15:00.000Z",
  },
  {
    id: 13,
    seller: {
      name: "Bob Smith",
      email: "bob.smith@example.com",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    phone: "+1-555-123-4567",
    joined_on: "2022-11-10T08:45:00.000Z",
    total_listing: 15,
    total_order: 56,
    total_earning: 1500,
    id_status: "pending",
    status: "active",
    // avg_rating: 4.8,
    actions: [
      { id: 1, action: "View Profile", url: "/users/3" },
      { id: 2, action: "Edit Profile", url: "/users/3/edit" },
      { id: 3, action: "Delete Profile", url: "/users/3/delete" },
    ],
    created_at: "2022-11-10T08:45:00.000Z",
    updated_at: "2024-02-05T10:30:00.000Z",
  },
  {
    id: 14,
    seller: {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    phone: "+1-555-555-5555",
    joined_on: "2021-01-25T11:10:00.000Z",
    total_listing: 10,
    total_order: 6,
    total_earning: 1000,
    id_status: "pending",
    status: "active",
    // avg_rating: 4.8,
    actions: [
      { id: 1, action: "View Profile", url: "/users/4" },
      { id: 2, action: "Edit Profile", url: "/users/4/edit" },
    ],
    created_at: "2021-01-25T11:10:00.000Z",
    updated_at: "2022-12-01T13:40:00.000Z",
  },
  {
    id: 15,
    seller: {
      name: "Mike Brown",
      email: "mike.brown@example.com",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    phone: "+1-555-555-5556",
    joined_on: "2023-04-12T09:30:00.000Z",
    total_listing: 20,
    total_order: 63,
    total_earning: 2000,
    id_status: "pending",
    status: "active",
    // avg_rating: 4.8,
    actions: [
      { id: 1, action: "View Profile", url: "/users/5" },
      { id: 2, action: "Edit Profile", url: "/users/5/edit" },
      { id: 3, action: "Delete Profile", url: "/users/5/delete" },
    ],
    created_at: "2023-04-12T09:30:00.000Z",
    updated_at: "2024-06-15T15:50:00.000Z",
  },
  {
    id: 16,
    seller: {
      name: "Mike Brown",
      email: "mike.brown@example.com",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    phone: "+1-555-555-5556",
    joined_on: "2023-04-12T09:30:00.000Z",
    total_listing: 20,
    total_order: 47,
    total_earning: 2000,
    id_status: "pending",
    status: "active",
    // avg_rating: 4.8,
    actions: [
      { id: 1, action: "View Profile", url: "/users/5" },
      { id: 2, action: "Edit Profile", url: "/users/5/edit" },
      { id: 3, action: "Delete Profile", url: "/users/5/delete" },
    ],
    created_at: "2023-04-12T09:30:00.000Z",
    updated_at: "2024-06-15T15:50:00.000Z",
  },
  {
    id: 17,
    seller: {
      name: "Mike Brown",
      email: "mike.brown@example.com",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    phone: "+1-555-555-5556",
    joined_on: "2023-04-12T09:30:00.000Z",
    total_listing: 20,
    total_order: 23,
    total_earning: 2000,
    id_status: "verified",
    status: "active",
    // avg_rating: 4.8,
    actions: [
      { id: 1, action: "View Profile", url: "/users/5" },
      { id: 2, action: "Edit Profile", url: "/users/5/edit" },
      { id: 3, action: "Delete Profile", url: "/users/5/delete" },
    ],
    created_at: "2023-04-12T09:30:00.000Z",
    updated_at: "2024-06-15T15:50:00.000Z",
  },
  {
    id: 18,
    seller: {
      name: "Mike Brown",
      email: "mike.brown@example.com",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    phone: "+1-555-555-5556",
    joined_on: "2023-04-12T09:30:00.000Z",
    total_listing: 20,
    total_order: 12,
    total_earning: 2000,
    id_status: "verified",
    status: "active",
    // avg_rating: 4.8,
    actions: [
      { id: 1, action: "View Profile", url: "/users/5" },
      { id: 2, action: "Edit Profile", url: "/users/5/edit" },
      { id: 3, action: "Delete Profile", url: "/users/5/delete" },
    ],
    created_at: "2023-04-12T09:30:00.000Z",
    updated_at: "2024-06-15T15:50:00.000Z",
  },
  {
    id: 19,
    seller: {
      name: "Mike Brown",
      email: "mike.brown@example.com",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    phone: "+1-555-555-5556",
    joined_on: "2023-04-12T09:30:00.000Z",
    total_listing: 20,
    total_order: 33,
    total_earning: 2000,
    id_status: "verified",
    status: "active",
    // avg_rating: 4.8,
    actions: [
      { id: 1, action: "View Profile", url: "/users/5" },
      { id: 2, action: "Edit Profile", url: "/users/5/edit" },
      { id: 3, action: "Delete Profile", url: "/users/5/delete" },
    ],
    created_at: "2023-04-12T09:30:00.000Z",
    updated_at: "2024-06-15T15:50:00.000Z",
  },
  {
    id: 20,
    seller: {
      name: "Mike Brown",
      email: "mike.brown@example.com",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    phone: "+1-555-555-5556",
    joined_on: "2023-04-12T09:30:00.000Z",
    total_listing: 20,
    total_order: 20,
    total_earning: 2000,
    id_status: "verified",
    status: "active",
    // avg_rating: 4.8,
    actions: [
      { id: 1, action: "View Profile", url: "/users/5" },
      { id: 2, action: "Edit Profile", url: "/users/5/edit" },
      { id: 3, action: "Delete Profile", url: "/users/5/delete" },
    ],
    created_at: "2023-04-12T09:30:00.000Z",
    updated_at: "2024-06-15T15:50:00.000Z",
  },
];
