export interface Seat {
  rowLabel: string;
  seatNumber: number;
  status: "available" | "taken";
}

const ROWS = ["A", "B", "C", "D", "E", "F", "G", "H"];
const SEATS_PER_ROW = 10;

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function getSeatsForShowtime(showtimeId: number): Seat[] {
  const rand = mulberry32(showtimeId * 7919 + 1);
  const takenRatio = 0.2 + rand() * 0.1;
  const seats: Seat[] = [];
  for (const row of ROWS) {
    for (let n = 1; n <= SEATS_PER_ROW; n++) {
      seats.push({
        rowLabel: row,
        seatNumber: n,
        status: rand() < takenRatio ? "taken" : "available",
      });
    }
  }
  return seats;
}

export const SEAT_ROWS = ROWS;
export const SEATS_PER_ROW_COUNT = SEATS_PER_ROW;
