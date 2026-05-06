export interface Movie {
  id: string;
  title: string;
  description: string;
  posterUrl: string;
  durationMinutes: number;
  genre: string[];
}

export const movies: Movie[] = [
  {
    id: "dune-2",
    title: "Dune: Part Two",
    description:
      "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    posterUrl: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    durationMinutes: 166,
    genre: ["Sci-Fi", "Adventure"],
  },
  {
    id: "oppenheimer",
    title: "Oppenheimer",
    description:
      "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
    posterUrl: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    durationMinutes: 180,
    genre: ["Drama", "History"],
  },
  {
    id: "inside-out-2",
    title: "Inside Out 2",
    description:
      "Riley enters puberty and her emotions face new challenges as Anxiety, Envy, and others arrive at headquarters.",
    posterUrl: "https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
    durationMinutes: 96,
    genre: ["Animation", "Family", "Comedy"],
  },
  {
    id: "the-batman",
    title: "The Batman",
    description:
      "When a sadistic serial killer begins murdering key political figures in Gotham, Batman uncovers corruption.",
    posterUrl: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    durationMinutes: 176,
    genre: ["Action", "Crime", "Mystery"],
  },
  {
    id: "barbie",
    title: "Barbie",
    description: "Barbie suffers a crisis that leads her to question her world and her existence.",
    posterUrl: "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
    durationMinutes: 114,
    genre: ["Comedy", "Adventure", "Fantasy"],
  },
  {
    id: "interstellar",
    title: "Interstellar",
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    durationMinutes: 169,
    genre: ["Sci-Fi", "Drama", "Adventure"],
  },
];
