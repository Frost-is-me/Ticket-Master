import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface CartSeat {
  rowLabel: string;
  seatNumber: number;
}

export interface CartState {
  showtimeId: number | null;
  seats: CartSeat[];
  expiresAt: string | null;
}

const initialState: CartState = {
  showtimeId: null,
  seats: [],
  expiresAt: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addSeat: (state, action: PayloadAction<{ showtimeId: number; seat: CartSeat }>) => {
      const { showtimeId, seat } = action.payload;
      if (state.showtimeId !== showtimeId) {
        state.showtimeId = showtimeId;
        state.seats = [];
        state.expiresAt = null;
      }
      const exists = state.seats.some(
        (s) => s.rowLabel === seat.rowLabel && s.seatNumber === seat.seatNumber,
      );
      if (!exists) state.seats.push(seat);
    },
    removeSeat: (state, action: PayloadAction<CartSeat>) => {
      state.seats = state.seats.filter(
        (s) =>
          !(s.rowLabel === action.payload.rowLabel && s.seatNumber === action.payload.seatNumber),
      );
      if (state.seats.length === 0) {
        state.showtimeId = null;
        state.expiresAt = null;
      }
    },
    clearCart: (state) => {
      state.showtimeId = null;
      state.seats = [];
      state.expiresAt = null;
    },
    setExpiry: (state, action: PayloadAction<string | null>) => {
      state.expiresAt = action.payload;
    },
  },
});

export const { addSeat, removeSeat, clearCart, setExpiry } = cartSlice.actions;
export default cartSlice.reducer;
