import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteSupportTicket,
  getAllSupportTickets,
  getSupportTicketById,
  getSupportTickets,
  updateSupportTicketStatus,
} from "./supportTicketService";

const initialState = {
  supportTickets: [],
  currentTicket: null,
  isLoading: false,
  error: null,
  isSuccess: false,
};

// Fetch support tickets with filter
export const fetchSupportTickets = createAsyncThunk(
  "supportTicket/fetchSupportTickets",
  async (params, thunkAPI) => {
    try {
      const response = await getSupportTickets(params);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);

// Fetch all support tickets
export const fetchAllSupportTickets = createAsyncThunk(
  "supportTicket/fetchAllSupportTickets",
  async (_, thunkAPI) => {
    try {
      const response = await getAllSupportTickets();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);

// Fetch support ticket by ID
export const fetchSupportTicketById = createAsyncThunk(
  "supportTicket/fetchSupportTicketById",
  async (id, thunkAPI) => {
    try {
      const response = await getSupportTicketById(id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);

// Update support ticket status
export const updateTicketStatus = createAsyncThunk(
  "supportTicket/updateTicketStatus",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await updateSupportTicketStatus(id, data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);

// Delete support ticket
export const deleteTicket = createAsyncThunk(
  "supportTicket/deleteTicket",
  async (id, thunkAPI) => {
    try {
      const response = await deleteSupportTicket(id);
      return { id, ...response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);

// Bulk Delete support tickets
export const deleteTickets = createAsyncThunk(
  "supportTicket/deleteTickets",
  async (ids, thunkAPI) => {
    try {
      await Promise.all(ids.map((id) => deleteSupportTicket(id)));
      return ids;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);

const supportTicketSlice = createSlice({
  name: "supportTicket",
  initialState,
  reducers: {
    resetState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.isSuccess = false;
      state.currentTicket = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Support Tickets
      .addCase(fetchSupportTickets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSupportTickets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.supportTickets = action.payload?.data || [];
        state.isSuccess = true;
      })
      .addCase(fetchSupportTickets.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch All Support Tickets
      .addCase(fetchAllSupportTickets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllSupportTickets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.supportTickets = action.payload?.data || [];
        state.isSuccess = true;
      })
      .addCase(fetchAllSupportTickets.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch Support Ticket By ID
      .addCase(fetchSupportTicketById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSupportTicketById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentTicket = action.payload;
        state.isSuccess = true;
      })
      .addCase(fetchSupportTicketById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update Ticket Status
      .addCase(updateTicketStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTicketStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Optionally update the ticket in the list
        const updateId = action.meta.arg.id;

        if (
          state.currentTicket &&
          (state.currentTicket._id === updateId ||
            state.currentTicket.id === updateId)
        ) {
          state.currentTicket = {
            ...state.currentTicket,
            ...action.meta.arg.data,
          };
        }

        const index = state.supportTickets.findIndex(
          (ticket) => ticket._id === updateId || ticket.id === updateId,
        );
        if (index !== -1) {
          state.supportTickets[index] = {
            ...state.supportTickets[index],
            ...action.meta.arg.data,
          };
        }
      })
      .addCase(updateTicketStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete Ticket
      .addCase(deleteTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const deleteId = action.meta.arg;
        state.supportTickets = state.supportTickets.filter(
          (ticket) => ticket._id !== deleteId && ticket.id !== deleteId,
        );
      })
      .addCase(deleteTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Bulk Delete Tickets
      .addCase(deleteTickets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTickets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const deleteIds = action.payload;
        state.supportTickets = state.supportTickets.filter(
          (ticket) =>
            !deleteIds.includes(ticket._id) && !deleteIds.includes(ticket.id),
        );
      })
      .addCase(deleteTickets.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetState } = supportTicketSlice.actions;
export default supportTicketSlice.reducer;
