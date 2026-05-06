export interface Booking {
  id: string;
  movieTitle: string;
  moviePoster: string;
  showtimeDate: string;
  showtimeTime: string;
  hallName: string;
  seats: { rowLabel: string; seatNumber: number }[];
  totalPrice: number;
  bookingRef: string;
  status: "Confirmed";
  createdAt: string;
}

const KEY = "bookings";

export function getBookings(): Booking[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Booking[];
  } catch {
    return [];
  }
}

export function saveBooking(b: Booking) {
  const all = getBookings();
  all.push(b);
  window.localStorage.setItem(KEY, JSON.stringify(all));
}

export function generateBookingRef() {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `CS-${n}`;
}

export function generateId() {
  return Math.random().toString(36).slice(2, 10);
}
