export const buyerData = [
  {
    id: 1,
    buyer: {
      name: "John Doe",
      email: "john.doe@example.com",
      profile: 
      `https://picsum.photos/512?random=${Math.floor(Math.random() * 100)}`,
    },
    role: "admin",
    status: "active", 
    phone: "+1-123-456-7890",
    joined_on: "2021-06-15T10:20:30.000Z",
    total_order: 10,
    product_orders: 7,
    total_spent: 1000,
    loyalty_points: 200,
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
    buyer: {
      name: "Jane Doe",
      email: "jane.doe@example.com",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    role: "user",
    status: "suspended",
    phone: "+1-098-765-4321",
    joined_on: "2020-03-20T14:00:00.000Z",
    total_order: 5,
    product_orders: 3,
    total_spent: 500,
    loyalty_points: 120,
    actions: [
      { id: 1, action: "View Profile", url: "/users/2" },
      { id: 2, action: "Edit Profile", url: "/users/2/edit" },
    ],
    created_at: "2020-03-20T14:00:00.000Z",
    updated_at: "2023-01-12T09:15:00.000Z",
  },
  {
    id: 3,
    buyer: {
      name: "Bob Smith",
      email: "bob.smith@example.com",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    role: "admin",
    status: "active",
    phone: "+1-555-123-4567",
    joined_on: "2022-11-10T08:45:00.000Z",
    total_order: 15,
    product_orders: 9,
    total_spent: 1500,
    loyalty_points: 300,
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
    buyer: {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    role: "user",
    status: "suspended",
    phone: "+1-555-555-5555",
    joined_on: "2021-01-25T11:10:00.000Z",
    total_order: 10,
    product_orders: 6,
    total_spent: 1000,
    loyalty_points: 180,
    actions: [
      { id: 1, action: "View Profile", url: "/users/4" },
      { id: 2, action: "Edit Profile", url: "/users/4/edit" },
    ],
    created_at: "2021-01-25T11:10:00.000Z",
    updated_at: "2022-12-01T13:40:00.000Z",
  },
  {
    id: 5,
    buyer: {
      name: "Mike Brown",
      email: "mike.brown@example.com",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    role: "admin",
    status: "active",
    phone: "+1-555-555-5556",
    joined_on: "2023-04-12T09:30:00.000Z",
    total_order: 20,
    product_orders: 15,
    total_spent: 2000,
    loyalty_points: 400,
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
    buyer: {
      name: "John Doe",
      email: "john.doe@example.com",
      profile: 
      `https://picsum.photos/512?random=${Math.floor(Math.random() * 100)}`,
    },
    role: "admin",
    status: "active", 
    phone: "+1-123-456-7890",
    joined_on: "2021-06-15T10:20:30.000Z",
    total_order: 10,
    product_orders: 7,
    total_spent: 1000,
    loyalty_points: 200,
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
    buyer: {
      name: "Jane Doe",
      email: "jane.doe@example.com",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    role: "user",
    status: "suspended",
    phone: "+1-098-765-4321",
    joined_on: "2020-03-20T14:00:00.000Z",
    total_order: 5,
    product_orders: 3,
    total_spent: 500,
    loyalty_points: 120,
    actions: [
      { id: 1, action: "View Profile", url: "/users/2" },
      { id: 2, action: "Edit Profile", url: "/users/2/edit" },
    ],
    created_at: "2020-03-20T14:00:00.000Z",
    updated_at: "2023-01-12T09:15:00.000Z",
  },
  {
    id: 8,
    buyer: {
      name: "Bob Smith",
      email: "bob.smith@example.com",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    role: "admin",
    status: "active",
    phone: "+1-555-123-4567",
    joined_on: "2022-11-10T08:45:00.000Z",
    total_order: 15,
    product_orders: 9,
    total_spent: 1500,
    loyalty_points: 300,
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
    buyer: {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    role: "user",
    status: "active",
    phone: "+1-555-555-5555",
    joined_on: "2021-01-25T11:10:00.000Z",
    total_order: 10,
    product_orders: 6,
    total_spent: 1000,
    loyalty_points: 180,
    actions: [
      { id: 1, action: "View Profile", url: "/users/4" },
      { id: 2, action: "Edit Profile", url: "/users/4/edit" },
    ],
    created_at: "2021-01-25T11:10:00.000Z",
    updated_at: "2022-12-01T13:40:00.000Z",
  },
  {
    id: 10,
    buyer: {
      name: "Mike Brown",
      email: "mike.brown@example.com",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    role: "admin",
    status: "active",
    phone: "+1-555-555-5556",
    joined_on: "2023-04-12T09:30:00.000Z",
    total_order: 20,
    product_orders: 15,
    total_spent: 2000,
    loyalty_points: 400,
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
    buyer: {
      name: "John Doe",
      email: "john.doe@example.com",
      profile: 
      `https://picsum.photos/512?random=${Math.floor(Math.random() * 100)}`,
    },
    role: "admin",
    status: "active", 
    phone: "+1-123-456-7890",
    joined_on: "2021-06-15T10:20:30.000Z",
    total_order: 10,
    product_orders: 7,
    total_spent: 1000,
    loyalty_points: 200,
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
    buyer: {
      name: "Jane Doe",
      email: "jane.doe@example.com",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    role: "user",
    status: "suspended",
    phone: "+1-098-765-4321",
    joined_on: "2020-03-20T14:00:00.000Z",
    total_order: 5,
    product_orders: 3,
    total_spent: 500,
    loyalty_points: 120,
    actions: [
      { id: 1, action: "View Profile", url: "/users/2" },
      { id: 2, action: "Edit Profile", url: "/users/2/edit" },
    ],
    created_at: "2020-03-20T14:00:00.000Z",
    updated_at: "2023-01-12T09:15:00.000Z",
  },
  {
    id: 13,
    buyer: {
      name: "Bob Smith",
      email: "bob.smith@example.com",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    role: "admin",
    status: "active",
    phone: "+1-555-123-4567",
    joined_on: "2022-11-10T08:45:00.000Z",
    total_order: 15,
    product_orders: 9,
    total_spent: 1500,
    loyalty_points: 300,
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
    buyer: {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    role: "user",
    status: "suspended",
    phone: "+1-555-555-5555",
    joined_on: "2021-01-25T11:10:00.000Z",
    total_order: 10,
    product_orders: 6,
    total_spent: 1000,
    loyalty_points: 180,
    actions: [
      { id: 1, action: "View Profile", url: "/users/4" },
      { id: 2, action: "Edit Profile", url: "/users/4/edit" },
    ],
    created_at: "2021-01-25T11:10:00.000Z",
    updated_at: "2022-12-01T13:40:00.000Z",
  },
  {
    id: 15,
    buyer: {
      name: "Mike Brown",
      email: "mike.brown@example.com",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    role: "admin",
    status: "active",
    phone: "+1-555-555-5556",
    joined_on: "2023-04-12T09:30:00.000Z",
    total_order: 20,
    product_orders: 15,
    total_spent: 2000,
    loyalty_points: 400,
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
    buyer: {
      name: "Mike Brown",
      email: "mike.brown@example.com",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    role: "admin",
    status: "active",
    phone: "+1-555-555-5556",
    joined_on: "2023-04-12T09:30:00.000Z",
    total_order: 20,
    product_orders: 15,
    total_spent: 2000,
    loyalty_points: 400,
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
    buyer: {
      name: "Mike Brown",
      email: "mike.brown@example.com",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    role: "admin",
    status: "active",
    phone: "+1-555-555-5556",
    joined_on: "2023-04-12T09:30:00.000Z",
    total_order: 20,
    product_orders: 15,
    total_spent: 2000,
    loyalty_points: 400,
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
    buyer: {
      name: "Mike Brown",
      email: "mike.brown@example.com",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    role: "admin",
    status: "active",
    phone: "+1-555-555-5556",
    joined_on: "2023-04-12T09:30:00.000Z",
    total_order: 20,
    product_orders: 15,
    total_spent: 2000,
    loyalty_points: 400,
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
    buyer: {
      name: "Mike Brown",
      email: "mike.brown@example.com",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    role: "admin",
    status: "active",
    phone: "+1-555-555-5556",
    joined_on: "2023-04-12T09:30:00.000Z",
    total_order: 20,
    product_orders: 15,
    total_spent: 2000,
    loyalty_points: 400,
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
    buyer: {
      name: "Mike Brown",
      email: "mike.brown@example.com",
      profile: `https://picsum.photos/512?random=${Math.floor(
        Math.random() * 100
      )}`,
    },
    role: "admin",
    status: "active",
    phone: "+1-555-555-5556",
    joined_on: "2023-04-12T09:30:00.000Z",
    total_order: 20,
    product_orders: 15,
    total_spent: 2000,
    loyalty_points: 400,
    actions: [
      { id: 1, action: "View Profile", url: "/users/5" },
      { id: 2, action: "Edit Profile", url: "/users/5/edit" },
      { id: 3, action: "Delete Profile", url: "/users/5/delete" },
    ],
    created_at: "2023-04-12T09:30:00.000Z",
    updated_at: "2024-06-15T15:50:00.000Z",
  },
];
