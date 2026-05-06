import { movies } from "./movies";

export interface Showtime {
  id: number;
  movieId: string;
  hallName: string;
  startTime: string;
  price: number;
}

const halls = ["Hall 1", "Hall 2", "Hall 3", "Hall 4"];
const hours = [13, 16, 19, 21];
const prices = [10, 12, 14, 16];

function buildShowtimes(): Showtime[] {
  const out: Showtime[] = [];
  let id = 1;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  movies.forEach((movie, mi) => {
    const count = 3 + (mi % 2); // 3 or 4
    for (let i = 0; i < count; i++) {
      const dayOffset = (mi + i * 2) % 7;
      const date = new Date(today);
      date.setDate(date.getDate() + dayOffset);
      const hour = hours[(mi + i) % hours.length];
      date.setHours(hour, i % 2 === 0 ? 0 : 30, 0, 0);
      out.push({
        id: id++,
        movieId: movie.id,
        hallName: halls[(mi + i) % halls.length],
        startTime: date.toISOString(),
        price: prices[(mi + i) % prices.length],
      });
    }
  });
  return out;
}

export const showtimes: Showtime[] = buildShowtimes();
